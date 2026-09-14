import styled from '@emotion/styled';
import { Container } from '@/components/base/view-container/Container';
import { MText } from '@/components/base/MText';
import { Grid, withStyles } from '@material-ui/core';

export const FormSectionInnerWrapper = styled(Container)({
    backgroundColor: '#FFF',
    padding: '10px',
    borderRadius: 10
});

export const FormSectionInnerGrid = styled(FormSectionInnerWrapper.withComponent(Grid))({
    padding: '30px !important'
});

export const FormSectionOuterWrapper = styled(Container)({});

export const FormTitleSection = styled(MText)(({ theme }) => ({
    ...theme.typography.h4,
    fontWeight: '700',
    marginBottom: 20
}));

export const FormSubtitleSection = styled(MText)(({ theme }) => ({
    ...theme.typography.h5,
    fontWeight: '700',
    marginBottom: 10
}));
