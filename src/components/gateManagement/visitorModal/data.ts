import { RowTable } from '@/components/table/table_layout/types.table.layout';
import Utils from '@/utils/utils';
import snackbarMessages from 'src/data/snackbarMessages';
import { GateApprovalType, UserType } from 'src/graphql/generated';
import * as Yup from 'yup';
import moment from 'moment';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';

export const visitorModalValidationForm = (
    userType: UserType,
    approvalType: GateApprovalType.FrequentVisitor | GateApprovalType.OneTimeVisitor
) => {
    let obj = {
        visitorFirstName: Yup.string().required(snackbarMessages.requiredField),
        visitorLastName: Yup.string().required(snackbarMessages.requiredField),
        visitorPhoneNumber: Yup.string()
            .required('This field is required')
            .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
        licensePlate: Yup.string(),
        gateApprovalType: Yup.string().required(snackbarMessages.requiredField)
    };

    if (userType === UserType.Security) {
        obj = Object.assign(obj, {
            //  complexId: Yup.number().required(snackbarMessages.requiredField),
            blockId: Yup.number().required(snackbarMessages.requiredField),
            floorId: Yup.number().required(snackbarMessages.requiredField),
            flatId: Yup.number().required(snackbarMessages.requiredField)
        });
    }

    if (approvalType === GateApprovalType.FrequentVisitor) {
        obj = Object.assign(obj, {
            startDate: Yup.string().required(snackbarMessages.requiredField),
            endDate: Yup.date()
                .when(
                    'startDate',
                    (startDate, Yup) =>
                        startDate && Yup.min(startDate, 'End time cannot be before start time')
                )
                .required('This field is required')
        });
    }

    if (approvalType === GateApprovalType.OneTimeVisitor) {
        obj = Object.assign(obj, {
            dateOfVisit: Yup.string().required(snackbarMessages.requiredField),
            //startTime: Yup.string().required(snackbarMessages.requiredField),
            endTime: Yup.string().when('StartTime', {
                is: (StartTime) => StartTime !== undefined,
                then: Yup.string().test(
                    'is-greater',
                    'End time should be greater',
                    function (value) {
                        const { StartTime } = this.parent;
                        return moment(value, 'HH:mm').isSameOrAfter(moment(StartTime, 'HH:mm'));
                    }
                )
            })
        });
    }

    return Yup.object(obj);
};
