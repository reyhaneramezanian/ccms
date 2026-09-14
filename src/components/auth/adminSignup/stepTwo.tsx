import { MInputFormik } from '@/components/base/input/MInput';
import { MSelectFormik } from '@/components/base/input/MSelect';
import Utils from '@/utils/utils';
import { Box } from '@mui/material';
import { ACTIVE_STATUS } from 'src/data/options';
import defaultQueryOptions from 'src/data/queryOptions';

import React, { useEffect, useState } from 'react';

const SecuritySignUpStepTwo = () => {
    return (
        <Box>
            <MInputFormik
                inputMode="numeric"
                name="phoneNumber"
                label="Phone number"
                placeholder="Phone"
            />

            <MInputFormik name="email" label="Email address" placeholder="maria.smith@gmail.com" />
        </Box>
    );
};

export default SecuritySignUpStepTwo;
