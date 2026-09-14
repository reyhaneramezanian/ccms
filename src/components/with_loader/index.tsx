import { useTheme } from '@emotion/react';
import { StyledSpinner } from 'src/components/base/loader/spinner';

export default function WithLoader({ isLoading, children }: { isLoading: boolean; children: any }) {
    const theme = useTheme()
    return (
        <div style={{ position: 'relative' }}>
            {isLoading && (
                <StyledSpinner
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '100',
                        transform: 'translate(-50%, -50%)',
                        color: theme.palette.primary.main,
                    }}
                />
            )}
            {children}
        </div>
    );
}
