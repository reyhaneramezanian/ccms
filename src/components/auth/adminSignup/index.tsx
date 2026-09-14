import { Form, Formik } from 'formik';
import SecuritySignUpStepOne from './stepOne';
import { useEffect, useState } from 'react';
import CardStepper from '@/components/base/cardStepper';
import * as S from '../style.auth';
import SecuritySignUpStepTwo from './stepTwo';
import SecuritySignUpStepThree from './stepThree';
import { securitySignupInitialForm, securitySignupValidationSchema } from './data';
import { UserType, useUser_CreateSuperAdminMutation, ActiveStatus } from 'src/graphql/generated';
import Utils from '@/utils/utils';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import getRoleText from 'src/data/roleText';
import Back from 'src/assets/icons/backicon';
const SecuritySignUp = () => {
    const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    const router = useRouter();

    const signUpMutation = useUser_CreateSuperAdminMutation();

    useEffect(() => {
        setIsLoading(false);
    }, [activeStep]);

    const handleSubmitForm = async (data) => {
        if (activeStep === 0) {
            setActiveStep(1);
            return;
        } else if (activeStep === 1) {
            setIsLoading(true);

            await signUpMutation.mutateAsync(
                {
                    input: {
                        activeStatus: ActiveStatus.Active,
                        email: data.email.trim(),
                        firstName: data.firstName.trim(),
                        lastName: data.lastName.trim(),
                        dateOfBirth: data.dateOfBirth,
                        gender: data.gender,
                        phoneNumber: data.phoneNumber,
                        middleName: data.middleName.trim()
                    }
                },
                {
                    onSuccess() {
                        setActiveStep(2);
                    },
                    onError(err: any) {
                        setIsLoading(false);

                        if (err?.user_createSuperAdmin?.status?.code !== 1) {
                            enqueueSnackbar(err.user_createSuperAdmin.status?.value, {
                                variant: 'error'
                            });
                            return;
                        }

                        if (
                            Array.isArray(err?.response?.errors) &&
                            err.response.errors.length < 1
                        ) {
                            return;
                        }
                        enqueueSnackbar(err.response.errors[0].message, { variant: 'error' });
                    }
                }
            );
            return;
        }

        router.push('/signin');
    };
    const handleback = () => {
        setActiveStep(0);
    };
    const handelsignup = () => {
        router.push('/signin');
    };
    return (
        <Formik
            initialValues={securitySignupInitialForm()}
            onSubmit={handleSubmitForm}
            validationSchema={securitySignupValidationSchema(activeStep)}>
            <Form>
                {activeStep === 0 && <SecuritySignUpStepOne />}
                {activeStep === 1 && <SecuritySignUpStepTwo />}
                {activeStep === 2 && <SecuritySignUpStepThree />}

                {activeStep !== 2 && <CardStepper stepsLength={2} activeStep={activeStep} />}

                <S.BoxButton>
                    {activeStep == 1 ? (
                        <S.BackButton
                            onClick={() => {
                                handleback();
                            }}
                            type="submit">
                            Back
                        </S.BackButton>
                    ) : (
                        ''
                    )}
                    <S.SignUpButton
                        isActive={activeStep !== 1 ? true : false}
                        type="submit"
                        variant="contained"
                        disabled={isLoading}>
                        {activeStep === 0 ? 'Next' : 'Done'}
                    </S.SignUpButton>
                </S.BoxButton>
                <S.rowpage>
                    <S.cellpagetext>
                        <S.Authsingup onClick={handelsignup}>Already have an account?</S.Authsingup>
                    </S.cellpagetext>
                    <S.cellpage>
                        <S.Authsingupabi onClick={handelsignup}>Sign in</S.Authsingupabi>
                    </S.cellpage>
                </S.rowpage>
            </Form>
        </Formik>
    );
};

export default SecuritySignUp;
