import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import TickClose from './tick-close';
import ImageTable from './image-table';

const CustomTableCell = styled(TableCell)(({theme})=>({
    borderBottom: 'none',
    padding:'20px 0',
    minWidth:'3vw',
    [theme.breakpoints.down('sm')]: {
        minWidth:'22vw',
    }
}))

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Client Name', "Service Type", "SESSION NAME", "+1 646 980 4741"),
    createData('Client Name', "Service Type", "SESSION NAME", "+1 646 980 4741"),
    createData('Client Name', "Service Type", "SESSION NAME", "+1 646 980 4741"),
    createData('Client Name', "Service Type", "SESSION NAME", "+1 646 980 4741"),
    createData('Client Name', "Service Type", "SESSION NAME", "+1 646 980 4741"),
];

export default function BasicTable() {
    return (
        <TableContainer>
            <Table sx={{ boxShadow: 'none' }}>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <CustomTableCell align="left"><ImageTable value="/images/yoga1.jpg" /></CustomTableCell>
                            <CustomTableCell align="left">{row.name}</CustomTableCell>
                            <CustomTableCell align="left">{row.calories}</CustomTableCell>
                            <CustomTableCell align="left">{row.fat}</CustomTableCell>
                            <CustomTableCell align="left">{row.carbs}</CustomTableCell>
                            <CustomTableCell align="left"><TickClose /></CustomTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
