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
    useAnnouncementType_GetAnnouncementTypesQuery,
    useFlat_GetFlatsQuery,
    useAnnouncement_CreateMutation
} from 'src/graphql/generated';
import { useQueryClient, QueryClient } from 'react-query';
import SucsessModal from '../sucsessModal';
import { useSnackbar } from 'notistack';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const validationForm = Yup.object({
    Date: Yup.string().required('This field is required'),
    Title: Yup.string().required('This field is required'),
    Type: Yup.string().required('This field is required'),
    Message: Yup.string().required('This field is required')
});

const addModalannouncements = () => {
    const pageData = useSelector(({ pageData }: any) => pageData);
    const queryClient = useQueryClient();
    const mutationErrorHandler = useMutationErrorHandler();

    const { data: datatype } = useAnnouncementType_GetAnnouncementTypesQuery();
    const { data: datafalt } = useFlat_GetFlatsQuery({
        where: {
            id: {
                eq: Number(localStorage.getItem(storageKeys.activeResidentFlatId)) //pageData?.flatId
            }
        }
    });
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [typeannoncement, settypeannoncement] = useState([]);
    const [complexid, setcomplexid] = useState(0);
    const [blockid, setblockid] = useState(0);
    const [floorid, setfloorid] = useState(0);
    const { mutate, isLoading } = useAnnouncement_CreateMutation();

    useEffect(() => {
        var js = [];
        datatype?.announcementType_getAnnouncementTypes?.result?.items.forEach((item, i) => {
            js.push({ option: item.name, value: item.id });
        });

        settypeannoncement(js);
    }, [datatype]);

    useEffect(() => {
        datafalt?.flat_getFlats?.result?.items?.map((item) => {
            setfloorid(item.floor.id);
            setblockid(item.floor.block.id);
            setcomplexid(item.floor.block.complex.id);
        });
    }, [datafalt]);
    const handleCancel = () => {
        dispatch(closeModal('1'));
    };
    const handelsave = (e) => {
        mutate(
            {
                input: {
                    complexId: complexid,
                    blockId: blockid,
                    floorId: floorid,
                    flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId)), //pageData?.flatId,
                    announcementTypeId: e.Type,
                    date: e.Date,
                    title: e.Title,
                    message: e.Message
                }
            },
            {
                onSuccess: () => {
                    dispatch(closeModal('1'));
                    dispatch(
                        newModal({
                            closeButton: true,
                            Body: SucsessModal,
                            title: '',
                            topBar: true,
                            id: '1',
                            data: ['Annoncement was added!', '', '', '']
                        })
                    );
                    queryClient.refetchQueries('announcement_getAnnouncements');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'announcement_create');
                }
            }
        );
    };

    return (
        <residentstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(data) => {
                    handelsave(data);
                }}
                initialValues={{
                    Date: new Date().toJSON().slice(0, 10),
                    Type: '',
                    Title: '',
                    Message: ''
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
                                options={typeannoncement}
                                name="Type"
                                label="Type"
                                placeholder="Status"
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
                                maxRows={3}
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                    </residentstyle.modalFormRowWrapper>

                    <residentstyle.modalButtonGroup>
                        <Box>
                            <residentstyle.CancelButton variant="contained" type="submit">
                                save
                            </residentstyle.CancelButton>
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

export default addModalannouncements;
