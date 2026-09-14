import { MInput } from '@/components/base/input/MInput';
import SPACING from '@/utils/theme/spacing';
import { Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { updatePassworduser } from 'src/auth/firebase';
import { useGetUser } from 'src/auth/UserProvider';
import snackbarMessages from 'src/data/snackbarMessages';
import { securityProfileSettingInitialForm, securityProfileSettingValidationForm } from './data';

const SecurityProfileSetting = () => {
    const formik = useFormik({
        initialValues: securityProfileSettingInitialForm(),
        enableReinitialize: true,
        onSubmit,
        validationSchema: securityProfileSettingValidationForm()
    });
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const user = useGetUser();
    const hasUser = typeof user === 'object' && user !== null;

    async function onSubmit(data) {
        if (!hasUser) return;

        setIsLoading(true);

        try {
            await updatePassworduser(user.email, data.password, data.newPassword);

            enqueueSnackbar('Operation was successful!', {
                variant: 'success'
            });
        } catch (error) {
            enqueueSnackbar(snackbarMessages.onError, { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container columnSpacing={{ md: SPACING['80'] }}>
                <Grid item xs={12} md={6}>
                    <MInput
                        type="password"
                        name="password"
                        label="Current password"
                        placeholder="Current password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        meta={formik.getFieldMeta('password')}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <MInput
                        type="password"
                        name="newPassword"
                        label="New password"
                        placeholder="New password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        meta={formik.getFieldMeta('newPassword')}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <MInput
                        type="password"
                        name="confirmNewPassword"
                        label="Confirm new password"
                        placeholder="Confirm New password"
                        value={formik.values.confirmNewPassword}
                        onChange={formik.handleChange}
                        meta={formik.getFieldMeta('confirmNewPassword')}
                    />
                </Grid>
            </Grid>

            <Button type="submit" variant="contained" disabled={isLoading}>
                Save
            </Button>
        </form>
    );
};

export default SecurityProfileSetting;
