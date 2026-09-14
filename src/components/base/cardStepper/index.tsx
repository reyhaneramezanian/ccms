import { FC } from 'react';
import * as S from './styles.cardStepper';
import { ICardStepperProps } from './types.cardStepper';

const CardStepper: FC<ICardStepperProps> = ({ activeStep, stepsLength }) => {
    return (
        <S.CardStepperWrapper>
            {Array(stepsLength)
                .fill(null)
                .map((_, index) => (
                    <S.CardStepperItem key={index} isActive={index === activeStep} />
                ))}
        </S.CardStepperWrapper>
    );
};

export default CardStepper;
