import moment from 'moment';
import storageKeys from 'src/data/storageKeys';

class Utils {
    static convertNumberToPrice(value?: number): string {
        return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    static convertoLowerCase(value?: string): string {
        if (value != undefined) {
            var st = value.toLowerCase();
            var str = st.charAt(0).toUpperCase();
            return str + st.replaceAll('_', ' ').substring(1);
        }
        return '';
    }
    static convertDateTimeToDateView(
        dateTime: string,
        type: 'date' | 'date&time' | 'time' = 'date'
    ): string {
        const date = new Date(dateTime);
        const dateView = `${date.getFullYear()}-${
            date.getMonth().toString().length === 1
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1
        }-${date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate()}`;

        if (type === 'date') {
            return dateView;
        } else if (type === 'date&time') {
            const time = `${
                date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours()
            }:${
                date.getMinutes().toString().length === 1
                    ? `0${date.getMinutes()}`
                    : date.getMinutes()
            }`;

            return `${dateView} - ${time}`;
        } else if (type === 'time') {
            const time = `${
                date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours()
            }:${
                date.getMinutes().toString().length === 1
                    ? `0${date.getMinutes()}`
                    : date.getMinutes()
            }`;

            return time;
        }
    }

    static convertDateTimeToInputDateValue(dateTime: string = new Date().toString()): string {
        const date = new Date(dateTime),
            year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate();

        const customYear = year,
            customMonth = month.toString().length === 1 ? `0${month + 1}` : month + 1,
            customDay = day.toString().length === 1 ? `0${day}` : day;

        return `${customYear}-${customMonth}-${customDay === '00' ? '01' : customDay}`;
    }

    static convertInputDateValueToDateTime(inputDateValue: string, time: string = ''): any {
        return new Date(`${inputDateValue} ${time}`);
    }

    static convertQueryDataToArray(
        data: any,
        isFetching: boolean,
        type: string,
        option: string = 'name',
        value: string = 'id'
    ): ArrayOptionLoading {
        if (isFetching) return 'loading';
        if (!Array.isArray(data)) return [];

        /*if (localStorage.getItem(storageKeys.usertype) === 'ComplexManager' && type === 'complex') {
            var js = [];
            data.map((item) => {
                if (type === 'complex')
                    if (item.id === Number(localStorage.getItem(storageKeys.activecomplexId)))
                        js.push({ option: item.name, value: item.id });
            });
            return js;
        }
        if (
            localStorage.getItem(storageKeys.usertype) !== 'BlockManager' ||
            (type != 'complex' && type != 'block')
        )*/
        return data.map((item) => ({
            option: item[option],
            value: item[value]
        }));
        /* else {
            var js = [];
            data.map((item) => {
                if (type === 'complex')
                    if (item.id === Number(localStorage.getItem(storageKeys.activecomplexId)))
                        js.push({ option: item.name, value: item.id });
                if (type === 'block')
                    if (item.id === Number(localStorage.getItem(storageKeys.activeblockId)))
                        js.push({ option: item.name, value: item.id });
            });
            return js;
        }*/
    }

    static convertTimeToTimeSpan(time: string): string {
        if (time != '' && time != undefined && time.length > 0) {
            const [hours, minutes] = time.split(':');
            return `PT${hours}H${minutes}M`;
        } else return null;
    }

    static uppercaseFirstLetterOfText(text: string): string {
        return text
            .toLowerCase()
            .split('')
            .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
            .join('');
    }

    static convertTimeSpanToTime(timeSpan: string): string {
        // Example
        // PT22H10M -> 22:10
        // PT22H -> 22:00
        //PT52M -> 00:52
        if (timeSpan != null && timeSpan != undefined) {
            const hours = timeSpan.split('H');
            if (hours.length == 1) {
                return '00:' + timeSpan.replace('PT', '').replace('M', '');
            } else {
                const customTimeSpan = timeSpan
                    .replace('PT', '')
                    .replace('M', '')
                    .split('H')
                    .filter((i) => i !== '');

                if (!timeSpan.length) return '';

                if (customTimeSpan.length === 1) {
                    customTimeSpan.push('00');
                }

                return customTimeSpan
                    .map((item) => (item.length === 1 ? `0${item}` : item))
                    .join(':');
            }
        } else return '';
    }

    static convert24HourTo12HourTimeSyntax(time: string): string {
        return moment(time, ['HH:mm']).format('LT');
    }
}

export default Utils;
