import styled from '@emotion/styled';
import { ThemeObj } from 'src/@types/emotion';
import { ButtomFormSubmit } from '../../formInputs/buttons';

export const ButtonContainer = styled.div(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
}));
export const CustomButtomFormSubmit = styled(ButtomFormSubmit)(({ theme, plan }:{plan?:boolean, theme?: ThemeObj}) => ({
    marginTop: plan ? '14px': '-28px',
    height: '40px',
    display: 'flex',
    alignItems: 'center'
}));