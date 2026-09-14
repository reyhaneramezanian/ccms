import { MButton } from '@/components/base/MButton';
import { MText } from '@/components/base/MText';
import { Spacer } from '@/components/base/spacer';
import { StyledRow } from '@/components/base/view-container/Row';
import styled from '@emotion/styled';
import { CloseIcon } from 'src/assets/common/CloseIcon';

type ChipsVariant = 'full' | 'half' | 'auto';

export const BSChipsGridView = styled.div({
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
});
export const BSSelectChips = styled.div<{ variant?: ChipsVariant }>(({ theme, css }) => ({
    ...(css && css),
    backgroundColor: `${theme.palette.primary['100']}45`,
    color: theme.palette.primary['100'],
    padding: '6px 4px',

    // maxWidth: 400,
    border: `1px solid ${theme.palette.primary['100']}`,
    borderRadius: 4,
    margin: 5
}));

export const SelectChips = ({
    title,
    description,
    variant,
    wrapperStyle,
    onClose
}: {
    title: string;
    wrapperStyle?: any;
    description?: string;
    variant?: ChipsVariant;
    onClose?: () => void;
}) => {
    return (
        <BSSelectChips variant={variant} css={wrapperStyle}>
            <StyledRow justifyContent="space-between" alignItems="flex-start">
                <MText variant="body2" color="inherit" style={{ fontSize: '12px' }}>
                    {title}
                </MText>
                <MButton
                    css={{ padding: '0 4px 0 6px', alignSelf: description ? 'unset' : 'center' }}>
                    <CloseIcon
                        palette="primary"
                        degree="100"
                        onClick={onClose}
                        style={{ width: '18px', height: '18px' }}
                    />
                </MButton>
            </StyledRow>
            {description && (
                <>
                    <Spacer space="12px" />
                    <MText variant="body2" color="inherit">
                        {description}
                    </MText>
                </>
            )}
        </BSSelectChips>
    );
};
