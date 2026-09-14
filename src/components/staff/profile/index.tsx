import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as stafftstyle from '../staff.style';
import { Box, Button, Typography, Modal } from '@mui/material';
import Tabs from '../../tabs/tabs';
import { setPageData } from 'src/redux/actions/actions';
import { tabs, EresidentTabsKey, StaffProfileTabItems, StaffProfilePagesComponent } from './data';
import Personal from './Personal/editModal';
import Contact from './Contact/editModal';
import Career from './Career/editModal';
import Setting from './Setting/editModal';
import Timesheet from './timeSheet';
import { connect } from 'react-redux';
import {
    useUser_GetCurrentStaffQuery,
    useUser_UpdateStaffProfileMutation
} from 'src/graphql/generated';
import Editeprofile from 'src/assets/icons/editeprofile';
import { useImageUploader, useUploadInput } from 'src/hooks/useMediaUploader';
import { getFullImageUrl } from '@/utils/helper/ui';
import * as S from './profile.style';
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import storageKeys from 'src/data/storageKeys';
import { useGetUser } from 'src/auth/UserProvider';
import useManageTab from 'src/hooks/useManageTab';
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
const Profilestaff = ({ pageData, setPageData }) => {
    const dispatch = useDispatch();
    const user = useGetUser();
    const { activeTab, handleChangeActiveTab } = useManageTab(StaffProfileTabItems);
    const mutationErrorHandler = useMutationErrorHandler();
    const [show, setShow] = useState(false);
    const { data: datauser } = useUser_GetCurrentStaffQuery();
    const { uploadOnFile, state: stateimage } = useImageUploader();
    const { InputComponent, onFilePick } = useUploadInput(uploadOnFile);
    const { mutate, isLoading } = useUser_UpdateStaffProfileMutation();
    const { enqueueSnackbar } = useSnackbar();
    const [imageuser, setimageuser] = useState('');
    useEffect(() => {
        if (
            datauser?.user_getCurrentStaff?.result?.photoUrl == null ||
            datauser?.user_getCurrentStaff?.result?.photoUrl == undefined
        )
            setimageuser('/images/men.png');
        else {
            setimageuser(datauser?.user_getCurrentStaff?.result?.photoUrl);
            localStorage.setItem(
                storageKeys.fullnameprofile,
                datauser?.user_getCurrentStaff?.result?.firstName +
                    ' ' +
                    datauser?.user_getCurrentStaff?.result?.lastName
            );
            localStorage.setItem(
                storageKeys.imageprofile,
                datauser?.user_getCurrentStaff?.result?.photoUrl
            );
            dispatch(
                setPageData({
                    ...pageData,
                    imageprofile: datauser?.user_getCurrentStaff?.result?.photoUrl,
                    fullnameprofile:
                        datauser?.user_getCurrentStaff?.result?.firstName +
                        ' ' +
                        datauser?.user_getCurrentStaff?.result?.lastName
                })
            );
        }
    }, [datauser]);
    useEffect(() => {
        if (stateimage?.items[stateimage?.items?.length - 1]?.progress === '100') {
            mutate(
                {
                    input: {
                        photoUrl: stateimage?.items[stateimage?.items?.length - 1]?.url,
                        departmentId: datauser?.user_getCurrentStaff?.result?.departmentId,
                        employmentTypeId: datauser?.user_getCurrentStaff?.result?.employmentTypeId,
                        headOfDepertment:
                            datauser?.user_getCurrentStaff?.result?.departmentManagers?.length > 0
                                ? true
                                : false,
                        gender: datauser?.user_getCurrentStaff?.result?.gender,
                        activeStatus: datauser?.user_getCurrentStaff?.result?.activeStatus,
                        firstName: datauser?.user_getCurrentStaff?.result?.firstName,
                        lastName: datauser?.user_getCurrentStaff?.result?.lastName,
                        dateOfBirth: datauser?.user_getCurrentStaff?.result?.dateOfBirth,
                        phoneNumber: datauser?.user_getCurrentStaff?.result?.phoneNumber,
                        // email: datauser?.user_getCurrentStaff?.result?.email,
                        middleName: datauser?.user_getCurrentStaff?.result?.middleName,
                        alternatePhone: datauser?.user_getCurrentStaff?.result?.alternatePhone,
                        alternateEmail: datauser?.user_getCurrentStaff?.result?.alternateEmail,
                        address: datauser?.user_getCurrentStaff?.result?.address,
                        //role: datauser?.user_getCurrentStaff?.result?.role,
                        dateOfJoining: datauser?.user_getCurrentStaff?.result?.dateOfJoining,
                        dateOfTermination:
                            datauser?.user_getCurrentStaff?.result?.dateOfTermination,
                        id: datauser?.user_getCurrentStaff?.result?.id
                    }
                },
                {
                    onSuccess: () => {
                        localStorage.setItem(
                            storageKeys.imageprofile,
                            stateimage?.items[stateimage?.items?.length - 1]?.url
                        );
                        dispatch(
                            setPageData({
                                ...pageData,
                                imageprofile: stateimage?.items[stateimage?.items?.length - 1]?.url,
                                fullnameprofile:
                                    datauser?.user_getCurrentStaff?.result?.firstName +
                                    ' ' +
                                    datauser?.user_getCurrentStaff?.result?.lastName
                            })
                        );
                        enqueueSnackbar('Operation was successful!', {
                            variant: 'success'
                        });
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'user_updateStaffProfile');
                    }
                }
            );
            setimageuser(stateimage?.items[stateimage?.items?.length - 1].url);
        }
    }, [stateimage]);
    useEffect(() => {
        dispatch(setPageData({ ...pageData, activeTab: tabs[0] }));
    }, []);
    const onfiledelet = () => {
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };
    const handleimageUser = () => {
        mutate(
            {
                input: {
                    photoUrl: '',
                    departmentId: datauser?.user_getCurrentStaff?.result?.departmentId,
                    employmentTypeId: datauser?.user_getCurrentStaff?.result?.employmentTypeId,
                    headOfDepertment:
                        datauser?.user_getCurrentStaff?.result?.departmentManagers?.length > 0
                            ? true
                            : false,
                    gender: datauser?.user_getCurrentStaff?.result?.gender,
                    activeStatus: datauser?.user_getCurrentStaff?.result?.activeStatus,
                    firstName: datauser?.user_getCurrentStaff?.result?.firstName,
                    lastName: datauser?.user_getCurrentStaff?.result?.lastName,
                    dateOfBirth: datauser?.user_getCurrentStaff?.result?.dateOfBirth,
                    phoneNumber: datauser?.user_getCurrentStaff?.result?.phoneNumber,
                    // email: datauser?.user_getCurrentStaff?.result?.email,
                    middleName: datauser?.user_getCurrentStaff?.result?.middleName,
                    alternatePhone: datauser?.user_getCurrentStaff?.result?.alternatePhone,
                    alternateEmail: datauser?.user_getCurrentStaff?.result?.alternateEmail,
                    address: datauser?.user_getCurrentStaff?.result?.address,
                    //role: datauser?.user_getCurrentStaff?.result?.role,
                    dateOfJoining: datauser?.user_getCurrentStaff?.result?.dateOfJoining,
                    dateOfTermination: datauser?.user_getCurrentStaff?.result?.dateOfTermination,
                    id: datauser?.user_getCurrentStaff?.result?.id
                }
            },
            {
                onSuccess: () => {
                    localStorage.setItem(storageKeys.imageprofile, '');
                    dispatch(
                        setPageData({
                            ...pageData,
                            imageprofile: '',
                            fullnameprofile:
                                datauser?.user_getCurrentStaff?.result?.firstName +
                                ' ' +
                                datauser?.user_getCurrentStaff?.result?.lastName
                        })
                    );
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    });
                    setimageuser('');
                    setShow(false);
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateStaffProfile');
                }
            }
        );
    };
    const hasUser = typeof user === 'object' && user !== null;

    if (!hasUser || typeof activeTab === 'undefined') return null;
    const PageComponent = StaffProfilePagesComponent[activeTab.id];
    return (
        <stafftstyle.container>
            <stafftstyle.profileheader>
                <stafftstyle.image>
                    <stafftstyle.editeimage onClick={onFilePick}>
                        {InputComponent}
                        <Editeprofile />
                    </stafftstyle.editeimage>
                    <stafftstyle.profileimguser
                        src={
                            (pageData.imageprofile == '' ||
                                pageData.imageprofile == null ||
                                pageData.imageprofile == undefined) &&
                            (localStorage.getItem(storageKeys.imageprofile) == '' ||
                                localStorage.getItem(storageKeys.imageprofile) == 'null' ||
                                localStorage.getItem(storageKeys.imageprofile) == undefined)
                                ? '/images/men.png'
                                : getFullImageUrl(
                                      pageData.imageprofile == '' ||
                                          pageData.imageprofile == undefined
                                          ? localStorage.getItem(storageKeys.imageprofile)
                                          : pageData.imageprofile
                                  )
                        }
                    />
                    {(pageData.imageprofile == '' ||
                        pageData.imageprofile == null ||
                        pageData.imageprofile == undefined) &&
                    (localStorage.getItem(storageKeys.imageprofile) == '' ||
                        localStorage.getItem(storageKeys.imageprofile) == 'null' ||
                        localStorage.getItem(storageKeys.imageprofile) == undefined) ? (
                        ''
                    ) : (
                        <stafftstyle.profileimguserMiddle
                            onClick={onfiledelet}
                            src="/images/delete.png"
                        />
                    )}
                </stafftstyle.image>
                <stafftstyle.profilenameuser>
                    {pageData.fullnameprofile == '' || pageData.fullnameprofile == undefined
                        ? localStorage.getItem(storageKeys.fullnameprofile)
                        : pageData.fullnameprofile}
                </stafftstyle.profilenameuser>
            </stafftstyle.profileheader>
            <S.warper>
                <S.SecurityProfileTabs
                    tabs={StaffProfileTabItems}
                    activeTab={activeTab}
                    onTabChange={handleChangeActiveTab}
                />

                <PageComponent />
            </S.warper>
            <Modal
                style={{ border: '0px solid #fff !important' }}
                keepMounted
                open={show}
                // onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description">
                <Box sx={style}>
                    <stafftstyle.rowpage>
                        <stafftstyle.cellpage>
                            Are you sure you want to delete your image?
                        </stafftstyle.cellpage>
                    </stafftstyle.rowpage>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '50px'
                        }}>
                        <LoadingButton
                            loading={isLoading}
                            sx={{
                                textTransform: 'none',
                                width: '170px',
                                height: '36px',
                                marginRight: '28px',
                                backgroundColor: '#e63c49',
                                borderRadius: '4px',
                                color: '#fff' /*':hover': { backgroundColor: '#A587C2' } */
                            }}
                            onClick={handleimageUser}>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    color: '#fff',
                                    fontFamily: 'Helvetica Neue'
                                }}>
                                Yes
                            </Typography>
                        </LoadingButton>
                        <Button
                            sx={{
                                textTransform: 'none',
                                width: '170px',
                                height: '36px',
                                backgroundColor: '#fff',
                                borderRadius: '4px',
                                color: '#737373',
                                border: '1px solid #b0b0b0',
                                ':hover': { backgroundColor: '#fff' }
                            }}
                            onClick={handleClose}>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    color: '#2B368F',
                                    fontFamily: 'Helvetica Neue'
                                }}>
                                No
                            </Typography>
                        </Button>
                    </div>
                </Box>
            </Modal>
        </stafftstyle.container>
    );
};

const mapStateToProps = ({ pageData }) => ({ pageData });

const mapDispatchToProps = { setPageData };

export default connect(mapStateToProps, mapDispatchToProps)(Profilestaff);
