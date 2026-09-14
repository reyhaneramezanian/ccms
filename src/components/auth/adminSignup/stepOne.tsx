import { MInputFormik } from '@/components/base/input/MInput';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { Box } from '@mui/material';
import { GenderOption } from 'src/data/options';

const SecuritySignUpStepOne = () => {
    return (
        <Box>
            <MInputFormik name="firstName" label="First name" placeholder="First name" />
            <MInputFormik
                name="middleName"
                label="Middle name"
                placeholder="Middle name"
                necessary={false}
            />
            <MInputFormik name="lastName" label="Surname" placeholder="Surname" />

            <MSelectFormik name="gender" label="Gender" options={GenderOption} necessary={false} />

            <MInputFormik
                style={{ width: '100%' }}
                name="dateOfBirth"
                label="Date of birth"
                placeholder="Date of birth"
                fullWidth
                type="date"
            />
        </Box>
    );
};

export default SecuritySignUpStepOne;
