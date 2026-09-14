import * as Yup from 'yup';
import SuperPersonalInformation from './personal';
import ProfileSetting from './setting';
import { ICustomPageTabsProps } from '@/components/admin/types.admin';

export const adminProfileValidationForm = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    phoneNumber: Yup.string(),
    email: Yup.string().required('This field is required'),
    gender: Yup.string().required('This field is required')
});

enum EProfileTabItemsId {
    personalInformation = 'personal-information',
    setting = 'setting'
}
export const SecurityProfileTabItems: ICustomPageTabsProps[] = [
    {
        id: EProfileTabItemsId.personalInformation,
        label: 'Personal information'
    },
    {
        id: EProfileTabItemsId.setting,
        label: 'Setting'
    }
];

export const SuperProfilePagesComponent = {
    [EProfileTabItemsId.personalInformation]: SuperPersonalInformation,
    [EProfileTabItemsId.setting]: ProfileSetting
};
