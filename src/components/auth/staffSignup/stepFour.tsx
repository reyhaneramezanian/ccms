import { MInput } from '@/components/base/input/MInput';
import { MSelect } from '@/components/base/input/MSelect';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { ACTIVE_STATUS, STAFF_ROLE_OPTIONS } from 'src/data/options';

const ResidentSignUpStepFour: FC<any> = ({ formik }) => {
    return (
        <Box>
            <MInput
                type="date"
                name="dateOfJoining"
                label="Date of joining"
                value={formik.values.dateOfJoining}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('dateOfJoining')}
            />

            <MInput
                type="date"
                name="dateOfTermination"
                label="Date of termination"
                value={formik.values.dateOfTermination}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('dateOfTermination')}
            />
        </Box>
    );
};

export default ResidentSignUpStepFour;
