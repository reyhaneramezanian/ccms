import {
    CircularProgress,
    MenuItem,
    Select,
    Typography,
    FormControl,
    InputLabel,
    Box
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
    };
export const MSelectFormik = ({
    options,
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

    return (
        <InputRoot>
            <FormControl fullWidth>
                {holder && (
                    <InputLabel>
                        <div style={{ float: 'left', marginLeft: 5 }}>{label} </div>
                        {necessary ? (
                            <div style={{ color: '#EB5757', float: 'left', marginLeft: 5 }}>*</div>
                        ) : (
                            ''
                        )}
                    </InputLabel>
                )}
                {label && !holder && (
                    <BSLabel>
                        <div style={{ float: 'left', marginLeft: 5 }}>{label} </div>
                        {necessary ? (
                            <div style={{ color: '#EB5757', float: 'left', marginLeft: 5 }}>*</div>
                        ) : (
                            ''
                        )}
                    </BSLabel>
                )}

                <InputComponent
                    label={holder ? label : undefined}
                    {...rest}
                    {...field}
                    onChange={(e) => {
                        field?.onChange?.(e);
                        if (typeof onChange === 'function') {
                            onChange(e, e.target);
                        }
                    }}>
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
                            <MenuItem key={`${i}-${o.option}`} value={o.value}>
                                {o.option}
                            </MenuItem>
                        ))
                    ) : (
                        <Typography style={{ padding: '10px 15px' }}>{'no option'}</Typography>
                    )}
                </InputComponent>
                {meta && !whitoutErr && <InputErrorText meta={meta} errorSpaceOn={errorSpaceOn} />}
            </FormControl>
        </InputRoot>
    );
};

export const MSelect = ({
    options,
    whitoutErr = false,
    autoWidth = true,
    multiple = false,
    native = false,
    necessary = true,
    label,
    InputComponent = CommonTextField,
    InputRoot = CommonSelectRoot,
    errorSpaceOn = false,
    error,
    holder = false,
    onChange,
    meta,
    ...rest
}: SelectProps) => {
    return (
        <InputRoot>
            <FormControl fullWidth>
                {holder && (
                    <InputLabel>
                        <div style={{ float: 'left', marginLeft: 5 }}>{label} </div>
                        {necessary ? (
                            <div style={{ color: '#EB5757', float: 'left', marginLeft: 5 }}>*</div>
                        ) : (
                            ''
                        )}
                    </InputLabel>
                )}
                {label && !holder && (
                    <BSLabel>
                        <div style={{ float: 'left', marginLeft: 5 }}>{label} </div>
                        {necessary ? (
                            <div style={{ color: '#EB5757', float: 'left', marginLeft: 5 }}>*</div>
                        ) : (
                            ''
                        )}
                    </BSLabel>
                )}

                <InputComponent
                    label={holder ? label : undefined}
                    {...rest}
                    onChange={(e) => {
                        if (typeof onChange === 'function') {
                            onChange(e, e.target);
                        }
                    }}>
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
                            <MenuItem key={`${i}-${o.option}`} value={o.value}>
                                {o.option}
                            </MenuItem>
                        ))
                    ) : (
                        <Typography style={{ padding: '10px 15px' }}>{'no option'}</Typography>
                    )}
                </InputComponent>
                {meta && !whitoutErr && <InputErrorText meta={meta} errorSpaceOn={errorSpaceOn} />}
            </FormControl>
        </InputRoot>
    );
};
