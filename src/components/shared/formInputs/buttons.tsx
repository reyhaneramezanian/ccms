import { MButton } from '@/components/base/MButton';
import { MButtonProps } from '@/components/base/MButton/types.button';
import { MText } from '@/components/base/MText';
import { FlexContainer } from '@/components/base/view-container/Container';
import { StyledRow } from '@/components/base/view-container/Row';
import useTranslation from '@/i18n/hooks/useTranslation';

export const ButtomFormSubmit = ({ text, ...rest }: MButtonProps & { text: string }) => {
    return (
        <StyledRow justifyContent="flex-end">
            <MButton
                {...rest}
                type="submit"
                variant="contained"
                css={{
                    padding: '16px 48px'
                }}>
                <MText align="center" color="#FFF">
                    {text}
                </MText>
            </MButton>
        </StyledRow>
    );
};
export const ButtomFormAdd = (props: MButtonProps) => {
    const { t } = useTranslation();
    return (
        <StyledRow justifyContent="flex-end">
            <MButton
                {...props}
                variant="contained"
                css={{
                    width: '100%',
                    padding: '5px 26px'
                }}>
                <MText align="center" color="#FFF">
                    {t('add')}
                </MText>
            </MButton>
        </StyledRow>
    );
};
