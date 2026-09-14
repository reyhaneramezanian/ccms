import { AllHTMLAttributes, FC } from 'react';
import * as S from './excelButton.style';

const ExcelButton: FC<AllHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
    return (
        <S.AddButton variant="contained" {...(props as any)}>
            <S.AddButtonIconWrapper>
                <S.AddButtonIcon />
            </S.AddButtonIconWrapper>

            {children}
        </S.AddButton>
    );
};

export default ExcelButton;
