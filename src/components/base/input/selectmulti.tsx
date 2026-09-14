import React, { useEffect, useState } from 'react';
import {
    CircularProgress,
    MenuItem,
    Select,
    Typography,
    FormControl,
    InputLabel,
    Box,
    ListItemText,
    Checkbox,
    SelectChangeEvent
} from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import styled from '@emotion/styled';
import { useField } from 'formik';
import { BSLabel, CommonSelectRoot } from './styled';
import { MSelectProps } from './type.input';
import { InputErrorText } from './error';
import { MuiSelect } from './MuiSelect';
import DropdownIcon from 'src/assets/common/DropdownIcon';
import { ArrowDownIcon } from 'src/assets/common/ArrowDownIcon';
import Down from 'src/assets/icons/Down';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 'auto'
        }
    }
};
const CommonTextField = styled(MuiSelect)({ height: 40 });

type SelectProps = Omit<SelectInputProps, 'autoWidth' | 'multiple' | 'native'> &
    MSelectProps & {
        autoWidth?: boolean;
        multiple?: boolean;
        native?: boolean;
        name: string;
        options: ArrayOptionLoading;
        holder?: boolean;
        whitoutErr?: boolean;
        Icon?: any;
        necessary?: boolean;
        values?: Array;
    };
export const MSelectmultiFormik = ({
    options,
    values,
    whitoutErr = false,
    autoWidth = true,
    multiple = false,
    native = false,
    label,
    necessary = true,
    InputComponent = CommonTextField,
    InputRoot = CommonSelectRoot,
    errorSpaceOn = false,
    error,
    holder = false,
    onChange,
    ...rest
}: SelectProps) => {
    const [field, meta] = useField(rest.name);
    const [selectName, setSelectName] = React.useState([]);
    useEffect(() => {
        if (values != undefined) setSelectName(values);
    }, [values]);

    const handleChange = (event: SelectChangeEvent<typeof selectName>) => {
        var js = selectName;
        js.push(event.target.name);
        const {
            target: { value }
        } = event;

        setSelectName(typeof value === 'string' ? value.split(',') : value);
        field?.onChange?.(event);
        if (typeof onChange === 'function') {
            onChange(event, typeof value === 'string' ? value.split(',') : value);
        }
    };
    return (
        <InputRoot>
            <FormControl fullWidth>
                {holder && (
                    <InputLabel>
                        <div style={{ float: 'left' }}>{label} </div>
                        {necessary ? (
                            <div style={{ color: '#EB5757', float: 'left', marginLeft: 5 }}>*</div>
                        ) : (
                            ''
                        )}
                    </InputLabel>
                )}
                {label && !holder && (
                    <BSLabel>
                        <div style={{ float: 'left' }}>{label} </div>
                        {necessary ? (
                            <div style={{ color: '#EB5757', float: 'left', marginLeft: 5 }}>*</div>
                        ) : (
                            ''
                        )}
                    </BSLabel>
                )}
                <Select
                    style={{ height: '48px !important', marginTop: '-5px', width: '96%' }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    {...field}
                    value={selectName}
                    onChange={handleChange}
                    IconComponent={() => <Down />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}>
                    {options === 'loading' ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '10px 15px'
                            }}>
                            <CircularProgress size="1.5rem" />
                        </div>
                    ) : options.length > 0 ? (
                        options.map((o, i) => (
                            <MenuItem key={`${i}-${o.option}`} value={o.option}>
                                <Checkbox checked={selectName.indexOf(o.option) > -1} />
                                <ListItemText primary={o.option} />
                            </MenuItem>
                        ))
                    ) : (
                        <Typography style={{ padding: '10px 15px' }}>{'no option'}</Typography>
                    )}
                </Select>
                {meta && !whitoutErr && <InputErrorText meta={meta} errorSpaceOn={errorSpaceOn} />}
            </FormControl>
        </InputRoot>
    );
};
