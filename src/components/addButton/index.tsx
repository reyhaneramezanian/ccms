import { AllHTMLAttributes, FC } from 'react';
import * as S from './addButton.style';

const AddButton: FC<AllHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
    return (
        <S.AddButton variant="contained" {...(props as any)}>
            <S.AddButtonIconWrapper>
                <S.AddButtonIcon fontSize="small" />
            </S.AddButtonIconWrapper>

            {children}
        </S.AddButton>
    );
};

export default AddButton;
