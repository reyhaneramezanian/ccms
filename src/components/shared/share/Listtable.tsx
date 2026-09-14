import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useFormikContext, getIn } from "formik";
import Table from "./Table";
import { MInputFormik} from '@/components/base/input/MInput';
import Delete from 'src/assets/icons/Deletelist';
import {Grid} from '@mui/material';

const EMPTY_ARR = [];

function Listtable({ name, handleAdd, handleRemove }) {
  const { values } = useFormikContext();

  // from all the form values we only need the "friends" part.
  // we use getIn and not values[name] for the case when name is a path like `social.facebook`
  const formikSlice = getIn(values, name) || EMPTY_ARR;
  const [tableRows, setTableRows] = useState(formikSlice);

  // we need this so the table updates after the timeout expires
  useEffect(() => {
    setTableRows(formikSlice);
  }, [formikSlice]);

  const onAdd = useCallback(() => {
    const newState = [...tableRows];
    const item = {
      id: Math.floor(Math.random() * 100) / 10,
      Complex: "",
      Status: ""
    };

    newState.push(item);
    setTableRows(newState);
    handleAdd(item);
  }, [handleAdd, tableRows]);

  const onRemove = useCallback(
    index => {
      const newState = [...tableRows];

      newState.splice(index, 1);
      setTableRows(newState);
      handleRemove(index);
    },
    [handleRemove, tableRows]
  );

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "id"
      },
      {
        Header: "Complex",
        id: "Complex",
        Cell: ({ row: { index } }) => (
          <MInputFormik style={{  backgroundColor:'#F2F3F7'}}
          name={`${name}[${index}].Complex`} label="Complex name" fullWidth/>
        )
      },
      {
        Header: "Status",
        id: "Status",
        Cell: ({ row: { index } }) => (
          <MInputFormik style={{  backgroundColor:'#F2F3F7'}}
          name={`${name}[${index}].Status`} label="Status" fullWidth/>
        )
      },
      {
        Header: "",
        id: "actions",
        Cell: ({ row: { index } }) => (
          <Delete  onClick={() => onRemove(index)} />
        
        )
      }
    ],
    [name, onRemove]
  );

  return (
    <Grid container >
      <Grid item xs={12} sm={12} md={12} lg={12} >
        <button type="button" onClick={onAdd}>
          add
        </button>
      </Grid>
      <Table data={tableRows} columns={columns} rowKey="id" />
    </Grid>
  );
}

export default React.memo(Listtable);
