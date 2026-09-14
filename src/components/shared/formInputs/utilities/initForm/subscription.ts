import { DoctorInput_Input } from 'src/@types/doctor.type';
import { ProviderSubscribePlanType, SubscribePlanType } from 'src/@types/setting';
import { ProviderSubscribePlanInput_InputType } from 'src/@types/subscribe.type';
import * as C from '../input.constant';

const INITIAL_VALUES = {
    [C.N_SUBSCRIBE_PLAN.patient]: -1,
    [C.N_SUBSCRIBE_PLAN.fixed]: -1,
    [C.N_SUBSCRIBE_PLAN.adPlan]: -1,
    [C.N_SUBSCRIBE_PLAN.vipPlan]: -1,
    [C.N_SUBSCRIBE_PLAN.vipCheck]: false,
    [C.N_SUBSCRIBE_PLAN.adCheck]: false,
    [C.N_SUBSCRIBE_PLAN.plan]: C.SUBSCRIBE_VALUE_RADIO.fixed
};
export function initSubscription(initValues?: Array<ProviderSubscribePlanType>) {
    if (initValues) {
        
        return initValues?.reduce((acc, cur) => {
            return cur.subscribePlan
                ? {
                      ...acc,
                      ...(cur.subscribePlan.plan === 'AD' && {
                          [C.N_SUBSCRIBE_PLAN.adPlan]: cur.subscribePlan.id,
                          [C.N_SUBSCRIBE_PLAN.adCheck]: true
                      }),
                      ...(cur.subscribePlan.plan === 'VIP' && {
                          [C.N_SUBSCRIBE_PLAN.vipPlan]: cur.subscribePlan.id,
                          [C.N_SUBSCRIBE_PLAN.vipCheck]: true
                      }),
                      ...(cur.subscribePlan.plan === 'EACH_PATIENT' && {
                          [C.N_SUBSCRIBE_PLAN.plan]: C.SUBSCRIBE_VALUE_RADIO.patient,
                          [C.N_SUBSCRIBE_PLAN.patient]: +cur.subscribePlan.id
                      }),
                      ...(cur.subscribePlan.plan === 'FIX_PRICE' && {
                          [C.N_SUBSCRIBE_PLAN.plan]: C.SUBSCRIBE_VALUE_RADIO.fixed,
                          [C.N_SUBSCRIBE_PLAN.fixed]: +cur.subscribePlan.id
                      })
                  }
                : acc;
        }, INITIAL_VALUES);
    }
    return INITIAL_VALUES;
}


export function initSubscriptionRefactored(initValues?: Array<ProviderSubscribePlanType>) {
    if (initValues) {
        return initValues?.reduce((acc, cur) => {
            return cur.subscribePlan
                ? {
                      ...acc,
                      ...(cur.subscribePlan.plan === 'AD' && {
                          [C.N_SUBSCRIBE_PLAN.adPlan]: cur.subscribePlan.id,
                          [C.N_SUBSCRIBE_PLAN.adCheck]: true
                      }),
                      ...(cur.subscribePlan.plan === 'VIP' && {
                          [C.N_SUBSCRIBE_PLAN.vipPlan]: cur.subscribePlan.id,
                          [C.N_SUBSCRIBE_PLAN.vipCheck]: true
                      }),
                      ...(cur.subscribePlan.plan === 'EACH_PATIENT' && {
                          [C.N_SUBSCRIBE_PLAN.plan]: C.SUBSCRIBE_VALUE_RADIO.patient,
                          [C.N_SUBSCRIBE_PLAN.patient]: +cur.subscribePlan.id
                      }),
                      ...(cur.subscribePlan.plan === 'FIX_PRICE' && {
                          [C.N_SUBSCRIBE_PLAN.plan]: C.SUBSCRIBE_VALUE_RADIO.fixed,
                          [C.N_SUBSCRIBE_PLAN.fixed]: +cur.subscribePlan.id
                      })
                  }
                : acc;
        }, INITIAL_VALUES);
    }
    return INITIAL_VALUES;
}

export function formatSubscription(v: typeof INITIAL_VALUES | any): DoctorInput_Input['subscribePlan'] {
    const plans: Array<ProviderSubscribePlanInput_InputType> = [];
    if (v.adCheck) {
        plans.push({ subscribePlanId: +v.adPlan });
    }
    if (v.vipCheck) {
        plans.push({ subscribePlanId: +v.vipPlan });
    }
    if (v.plan === C.SUBSCRIBE_VALUE_RADIO.fixed) {
        plans.push({ subscribePlanId: +v.fixed });
    } else if (v.plan === C.SUBSCRIBE_VALUE_RADIO.patient) {
        plans.push({ subscribePlanId: +v.patient });
    }
    return plans.filter(({ subscribePlanId }) => subscribePlanId !== -1);
}
