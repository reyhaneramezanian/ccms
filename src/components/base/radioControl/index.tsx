import { Radio } from '@mui/material';
import Radioiconchecked from 'src/assets/icons/radiocheked';
import Radioicon from 'src/assets/icons/radio';

const RadioControl = ({ ...props }) => {
    return <Radio checkedIcon={<Radioiconchecked />} icon={<Radioicon />} {...props} />;
};

export default RadioControl;
