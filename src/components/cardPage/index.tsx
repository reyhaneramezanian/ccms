import { BoxProps } from '@mui/material';
import { FC } from 'react';
import * as S from './@styles';

const CardPage: FC<BoxProps> = ({ children, ...props }) => {
    return <S.CardPageWrapper {...props}>{children}</S.CardPageWrapper>;
};

export default CardPage;
