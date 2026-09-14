import { ReactNode } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer';
import styled from '@emotion/styled';
import { Typography, Rating, useMediaQuery } from '@mui/material';
import BaseLayout from './base';
import { useTheme } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

const Main = styled.main({ marginTop: '70px', background: 'white' });

const Section = styled.section({ minHeight: '40vh' });

const HeaderContainer = styled.header({ position: 'relative' });

const HeaderDescription = styled(Typography)({
    marginLeft: '40px',
    '@media(max-width:900px)': {
        textAlign: 'center',
        marginLeft: '0px',
        fontSize: '1.4rem'
    },
    '@media(max-width:700px)': {
        textAlign: 'center',
        marginLeft: '0px',
        fontSize: '1.2rem'
    },
    '@media(max-width:480px)': {
        textAlign: 'center',
        marginLeft: '0px',
        fontSize: '1rem'
    }
});

const HeadaerText = styled.div(({ position, top = '50%' }: { position: string; top: string }) => ({
    position: 'absolute',
    [position]: 'calc(50vw - 34%)',
    top,
    transform: `translateY(-${top})`,
    maxWidth: '380px',
    '@media(max-width:1680px)': {
        [position]: 'calc(50vw - 36%)'
    },
    '@media(max-width:1440px)': {
        [position]: 'calc(50vw - 40%)'
    },
    '@media(max-width:1366px)': {
        [position]: 'calc(50vw - 42%)'
    },
    '@media(max-width:1280px)': {
        [position]: 'calc(50vw - 40%)',
        maxWidth: '280px'
    },
    '@media(max-width:1100px)': {
        [position]: 'calc(50vw - 42%)'
    },
    '@media(max-width:900px)': {
        top: '80%',
        bottom: '7%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '70%',
        maxWidth: '100%',
        left: '15%'
    }
}));

const ProfilePicture = styled.img({
    position: 'absolute',
    left: '30px',
    bottom: '-15%',
    borderRadius: '50%',
    width: '20vw',
    height: '20vw',
    maxWidth: '230px',
    maxHeight: '230px',
    minWidth: '120px',
    minHeight: '120px'
});

const BackgroundImage = styled.img(({ maxHeight }: { maxHeight: string }) => ({
    width: '100%',
    maxHeight,
    minHeight: '250px',
    objectFit: 'cover'
}));
const SlideContainer = styled.div(({ index }: { index: number }) => ({
    width: '100%',
    minHeight: '440px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end'
}));
const SlideImage = styled.img(({ maxHeight }: { maxHeight?: string }) => ({
    width: '100%',
    maxHeight,
    maxWidth: '260px',
    objectFit: 'cover'
}));

type Props = {
    children: ReactNode;
    title?: string;
    description?: string;
    rate?: number;
    imageUrl?: string;
    phoneImageUrl?: string;
    headline?: string;
    profileUrl?: string;
    withoutFooter?: boolean;
    imageSlider?: Array<string>;
};

export default function MainLayout({ children, withoutFooter = false, ...rest }: Props) {
    return (
        <BaseLayout>
            <Navbar />
            <Main>
                {rest.imageUrl && <Header {...rest} />}
                <Section>{children}</Section>
            </Main>
            {!withoutFooter && <Footer />}
        </BaseLayout>
    );
}

function Header({
    title = '',
    imageUrl = '',
    description = '',
    rate = undefined,
    headline = '',
    profileUrl = '',
    phoneImageUrl = '',
    imageSlider = []
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <HeaderContainer>
            <HeadaerText position={headline ? 'right' : 'left'} top={profileUrl ? '10%' : '50%'}>
                <Typography variant="h3">{title || headline}</Typography>
                {rate && <Rating value={rate} style={{ marginTop: '10px' }} />}
                {description && (
                    <HeaderDescription mt={3} variant="body1">
                        {description}
                    </HeaderDescription>
                )}
            </HeadaerText>
            {imageSlider.length > 0 ? (
                <ImageSlide imageSlider={imageSlider} />
            ) : (
                <BackgroundImage
                    src={matches ? phoneImageUrl : imageUrl}
                    alt="healing"
                    maxHeight={profileUrl ? '550px' : undefined}
                />
            )}
            {profileUrl && <ProfilePicture src={profileUrl} alt="profile" />}
        </HeaderContainer>
    );
}

function ImageSlide({ imageSlider }) {
    return (
        <Swiper
            centeredSlides
            loop={true}
            loopAdditionalSlides={imageSlider?.length + 1}
            mousewheel={{ releaseOnEdges: true, sensitivity: 1, thresholdTime: 100 }}
            modules={[Autoplay]}
            autoplay
            speed={2200}
            centerInsufficientSlides
            style={{ padding: '40px 0', backgroundColor: '#CDE5FC', minHeight: 599 }}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                900: {
                    slidesPerView: 4.2,
                    spaceBetween: 20
                }
            }}>
            {imageSlider.map((item, index) => (
                <SwiperSlide key={index}>
                    <SlideContainer index={index}>
                        <SlideImage src={item} />
                    </SlideContainer>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
