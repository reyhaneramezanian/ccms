import { WorkspaceInputPrefixType } from '../input.constant';
import { useMemo } from 'react';
import { N_WORKINGHOUR } from '../input.constant';
import { DOCTOR_INITIAL_VALUES } from '@/components/doctors/ui.useDoctor';
import { DoctorInput_Input } from 'src/@types/doctor.type';

export function findClinicName(values?: typeof DOCTOR_INITIAL_VALUES['workingTimes']) {
    return values?.CLINIC[0]?.clinicName || '';
}

export function generateWorkspaceInputName(prefix: WorkspaceInputPrefixType) {
    return `${N_WORKINGHOUR.prefix}.${prefix}`;
}

export function usePrefix(prefix: string, N: any) {
    return useMemo(() => {
        return prefix || N.prefix;
    }, [prefix, N]);
}
