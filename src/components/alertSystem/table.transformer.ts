import convertAddressToTextView from '@/utils/convertAddressToTextView';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
import { AlertsSystemGetQuery } from 'src/graphql/generated';

class AlertSystemTransformer extends Transformer<AlertsSystemGetQuery> {
    transforms(transfers: AlertsSystemGetQuery) {
        return transfers.alert_getAlerts.result.items.map((item) => {
            return {
                alertType: Utils.convertoLowerCase(item.alertType),
                from:
                    item?.complex?.name != undefined
                        ? item?.complex?.name
                        : item?.block?.name != undefined
                        ? item?.block?.complex?.name + ',' + item?.block?.name
                        : item?.floor?.name != undefined
                        ? item?.floor?.block?.complex?.name +
                          ',' +
                          item?.floor?.block?.name +
                          ',' +
                          item?.floor?.name
                        : item?.flat?.floor?.block?.complex?.name +
                          ',' +
                          item?.flat?.floor?.block?.name +
                          ',' +
                          item?.flat?.floor?.name +
                          ',' +
                          item?.flat?.name,

                phoneNumber:
                    item?.resident?.phoneNumber ||
                    item?.staff?.phoneNumber ||
                    item?.security?.phoneNumber,
                date: item.date.slice(0, 10).replaceAll('-', '/'),
                dateend: item.date.slice(0, 10),
                description: item.description || '-----',
                flat: item?.flat?.name,
                floor: item?.flat?.floor?.name
            };
        });
    }
}

export default new AlertSystemTransformer();
