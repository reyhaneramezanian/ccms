import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Tabs from '@/components/tabs/tabs';

export const ProfileFormBox = styled(Box)({
    marginTop: 48
});

export const ProfileTitle = styled(Typography)({
    marginBottom: 16
});

export const PersonalInformationWrapper = styled(ProfileFormBox)({
    marginTop: 23
});

export const PersonalInformationTitle = styled(ProfileTitle)({});

export const CareerInformationWrapper = styled(ProfileFormBox)({});

export const SecurityProfileTabs = styled(Tabs)({
    margin: '32px 0'
});
