import { ProviderSubscribePlanType, SubscribePlanType } from 'src/@types/setting';
// import { DENTIST_GET_DENTIST_DETAILS } from "src/graphql/dentist/detail.gql";
// import { DOCTOR_GET_DOCTOR_DETAILS } from "src/graphql/doctor/gql";
// import { HOSPITAL_GET_HOSPITAL_DETAILS } from "src/graphql/hospital/gql";
// import { LABRATORY_GET_LABRATORY_DETAILS } from "src/graphql/laboratory/gql";
// import { MBC_GET_MEDICAL_BEAUTY_CENTER_DETAILS } from "src/graphql/mbc/details.gql";
// import { NUTRITION_EXPERT_GET_DOCTOR_DETAILS } from "src/graphql/nutrition_expert/details.gql";
// import { PHARMACY_GET_PHARMACY_DETAILS } from "src/graphql/pharmacy/details.gql";
// import { VETERINARIAN_GET_DOCTOR_DETAILS } from "src/graphql/veterinarian/details.gql";

export function camelize(string: string): string {
    if (!string) return '';

    return string
        .toString()
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, '');
}

export function capitalize(string: string): string {
    if (!string) return '';

    string = string.toString();

    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getprovider(item) {
    const providerName = item?.providerName?.toLowerCase?.();
    const provider = item?.[camelize(providerName)];

    return provider?.constructor instanceof Object ? { ...provider, providerName } : {};
}

export function capitalizeProvider(providerName: string): string {
    if (!providerName) return '';

    return providerName.toLowerCase().split('_').map(capitalize).join(' ');
}

export const filterSubscriptionPlan = ({
    subscribePlans,
    planType
}: {
    subscribePlans?: Array<ProviderSubscribePlanType>;
    planType: string;
}) => {
    try {
        if (planType == 'FIX_PRICE')
            return subscribePlans.filter(
                (item) =>
                    item.subscribePlan.plan == planType || item.subscribePlan.plan == 'EACH_PATIENT'
            );
        return subscribePlans.filter((item) => item.subscribePlan.plan == planType);
    } catch {
        return [];
    }
};

export const extractSubscriptionPLan = (plan: string) => {
    try {
        return capitalizeProvider(plan);
    } catch {
        return '';
    }
};
export const extractPlanAndPrice = (subscribePlan: SubscribePlanType) => {
    try {
        return `${subscribePlan.mounth} month, ${subscribePlan.value} dinar`;
    } catch {
        return '';
    }
};

export const getInvalidateQuery = (route: string) => {
    // if(route.includes('dentists')) return DENTIST_GET_DENTIST_DETAILS
    // if(route.includes('doctors')) return DOCTOR_GET_DOCTOR_DETAILS
    // if(route.includes('hospitals')) return HOSPITAL_GET_HOSPITAL_DETAILS
    // if(route.includes('laboratory')) return LABRATORY_GET_LABRATORY_DETAILS
    // if(route.includes('medical-beauty-centers')) return MBC_GET_MEDICAL_BEAUTY_CENTER_DETAILS
    // if(route.includes('nutrition-expert')) return NUTRITION_EXPERT_GET_DOCTOR_DETAILS
    // if(route.includes('pharmacy')) return PHARMACY_GET_PHARMACY_DETAILS
    // if(route.includes('veterinarian')) return VETERINARIAN_GET_DOCTOR_DETAILS
};
