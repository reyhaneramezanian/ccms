import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
    initialTimeSheetDaysOfWeekData,
    initialTimeSheetDaysOfWeekItemsData,
    timeSheetValidationForm
} from './data';
import { ITimeSheetDaysOfWeek, ITimeSheetDaysOfWeekItem } from './timeSheet.type';
import * as S from './timeSheet.style';
import COLORS from '@/utils/theme/colors';
import { MInput } from '../base/input/MInput';
import SPACING from '@/utils/theme/spacing';
import Utils from '@/utils/utils';
import { useFormik } from 'formik';
import { DayOfWeekType } from 'src/@types/util.type';
import { useTimeSheetGetQuery, useTimeSheetUpdateMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { useSnackbar } from 'notistack';
import snackbarMessages from 'src/data/snackbarMessages';
import defaultQueryOptions from 'src/data/queryOptions';
import { useRouter } from 'next/router';
const TimeSheet = () => {
    const router = useRouter();
    const [daysOfWeek, setDaysOfWeek] = useState<ITimeSheetDaysOfWeek[]>(
        initialTimeSheetDaysOfWeekData()
    );
    const [isSetDaysOfWeek, setIsSetDaysOfWeek] = useState(false);
    const timeSheetGetQuery = useTimeSheetGetQuery(undefined, defaultQueryOptions);
    const timeSheetItemsQuery = timeSheetGetQuery?.data?.timeSheet_getTimeSheets?.result?.items;

    const formik = useFormik({
        validationSchema: timeSheetValidationForm(),
        onSubmit,
        initialValues: initialTimeSheetDaysOfWeekItemsData(timeSheetItemsQuery),
        enableReinitialize: true
    });
    const timeSheetUpdateMutation = useTimeSheetUpdateMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!Array.isArray(timeSheetItemsQuery) || !timeSheetItemsQuery.length || isSetDaysOfWeek) {
            return;
        }

        setIsSetDaysOfWeek(true);

        handleSetDaysOfWeek();

        // eslint-disable-next-line
    }, [timeSheetItemsQuery, isSetDaysOfWeek]);

    function handleSetDaysOfWeek() {
        setDaysOfWeek((prevState) => [
            ...prevState.map((item) => {
                const findDaysOfWeekInQuery = timeSheetItemsQuery.find(
                    (i) => i.dayOfWeek === item.dayOfWeek
                );
                item.enable = typeof findDaysOfWeekInQuery !== 'undefined';

                return item;
            })
        ]);
    }

    const handleAddNewDayOfWeekItem = (dayOfWeek: DayOfWeekType) => {
        const newItem: ITimeSheetDaysOfWeekItem = {
            dayOfWeek: dayOfWeek,
            from: '',
            to: ''
        };

        formik.setValues([...formik.values, newItem]);
    };

    const handleRemoveDayOfWeekItem = (dayOfWeek: DayOfWeekType) => {
        formik.setValues([
            ...formik.values.filter((i) => i.dayOfWeek !== dayOfWeek),
            formik.values.filter((i) => i.dayOfWeek === dayOfWeek)[0]
        ]);
    };

    const handleChangeEnableStatusDaysOfWeek = (index: number) => {
        const findIndexItem = daysOfWeek.findIndex((_, i) => i === index);

        if (findIndexItem === -1) return;

        const findIndexInFormik = formik.values.findIndex(
            (item) => item.dayOfWeek === daysOfWeek[findIndexItem].dayOfWeek
        );

        if (daysOfWeek.filter((i) => i.enable).length <= 1 && daysOfWeek[findIndexItem].enable) {
            return;
        }

        if (findIndexInFormik === -1 && !daysOfWeek[findIndexItem].enable) {
            handleAddNewDayOfWeekItem(daysOfWeek[findIndexItem].dayOfWeek);
        } else if (findIndexInFormik !== -1 && daysOfWeek[findIndexItem].enable) {
            formik.values.forEach((item, i) => {
                if (item.dayOfWeek !== daysOfWeek[findIndexItem].dayOfWeek) return;

                formik.setValues(formik.values.filter((_, ii) => ii !== i));
            });
        }

        setDaysOfWeek((prevState) => {
            prevState[findIndexItem].enable = !prevState[findIndexItem].enable;

            return [...prevState];
        });
    };

    function onSubmit(data) {
        var js = [],
            sw = 0,
            sww = 0;
        data.forEach((item) => {
            js.forEach((items) => {
                if (items.dayOfWeek === item.dayOfWeek) {
                    sww = 1;
                    if (
                        (item.from < items.to && item.from > items.from) ||
                        (item.to > items.from && item.to < items.to)
                    )
                        sw = 1;
                }
            });
            if (sww === 0) js.push(item);
        });
        if (sw === 0)
            timeSheetUpdateMutation.mutate(
                {
                    input: data.map((item) => ({
                        dayOfWeek: item.dayOfWeek,
                        from: Utils.convertTimeToTimeSpan(item.from),
                        to: Utils.convertTimeToTimeSpan(item.to)
                    }))
                },
                {
                    onError(error) {
                        mutationErrorHandler(error, 'timeSheet_update');
                    },
                    onSuccess() {
                        enqueueSnackbar('Operation was successful!', {
                            variant: 'success'
                        });
                        router.reload();
                        //* TODO time sheet update :)
                    }
                }
            );
        else
            enqueueSnackbar('error', {
                variant: 'error'
            });
    }

    const handleReset = () => {
        formik.resetForm();
        handleSetDaysOfWeek();
    };

    if (timeSheetGetQuery.isLoading) return null;
    return (
        <Box>
            <S.DaysOfWeekWrapper>
                {daysOfWeek.map((item, index) => (
                    <S.DaysOfWeekItem
                        isActive={item.enable}
                        key={index}
                        onClick={() => {
                            handleChangeEnableStatusDaysOfWeek(index);
                        }}>
                        <Typography
                            variant="body2"
                            color={item.enable ? COLORS.white : COLORS.black1}>
                            {item.dayOfWeek.slice(0, 3).toUpperCase()}
                        </Typography>
                    </S.DaysOfWeekItem>
                ))}
            </S.DaysOfWeekWrapper>

            <form onSubmit={formik.handleSubmit}>
                <Grid container>
                    {daysOfWeek.map((dayOfWeek, dayOfWeekIndex) => {
                        if (!dayOfWeek.enable) return null;

                        const dayOfWeekItems = formik.values.filter(
                            (i) => i.dayOfWeek === dayOfWeek.dayOfWeek
                        );

                        return (
                            <Grid xs={12} lg={6} key={dayOfWeekIndex}>
                                {dayOfWeekItems.map((item, indexItem) => {
                                    console.log(
                                        formik.values
                                            .map((i, index) => ({ ...i, index }))
                                            .filter((i) => i.dayOfWeek === item.dayOfWeek)
                                    );
                                    const index = formik.values
                                        .map((i, index) => ({ ...i, index }))
                                        .filter((i) => i.dayOfWeek === item.dayOfWeek)[
                                        indexItem
                                    ]?.index;

                                    return (
                                        <Grid
                                            item
                                            xs={12}
                                            lg={12}
                                            key={indexItem}
                                            marginTop={indexItem === 0 && '20px'}>
                                            <Grid container columnSpacing={{ lg: SPACING[10] }}>
                                                <Grid item xs={12} lg={6}>
                                                    <S.boxinput>
                                                        <S.label>From</S.label>
                                                        <S.inputtimeshit
                                                            style={{
                                                                marginTop: `${
                                                                    indexItem == 0 ? '2px' : '22px'
                                                                }`
                                                            }}>
                                                            <MInput
                                                                timeshit={true}
                                                                type="time"
                                                                name={`${index}.from`}
                                                                label={
                                                                    indexItem === 0
                                                                        ? `Choose time for ${Utils.uppercaseFirstLetterOfText(
                                                                              item.dayOfWeek
                                                                          )}`
                                                                        : undefined
                                                                }
                                                                value={formik.values?.[index]?.from}
                                                                meta={formik.getFieldMeta(
                                                                    `${index}.from`
                                                                )}
                                                                onChange={formik.handleChange}
                                                            />
                                                        </S.inputtimeshit>
                                                    </S.boxinput>
                                                </Grid>

                                                <Grid item xs={12} lg={6}>
                                                    <S.boxinput>
                                                        <S.label>To</S.label>
                                                        <S.inputtimeshit
                                                            style={{
                                                                marginTop: `${
                                                                    indexItem == 0 ? '' : '22px'
                                                                }`
                                                            }}>
                                                            <MInput
                                                                type="time"
                                                                name={`${index}.to`}
                                                                showEmptyLabelBox={indexItem === 0}
                                                                value={formik.values?.[index]?.to}
                                                                meta={formik.getFieldMeta(
                                                                    `${index}.to`
                                                                )}
                                                                onChange={formik.handleChange}
                                                                timeshit={true}
                                                            />
                                                        </S.inputtimeshit>
                                                    </S.boxinput>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    );
                                })}

                                <Box>
                                    {dayOfWeekItems.length <= 1 ? (
                                        <Typography
                                            style={{ cursor: 'pointer' }}
                                            //variant="body1"
                                            //component="span"
                                            color={COLORS.info}
                                            onClick={() => {
                                                handleAddNewDayOfWeekItem(dayOfWeek.dayOfWeek);
                                            }}>
                                            + Add another slot
                                        </Typography>
                                    ) : (
                                        <Typography
                                            style={{ cursor: 'pointer' }}
                                            // variant="body1"
                                            //component="span"
                                            color={COLORS.danger}
                                            onClick={() => {
                                                handleRemoveDayOfWeekItem(dayOfWeek.dayOfWeek);
                                            }}>
                                            - Remove slot
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>

                <Box marginTop="20px">
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={timeSheetUpdateMutation.isLoading}>
                        Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default TimeSheet;
