import StaffSignUpStepOne from './stepOne';
import { useEffect, useState } from 'react';
import CardStepper from '@/components/base/cardStepper';
import * as S from '../style.auth';
import StaffSignUpStepTwo from './stepTwo';
import StaffSignUpStepThree from './stepThree';
import { staffSignupInitialForm, staffSignupValidationSchema } from './data';
import { UserType, useStaffSignupMutation, ActiveStatus } from 'src/graphql/generated';
import { useRouter } from 'next/router';
import getRoleText from 'src/data/roleText';
import StaffSignUpStepFour from './stepFour';
import StaffSignUpStepFive from './stepFive';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { useFormik } from 'formik';

const StaffSignUp = () => {
    const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3 | 4>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formik = useFormik({
        initialValues: staffSignupInitialForm(),
        onSubmit,
        enableReinitialize: true,
        validationSchema: staffSignupValidationSchema(activeStep)
    });
    const staffSignup = useStaffSignupMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const router = useRouter();

    useEffect(() => {
        setIsLoading(false);
    }, [activeStep]);

    async function onSubmit(data) {
        if (activeStep === 3) {
            setIsLoading(true);

            await staffSignup.mutateAsync(
                {
                    input: {
                        firstName: data?.firstName,
                        lastName: data?.lastName,
                        middleName: data?.middleName,
                        gender: data?.gender,
                        dateOfBirth: data?.dateOfBirth,
                        phoneNumber: data?.phoneNumber,
                        alternatePhone: data?.alternatePhone,
                        email: data?.email,
                        alternateEmail: data?.alternateEmail,
                        address: data?.address,
                        complexIdList: [data.complexId],
                        departmentId: data?.departmentId,
                        employmentTypeId: data?.employmentTypeId,
                        // role: data?.role,
                        activeStatus: ActiveStatus.Active,
                        dateOfJoining: data?.dateOfJoining,
                        dateOfTermination: data?.dateOfTermination
                    }
                },
                {
                    onSuccess() {
                        setActiveStep(4);
                    },
                    onError(err: any) {
                        mutationErrorHandler(err, 'user_signupStaff');

                        setIsLoading(false);
                    }
                }
            );
        } else if (activeStep <= 2) {
            setActiveStep((prevState) => (prevState + 1) as any);
        } else {
            router.push('/signin');
        }
    }
    const handleback = () => {
        setActiveStep(0);
    };
    const handelsignup = () => {
        router.push('/signin');
    };
    return (
        <form onSubmit={formik.handleSubmit}>
            {activeStep === 0 && <StaffSignUpStepOne formik={formik} />}
            {activeStep === 1 && <StaffSignUpStepTwo formik={formik} />}
            {activeStep === 2 && <StaffSignUpStepThree formik={formik} />}
            {activeStep === 3 && <StaffSignUpStepFour formik={formik} />}
            {activeStep === 4 && <StaffSignUpStepFive />}
            {activeStep !== 4 && <CardStepper stepsLength={4} activeStep={activeStep} />}
            <S.BoxButton>
                {activeStep != 0 && activeStep != 4 ? (
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
                    isActive={activeStep === 0 || activeStep > 3 ? true : false}
                    type="submit"
                    variant="contained"
                    disabled={isLoading}>
                    {activeStep < 3 ? 'Next' : 'Done'}
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
        </form>
    );
};

export default StaffSignUp;
