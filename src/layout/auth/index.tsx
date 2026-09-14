import { FC } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import getRoleText from 'src/data/roleText';
import { UserType } from 'src/graphql/generated';
import BaseLayout from '../base';
import * as S from './auth.styles';
import { IAuthLayoutProps } from './types.auth';
//import Carousel from 'react-elastic-carousel';
import SwiftSlider from 'react-swift-slider';
import Footer from '@/components/footer';

const breakPoints = [{ width: 1, itemsToShow: 1 }];
const AuthLayout: FC<IAuthLayoutProps> = ({ type, children, role }) => {
    const images = {
        [getRoleText(UserType.SuperAdmin)]: '/images/auth_page/admin.png',
        [getRoleText(UserType.Resident)]: '/images/auth_page/resident.png',
        [getRoleText(UserType.Security)]: '/images/auth_page/security.png',
        [getRoleText(UserType.Staff)]: '/images/auth_page/staff.png'
    };

    const data = [
        { id: '1', src: '/images/auth_page/admin.png' },
        { id: '2', src: '/images/auth_page/resident.png' },
        { id: '3', src: '/images/auth_page/security.png' },
        { id: '4', src: '/images/auth_page/staff.png' }
    ];
    return (
        <BaseLayout>
            <S.AuthLayoutWrapper>
                <S.AuthLayoutSlider>
                    {type === 'signin' && (
                        <SwiftSlider data={data} enableNextAndPrev={false} />

                        /* <SimpleImageSlider
                            width="600px"
                            height="400px"
                            images={[
                                images[getRoleText(UserType.Resident)],
                                images[getRoleText(UserType.Security)],
                                images[getRoleText(UserType.Staff)],
                                images[getRoleText(UserType.SuperAdmin)]
                            ]}
                            showBullets={true}
                            showNavs={false}
                            autoPlay={true}
                            autoPlayDelay={3}
                            style={{
                                backgroundColor: 'transparent',
                                objectFit: 'contain',
                                height: '400px'
                            }}
                        />*/
                    )}

                    {type === 'signup' && <img src={images[role]} alt="" draggable="false" />}
                </S.AuthLayoutSlider>

                <S.AuthLayoutCard style={{ overflow: 'scroll', height: '600px' }}>
                    <S.SignInTitle>
                        {type === 'signin' && 'Sign in to your account'}

                        {type === 'signup' && 'Create your account'}
                    </S.SignInTitle>

                    {children}
                </S.AuthLayoutCard>
            </S.AuthLayoutWrapper>
            <Footer />
        </BaseLayout>
    );
};

export default AuthLayout;
