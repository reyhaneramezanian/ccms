import mediaScreen from '@/provider/media';
import { styled } from '@mui/material';

export const Layout = styled('div')({
    width: '1440px',
    maxWidth: '100%',
    padding: '0 16px',
    margin: '0 auto'
});

export const Main = styled('main')({
    display: 'grid',
    gridTemplateColumns: '252px 1fr',
    columnGap: 16,
    paddingBottom: 24,
    [mediaScreen('md')]: {
        display: 'block',
        gridTemplateColumns: '1fr'
    }
});

export const MainContent = styled('div')({
    minHeight: 'calc(100vh - 81px - 24px)',
    maxWidth: 'calc(97vw - 252px - 16px)',
    [mediaScreen('md', 'max')]: {
        maxWidth: '100% !important'
    }
});
