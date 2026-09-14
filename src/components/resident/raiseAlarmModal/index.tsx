import { MInput } from '@/components/base/input/MInput';
import COLORS from '@/utils/theme/colors';
import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { AlertType, useAlertSystemCreateMutation } from 'src/graphql/generated';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { raiseAlarmInitialForm, raiseAlarmTypesData, raiseAlarmValidationForm } from './data';
import * as GlobalStyle from '@/components/style';
import * as S from './raiseAlarm.style';
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { useDispatch } from 'react-redux';
import snackbarMessages from 'src/data/snackbarMessages';
import useManageActiveResidentFlat from 'src/hooks/useManageActiveResidentFlat';

const RaiseAlarm = () => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: raiseAlarmInitialForm,
        onSubmit,
        validationSchema: raiseAlarmValidationForm
    });
    const { enqueueSnackbar } = useSnackbar();
    const alertSystemCreate = useAlertSystemCreateMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const dispatch = useDispatch();
    const { handleGetActiveFlatId } = useManageActiveResidentFlat();

    const handleCancel = () => {
        dispatch(closeModal(RaiseAlarm.name));
    };

    const handleActiveAlertType = (alertType: AlertType) => {
        formik.setFieldValue('alertType', alertType);
    };

    function onSubmit() {
        if (typeof formik.values.alertType === 'undefined') {
            enqueueSnackbar('Choose problem', { variant: 'info' });
            return;
        }

        alertSystemCreate.mutate(
            {
                input: {
                    alertType: formik.values.alertType,
                    date: new Date().toJSON().slice(0, 10),
                    description: formik.values.description.trim(),
                    flatId: +handleGetActiveFlatId()
                }
            },
            {
                onSuccess() {
                    enqueueSnackbar(snackbarMessages.raiseAlarmSuccess, { variant: 'success' });

                    handleCancel();
                },
                onError(error) {
                    mutationErrorHandler(error);
                }
            }
        );
    }

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            style={{ width: 500, maxWidth: '100%' }}>
            <Typography>What is the problem?</Typography>

            <S.RaiseAlarmIconsWrapper>
                {raiseAlarmTypesData.map((item, index) => {
                    const isActive = item.type === formik.values.alertType;

                    return (
                        <Box key={index} display="flex" flexDirection="column" alignItems="center">
                            <S.RaiseAlarmIconsItemWrapper
                                onClick={() => {
                                    handleActiveAlertType(item.type);
                                }}
                                isActive={isActive}>
                                <item.Icon color={isActive ? COLORS.white : COLORS.grey3} />
                            </S.RaiseAlarmIconsItemWrapper>

                            <Typography
                                style={{ cursor: 'pointer', marginTop: 12, transition: '0.3s' }}
                                onClick={() => {
                                    handleActiveAlertType(item.type);
                                }}
                                color={isActive ? COLORS.primary : COLORS.grey3}>
                                {item.title}
                            </Typography>
                        </Box>
                    );
                })}
            </S.RaiseAlarmIconsWrapper>

            <MInput
                name="description"
                label="Additional information"
                placeholder=""
                fullWidth
                multiline
                maxRows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('description')}
                necessary={false}
            />

            <GlobalStyle.modalButtonGroup>
                <Button type="submit" variant="contained" disabled={alertSystemCreate.isLoading}>
                    Send
                </Button>

                <Button variant="outlined" color="grey3" onClick={handleCancel}>
                    Cancel
                </Button>
            </GlobalStyle.modalButtonGroup>
        </Box>
    );
};

const handleShowRaiseAlarmModal = () => {
    return newModal({
        title: 'Raise an alarm',
        id: RaiseAlarm.name,
        topBar: true,
        Body: RaiseAlarm
    });
};

export default handleShowRaiseAlarmModal;
