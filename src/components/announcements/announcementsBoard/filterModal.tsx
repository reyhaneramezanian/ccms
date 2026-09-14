import { FC } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { MInput } from '@/components/base/input/MInput';
import { MSelect } from '@/components/base/input/MSelect';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';
import SPACING from '@/utils/theme/spacing';
import Utils from '@/utils/utils';
import { announcementsBoardFilterInitialForm } from './data';
import useGetAnnouncementsTypeOptions from 'src/hooks/useGetAnnouncementsTypeOptions';
import { useGetUser } from 'src/auth/UserProvider';
import { UserType, useSecurityUserGetQuery } from 'src/graphql/generated';

const AnnouncementsBoardFilterModal: FC<IModalBodyProps<RowTable>> = ({
    data: { state, setState }
}) => {
    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: state,
        onSubmit,
        enableReinitialize: true
    });
    const dispatch = useDispatch();
    const announcementsTypeOptions = useGetAnnouncementsTypeOptions();
    const user = useGetUser();
    const hasUser = typeof user === 'object' && user !== null;

    const securityUser = useSecurityUserGetQuery(undefined, {
        enabled: hasUser && user.userType === UserType.Security
    });

    const handleCancel = () => {
        dispatch(closeModal(AnnouncementsBoardFilterModal.name));
    };

    async function onSubmit(data) {
        debugger;
        setState({
            ...data
            //  date: data.date ? Utils.convertInputDateValueToDateTime(data.date) : undefined
        });

        handleCancel();
    }

    const handleResetFilters = () => {
        setState(announcementsBoardFilterInitialForm());

        handleCancel();
    };

    if (!hasUser) return null;
    return (
        <Box style={{ width: 1440, maxWidth: '90vw' }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container columnSpacing={{ md: SPACING[24] }}>
                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                necessary={false}
                                name="complexId"
                                label="Complex "
                                options={complexes}
                                value={
                                    securityUser?.data?.user_getCurrentSecurity?.result
                                        ?.complexId || formik.values.complexId
                                }
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('complexId')}
                                disabled={user.userType === UserType.Security}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="blockId"
                                label="Block "
                                options={blocks}
                                value={formik.values.blockId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('blockId')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="floorId"
                                label="Floor "
                                options={floors}
                                value={formik.values.floorId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('floorId')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="flatId"
                                label="Flat "
                                options={flats}
                                value={formik.values.flatId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('flatId')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="announcementTypeId"
                                label="Type"
                                options={announcementsTypeOptions}
                                value={formik.values.announcementTypeId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('announcementTypeId')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInput
                                type="date"
                                name="date"
                                label="date"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('date')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>
                </Grid>

                <Box display="flex" alignItems="flex-end" justifyContent="space-between">
                    <Button onClick={handleResetFilters}>Reset filter</Button>

                    <adminstyle.modalButtonGroup>
                        <Box>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </Box>

                        <Box>
                            <Button variant="outlined" color="grey3" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </adminstyle.modalButtonGroup>
                </Box>
            </form>
        </Box>
    );
};

const handleShowAnnouncementsBoardFilter = (state: any, setState: (data: any) => void) => {
    return newModal({
        Body: AnnouncementsBoardFilterModal,
        title: `Filter`,
        topBar: true,
        id: AnnouncementsBoardFilterModal.name,
        data: {
            setState,
            state
        }
    });
};

export default handleShowAnnouncementsBoardFilter;
