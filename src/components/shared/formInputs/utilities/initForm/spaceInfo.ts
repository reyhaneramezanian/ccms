import dayjs from 'dayjs';
import { HospitalBaseInput_Input } from 'src/@types/hospital.type';
import * as C from '../input.constant';

const INIT_VALUE = {
    [C.N_INFO.about]: '',
    [C.N_INFO.email]: '',
    [C.N_INFO.fax]: '',
    [C.N_INFO.photoUrl]: undefined,
    [C.N_INFO.telNumber]: '',
    [C.N_INFO.title]: '',
    [C.N_INFO.userName]: '',
    [C.N_INFO.isActive]: true,
    [C.N_INFO.isOpen]: false,
    [C.N_INFO.createAt]: dayjs().toISOString()
};
export function initSpaceInfo(initValues?: HospitalBaseInput_Input, id?: number) {
    if (initValues) {
        return {
            [C.N_INFO.id]: id,
            [C.N_INFO.about]: initValues?.about,
            [C.N_INFO.email]: initValues?.email,
            [C.N_INFO.fax]: initValues?.fax,
            [C.N_INFO.photoUrl]: initValues?.photoUrl,
            [C.N_INFO.telNumber]: initValues?.telNumber,
            [C.N_INFO.title]: initValues?.title,
            [C.N_INFO.userName]: initValues?.userName,
            [C.N_INFO.isOpen]: initValues?.isOpen ?? true,
            [C.N_INFO.isActive]: true
        } as any;
    }
    return INIT_VALUE;
}

export function formatSpaceInfo(values: typeof INIT_VALUE, isEdit=true) {
    const spaceInfo = JSON.parse(JSON.stringify(values));
   
    delete spaceInfo['id'];
    if (!isEdit) {
        delete spaceInfo['createAt'];
        spaceInfo['createAt'] = dayjs().toISOString();
    }
    
    return spaceInfo;
}
