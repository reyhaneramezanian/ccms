import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export function useDoctorSharedFunc(push, values) {
    const { enqueueSnackbar } = useSnackbar();
    function checkOnAdd(values: Array<{ id: number }>, id: number) {
        const exists = values.some((v) => v.id === id);
        if (!id || id === -1) {
            enqueueSnackbar('Select a value first!', { variant: 'warning' });
            return false;
        }
        if (exists) {
            enqueueSnackbar('Duplicated Doctor!', { variant: 'warning' });
            return false;
        }
        return true;
    }

    const onAdd = useCallback(
        (id: number, spec: string, option: string) => {
            const valid = checkOnAdd(values, id);
            if (!valid) {
                return;
            }
            if (!id || !spec || !option) {
                return;
            }
            push({
                id,
                title: `${spec}, ${option} `
            });
        },
        [values, checkOnAdd]
    );

    return {
        onAdd
    };
}
