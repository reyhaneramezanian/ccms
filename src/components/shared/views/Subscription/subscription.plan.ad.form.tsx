import { Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { useAddPlan } from 'src/graphql/provider/subscriptionPlan/useAddPlan';

import { FormSectionSubscribePlan, FormSectionSubscribePlanAccountSubscription, FormSectionSubscribePlanAd } from '../../formInputs/section.form.subscribePlan';
import { FormSectionOuterWrapper } from '../../formInputs/styled.form';
import { formatSubscription } from '../../formInputs/utilities/initForm/subscription';
import { ButtonContainer, CustomButtomFormSubmit } from './styled';


const FormWrapper = FormSectionOuterWrapper.withComponent(Form);

function SubscriptionPlanAdForm({ providerId, invalidateQuery, expiredPlan }: { providerId: number, invalidateQuery: string, expiredPlan: boolean }) {
    const { mutate: addPlan, isLoading } = useAddPlan(invalidateQuery)
    const submit = (values: any) => {
        addPlan(values)
    }
    const values = {
        subscribePlan: {
            adPlan: ''
        }
    }
    return <Formik
        onSubmit={(values) => {
            const data = {
                providerId: providerId,
                planId: values.subscribePlan?.adPlan
            }
            submit(data);
        }}
        initialValues={values}>
        <FormWrapper>
            <Grid container spacing={2}>
                <Grid item sm={12} md={9}>
                    <FormSectionSubscribePlanAd />
                </Grid>
                <Grid item sm={12} md={3}>
                    <ButtonContainer>
                        <CustomButtomFormSubmit
                            disabled={!expiredPlan}
                            text='Add'
                            loading={isLoading}
                        />
                    </ButtonContainer>
                </Grid>
            </Grid>
        </FormWrapper>
    </Formik>;
}

export default SubscriptionPlanAdForm;
