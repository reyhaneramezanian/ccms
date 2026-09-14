import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as residentstyle from '../../resident.style';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import * as Yup from 'yup';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
import {
    useFlat_GetFlatsQuery,
    useUser_GetCurrentAuthorizedUserQuery
} from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import storageKeys from 'src/data/storageKeys';
import utils from '@/utils/utils';

const personaledite = () => {
    const { data: dataresidentflats } = useUser_GetCurrentAuthorizedUserQuery();
    //Number(localStorage.getItem(storageKeys.activeResidentFlatId))
    const [complexitem, setcomplexitem] = useState(0);
    const [Blockitem, setBlockitem] = useState(0);
    const [Flooritem, setFlooritem] = useState(0);
    const [Flatname, setFlatname] = useState('');

    const { data: dataFlatidselect } = useFlat_GetFlatsQuery({
        where: { id: { eq: Number(localStorage.getItem(storageKeys.activeResidentFlatId)) } }
    });
    useEffect(() => {
        dataFlatidselect?.flat_getFlats?.result?.items?.map((item) => {
            setBlockitem(item.floor.block.name);
            setFlooritem(item.floor.name);
            setcomplexitem(item.floor.block.complex.name);
            setFlatname(item.name);
        });
    }, [dataFlatidselect]);

    return (
        <residentstyle.modalFormRowWrapper>
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
                        {utils.convertoLowerCase(
                            dataresidentflats?.user_getCurrentAuthorizedUser?.result?.residentFlat
                                ?.ownershipStatus
                        )}
                    </residentstyle.boxproperty>
                </residentstyle.cellprofile>
                <residentstyle.cellprofile>
                    <residentstyle.boxpropertytitle>Status</residentstyle.boxpropertytitle>
                    <residentstyle.boxproperty>
                        {' '}
                        {utils.convertoLowerCase(
                            dataresidentflats?.user_getCurrentAuthorizedUser?.result?.residentFlat
                                ?.activeStatus
                        )}
                    </residentstyle.boxproperty>
                </residentstyle.cellprofile>
            </residentstyle.rowprofile>
        </residentstyle.modalFormRowWrapper>
    );
};
export default personaledite;
