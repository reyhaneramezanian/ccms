import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as residentstyle from '../../resident.style';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import * as Yup from 'yup';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
import { useFlat_GetFlatsQuery, useUser_GetCurrentResidentQuery } from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import storageKeys from 'src/data/storageKeys';
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import utils from '@/utils/utils';
import AddButton from '@/components/addButton';
import AddPeroperty from './addModal';

const personaledite = () => {
    const dispatch = useDispatch();

    const { data: dataresidentflats } = useUser_GetCurrentResidentQuery();
    //Number(localStorage.getItem(storageKeys.activeResidentFlatId))
    const [complexitem, setcomplexitem] = useState(0);
    const [Blockitem, setBlockitem] = useState(0);
    const [Flooritem, setFlooritem] = useState(0);
    const [Flatitem, setFlatitem] = useState(0);
    const [Flatname, setFlatname] = useState('');

    const [activeStatus, setactiveStatus] = useState(undefined);
    const [ownershipStatus, setownershipStatus] = useState(undefined);

    const { data: dataFlatidselect } = useFlat_GetFlatsQuery({
        where: { id: { eq: Number(localStorage.getItem(storageKeys.activeResidentFlatId)) } }
    });
    useEffect(() => {
        dataresidentflats?.user_getCurrentResident?.result?.residentFlats?.map((item) => {
            setactiveStatus(item.activeStatus);
            setownershipStatus(item.ownershipStatus);
            setFlatitem(Number(localStorage.getItem(storageKeys.activeResidentFlatId)));
        });
        dataFlatidselect?.flat_getFlats?.result?.items?.map((item) => {
            setBlockitem(item.floor.block.name);
            setFlooritem(item.floor.name);
            setcomplexitem(item.floor.block.complex.name);
            setFlatname(item.name);
        });
    }, [dataresidentflats, dataFlatidselect]);
    const onclickproperty = () => {
        dispatch(AddPeroperty());
    };
    return (
        <residentstyle.modalFormRowWrapper>
            <AddButton onClick={onclickproperty}>Add property</AddButton>
            <residentstyle.rowprofile>
                <residentstyle.cellprofile>
                    <residentstyle.boxpropertytitle>Complex</residentstyle.boxpropertytitle>
                    <residentstyle.boxproperty>{complexitem}</residentstyle.boxproperty>
                </residentstyle.cellprofile>
                <residentstyle.cellprofile>
                    <residentstyle.boxpropertytitle>Block</residentstyle.boxpropertytitle>
                    <residentstyle.boxproperty>{Blockitem}</residentstyle.boxproperty>
                </residentstyle.cellprofile>
                <residentstyle.cellprofile>
                    <residentstyle.boxpropertytitle>Floor</residentstyle.boxpropertytitle>
                    <residentstyle.boxproperty>{Flooritem}</residentstyle.boxproperty>
                </residentstyle.cellprofile>
            </residentstyle.rowprofile>
            <residentstyle.rowprofile>
                <residentstyle.cellprofile>
                    <residentstyle.boxpropertytitle>Flat</residentstyle.boxpropertytitle>
                    <residentstyle.boxproperty>{Flatname}</residentstyle.boxproperty>
                </residentstyle.cellprofile>
                <residentstyle.cellprofile>
                    <residentstyle.boxpropertytitle>Ownership</residentstyle.boxpropertytitle>
                    <residentstyle.boxproperty>
                        {utils.convertoLowerCase(ownershipStatus)}
                    </residentstyle.boxproperty>
                </residentstyle.cellprofile>
                <residentstyle.cellprofile>
                    <residentstyle.boxpropertytitle>Status</residentstyle.boxpropertytitle>
                    <residentstyle.boxproperty>
                        {utils.convertoLowerCase(activeStatus)}
                    </residentstyle.boxproperty>
                </residentstyle.cellprofile>
            </residentstyle.rowprofile>
        </residentstyle.modalFormRowWrapper>
    );
};
export default personaledite;
