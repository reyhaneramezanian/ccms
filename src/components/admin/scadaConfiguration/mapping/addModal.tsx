import { Formik, Form, FieldArray,Field } from "formik";
import * as Yup from 'yup';
import { MInputFormik} from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { useDispatch } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import {Grid, Typography, Button, Box} from '@mui/material';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import Delete from 'src/assets/icons/Deletelist'
import { Custom } from 'src/components/shared/share/tick-close';
import { RowTable } from '@/components/table/table_layout/types.table.layout';


const ScadaConfigurationAddModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
      dispatch(closeModal(ScadaConfigurationAddModal.name));
  };

  return (
      <Box >
           <Formik initialValues={{Company:'',Description:'',Status:''}} 
              enableReinitialize
              onSubmit={(v, handlers) => {
              }}
              validationSchema={Yup.object({
                  Company: Yup.string().required('This field is required'),
                  Description: Yup.string().required('This field is required'),
                  Status: Yup.string().required('This field is required'),

              })}>
              <Form>
              <Box mt={1}>
                  <Grid container >
                  <Grid item md={12} xs={12}>
                      <Grid container display="flex" justifyContent="center">
                      <Grid item md={11} xs={12} mb={4} mt={4} style={{margin:0}}>
                          <MInputFormik style={{  width:'90%'}} name="Company" 
                          label="Company name" placeholder="Company name" fullWidth/>
                      </Grid>
                      <Grid item md={11} xs={12} mb={4} mt={4} style={{margin:0}}>
                          <MInputFormik style={{ width:'90%'}} name="Description" 
                          label="Description" placeholder="Description" fullWidth/>
                      </Grid>
                      <Grid item md={11} xs={12} mb={4} mt={4} style={{margin:0}}>
                          <MInputFormik style={{  width:'90%'}} name="Status" 
                          label="Status" placeholder="Status" fullWidth/>
                      </Grid>
                      </Grid>
                  </Grid>
                  </Grid>
              </Box>

              <adminstyle.modalButtonGroup>
                    <Box>
                        <Button variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>

                    <Box>
                        <Button variant="outlined" color="grey3" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </adminstyle.modalButtonGroup>
          </Form>
      </Formik>
      </Box>
  );
};

const handleShowScadaConfigurationAddModal = (data?: RowTable) => {
  return newModal({
      Body: ScadaConfigurationAddModal,
      title: `${typeof data === 'undefined' ? 'Add' : 'Edit'} SCADA mapping`,
      topBar: true,
      id: ScadaConfigurationAddModal.name,
      data
  });
};

export default handleShowScadaConfigurationAddModal;

