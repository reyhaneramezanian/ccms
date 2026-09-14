import { FC } from 'react';
import { Typography, Grid, Box, Button, Checkbox } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as staffstyle from '../staff.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { useUser_GetMyStaffsQuery } from 'src/graphql/generated';
import { useRouter } from 'next/router';
import { getFullImageUrl } from '@/utils/helper/ui';
import Utils from '@/utils/utils';
import { useEffect, useState } from 'react';

function StaffViewModal() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [MANday, setMANday] = useState(false);
    const [TUSday, setTUSday] = useState(false);
    const [WENday, setWENday] = useState(false);
    const [THUday, setTHUday] = useState(false);
    const [FRIday, setFRIday] = useState(false);
    const [SATday, setSATday] = useState(false);
    const [SUNday, setSUNday] = useState(false);

    const { data: datauser } = useUser_GetMyStaffsQuery({
        where: { id: { eq: parseInt(router.query?.pid?.toString()) } }
    });
    useEffect(() => {
        datauser?.user_getMyStaffs?.result?.items?.forEach((item) => {
            item.timeSheets.forEach((i) => {
                if (i.dayOfWeek === 'MONDAY') setMANday(true);
                if (i.dayOfWeek === 'TUESDAY') setTUSday(true);
                if (i.dayOfWeek === 'WEDNESDAY') setWENday(true);
                if (i.dayOfWeek === 'THURSDAY') setTHUday(true);
                if (i.dayOfWeek === 'FRIDAY') setFRIday(true);
                if (i.dayOfWeek === 'SATURDAY') setSATday(true);
                if (i.dayOfWeek === 'SUNDAY') setSUNday(true);
            });
        });
    }, [datauser]);
    return (
        <Grid container style={{ backgroundColor: '#fff', borderRadius: 8 }}>
            {datauser?.user_getMyStaffs?.result?.items?.map((value) => (
                <>
                    <staffstyle.rowpage style={{ margin: '20px 0 0 0' }}>
                        <staffstyle.image>
                            {datauser?.user_getMyStaffs?.result?.items?.map((item) => (
                                <staffstyle.profileimguser
                                    style={{ margin: '20px 0 0 0' }}
                                    src={
                                        item.photoUrl == undefined
                                            ? '/images/men.png'
                                            : getFullImageUrl(item.photoUrl)
                                    }
                                />
                            ))}
                        </staffstyle.image>
                        <staffstyle.profilenameuser>
                            {value.firstName + ' ' + value.lastName}
                        </staffstyle.profilenameuser>
                    </staffstyle.rowpage>
                    <staffstyle.rowpage>
                        <staffstyle.cellpage>
                            <staffstyle.headdetail>
                                <staffstyle.tiltelhead>Personal information</staffstyle.tiltelhead>
                                <staffstyle.hrhead>
                                    <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                                </staffstyle.hrhead>
                            </staffstyle.headdetail>
                        </staffstyle.cellpage>
                    </staffstyle.rowpage>
                    <staffstyle.rowpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>First name</staffstyle.titledetail>
                            <staffstyle.textdetail>{value.firstName}</staffstyle.textdetail>
                        </staffstyle.cellpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Surname</staffstyle.titledetail>
                            <staffstyle.textdetail>{value.lastName}</staffstyle.textdetail>
                        </staffstyle.cellpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Middle name</staffstyle.titledetail>
                            <staffstyle.textdetail>{value.middleName}</staffstyle.textdetail>
                        </staffstyle.cellpage>
                    </staffstyle.rowpage>
                    <staffstyle.rowpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Gender</staffstyle.titledetail>
                            <staffstyle.textdetail>{value.gender}</staffstyle.textdetail>
                        </staffstyle.cellpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Date of birth</staffstyle.titledetail>
                            <staffstyle.textdetail>
                                {value.dateOfBirth.slice(0, 10)}
                            </staffstyle.textdetail>
                        </staffstyle.cellpage>
                        <staffstyle.cellpage></staffstyle.cellpage>
                    </staffstyle.rowpage>
                    <staffstyle.rowpage>
                        <staffstyle.cellpage>
                            <staffstyle.headdetail>
                                <staffstyle.tiltelhead>Contact information</staffstyle.tiltelhead>
                                <staffstyle.hrhead>
                                    <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                                </staffstyle.hrhead>
                            </staffstyle.headdetail>
                        </staffstyle.cellpage>
                    </staffstyle.rowpage>
                    <staffstyle.rowpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Primary phone</staffstyle.titledetail>
                            <staffstyle.textdetail>{value.phoneNumber}</staffstyle.textdetail>
                        </staffstyle.cellpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Alternative phone</staffstyle.titledetail>
                            <staffstyle.textdetail>{value.alternatePhone}</staffstyle.textdetail>
                        </staffstyle.cellpage>
                    </staffstyle.rowpage>
                    <staffstyle.rowpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Primary email</staffstyle.titledetail>
                            <staffstyle.textdetail>{value.email}</staffstyle.textdetail>
                        </staffstyle.cellpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Alternative email</staffstyle.titledetail>
                            <staffstyle.textdetail>{value.alternateEmail}</staffstyle.textdetail>
                        </staffstyle.cellpage>
                    </staffstyle.rowpage>
                    <staffstyle.rowpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Address</staffstyle.titledetail>
                            <staffstyle.textdetail>{value.address}</staffstyle.textdetail>
                        </staffstyle.cellpage>
                    </staffstyle.rowpage>
                    <staffstyle.rowpage>
                        <staffstyle.cellpage>
                            <staffstyle.headdetail>
                                <staffstyle.tiltelhead>Career information</staffstyle.tiltelhead>
                                <staffstyle.hrhead>
                                    <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                                </staffstyle.hrhead>
                            </staffstyle.headdetail>
                        </staffstyle.cellpage>
                    </staffstyle.rowpage>
                    <staffstyle.rowpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Employee type</staffstyle.titledetail>
                            <staffstyle.textdetail>
                                {value.employmentType.name}
                            </staffstyle.textdetail>
                        </staffstyle.cellpage>

                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Date of joining</staffstyle.titledetail>
                            <staffstyle.textdetail>
                                {value.dateOfJoining.slice(0, 10)}
                            </staffstyle.textdetail>
                        </staffstyle.cellpage>
                        <staffstyle.cellpage>
                            <staffstyle.titledetail>Date of termination</staffstyle.titledetail>
                            <staffstyle.textdetail>
                                {value.dateOfTermination.slice(0, 10)}
                            </staffstyle.textdetail>
                        </staffstyle.cellpage>
                    </staffstyle.rowpage>
                    <staffstyle.rowpage>
                        <staffstyle.boxday
                            style={{
                                backgroundColor: `${MANday ? '#409FFF' : '#F2F3F7'}`,
                                color: `${MANday ? '#fff' : '#3B3B3B'}`
                            }}>
                            MON
                        </staffstyle.boxday>
                        <staffstyle.boxday
                            style={{
                                backgroundColor: `${TUSday ? '#409FFF' : '#F2F3F7'}`,
                                color: `${TUSday ? '#fff' : '#3B3B3B'}`
                            }}>
                            TUE
                        </staffstyle.boxday>
                        <staffstyle.boxday
                            style={{
                                backgroundColor: `${WENday ? '#409FFF' : '#F2F3F7'}`,
                                color: `${WENday ? '#fff' : '#3B3B3B'}`
                            }}>
                            WED
                        </staffstyle.boxday>
                        <staffstyle.boxday
                            style={{
                                backgroundColor: `${THUday ? '#409FFF' : '#F2F3F7'}`,
                                color: `${THUday ? '#fff' : '#3B3B3B'}`
                            }}>
                            THU
                        </staffstyle.boxday>
                        <staffstyle.boxday
                            style={{
                                backgroundColor: `${FRIday ? '#409FFF' : '#F2F3F7'}`,
                                color: `${FRIday ? '#fff' : '#3B3B3B'}`
                            }}>
                            FRI
                        </staffstyle.boxday>
                        <staffstyle.boxday
                            style={{
                                backgroundColor: `${SATday ? '#409FFF' : '#F2F3F7'}`,
                                color: `${SATday ? '#fff' : '#3B3B3B'}`
                            }}>
                            SAT
                        </staffstyle.boxday>
                        <staffstyle.boxday
                            style={{
                                backgroundColor: `${SUNday ? '#409FFF' : '#F2F3F7'}`,
                                color: `${SUNday ? '#fff' : '#3B3B3B'}`
                            }}>
                            SUN
                        </staffstyle.boxday>
                    </staffstyle.rowpage>
                    <Grid container>
                        {value.timeSheets.map((items) => (
                            <Grid item md={6} sm={12}>
                                <staffstyle.rowpage>
                                    <staffstyle.textday>{items.dayOfWeek}</staffstyle.textday>
                                </staffstyle.rowpage>
                                <staffstyle.rowpage>
                                    <staffstyle.texttime>
                                        From {Utils.convertTimeSpanToTime(items.from)} To{' '}
                                        {Utils.convertTimeSpanToTime(items.to)}
                                    </staffstyle.texttime>
                                </staffstyle.rowpage>
                            </Grid>
                        ))}
                    </Grid>
                </>
            ))}
        </Grid>
    );
}

export default StaffViewModal;
