import EarthIcon from 'src/assets/footer/earth.icon';
import MailIcon from 'src/assets/footer/mail.icon';
import InstagramIcon from 'src/assets/footer/instagram.icon';
import { TextField, Typography } from '@mui/material';
import {
    FooterContainer,
    HealingTypeContainer,
    HealingTypeTitle,
    HealingTypeBody,
    FooterIcons,
    SocialSectionContainer
} from './styled.footer';
import Apsy from 'src/assets/icons/Apsy';

export default function Footer() {
    return (
        <FooterContainer>
            <HealingTypeContainer>Designed by apsy</HealingTypeContainer>
        </FooterContainer>
    );
}

function HealingType({ title = 'healing type', items = [] }) {
    return (
        <HealingTypeContainer>
            <HealingTypeTitle variant="h5">{title}</HealingTypeTitle>
            {items.map((item, index) => (
                <HealingTypeBody variant="h6" key={index}>
                    {item}
                </HealingTypeBody>
            ))}
        </HealingTypeContainer>
    );
}

function SocialSection() {
    return (
        <SocialSectionContainer>
            <Typography variant="h6" style={{ marginBottom: '20px' }}>
                Bring balance to your inbox
            </Typography>
            <TextField label="Enter email" />
            <FooterIcons>
                <EarthIcon />
                <MailIcon />
                <InstagramIcon />
            </FooterIcons>
        </SocialSectionContainer>
    );
}
