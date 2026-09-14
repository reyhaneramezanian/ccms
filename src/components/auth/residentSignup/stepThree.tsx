import { MInput } from '@/components/base/input/MInput';
import { MSelect } from '@/components/base/input/MSelect';
import { Box } from '@mui/material';
import { FC } from 'react';
import { GenderOption } from 'src/data/options';

const ResidentSignUpStepThree: FC<any> = ({ formik }) => {
    return (
        <Box>
            <MInput
                name="firstName"
                label="First name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('firstName')}
            />
            <MInput
                name="middleName"
                label="Middle name"
                value={formik.values.middleName}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('middleName')}
                necessary={false}
            />
            <MInput
                name="lastName"
                label="Surname"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('lastName')}
            />

            <MSelect
                name="gender"
                label="Gender"
                options={GenderOption}
                value={formik.values.gender}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('gender')}
                necessary={false}
            />

            <MInput
                type="date"
                name="dateOfBirth"
                label="Date of birth"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('dateOfBirth')}
            />
        </Box>
    );
};

export default ResidentSignUpStepThree;
