import Utils from '@/utils/utils';
import * as Yup from 'yup';

export const paymentsInitialForm = (row: any): any => {
    return {
        id: row?.id,
        complexId: row?.complexId,
        blockId: row?.blockId,
        floorId: row?.floorId,
        flatId: row?.flatId,
        amount: row?.amount,
        utilityType: row?.utilityType,
        maintenanceTypeId: row?.maintenanceTypeId,
        dueDate: Utils.convertDateTimeToInputDateValue(row?.dueDate),
        comment: row?.comment || ''
    };
};

export const paymentsFilterInitialForm = (row?: any): any => {
    return {
        complexId: row?.complexId || undefined,
        blockId: row?.blockId || undefined,
        floorId: row?.floorId || undefined,
        flatId: row?.flatId || undefined,
        utilityTypeId: row?.utilityTypeId || undefined,
        createdDate: row?.createDate || undefined,
        dueDate: row?.dueDate || undefined,
        paymentStatus: row?.paymentStatus || undefined
    };
};

export const paymentsValidationForm = Yup.object({
    complexId: Yup.string().required('This field is required'),
    // blockId: Yup.string(),
    //floorId: Yup.string(),
    //flatId: Yup.string(),
    amount: Yup.number().required('This field is required').min(0, 'Min is 0'),
    maintenanceTypeId: Yup.string().required('This field is required'),
    dueDate: Yup.string().required('This field is required')
});

export const ValidationForm = Yup.object({
    dueDate: Yup.date()
        .when(
            'createdDate',
            (createdDate, Yup) =>
                createdDate && Yup.min(createdDate, 'To date cannot be before from date')
        )
        .when(
            'createdDate',
            (createdDate, Yup) => createdDate && Yup.required('This field is required')
        )
});
