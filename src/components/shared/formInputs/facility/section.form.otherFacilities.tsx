import { MText } from '@/components/base/MText';
import useTranslation from '@/i18n/hooks/useTranslation';

import { Field } from 'formik';
import { memo, useState } from 'react';

import { MButton } from '@/components/base/MButton';
import { SelectChips } from '../cc.chips';
import { FlexContainer } from '@/components/base/view-container/Container';

import { MInput } from '@/components/base/input';
import { N_OTHER_FACILITIES } from '../utilities/input.constant';
import { useSnackbar } from 'notistack';
import styled from '@emotion/styled';

const ColumnWrapper = styled(FlexContainer)(({ theme }) => ({
    flex: 1,
    maxWidth: 500,
    [theme.breakpoints.down.md]: {
        maxWidth: 'unset'
    }
}));

const FlexSpacer = styled(FlexContainer)(({ theme }) => ({
    maxWidth: 350,
    flex: 1,
    [theme.breakpoints.down.lg]: {
        maxWidth: 120
    },
    [theme.breakpoints.down.md]: {}
}));

const INITIAL_NEW_FACILITY = { title: '', description: '' };
export const FormSectionDesctiption = memo(
    ({ values, push, remove }: { values: Array<any>; push: any; remove: any }) => {
        const { t } = useTranslation();
        const [newFacility, setNewFacility] = useState({ ...INITIAL_NEW_FACILITY });
        const { enqueueSnackbar } = useSnackbar();
        return (
            <>
                <ColumnWrapper alignItems="flex-start" alignContent="flex-start" wrap="true">
                    <MInput
                        value={newFacility.title}
                        onChange={(e) => setNewFacility((p) => ({ ...p, title: e.target.value }))}
                        name="title"
                        label={t('title')}
                        placeholder={t('title')}
                        fullWidth
                    />
                    <MInput
                        value={newFacility.description}
                        onChange={(e) =>
                            setNewFacility((p) => ({
                                ...p,
                                description: e.target.value
                            }))
                        }
                        rows={5}
                        multiline
                        name="description"
                        label={t('description')}
                        placeholder={t('description')}
                        fullWidth
                    />
                    <MButton
                        type="button"
                        variant="contained"
                        onClick={() => {
                            if (!newFacility.title || !newFacility.description) {
                                enqueueSnackbar('Please fill title and descripiton', {
                                    variant: 'warning'
                                });
                                return;
                            }
                            push(newFacility);
                            setNewFacility({ ...INITIAL_NEW_FACILITY });
                        }}
                        css={{ width: '100%', marginTop: 16 }}>
                        <MText align="center" color="#FFF">
                            {t('add')}
                        </MText>
                    </MButton>
                </ColumnWrapper>
                <FlexSpacer />
                <ColumnWrapper wrap="true">
                    {values?.length > 0 &&
                        values.map((facility, index) => (
                            <Field
                                key={index}
                                name={`${N_OTHER_FACILITIES}.${index}`}
                                component={SelectChips}
                                wrapperStyle={{ width: '100%' }}
                                {...facility}
                                onClose={() => remove(index)}
                            />
                        ))}
                </ColumnWrapper>
            </>
        );
    },
    (prev, next) => prev.values?.length === next.values?.length
);

const InputsContainer = styled.div(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    flex: 1,
    alignItems: 'flex-start',
    [theme.breakpoints.down.sm]: {
        gridTemplateColumns: '1fr'
    }
}));
export const FormSectionFacilityTitle = memo(
    ({ values, push, remove }: { values: Array<any>; push: any; remove: any }) => {
        const { t } = useTranslation();
        const [newTitle, setNewTitle] = useState({ title: '' });
        const { enqueueSnackbar } = useSnackbar();
        return (
            <>
                <InputsContainer>
                    <MInput
                        value={newTitle.title}
                        onChange={(e) => setNewTitle({ title: e.target.value })}
                        name="title"
                        label={t('title')}
                        placeholder={t('title')}
                    />

                    <MButton
                        variant="contained"
                        onClick={() => {
                            if (!newTitle.title) {
                                enqueueSnackbar('Please fill title', {
                                    variant: 'warning'
                                });
                                return;
                            }
                            push(newTitle);
                            setNewTitle({ title: '' });
                        }}
                        css={{ margin: '48px 16px 0 16px', padding: 16 }}>
                        <MText align="center" color="#FFF">
                            {t('add')}
                        </MText>
                    </MButton>
                </InputsContainer>

                <ColumnWrapper alignItems="flex-start" wrap="true">
                    {values?.length > 0 &&
                        values.map((facility, index) => (
                            <Field
                                key={index}
                                name={`${N_OTHER_FACILITIES}.${index}`}
                                component={SelectChips}
                                {...facility}
                                onClose={() => remove(index)}
                            />
                        ))}
                </ColumnWrapper>
            </>
        );
    },
    (prev, next) => prev.values?.length === next.values?.length
);
