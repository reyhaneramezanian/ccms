import React, { useState, useEffect } from 'react';
import { styled, Modal, Grid, Box, Typography, Card, Button, Container } from '@mui/material';
import { Custom } from './tick-close';
import Seeicon from 'src/assets/icons/see';
import * as adminstyle from '@/components/admin/admin.style';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    borderRadius: '7px !important',
    border: '0px solid #fff !important',
    p: 2
};
const CustomDiv = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '70px'
});

const EditDelete = ({ value }) => {
    const [show, setShow] = useState(false);
    const handleModal = () => {
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };
    return (
        <>
            <CustomDiv>
                {value?.length > 1 ? (
                    <Custom onClick={() => handleModal()}>
                        <Seeicon />
                    </Custom>
                ) : value?.length == 1 ? (
                    <adminstyle.CustomDiv title={value[0]?.complex?.name}>
                        {value[0]?.complex?.name}
                    </adminstyle.CustomDiv>
                ) : (
                    ''
                )}
            </CustomDiv>
            <Modal
                style={{ border: '0px solid #fff !important' }}
                keepMounted
                open={show}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description">
                <Box sx={style}>
                    <Grid alignItems="center" justifyContent="center" container direction="row">
                        {value?.length > 0
                            ? value?.map((item, index) => (
                                  <adminstyle.titledetail>
                                      {item?.complex?.name}
                                  </adminstyle.titledetail>
                              ))
                            : ''}
                        <Grid item md={12}>
                            <Button variant="contained" color="primary" onClick={handleClose}>
                                ok
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default EditDelete;
