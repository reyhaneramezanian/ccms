import { Interpolation, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { ClassAttributes, ElementType, HTMLAttributes } from 'react';

type Style = Interpolation<
    {
        theme?: Theme;
        as?: ElementType<any>;
    } & ClassAttributes<HTMLElement> &
        HTMLAttributes<HTMLElement>
>;

const footerFlexShared: Style = {
    '@media(min-width:1000px)': {
        flex: 1
    },
    '@media(max-width:1000px)': {
        flexBasis: '30%'
    },
    '@media(max-width:700px)': {
        flexBasis: '45%'
    }
};

export const FooterContainer = styled.footer({
    height: '40px',
    position: 'fixed',
    backgroundColor: '#06060614',
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    rowGap: '20px',
    alignItems: 'center',
    marginTop: '30px',
    bottom: 0,
    justifyContent: 'space-evenly',
    '@media(max-width:1000px)': {
        height: '40px',
        padding: '20px 0'
    }
});

export const HealingTypeContainer = styled.div({
    textAlign: 'center',
    fontSize: '13px',
    fontFamily: 'Poppins !important',
    fontWeight: 'bold',
    width: 'auto',
    margin: '0 0 0 0',
    '@media(max-width:500px)': {
        margin: '-35px 0 0 0'
    }
    //...footerFlexShared
});

export const HealingTypeTitle = styled(Typography)({ marginBottom: '15px' });

export const HealingTypeBody = styled(Typography)({ marginBottom: '5px' });

export const FooterIcons = styled.div({
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '40px'
});

export const SocialSectionContainer = styled.div({
    textAlign: 'center',
    paddingRight: '20px',
    minWidth: '300px'
    //...footerFlexShared
});
