import { useState } from 'react';
import Cards from '../cards/cards';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Typography, Select as MUISelect, Button, ButtonProps } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

type Props = {
    title: string;
    data: Array<any>;
    mt?: number | string;
    ml?: number | string;
    sortOptions?: Array<[string, string]>;
    buttons?: Array<ButtonProps & { label: string }>;
};

export default function HealingContainer({
    title,
    data,
    mt = 0,
    ml = 1,
    sortOptions,
    buttons
}: Props) {
    return (
        <div style={{ padding: '15px 20px', position: 'relative' }}>
            <div style={{ float: 'right', display: 'flex', gap: '20px' }}>
                {buttons?.map?.(({ label, ...rest }, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        style={{ borderRadius: '20px', minWidth: '200px' }}
                        {...rest}>
                        {label}
                    </Button>
                ))}
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: mt,
                    marginBottom: '20px'
                }}>
                <Typography variant="h5" fontWeight="bold" ml={ml}>
                    {title}
                </Typography>
                <div style={{ flex: 1 }} />
                {sortOptions?.length > 0 && <Select options={sortOptions} />}
            </div>
            <Cards data={data} />
        </div>
    );
}

function Select({ options = [] }) {
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: '200px' }}>
            <FormControl fullWidth>
                <InputLabel>Sort</InputLabel>
                <MUISelect
                    value={age}
                    label="Sort"
                    onChange={handleChange}
                    size="small"
                    style={{ borderRadius: '20px' }}>
                    {options.map(([text, value], index) => (
                        <MenuItem key={index} value={value}>
                            {text}
                        </MenuItem>
                    ))}
                </MUISelect>
            </FormControl>
        </Box>
    );
}
