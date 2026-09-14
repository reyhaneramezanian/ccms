import { MSelect } from '@/components/base/input/MSelect';
import { Box } from '@mui/material';
import { FC } from 'react';
import { ACTIVE_STATUS, OWNERSHIP_STATUS_OPTIONS } from 'src/data/options';

const ResidentSignUpStepOne: FC<any> = ({ formik, complexes, blocks, floors, flats }) => {
    return (
        <Box>
            <MSelect
                name="ownershipStatus"
                label="Ownership"
                options={OWNERSHIP_STATUS_OPTIONS}
                value={formik.values.ownershipStatus}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('ownershipStatus')}
            />

            <MSelect
                name="complexId"
                label="Complex"
                options={complexes}
                value={formik.values.complexId}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('complexId')}
            />

            <MSelect
                name="blockId"
                label="Block"
                options={blocks}
                value={formik.values.blockId}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('blockId')}
            />

            <MSelect
                name="floorId"
                label="Floor"
                options={floors}
                value={formik.values.floorId}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('floorId')}
            />

            <MSelect
                name="flatId"
                label="Flat"
                options={flats}
                value={formik.values.flatId}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('flatId')}
            />
        </Box>
    );
};

export default ResidentSignUpStepOne;
