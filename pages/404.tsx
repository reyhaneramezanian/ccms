import { Grid, Typography, Box, styled, Button } from '@mui/material';
import { useRouter } from 'next/router';

const BackButton = styled(Button)({
    backgroundColor: '#5293D3',
    color: '#fff',
    width: '40%',
    marginTop: '50px',
    borderRadius: '25px',
    height: '60px',
    '&:hover': {
        backgroundColor: '#fff',
        border: '1px solid #5293D3',
        '& .MuiTypography-root': {
            color: '#5293D3 !important'
        }
    }
});

const BackgroundColor = styled('div')({
    background: `linear-gradient(to bottom,  #C9BBD5 0%,#A08EB4 100%)`
});

const CustomImage = styled('div')(({ theme }) => ({
    backgroundImage: `url("/images/not-found.png")`,
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('sm')]: {
        backgroundSize: '120% 50%'
    }
}));

const CustomCenter = styled(Box)({
    display: 'flex',
    justifyContent: 'center'
});

const NotFoundPage = () => {
    const router = useRouter();
    return (
        <BackgroundColor>
            <CustomImage>
                <Grid container>
                    <Grid item md={6} xs={12} sx={{ minHeight: '100vh' }}></Grid>
                    <Grid item md={6} xs={12}>
                        <CustomCenter style={{ height: '70vh' }}>
                            <img
                                src="/images/404.png"
                                alt="image"
                                style={{ width: '20%', height: '100%' }}
                            />
                        </CustomCenter>
                        <Typography
                            variant="h2"
                            style={{
                                textAlign: 'center',
                                color: '#213950',
                                fontWeight: 'bold',
                                fontStyle: 'italic'
                            }}>
                            Page Not Found…
                        </Typography>
                        <Typography
                            variant="h2"
                            style={{
                                textAlign: 'center',
                                color: '#213950',
                                fontSize: '25px',
                                marginTop: '25px'
                            }}>
                            We are unable to find the page you are looking for
                        </Typography>
                        <CustomCenter>
                            <BackButton onClick={() => router.back()}>
                                <Typography>Go Back Home</Typography>
                            </BackButton>
                        </CustomCenter>
                    </Grid>
                </Grid>
            </CustomImage>
        </BackgroundColor>
    );
};

export default NotFoundPage;
