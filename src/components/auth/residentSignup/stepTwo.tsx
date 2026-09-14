import { MSelect } from '@/components/base/input/MSelect';
import { Box } from '@mui/material';
import { FC } from 'react';
import { ACTIVE_STATUS, OWNERSHIP_STATUS_OPTIONS } from 'src/data/options';

const ResidentSignUpStepTwo: FC<any> = ({ formik }) => {
    return (
        <Box>
            <MSelect
                name="activeStatus"
                label="Status"
                options={ACTIVE_STATUS}
                value={formik.values.activeStatus}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('activeStatus')}
            />
        </Box>
    );
};

export default ResidentSignUpStepTwo;
