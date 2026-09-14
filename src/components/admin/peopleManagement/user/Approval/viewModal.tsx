import { FC } from 'react';
import { Checkbox, Box, Button, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import {
    useUser_GetResidentsQuery,
    useUser_GetStaffsQuery,
    useUser_GetSecuritiesQuery
} from 'src/graphql/generated';
import React, { useState, useEffect } from 'react';
import Utils from '@/utils/utils';
import Checkicon from 'src/assets/icons/checkicon';
import utils from '@/utils/utils';

const PeopleViewModal: FC<IModalBodyProps<RowTable>> = ({ data: { row } }) => {
    const dispatch = useDispatch();
    const [datauserresident, setdatauserresident] = useState([]);
    const [datauserstaff, setdatauserstaff] = useState([]);
    const [datausersecurity, setdatausersecurity] = useState([]);
    const [complexselect, setcomplexselect] = useState([]);

    const { data: dataresident } = useUser_GetResidentsQuery({
        where: { id: { eq: Number(row.id) } }
    });
    const { data: datastaff } = useUser_GetStaffsQuery({
        where: { id: { eq: Number(row.id) } }
    });
    const { data: datasecurity } = useUser_GetSecuritiesQuery({
        where: { id: { eq: Number(row.id) } }
    });
    useEffect(() => {
        var jsresident = [],
            jsstaff = [],
            jssecurity = [];
        dataresident?.user_getResidents?.result?.items?.map((item) => {
            jsresident.push({
                Phone: item.phoneNumber,
                Email: item.email,
                firstName: item.firstName,
                middleName: item.middleName,
                lastName: item.lastName,
                activeStatus: utils.convertoLowerCase(item.activeStatus),
                gender: utils.convertoLowerCase(item.gender),
                dateOfBirth: item.dateOfBirth.slice(0, 11).replaceAll('-', '/'),
                primaryContact: item.alternativeContact,
                Owership: item.residentFlats.map((item) =>
                    utils.convertoLowerCase(item.ownershipStatus)
                ),
                Complexname: item.residentFlats.map((item) => item.flat.floor.block.complex.name),
                Blockname: item.residentFlats.map((item) => item.flat.floor.block.name),
                Floorname: item.residentFlats.map((item) => item.flat.floor.name),
                Flatname: item.residentFlats.map((item) => item.flat.name)
            });
        });
        datasecurity?.user_getSecurities?.result?.items?.map((item) => {
            jssecurity.push({
                Phone: item.phoneNumber,
                Email: item.email,
                activeStatus: utils.convertoLowerCase(item.activeStatus),
                Firstname: item.firstName,
                middleName: item.middleName,
                Lastname: item.lastName,
                gender: utils.convertoLowerCase(item.gender),
                dateOfBirth: item.dateOfBirth.slice(0, 11).replaceAll('-', '/'),
                Complex: item.complex.name
            });
        });
        datastaff?.user_getStaffs?.result?.items?.map((item) => {
            jsstaff.push({
                Phone: item.phoneNumber,
                Email: item.email,
                activeStatus: utils.convertoLowerCase(item.activeStatus),
                Department: item.department.name,
                firstName: item.firstName,
                lastName: item.lastName,
                middleName: item.middleName,
                dateOfJoining: item.dateOfJoining.slice(0, 11).replaceAll('-', '/'),
                dateOfBirth: item.dateOfBirth.slice(0, 11).replaceAll('-', '/'),
                dateOfTermination: item.dateOfTermination.slice(0, 11).replaceAll('-', '/'),
                //  role: item.role,
                alternateEmail: item.alternateEmail,
                alternatePhone: item.alternatePhone,
                address: item.address,
                gender: utils.convertoLowerCase(item.gender),
                employeeType: item.employmentType.name,
                head: item.departmentManagers.length > 0 ? true : false
            });
        });
        setdatauserstaff(jsstaff);
        setdatausersecurity(jssecurity);
        setdatauserresident(jsresident);
    }, [dataresident, datasecurity, datastaff]);
    useEffect(() => {
        var js = [];
        datastaff?.user_getStaffs?.result?.items?.map((item) => {
            item?.staffComplexes?.map((items) => {
                js.push(items.complex.name + ' , ');
            });
        });
        setcomplexselect(js);
    }, [datastaff]);

    const handleCancel = () => {
        dispatch(closeModal(PeopleViewModal.name));
    };
    console.log(datauserresident);
    return (
        <adminstyle.modalbox style={{ width: 700 }}>
            <adminstyle.modalFormRowWrapper>
                {row.Type === 'Resident'
                    ? datauserresident?.map((item) => (
                          <Grid container>
                              <Grid item xs={12} sm={12} md={12} lg={12}>
                                  <adminstyle.headdetail>
                                      <adminstyle.tiltelhead>
                                          Personal information
                                      </adminstyle.tiltelhead>
                                      <adminstyle.hrhead>
                                          <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                                      </adminstyle.hrhead>
                                  </adminstyle.headdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>First name</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.firstName}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Middle name</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.middleName}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Surname</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.lastName}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Gender</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.gender}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Phone number</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Phone}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6}>
                                  <adminstyle.titledetail>Email address</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Email}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6}>
                                  <adminstyle.titledetail>Primary contact</adminstyle.titledetail>
                                  <adminstyle.textdetail>
                                      {item.primaryContact}
                                  </adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12}>
                                  <adminstyle.headdetail>
                                      <adminstyle.tiltelhead>
                                          Property information
                                      </adminstyle.tiltelhead>
                                      <adminstyle.hrhead>
                                          <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                                      </adminstyle.hrhead>
                                  </adminstyle.headdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Complex </adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Complexname}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Block name</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Blockname}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Floor name</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Floorname}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Flat name</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Flatname}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Ownership</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Owership}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Status</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.activeStatus}</adminstyle.textdetail>
                              </Grid>
                          </Grid>
                      ))
                    : row.Type == 'Security'
                    ? datausersecurity?.map((item) => (
                          <Grid container>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>First name</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Firstname}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Middle name</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.middleName}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Surname</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Lastname}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Gender</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.gender}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Date of birth</adminstyle.titledetail>
                                  <adminstyle.textdetail>
                                      {item.dateOfBirth?.slice(0, 10)}
                                  </adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Complex </adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Complex}</adminstyle.textdetail>
                              </Grid>

                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Phone number</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Phone}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={8} lg={8}>
                                  <adminstyle.titledetail>Email address</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Email}</adminstyle.textdetail>
                              </Grid>
                          </Grid>
                      ))
                    : datauserstaff?.map((item) => (
                          <Grid container>
                              <adminstyle.headdetail>
                                  <adminstyle.tiltelhead>
                                      Personal information
                                  </adminstyle.tiltelhead>
                                  <adminstyle.hrhead>
                                      <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                                  </adminstyle.hrhead>
                              </adminstyle.headdetail>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>First name</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.firstName}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Middle name</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.middleName}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Surname</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.lastName}</adminstyle.textdetail>
                              </Grid>

                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Gender</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.gender}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Date of birth</adminstyle.titledetail>
                                  <adminstyle.textdetail>
                                      {item.dateOfBirth?.slice(0, 10)}
                                  </adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12}>
                                  <adminstyle.headdetail>
                                      <adminstyle.tiltelhead>
                                          Contact information
                                      </adminstyle.tiltelhead>
                                      <adminstyle.hrhead>
                                          <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                                      </adminstyle.hrhead>
                                  </adminstyle.headdetail>
                              </Grid>

                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Primary phone</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Phone}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Alternative phone</adminstyle.titledetail>
                                  <adminstyle.textdetail>
                                      {item.alternatePhone}
                                  </adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6}>
                                  <adminstyle.titledetail>Primary email</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Email}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6}>
                                  <adminstyle.titledetail>Alternative email</adminstyle.titledetail>
                                  <adminstyle.textdetail>
                                      {item.alternateEmail}
                                  </adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12}>
                                  <adminstyle.titledetail>Address</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.address}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12}>
                                  <adminstyle.headdetail>
                                      <adminstyle.tiltelhead>
                                          Property information
                                      </adminstyle.tiltelhead>
                                      <adminstyle.hrhead>
                                          <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                                      </adminstyle.hrhead>
                                  </adminstyle.headdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12}>
                                  <adminstyle.titledetail>Complex</adminstyle.titledetail>
                                  <adminstyle.textdetail>{complexselect}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Department</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.Department}</adminstyle.textdetail>
                              </Grid>

                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Employment type</adminstyle.titledetail>
                                  <adminstyle.textdetail>
                                      {item?.employeeType}
                                  </adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Date of joining</adminstyle.titledetail>
                                  <adminstyle.textdetail>
                                      {item.dateOfJoining?.slice(0, 10)}
                                  </adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>
                                      Date of termination
                                  </adminstyle.titledetail>
                                  <adminstyle.textdetail>
                                      {item.dateOfTermination?.slice(0, 10)}
                                  </adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>Status</adminstyle.titledetail>
                                  <adminstyle.textdetail>{item.activeStatus}</adminstyle.textdetail>
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                  <adminstyle.titledetail>
                                      Head of department
                                  </adminstyle.titledetail>
                                  <Checkbox
                                      checked={item.head}
                                      disabled
                                      defaultChecked
                                      checkedIcon={<Checkicon />}
                                  />
                              </Grid>
                          </Grid>
                      ))}
            </adminstyle.modalFormRowWrapper>
            <adminstyle.modalButtonGroup>
                <Box>
                    <Button variant="contained" color="primary" onClick={handleCancel}>
                        ok
                    </Button>
                </Box>
            </adminstyle.modalButtonGroup>
        </adminstyle.modalbox>
    );
};

const handleShowPeopleViewModal = (row?: RowTable) => {
    return newModal({
        Body: PeopleViewModal,
        title:
            row.Type === 'Resident'
                ? 'View resident '
                : row.Type === 'Staff'
                ? 'View staff '
                : 'View security ',
        topBar: true,
        id: PeopleViewModal.name,
        data: { row }
    });
};

export default handleShowPeopleViewModal;
