import React, { useMemo, useState, useEffect } from 'react';
import {
    ParentMain,
    WorkDayItem,
    DayContainer,
    ParentImageSliderRow,
    PrentRelativeSession,
    CenterDiv,
    CustomBtnPlus,
    CustomGrid,
    ParentImage,
    UpButton,
    ParentImageSlider,
    AddButtonImg,
    DownButton,
    ParentSwitcher,
    CustomOpacity
} from '../styled.profile';
import {
    Grid,
    useMediaQuery,
    useTheme,
    Typography,
    InputAdornment,
    Box,
    styled,
    Hidden
} from '@mui/material';
import PlusIcon from 'src/assets/icons/plus-icon';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import { MRadioFormik } from '@/components/base/input/m-radio';
import Switcher from '@/components/shared/share/switch';
import { RadioButton } from '@/components/base/input/radio-button';
import ClockIcon from 'src/assets/icons/clock';
import {
    AddButton,
    DeleteButton,
    SelectRoot,
    TimeInputRoot,
    weekDays
} from '@/components/auth/signUp/healer/components/business-info';
import { MSelectFormik } from '@/components/base/input/MSelect';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseItem from 'src/assets/icons/close-item';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MuiButton } from '@/components/base/Button';
import { Spacer } from '@/components/base/spacer';
import { useImageUploader, useUploadInput } from 'src/hooks/useMediaUploader';
import { useSnackbar } from 'notistack';

const StyleShare = {
    display: 'flex',
    flexDirection: 'column' as any,
    width: '65%'
};

const share = {
    color: '#213950',
    fontSize: '18px'
};

const SubmitButton = styled(MuiButton)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: 'white',
    width: 350,
    ':hover': {
        background: theme.palette.primary.main
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}));

let times = ['start_hour', 'end_hour', 'start_min', 'end_min'];

function hasNumber(item) {
    return /\d/.test(item);
}
export function isInteger(item) {
    return /^[0-9]*$/.test(item);
}

const NewSession = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const [record, setRecord] = useState('online');
    const [counter, setCounter] = useState(1);
    const [arr, setArr] = useState([1]);
    const [value, setValue] = React.useState({
        workDays: {}
    });
    const [arrSlider, setArrSlider] = useState([]);
    const [placeholder, setPlaceholder] = useState([]);

    function deleteWorkDay(index, counter) {
        const filters = value.workDays[`counter${counter}`].filter((item, i) => i !== index);
        setValue((prevState) => {
            return {
                workDays: {
                    ...prevState.workDays,
                    [`counter${counter}`]: [...filters]
                }
            };
        });
    }

    const initialValues =
        record === 'online'
            ? {
                  title: '',
                  duration: '',
                  limit: '',
                  type: '',
                  cost: '',
                  link: ''
              }
            : {
                  title: '',
                  duration: '',
                  limit: '',
                  type: '',
                  cost: '',
                  city: '',
                  address: ''
              };

    const validationSchema = Yup.object(
        record === 'online'
            ? {
                  title: Yup.string().required('Title is required!'),
                  duration: Yup.string().required('Duration is required!'),
                  limit: Yup.string().required('Limit Client is required!'),
                  link: Yup.string().required('Link is required!'),
                  type: Yup.string().required('Healing Type is required!'),
                  cost: Yup.string().required('Cost is required!')
              }
            : {
                  title: Yup.string().required('Title is required!'),
                  duration: Yup.string().required('Duration is required!'),
                  limit: Yup.string().required('Limit Client is required!'),
                  address: Yup.string().required('Address is required!'),
                  type: Yup.string().required('Healing Type is required!'),
                  cost: Yup.string().required('Cost is required!'),
                  city: Yup.string().required('City is required!')
              }
    );

    return (
        <ParentMain mobilesize={isSmall ? 'true' : 'false'}>
            <Typography
                sx={{
                    color: '#213950',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    marginBottom: '20px'
                }}>
                Add New Session
            </Typography>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(v) => console.log('v', v)}>
                {({ values }) => {
                    return (
                        <>
                            <Form>
                                <Grid
                                    container
                                    flexDirection={isSmall ? 'column-reverse' : 'row'}
                                    spacing={2}>
                                    <Grid item lg={4} md={6} xs={12}>
                                        <LeftItem />
                                    </Grid>
                                    <Grid item lg={4} md={6} xs={12}>
                                        <MiddleItem />
                                    </Grid>
                                    <Grid item lg={4} md={6} xs={12}>
                                        <RightItem
                                            placeholder={placeholder}
                                            setPlaceholder={setPlaceholder}
                                            arrSlider={arrSlider}
                                            setArrSlider={setArrSlider}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container mt={1}>
                                    <Grid item md={12} xs={12}>
                                        <CenterDiv>
                                            <CustomBtnPlus
                                                mobilesize={isSmall ? 'true' : 'false'}
                                                onClick={() => {
                                                    setCounter(counter + 1),
                                                        setArr((prev) => [...prev, counter + 1]);
                                                }}>
                                                <PlusIcon />
                                            </CustomBtnPlus>
                                        </CenterDiv>
                                        <Typography
                                            sx={{
                                                color: '#213950',
                                                fontSize: '28px',
                                                fontWeight: 'bold',
                                                marginBottom: '20px'
                                            }}>
                                            Time
                                        </Typography>
                                        {arr?.map((item, index) => {
                                            return (
                                                <BoxTime
                                                    values={values}
                                                    isSmall={isSmall}
                                                    counter={item}
                                                    key={index}
                                                />
                                            );
                                        })}
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item md={12} xs={12}>
                                        <Box
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: isSmall ? 'flex-start' : 'center'
                                            }}>
                                            <SubmitButton type="submit">Add Sesstion</SubmitButton>
                                        </Box>
                                        <Spacer space={30} />
                                    </Grid>
                                </Grid>
                            </Form>
                        </>
                    );
                }}
            </Formik>
        </ParentMain>
    );

    function BoxTime({ values, counter, isSmall }) {
        const [selectedDay, setSelectedDay] = useState('Monday');
        const { enqueueSnackbar } = useSnackbar();

        function addzero(item) {
            const firstitem = String(item)[0];
            const seconditem = String(item)[1];
            return Number(firstitem) === 0 && seconditem === undefined
                ? '00'
                : Number(firstitem) === 0 && Number(seconditem) === 0
                ? '00'
                : Number(firstitem) === 0
                ? item
                : parseInt(item) >= 0 && parseInt(item) <= 9
                ? `0${item}`
                : item;
        }

        function checkValues(values, counter) {
            const match = `${selectedDay}${addzero(values[`start_hour${counter}`])}:${addzero(
                values[`start_min${counter}`]
            )} ${values[`start_time_format${counter}`]}-${addzero(
                values[`end_hour${counter}`]
            )}:${addzero(values[`end_min${counter}`])} ${values[`end_time_format${counter}`]}`;
            if (
                !values[`start_hour${counter}`] ||
                !values[`end_hour${counter}`] ||
                !values[`start_min${counter}`] ||
                !values[`end_min${counter}`] ||
                !values[`start_time_format${counter}`] ||
                !values[`end_time_format${counter}`] ||
                value.workDays[`counter${counter}`]
                    ?.map((item) => `${item.day}${item.startTime}-${item.endTime}`)
                    .some((item) => item === match)
            ) {
                return;
            } else if (
                times
                    ?.slice(0, 2)
                    ?.some(
                        (item) =>
                            Number(values[`${item}${counter}`]) < 0 ||
                            Number(values[`${item}${counter}`] > 12)
                    )
            ) {
                enqueueSnackbar('Please enter a time between 0 and 12(hour)', { variant: 'error' });
            } else if (
                times
                    ?.slice(2, 4)
                    ?.some((item) =>
                        Number(values[`${item}${counter}`] < 0 || values[`${item}${counter}`] > 60)
                    )
            ) {
                enqueueSnackbar('Please enter a time between 0 and 60(minute)', {
                    variant: 'error'
                });
            } else if (
                times?.some(
                    (item) =>
                        !hasNumber(values[`${item}${counter}`]) ||
                        !isInteger(values[`${item}${counter}`])
                )
            ) {
                enqueueSnackbar('Please enter a valid number', { variant: 'error' });
            } else {
                setValue(() => ({
                    workDays: {
                        ...value?.workDays,
                        [`counter${counter}`]: [
                            ...(value?.workDays[`counter${counter}`] || []),
                            {
                                day: selectedDay,
                                startTime: `${addzero(values[`start_hour${counter}`])}:${addzero(
                                    values[`start_min${counter}`]
                                )} ${values[`start_time_format${counter}`]}`,
                                endTime: `${addzero(values[`end_hour${counter}`])}:${addzero(
                                    values[`end_min${counter}`]
                                )} ${values[`end_time_format${counter}`]}`
                            }
                        ]
                    }
                }));
            }
        }

        return (
            <>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: isSmall ? 'column' : 'row',
                        position: 'relative',
                        borderBottom: '1px solid #D8D8D8',
                        marginBottom: '40px'
                    }}>
                    <Box display="flex">
                        {weekDays.map((day, index) => (
                            <DayContainer
                                key={index}
                                onClick={() => setSelectedDay(day.name)}
                                selected={selectedDay === day.name}
                                holidays={day.value === 'S'}>
                                <Typography style={{ fontSize: 24 }}>{day.value}</Typography>
                            </DayContainer>
                        ))}
                    </Box>
                    <div>
                        {['Start', 'End'].map((item, index) => (
                            <Box
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    maxWidth: '268px',
                                    marginLeft: isSmall ? 0 : '50px',
                                    marginBottom: isSmall ? 0 : '40px',
                                    marginTop: isSmall ? 10 : '-20px'
                                }}>
                                <Typography
                                    fontSize="20px"
                                    sx={{ marginRight: item === 'End' ? '9px' : null }}>
                                    {item}
                                </Typography>
                                <div
                                    style={{
                                        margin: '0 5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <ClockIcon />
                                </div>
                                <Typography
                                    style={{ fontSize: 18, color: '#8B8B8B', marginRight: '5px' }}>
                                    Time
                                </Typography>
                                <Box maxWidth="50px">
                                    <MInputFormik
                                        name={
                                            item === 'Start'
                                                ? `start_hour${counter}`
                                                : `end_hour${counter}`
                                        }
                                        InputRoot={TimeInputRoot}
                                    />
                                </Box>
                                <Typography sx={{ marginRight: '5px' }}>:</Typography>
                                <Box maxWidth="50px">
                                    <MInputFormik
                                        name={
                                            item === 'Start'
                                                ? `start_min${counter}`
                                                : `end_min${counter}`
                                        }
                                        InputRoot={TimeInputRoot}
                                    />
                                </Box>
                                <Box maxWidth="20px">
                                    <MSelectFormik
                                        whitoutErr
                                        name={
                                            item === 'Start'
                                                ? `start_time_format${counter}`
                                                : `end_time_format${counter}`
                                        }
                                        InputRoot={SelectRoot}
                                        Icon={KeyboardArrowDownIcon as any}
                                        options={[
                                            { option: 'AM', value: 'AM' },
                                            { option: 'PM', value: 'PM' }
                                        ]}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </div>
                    <Box
                        sx={{
                            marginBottom: isSmall ? '20px' : 0,
                            marginTop: isSmall ? '20px' : 0,
                            marginLeft: '150px'
                        }}>
                        <AddButton
                            onClick={() => {
                                checkValues(values, counter);
                            }}
                            style={{ width: 100 }}>
                            Add
                        </AddButton>
                    </Box>
                    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                        {value?.workDays[`counter${counter}`]?.map((item, index) => {
                            return (
                                <WorkDayItem key={index}>
                                    <Typography
                                        fontSize={
                                            10
                                        }>{`${item.day} ${item.startTime} - ${item.endTime}`}</Typography>
                                    <DeleteButton onClick={() => deleteWorkDay(index, counter)}>
                                        <CloseItem stroke="#000" />
                                    </DeleteButton>
                                </WorkDayItem>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }

    function LeftItem() {
        return (
            <>
                <RadioButton
                    name="status"
                    defaultvalue={record}
                    custom={true}
                    vertical={false}
                    options={[
                        { option: 'Online', value: 'online' },
                        { option: 'In-Office', value: 'office' }
                    ]}
                    setRecord={setRecord}
                />
                <Box mb={1}>
                    <MInputFormik name="title" placeholder="Title" style={{ ...StyleShare }} />
                </Box>
                <Box mb={1}>
                    <MInputFormik
                        name="duration"
                        placeholder="Duration"
                        style={{ ...StyleShare }}
                    />
                </Box>
                <Box mb={1}>
                    <MInputFormik
                        name="limit"
                        placeholder="Limit Client"
                        style={{ ...StyleShare }}
                    />
                </Box>
                {record === 'office' && (
                    <Box mb={2}>
                        <MInputFormik
                            name="address"
                            placeholder="Address"
                            style={{ ...StyleShare }}
                        />
                    </Box>
                )}
            </>
        );
    }

    function MiddleItem() {
        return (
            <>
                <MRadioFormik
                    name="event"
                    defaultvalue="private"
                    custom={true}
                    vertical={false}
                    options={[
                        { option: 'Privet Event', value: 'private' },
                        { option: 'General Event', value: 'general' }
                    ]}
                />
                <Box mb={1} mt={-0.5}>
                    <MInputFormik
                        name="type"
                        placeholder="Service Type"
                        style={{ ...StyleShare }}
                    />
                </Box>
                <Box mb={1}>
                    <MInputFormik
                        name="cost"
                        placeholder="Cost"
                        style={{ ...StyleShare }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">$</InputAdornment>
                        }}
                    />
                </Box>
                {record === 'office' ? (
                    <Box mb={1}>
                        <MInputFormik name="city" placeholder="City" style={{ ...StyleShare }} />
                    </Box>
                ) : (
                    <Box mb={1}>
                        <MInputFormik name="link" placeholder="Link" style={{ ...StyleShare }} />
                    </Box>
                )}
            </>
        );
    }

    function RightItem({ setArrSlider, arrSlider, placeholder, setPlaceholder }) {
        const [y, setY] = useState(0);
        const { uploadOnFile, state } = useImageUploader();
        const { InputComponent, onFilePick } = useUploadInput(uploadOnFile);
        const theme = useTheme();
        const isMedium = useMediaQuery(theme.breakpoints.up('lg'));

        useEffect(() => {
            try {
                if (state?.items[state?.items?.length - 1].progress === '100') {
                    setArrSlider([...arrSlider, state?.items[state?.items?.length - 1].url]);
                    setPlaceholder([
                        ...placeholder,
                        state?.items[state?.items?.length - 1].localUrl
                    ]);
                }
            } catch (e) {
                console.log(e);
            }
        }, [state]);

        const GoUp = () => {
            setY(y + 20);
        };

        const GoDown = () => {
            setY(y - 20);
        };

        return (
            <>
                <ParentSwitcher showSwitch={record === 'online' ? 'true' : 'false'}>
                    <Typography sx={{ ...share, marginRight: '10px' }}>Record:</Typography>
                    <Typography sx={{ ...share }}>On</Typography>
                    {record === 'online' && <Switcher />}
                    <Typography sx={{ ...share }}>Off</Typography>
                </ParentSwitcher>
                <Grid container>
                    <Hidden mdDown={true}>
                        <Grid item md={5}>
                            <PrentRelativeSession>
                                {arrSlider?.length >= 4 ? (
                                    y === 20 ? null : (
                                        <>
                                            <UpButton onClick={GoUp}>
                                                <CustomOpacity></CustomOpacity>
                                                <ExpandLessIcon sx={{ fontSize: '40px' }} />
                                            </UpButton>
                                        </>
                                    )
                                ) : null}
                                <ParentImageSlider>
                                    {placeholder?.slice(1, 5).map((item, index) => {
                                        return (
                                            <ParentImage
                                                key={index}
                                                style={{ transform: `translateY(${y}%)` }}
                                                firstitem={index === 0 ? 'true' : 'false'}
                                                lastitem={
                                                    arrSlider?.length === index + 1
                                                        ? 'true'
                                                        : 'false'
                                                }>
                                                <img
                                                    src={item}
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </ParentImage>
                                        );
                                    })}
                                    {arrSlider?.length === 5 ? (
                                        y === 0 ? null : (
                                            <>
                                                <DownButton onClick={GoDown}>
                                                    <CustomOpacity></CustomOpacity>
                                                    <ExpandMoreIcon sx={{ fontSize: '40px' }} />
                                                </DownButton>
                                            </>
                                        )
                                    ) : null}
                                    {arrSlider?.length - 1 <= 3 && (
                                        <AddButtonImg
                                            style={{
                                                transform: `translateY(${y}%)`,
                                                margin: '5px 13px 0 0'
                                            }}
                                            onClick={onFilePick}>
                                            <PlusIcon />
                                            {InputComponent}
                                        </AddButtonImg>
                                    )}
                                </ParentImageSlider>
                            </PrentRelativeSession>
                        </Grid>
                        <CustomGrid item md={6}>
                            {placeholder[0] && (
                                <img
                                    src={placeholder[0]}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            )}
                        </CustomGrid>
                    </Hidden>
                </Grid>
                <Grid container>
                    <Hidden mdUp={true}>
                        <Grid item xs={12} sx={{ overflow: 'auto' }}>
                            <ParentImageSliderRow>
                                {arrSlider?.length - 1 <= 3 && (
                                    <AddButtonImg
                                        style={{ margin: '5px 5px' }}
                                        onClick={onFilePick}>
                                        <PlusIcon />
                                        {InputComponent}
                                    </AddButtonImg>
                                )}
                                {placeholder?.slice(0, 5)?.map((item, index) => {
                                    return (
                                        <ParentImage key={index}>
                                            <img
                                                src={item}
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </ParentImage>
                                    );
                                })}
                            </ParentImageSliderRow>
                        </Grid>
                    </Hidden>
                </Grid>
            </>
        );
    }
};

export default NewSession;
