import * as GlobalStyle from '@/components/style';
import COLORS from '@/utils/theme/colors';
import * as securityStyle from '../security.style';
import { useGetUser } from 'src/auth/UserProvider';
import useManageTab from 'src/hooks/useManageTab';
import { Box, Button, Typography, Modal } from '@mui/material';
import { SecurityProfilePagesComponent, SecurityProfileTabItems } from './data';
import * as S from './profile.style';
import Editeprofile from 'src/assets/icons/editeprofile';
import { useImageUploader, useUploadInput } from 'src/hooks/useMediaUploader';
import { getFullImageUrl } from '@/utils/helper/ui';
import { useSnackbar } from 'notistack';
import {
    useUser_UpdateSecurityProfileMutation,
    useUser_GetCurrentSecurityQuery
} from 'src/graphql/generated';
import { useEffect, useState } from 'react';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import storageKeys from 'src/data/storageKeys';
import { setPageData } from 'src/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';

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

const SecurityProfile = () => {
    const user = useGetUser();
    const { activeTab, handleChangeActiveTab } = useManageTab(SecurityProfileTabItems);
    const [imageuser, setimageuser] = useState('');
    const [deleteitems, setdeleteitems] = useState([]);
    const { uploadOnFile, state: stateimage } = useImageUploader();
    const { InputComponent, onFilePick } = useUploadInput(uploadOnFile);
    const { data: datauser } = useUser_GetCurrentSecurityQuery();
    const { enqueueSnackbar } = useSnackbar();
    const { mutate, isLoading } = useUser_UpdateSecurityProfileMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (
            datauser?.user_getCurrentSecurity?.result?.photoUrl == null ||
            datauser?.user_getCurrentSecurity?.result?.photoUrl == undefined
        )
            setimageuser('/images/men.png');
        else {
            setimageuser(datauser?.user_getCurrentSecurity?.result?.photoUrl);
            localStorage.setItem(
                storageKeys.fullnameprofile,
                datauser?.user_getCurrentSecurity?.result?.firstName +
                    ' ' +
                    datauser?.user_getCurrentSecurity?.result?.lastName
            );
            localStorage.setItem(
                storageKeys.imageprofile,
                datauser?.user_getCurrentSecurity?.result?.photoUrl
            );
            dispatch(
                setPageData({
                    ...pageData,
                    imageprofile: datauser?.user_getCurrentSecurity?.result?.photoUrl,
                    fullnameprofile:
                        datauser?.user_getCurrentSecurity?.result?.firstName +
                        ' ' +
                        datauser?.user_getCurrentSecurity?.result?.lastName
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
                        yearsOfExperience:
                            datauser?.user_getCurrentSecurity?.result?.yearsOfExperience,
                        complexId: datauser?.user_getCurrentSecurity?.result?.complexId,
                        activeStatus: datauser?.user_getCurrentSecurity?.result?.activeStatus,
                        firstName: datauser?.user_getCurrentSecurity?.result?.firstName,
                        lastName: datauser?.user_getCurrentSecurity?.result?.lastName,
                        dateOfBirth: datauser?.user_getCurrentSecurity?.result?.dateOfBirth,
                        phoneNumber: datauser?.user_getCurrentSecurity?.result?.phoneNumber,
                        dateOfJoining: datauser?.user_getCurrentSecurity?.result?.dateOfJoining,
                        id: datauser?.user_getCurrentSecurity?.result?.id,
                        gender: datauser?.user_getCurrentSecurity?.result?.gender,
                        employmentTypeId:
                            datauser?.user_getCurrentSecurity?.result?.employmentTypeId
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
                                    datauser?.user_getCurrentSecurity?.result?.firstName +
                                    ' ' +
                                    datauser?.user_getCurrentSecurity?.result?.lastName
                            })
                        );
                        enqueueSnackbar('Operation was successful!', {
                            variant: 'success'
                        });
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'user_updateSecurityProfile');
                    }
                }
            );
            setimageuser(stateimage?.items[stateimage?.items?.length - 1].url);
        }
    }, [stateimage]);

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
                    yearsOfExperience: datauser?.user_getCurrentSecurity?.result?.yearsOfExperience,
                    complexId: datauser?.user_getCurrentSecurity?.result?.complexId,
                    activeStatus: datauser?.user_getCurrentSecurity?.result?.activeStatus,
                    firstName: datauser?.user_getCurrentSecurity?.result?.firstName,
                    lastName: datauser?.user_getCurrentSecurity?.result?.lastName,
                    dateOfBirth: datauser?.user_getCurrentSecurity?.result?.dateOfBirth,
                    phoneNumber: datauser?.user_getCurrentSecurity?.result?.phoneNumber,
                    dateOfJoining: datauser?.user_getCurrentSecurity?.result?.dateOfJoining,
                    id: datauser?.user_getCurrentSecurity?.result?.id,
                    gender: datauser?.user_getCurrentSecurity?.result?.gender,
                    employmentTypeId: datauser?.user_getCurrentSecurity?.result?.employmentTypeId
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
                                datauser?.user_getCurrentSecurity?.result?.firstName +
                                ' ' +
                                datauser?.user_getCurrentSecurity?.result?.lastName
                        })
                    );
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    });
                    setimageuser('');
                    setShow(false);
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateSecurityProfile');
                }
            }
        );
    };
    const hasUser = typeof user === 'object' && user !== null;

    if (!hasUser || typeof activeTab === 'undefined') return null;
    const PageComponent = SecurityProfilePagesComponent[activeTab.id];
    return (
        <GlobalStyle.ProfileWrapper>
            <GlobalStyle.ProfileFormWrapper>
                <GlobalStyle.ProfileFormWrapper>
                    <securityStyle.profileheader>
                        <securityStyle.image>
                            <securityStyle.editeimage onClick={onFilePick}>
                                {InputComponent}
                                <Editeprofile />
                            </securityStyle.editeimage>
                            <securityStyle.profileimguser
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
                                <securityStyle.profileimguserMiddle
                                    onClick={onfiledelet}
                                    src="/images/delete.png"
                                />
                            )}
                        </securityStyle.image>
                        <securityStyle.profilenameuser>
                            {pageData.fullnameprofile == '' || pageData.fullnameprofile == undefined
                                ? localStorage.getItem(storageKeys.fullnameprofile)
                                : pageData.fullnameprofile}
                        </securityStyle.profilenameuser>
                    </securityStyle.profileheader>
                </GlobalStyle.ProfileFormWrapper>

                <S.SecurityProfileTabs
                    tabs={SecurityProfileTabItems}
                    activeTab={activeTab}
                    onTabChange={handleChangeActiveTab}
                />

                <PageComponent />
            </GlobalStyle.ProfileFormWrapper>
            <Modal
                style={{ border: '0px solid #fff !important' }}
                keepMounted
                open={show}
                // onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description">
                <Box sx={style}>
                    <securityStyle.rowpage>
                        <securityStyle.cellpage>
                            Are you sure you want to delete your image?
                        </securityStyle.cellpage>
                    </securityStyle.rowpage>
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
        </GlobalStyle.ProfileWrapper>
    );
};

export default SecurityProfile;
