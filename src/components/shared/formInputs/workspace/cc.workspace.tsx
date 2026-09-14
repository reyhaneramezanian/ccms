import styled from '@emotion/styled';
import shortid from 'shortid';
import {
    BSLabel,
    BSTwoDigitInputContainer,
    CommonInputWrapper
} from '@/components/base/input/styled';
import { StyledRow } from '@/components/base/view-container/Row';
import { FieldArray, useFormikContext } from 'formik';
import { StyledColumn } from '@/components/base/view-container/Column';
import { SelectChips } from '../cc.chips';
import { Grid } from '@material-ui/core';
import {
    MULTIPLE_W_DAYS,
    N_WORKINGHOUR as NW,
    N_INFO as NI,
    WorkspaceInputPrefixType
} from '../utilities/input.constant';
import { Fragment, memo, useMemo, useRef, useState } from 'react';
import { BSTwoDigitInput, FormikTimeHMInput } from '@/components/base/input/two-digit';
import useTranslation from '@/i18n/hooks/useTranslation';
import { FormInputWorkingDay } from './section.workingDays';
import { useSnackbar } from 'notistack';
import { MInputFormik } from '@/components/base/input/formik';
import { useGetHospitalDetailsName } from 'src/graphql/hospital/useHospital';
import { useGetMedicalBeautyCenterDetails } from 'src/graphql/mbc/useGetMedicalBeautyCenterDetails';
import { FormSubtitleSection } from '../styled.form';
import { MToggleButtonFormik } from '@/components/base/toggle/ToggleButton';
import { generateWorkspaceInputName } from '../utilities/initForm/input.func';
import {
    SearchSelectInputProvider,
    SearchSelectInput,
    useSearchSelectState
} from '../SearchSelectInput/input.searchSelect';
import { SearchSelectHospital } from '../SearchSelectInput/hospital.searchSelect';
import { initSingleWorktime } from '../utilities/initForm/workingHour';
import { ButtomFormAdd } from '../buttons';
import { Spacer } from '@/components/base/spacer';
import { SearchSelectMbc } from '../SearchSelectInput/mbc.search.select';

export const FormSectionWorkspaceSingleTime = () => {
    const { t } = useTranslation();
    const [date, setDate] = useState();
    return (
        <>
            <Grid xs={12} md={6} lg={4} item>
                <FormSubtitleSection>{t('workspace.workingDays')}</FormSubtitleSection>
                <FormInputWorkingDay name={`${NW.prefix}`} setDate={setDate} date={date} />
            </Grid>

            <Grid xs={12} md={6} lg={4} item>
                <FormSubtitleSection>{t('workspace.workingHours')}</FormSubtitleSection>
                <FormikTimeHMInput
                    label={t('start')}
                    name={`${NW.prefix}.${date}.${NW.startHoure}`}
                />
                <FormikTimeHMInput label={t('end')} name={`${NW.prefix}.${date}.${NW.endHoure}`} />
            </Grid>

            <Grid xs={12} md={6} lg={4} item>
                <FormSubtitleSection>{t('open')}</FormSubtitleSection>
                <MToggleButtonFormik name={`${NI.prefix}.${NI.isOpen}`} />
            </Grid>
        </>
    );
};

const WorkingDayRow = styled(StyledRow)({
    border: '1px solid #222222',
    borderRadius: 12,
    padding: 8,
    '& input': {
        fontSize: 14
    },
    '& p': { fontSize: 14 },
    '& span': {
        fontSize: 14
    }
});

const WorkspaceMultipleTimeAdd = ({
    onAdd,
    children,
    title
}: AppCommonChild & {
    title: string;
    onAdd: (_: AppOptions | string) => any;
}) => {
    const { option, value } = useSearchSelectState();
    return (
        <StyledColumn css={{ marginTop: 24 }}>
            <BSLabel>{title}</BSLabel>
            {children}
            <Spacer vert={8} />
            <ButtomFormAdd
                onClick={() => {
                    onAdd({ option, value });
                }}
            />
        </StyledColumn>
    );
};

const LabelTitle = styled(BSLabel)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    [theme.breakpoints.down.md]: {
        position: 'static'
    }
}));
const InputComponent = styled(BSTwoDigitInput)({
    fontSize: 16
});
const InputWrapper = styled(BSTwoDigitInputContainer)({
    padding: 8
});
const SelectInputWrapper = styled(CommonInputWrapper)({
    padding: 8
});
const WorkspaceMultipleTime = memo(
    ({
        index,
        prefix,
        children,
        ...rest
    }: AppCommonChild & {
        prefix: string;
        index: number;
    }) => {
        const { t } = useTranslation();
        const [date, setDate] = useState();

        return (
            <>
                <StyledColumn css={{ margin: 16, position: 'relative' }}>
                    <BSLabel css={{ visibility: 'hidden' }}>R</BSLabel>
                    <WorkingDayRow wrap="true" css={{ alignItems: 'center' }}>
                        {children}
                        <StyledColumn>
                            <LabelTitle>{t('workspace.workingHours')}</LabelTitle>

                            <FormInputWorkingDay
                                setDate={setDate}
                                date={date}
                                name={`${prefix}.${index}.${MULTIPLE_W_DAYS}`}
                            />
                        </StyledColumn>
                        <StyledColumn>
                            <LabelTitle>{t('workspace.workingDays')}</LabelTitle>

                            <FormikTimeHMInput
                                InputProps={{ InputComponent, InputWrapper }}
                                SelectProps={{ InputWrapper: SelectInputWrapper }}
                                label={t('start')}
                                name={`${prefix}.${index}.${MULTIPLE_W_DAYS}.${date}.${NW.startHoure}`}
                            />
                            <FormikTimeHMInput
                                InputProps={{ InputComponent, InputWrapper }}
                                SelectProps={{ InputWrapper: SelectInputWrapper }}
                                label={t('end')}
                                name={`${prefix}.${index}.${MULTIPLE_W_DAYS}.${date}.${NW.endHoure}`}
                            />
                        </StyledColumn>
                    </WorkingDayRow>
                </StyledColumn>
            </>
        );
    },
    (prev, next) => prev.index === next.index
);

const WorkspaceMultipleTimeChipsHospital = memo(
    ({
        onRemove,
        id,
        index
    }: {
        id?: number;
        options?: Array<AppOptions>;
        onRemove: (index: number) => void;
        index: number;
    }) => {
        const { option } = useSearchSelectState();
        const { data } = useGetHospitalDetailsName(+id);
        return (
            <SelectChips
                wrapperStyle={{ minWidth: '20ch' }}
                title={`${option || data?.hospital_getHospitalDetails?.result?.hospital.title || ''
                    }`}
                onClose={() => onRemove(index)}
            />
        );
    },
    (prev, next) =>
        prev.options === next.options && prev.id === next.id && prev.index === next.index
);
const WorkspaceMultipleTimeChipsMbc = memo(
    ({
        onRemove,
        id,
        index
    }: {
        id?: number;
        options?: Array<AppOptions>;
        onRemove: (index: number) => void;
        index: number;
    }) => {
        const { option } = useSearchSelectState();
        const { data } = useGetMedicalBeautyCenterDetails(+id);
        return (
            <SelectChips
                wrapperStyle={{ minWidth: '20ch' }}
                title={`${option || data?.mbc_getMedicalBeautyCenterDetails?.result?.medicalBeautyCenter?.title || ''
                    }`}
                onClose={() => onRemove(index)}
            />
        );
    },
    (prev, next) =>
        prev.options === next.options && prev.id === next.id && prev.index === next.index
);

const GridRow = styled.div(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    [theme.breakpoints.down.lg]: {
        gridTemplateColumns: '300px 1fr'
    },
    [theme.breakpoints.down.md]: {
        gridTemplateColumns: '1fr'
    }
}));
function useCheckOnAdd() {
    const { enqueueSnackbar } = useSnackbar();
    function checkOnAdd(value: string | number, idx: number) {
        if (!value || value === -1) {
            enqueueSnackbar('Select a value first!', { variant: 'warning' });
            return false;
        }
        if (idx !== -1) {
            enqueueSnackbar('Duplicated Hospital!', { variant: 'warning' });
            return false;
        }
        return true;
    }
    return checkOnAdd;
}

const FormSectionWorkspaceMultipleWorktime = ({
    values,
    onAdd,
    title,
    remove,
    prefix,
    spacekey,
    isHospital,
}) => {
    return (
        <SearchSelectInputProvider>
            <GridRow>
                <WorkspaceMultipleTimeAdd
                    onAdd={onAdd}
                    title={title}
                // options={options}
                >
                    {isHospital ?
                        (<SearchSelectInput>
                            <SearchSelectHospital />
                        </SearchSelectInput>) :
                        (<SearchSelectInput>
                            <SearchSelectMbc />
                        </SearchSelectInput>)
                        }
                </WorkspaceMultipleTimeAdd>

                {values?.map((place, index) => {
                    return (
                        <div 
                        // key={shortid.generate()}
                        >
                            <WorkspaceMultipleTime key={index} index={index} prefix={prefix}>
                                {isHospital ? (
                                    <WorkspaceMultipleTimeChipsHospital
                                        id={place[spacekey]}
                                        onRemove={remove}
                                        index={index}
                                    />
                                ) : (
                                    <WorkspaceMultipleTimeChipsMbc
                                        id={place[spacekey]}
                                        onRemove={remove}
                                        index={index}
                                    />
                                )}
                            </WorkspaceMultipleTime>
                            <div />
                        </div>
                    );
                })}
            </GridRow>
        </SearchSelectInputProvider>
    );
};

const hospitalInputName = generateWorkspaceInputName('HOSPITAL');
export const FormSectionWorkspaceHospital = memo(
    ({ values }: { values: Array<Record<typeof NW.hospitalId, number>> }) => {
        const checkOnAdd = useCheckOnAdd();

        return (
            <Grid xs={12} item>
                <FieldArray
                    name={hospitalInputName}
                    render={({ push, remove }) => {
                        const onAdd = (opt: AppOptions) => {
                            const hospitalIdx = values.findIndex(
                                (v) => v?.[NW.hospitalId] === opt.value
                            );
                            const passed = checkOnAdd(opt.value, hospitalIdx);
                            if (passed) {
                                push({
                                    [NW.hospitalId]: opt.value,
                                    [MULTIPLE_W_DAYS]: initSingleWorktime()
                                });
                            }
                        };
                        return (
                            <FormSectionWorkspaceMultipleWorktime
                                spacekey={[NW.hospitalId]}
                                title={'Hospital/ Clinic'}
                                values={values}
                                onAdd={onAdd}
                                remove={remove}
                                prefix={hospitalInputName}
                                isHospital={true}
                            />
                        );
                    }}
                />
            </Grid>
        );
    },
    (prev, next) => prev.values?.length === next.values?.length
);

const beautyInputName = generateWorkspaceInputName('BEAUTY');
export const FormSectionWorkspaceBeauty = memo(
    ({ values }: { values: Array<Record<typeof NW.medicalBeautyCenterId, number>> }) => {
        const checkOnAdd = useCheckOnAdd();

        return (
            <Grid xs={12} item>
                <FieldArray
                    name={beautyInputName}
                    render={({ push, remove }) => {
                        const onAdd = (opt: AppOptions) => {
                            const beautyIdx = values.findIndex(
                                (v) => v?.[NW.medicalBeautyCenterId] === opt.value
                            );
                            const passed = checkOnAdd(opt.value, beautyIdx);
                            if (passed) {
                                push({
                                    [NW.medicalBeautyCenterId]: opt.value,
                                    [MULTIPLE_W_DAYS]: initSingleWorktime()
                                });
                            }
                        };
                        return (
                            <FormSectionWorkspaceMultipleWorktime
                                spacekey={[NW.medicalBeautyCenterId]}
                                title={'Medical beauty center'}
                                values={values}
                                onAdd={onAdd}
                                remove={remove}
                                prefix={beautyInputName}
                                isHospital={false}
                            />
                        );
                    }}
                />
            </Grid>
        );
    },
    (prev, next) => prev.values?.length === next.values?.length
);

const clinicInputName = generateWorkspaceInputName('CLINIC');
export const FormSectionWorkspaceClinic = memo(
    ({ values }: { values: Array<Record<typeof NW.clinicName, string>> }) => {
        return (
            <Grid xs={12} item>
                <GridRow>
                    {values?.map((place, index) => {
                        return (
                            <Fragment key={index}>
                                <MInputFormik
                                    required
                                    name={`${clinicInputName}.${index}.${NW.clinicName}`}
                                    placeholder={`Type Clinic name`}
                                    label="Clinic"
                                />
                                <WorkspaceMultipleTime
                                    index={index}
                                    prefix={clinicInputName}
                                    {...place[MULTIPLE_W_DAYS]}>
                                    <div />
                                </WorkspaceMultipleTime>
                            </Fragment>
                        );
                    })}
                </GridRow>
            </Grid>
        );
    },
    (prev, next) => prev.values?.length === next.values?.length
);

export const FormSectionWorkspaceMultiple = ({ space }: { space: WorkspaceInputPrefixType }) => {
    const { values } = useFormikContext();
    const fieldValues = useMemo(() => {
        return values?.[NW.prefix]?.[space] || [];
    }, [values, space]);

    if (space === 'HOSPITAL') return <FormSectionWorkspaceHospital values={fieldValues} />;
    if (space === 'BEAUTY') return <FormSectionWorkspaceBeauty values={fieldValues} />;
    return <FormSectionWorkspaceClinic values={fieldValues} />;
};
