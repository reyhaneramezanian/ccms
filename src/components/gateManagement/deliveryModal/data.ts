import { RowTable } from '@/components/table/table_layout/types.table.layout';
import Utils from '@/utils/utils';
import snackbarMessages from 'src/data/snackbarMessages';
import { GateApprovalType, PackageLeavingLocation, UserType } from 'src/graphql/generated';
import * as Yup from 'yup';
import moment from 'moment';

export const deliveryModalFormValidation = (userType: UserType) => {
    let obj = {
        date: Yup.string().required(snackbarMessages.requiredField),
        // fromTime: Yup.string().required(snackbarMessages.requiredField),
        toTime: Yup.string().when('fromTime', {
            is: (fromTime) => fromTime !== undefined,
            then: Yup.string().test('is-greater', 'End time should be greater', function (value) {
                const { fromTime } = this.parent;
                return moment(value, 'HH:mm').isSameOrAfter(moment(fromTime, 'HH:mm'));
            })
        }),
        companyName: Yup.string().required(snackbarMessages.requiredField),
        packageLeavingLocation: Yup.string().required(snackbarMessages.requiredField)
    };

    if (userType === UserType.Security) {
        obj = Object.assign(obj, {
            //  complexId: Yup.number().required(snackbarMessages.requiredField),
            blockId: Yup.number().required(snackbarMessages.requiredField),
            floorId: Yup.number().required(snackbarMessages.requiredField),
            flatId: Yup.number().required(snackbarMessages.requiredField)
        });
    }

    return Yup.object(obj);
};
