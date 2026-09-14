import { FC } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import {
    AnnouncementTypeInput,
    useAdminAnnouncementTypeCreateMutation,
    useAdminAnnouncementTypeUpdateMutation
} from 'src/graphql/generated';
import { announcementTypeInitialForm, announcementTypeValidationForm } from './data';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
const AnnouncementsTypeEditModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const announcementTypeUpdate = useAdminAnnouncementTypeUpdateMutation();
    const announcementTypeCreate = useAdminAnnouncementTypeCreateMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleCancel = () => {
        dispatch(closeModal(AnnouncementsTypeEditModal.name));
    };

    const handleSubmitForm = async (data: AnnouncementTypeInput) => {
        if (row) {
            await announcementTypeUpdate.mutateAsync(
                {
                    input: {
                        id: row.id,
                        name: data.name,
                        activeStatus: data.activeStatus
                    }
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'announcementType_update');
                    }
                }
            );
        } else {
            await announcementTypeCreate.mutateAsync(
                {
                    input: {
                        name: data.name,
                        activeStatus: data.activeStatus
                    }
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'announcementType_create');
                    }
                }
            );
        }

        if (typeof refetch === 'function') {
            refetch();
            //  router.reload();
        }

        dispatch(closeModal(AnnouncementsTypeEditModal.name));
    };

    return (
        <Box style={{ width: 450, maxWidth: '100%' }}>
            <Formik
                enableReinitialize
                onSubmit={handleSubmitForm}
                initialValues={{
                    ...announcementTypeInitialForm,
                    ...row
                }}
                validationSchema={announcementTypeValidationForm}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="name"
                                label="Announcement type"
                                placeholder="Announcement type"
                                fullWidth
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={[
                                    { option: 'Active', value: 'ACTIVE' },

                                    { option: 'Inactivate', value: 'INACTIVE' }
                                ]}
                                name="activeStatus"
                                label="status"
                                placeholder="status"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </adminstyle.modalFormRowWrapper>

                    <adminstyle.modalButtonGroup>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={
                                    announcementTypeCreate.isLoading ||
                                    announcementTypeUpdate.isLoading
                                }>
                                {row ? 'Save' : 'Add'}
                            </Button>
                        </Box>

                        <Box>
                            <Button variant="outlined" color="grey3" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </adminstyle.modalButtonGroup>
                </Form>
            </Formik>
        </Box>
    );
};

const handleShowAnnouncementsTypeEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: AnnouncementsTypeEditModal,
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} announcement type`,
        topBar: true,
        id: AnnouncementsTypeEditModal.name,
        data: { refetch, row }
    });
};

export default handleShowAnnouncementsTypeEditModal;
