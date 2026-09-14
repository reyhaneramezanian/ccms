import { Form, Formik } from 'formik';
import React from 'react';
import { FormSectionSubscribePlanAccountSubscription } from '../../formInputs/section.form.subscribePlan';
import { FormSectionOuterWrapper } from '../../formInputs/styled.form';
import { Grid } from '@material-ui/core';
import {
    formatSubscription,
} from 'src/components/shared/formInputs/utilities/initForm/subscription';
import { ButtonContainer, CustomButtomFormSubmit } from './styled';
import { useAddPlan } from 'src/graphql/provider/subscriptionPlan/useAddPlan';


const FormWrapper = FormSectionOuterWrapper.withComponent(Form);

function SubscriptionPlanAccountSubscriptionForm({
    providerId,
    invalidateQuery,
    expiredPlan }: {
        providerId: number,
        invalidateQuery: string,
        expiredPlan: boolean
    }) {
    const { mutate: addPlan, isLoading } = useAddPlan(invalidateQuery)
    const submit = (values: any) => {
        addPlan(values)
    }
    const values = {
        subscribePlan: 'vipPlan',
    }
    return <Formik
        onSubmit={(values) => {
            const data = {
                providerId: providerId,
                planId: formatSubscription(values.subscribePlan)[0].subscribePlanId
            }
            submit(data);
        }}
        initialValues={values}>
        <FormWrapper>
            <Grid container spacing={2}>
                <Grid item sm={12} md={9}>
                    <FormSectionSubscribePlanAccountSubscription />
                </Grid>
                <Grid item sm={12} md={3}>
                    <ButtonContainer>
                        <CustomButtomFormSubmit
                            disabled={!expiredPlan}
                            plan={true}
                            text='Add'
                            loading={isLoading}
                        />
                    </ButtonContainer>
                </Grid>
            </Grid>
        </FormWrapper>
    </Formik>;
}

export default SubscriptionPlanAccountSubscriptionForm;
