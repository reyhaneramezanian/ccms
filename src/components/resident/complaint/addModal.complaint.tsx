import { FC } from 'react';
import { Typography, Radio, RadioGroup, Box, FormControlLabel } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as residentstyle from '../resident.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import React, { useState, useEffect } from 'react';
import {
    useComplaintType_GetComplaintTypesQuery,
    useComplaint_UpdateMutation,
    useComplaint_CreateMutation,
    useTotalbuildingQuery
} from 'src/graphql/generated';
import { useQueryClient, QueryClient } from 'react-query';
import SucsessModal from '../sucsessModal';
import { useSnackbar } from 'notistack';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
const today = new Date();

const validationForm = Yup.object({
    Date: Yup.date()
        .min(new Date(today.setDate(today.getDate() - 1)), 'Date can not be in the past')
        .required('This field is required'),
    Title: Yup.string().required('This field is required'),
    //Status: Yup.string().required('This field is required'),
    Type: Yup.string().required('This field is required')
    // Message: Yup.string().required('This field is required')
});
const AddModalcomplaint: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const { data: totalbuilding } = useTotalbuildingQuery();

    const pageData = useSelector(({ pageData }: any) => pageData);
    const queryClient = useQueryClient();
    const mutationErrorHandler = useMutationErrorHandler();

    const { data: datatype } = useComplaintType_GetComplaintTypesQuery({
        take: totalbuilding?.complaintType_getComplaintTypes?.result?.totalCount,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [typecomplaint, settypecomplaint] = useState([]);

    const { mutate, isLoading } = useComplaint_CreateMutation();
    const { mutate: mutateupdate, isLoading: isLoadingupdate } = useComplaint_UpdateMutation();

    useEffect(() => {
        var js = [];
        datatype?.complaintType_getComplaintTypes?.result?.items.forEach((item, i) => {
            js.push({ option: item.name, value: item.id });
        });

        settypecomplaint(js);
    }, [datatype]);

    const handleCancel = () => {
        dispatch(closeModal(AddModalcomplaint.name));
    };
    const handelsave = (e) => {
        if (row && row != '') {
            mutateupdate(
                {
                    input: {
                        id: row.id,
                        complaintStatus: 'PENDING' as any,
                        date: e.Date,
                        title: e.Title,
                        message: e.Message,
                        flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId)), //pageData?.flatId,
                        complaintTypeId: e.Type
                    }
                },
                {
                    onSuccess: () => {
                        dispatch(closeModal(AddModalcomplaint.name));
                        if (typeof refetch === 'function') {
                            refetch();
                        }
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'complaint_update');
                    }
                }
            );
        } else {
            mutate(
                {
                    input: {
                        complaintStatus: 'PENDING' as any,
                        date: e.Date,
                        title: e.Title,
                        message: e.Message,
                        flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId)), //pageData?.flatId,
                        complaintTypeId: e.Type
                    }
                },
                {
                    onSuccess: () => {
                        dispatch(closeModal(AddModalcomplaint.name));
                        if (typeof refetch === 'function') {
                            refetch();
                        }
                        dispatch(
                            newModal({
                                closeButton: true,
                                Body: SucsessModal,
                                title: '',
                                topBar: true,
                                id: '1',
                                data: ['Complaint was added!', '', '', '']
                            })
                        );
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'complaint_create');
                    }
                }
            );
        }
    };

    return (
        <residentstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(data) => {
                    handelsave(data);
                }}
                initialValues={{
                    Date: row?.date || new Date().toJSON().slice(0, 10),
                    Type: row?.complaintTypeId || '',
                    Title: row?.Title || '',
                    Message: row?.Message || ''
                    //Status: ''
                }}
                validationSchema={validationForm}>
                <Form>
                    <residentstyle.modalFormRowWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Date"
                                label="Date of delivery"
                                placeholder=""
                                fullWidth
                                type="date"
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={typecomplaint}
                                name="Type"
                                label="Type"
                                placeholder="Type"
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Title"
                                label="Title"
                                placeholder=""
                                fullWidth
                            />
                        </residentstyle.modalFormRowFieldWrapper>

                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%', height: '70px' }}
                                name="Message"
                                label="Message"
                                placeholder=""
                                fullWidth
                                multiline
                                maxRows={6}
                                necessary={false}
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                    </residentstyle.modalFormRowWrapper>

                    <residentstyle.modalButtonGroup>
                        <Box>
                            <LoadingButton
                                loading={isLoading}
                                type="submit"
                                variant="contained"
                                color="primary">
                                Save
                            </LoadingButton>
                        </Box>

                        <Box>
                            <residentstyle.MyButton variant="contained" onClick={handleCancel}>
                                <Typography>Cancel</Typography>
                            </residentstyle.MyButton>
                        </Box>
                    </residentstyle.modalButtonGroup>
                </Form>
            </Formik>
        </residentstyle.modalbox>
    );
};

const handleShowAddModalcomplaint = (refetch, row?: RowTable) => {
    return newModal({
        Body: AddModalcomplaint,
        title: row === undefined ? 'Complaint' : 'Edit Complaint',
        topBar: true,
        id: AddModalcomplaint.name,
        data: { refetch, row },
        isNotCloseModal: true
    });
};

export default handleShowAddModalcomplaint;
