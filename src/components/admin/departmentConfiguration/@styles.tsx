import COLORS from '@/utils/theme/colors';
import { Box } from '@material-ui/core';
import * as adminstyle from '../admin.style';
import { styled } from '@mui/system';

export const BuildingConfigurationTabWrapper = styled(Box)({
    marginTop: 27
});

export const BuildingConfigurationCard = styled(Box)({
    borderRadius: 8,
    border: `1px solid ${COLORS.secondary}`
});

export const BuildingConfigurationFilterTable = styled(adminstyle.container)({
    display: 'flex',
    alignItems: 'center'
});
