import ResidentSignUpStepOne from './stepOne';
import { useEffect, useRef, useState } from 'react';
import CardStepper from '@/components/base/cardStepper';
import * as S from '../style.auth';
import ResidentSignUpStepTwo from './stepTwo';
import ResidentSignUpStepThree from './stepThree';
import { residentSignupInitialForm, residentSignupValidationSchema } from './data';
import { useResidentSignupMutation, UserType, ActiveStatus } from 'src/graphql/generated';
import { useRouter } from 'next/router';
import getRoleText from 'src/data/roleText';
import ResidentSignUpStepFour from './stepFour';
import useUserFloorLocation from 'src/hooks/useUserFloorLocationowner';
import ResidentSignUpStepFive from './stepFive';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const ResidentSignUp = () => {
    const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { blocks, complexes, flats, floors, formik } = useUserFloorLocation({
        initialValues: residentSignupInitialForm(),
        onSubmit,
        enableReinitialize: true,
        validationSchema: residentSignupValidationSchema(activeStep)
    });
    const residentSignupMutation = useResidentSignupMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const router = useRouter();

    useEffect(() => {
        setIsLoading(false);
    }, [activeStep]);

    async function onSubmit(data) {
        if (activeStep === 2) {
            setIsLoading(true);

            await residentSignupMutation.mutateAsync(
                {
                    residentFlatInput: {
                        flatId: data.flatId,
                        ownershipStatus: data.ownershipStatus,
                        activeStatus: ActiveStatus.Active
                    },
                    input: {
                        activeStatus: ActiveStatus.Active,
                        firstName: data.firstName.trim(),
                        lastName: data.lastName.trim(),
                        gender: data.gender,
                        dateOfBirth: data.dateOfBirth,
                        phoneNumber: data.phoneNumber.trim(),
                        email: data.email.trim(),
                        alternativeContact: data.alternativeContact.trim(),
                        middleName: data.middleName.trim()
                    }
                },
                {
                    onSuccess() {
                        setActiveStep(3);
                    },
                    onError(err: any) {
                        mutationErrorHandler(err, 'user_signupResident');

                        setIsLoading(false);
                    }
                }
            );
        } else if (activeStep <= 1) {
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
            {activeStep === 0 && (
                <ResidentSignUpStepOne
                    complexes={complexes}
                    blocks={blocks}
                    floors={floors}
                    flats={flats}
                    formik={formik}
                />
            )}
            {activeStep === 1 && <ResidentSignUpStepThree formik={formik} />}
            {activeStep === 2 && <ResidentSignUpStepFour formik={formik} />}
            {/*activeStep === 3 && <ResidentSignUpStepFour formik={formik} />*/}
            {activeStep === 3 && <ResidentSignUpStepFive />}

            {activeStep !== 3 && <CardStepper stepsLength={3} activeStep={activeStep} />}

            <S.BoxButton>
                {activeStep != 0 && activeStep != 3 ? (
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
                    isActive={activeStep === 0 || activeStep > 2 ? true : false}
                    type="submit"
                    variant="contained"
                    disabled={isLoading}>
                    {activeStep < 2 ? 'Next' : 'Done'}
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

export default ResidentSignUp;
