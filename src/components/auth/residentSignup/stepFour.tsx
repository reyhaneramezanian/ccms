import { MInput } from '@/components/base/input/MInput';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const ResidentSignUpStepFour: FC<any> = ({ formik }) => {
    return (
        <Box>
            <MInput
                name="phoneNumber"
                label="Phone number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('phoneNumber')}
            />

            <MInput
                name="email"
                label="Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('email')}
            />

            <MInput
                name="alternativeContact"
                label="Alternative contact"
                value={formik.values.primaryContact}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('alternativeContact')}
                necessary={false}
            />
        </Box>
    );
};

export default ResidentSignUpStepFour;
