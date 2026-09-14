import React,{useState} from 'react'
import { styled } from '@mui/system';
import {Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from 'src/redux/actions/actions';

const checkbox = ({value})=>{
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);

    const handleChange = (e)=>{
        var js=pageData.checktable
        if(e.target.value===true)
        {
            js.push(value)
            dispatch(setPageData({ ...pageData,checktable:js }))
        }
        else{
            var list =js.filter((item)=>item!==value)
            dispatch(setPageData({ ...pageData,checktable:list }))
        }
    }

    return (
        <Checkbox onChange={()=>{handleChange}}  />
    )
}

export default checkbox;
