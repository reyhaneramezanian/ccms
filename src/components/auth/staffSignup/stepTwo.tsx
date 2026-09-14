import { MInput } from '@/components/base/input/MInput';
import { Box } from '@mui/material';
import { FC } from 'react';

const StaffSignUpStepTwo: FC<any> = ({ formik }) => {
    return (
        <Box>
            <MInput
                name="phoneNumber"
                label="Primary phone"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('phoneNumber')}
            />

            <MInput
                name="alternatePhone"
                label="Alternate phone"
                value={formik.values.alternatePhone}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('alternatePhone')}
            />

            <MInput
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('email')}
            />

            <MInput
                name="alternateEmail"
                label="Alternate email"
                value={formik.values.alternateEmail}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('alternateEmail')}
            />

            <MInput
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('address')}
            />
        </Box>
    );
};

export default StaffSignUpStepTwo;
