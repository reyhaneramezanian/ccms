import { useDispatch, useSelector } from 'react-redux';
import * as GlobalStyle from '@/components/style';
import * as S from './style.profile';
import { useEffect, useState } from 'react';
import * as residentstyle from '../resident.style';
import { Box, Button, Typography, Modal } from '@mui/material';
import { tabs, EresidentTabsKey, ColumnAuthorized } from './data';
import { LoadingButton } from '@mui/lab';
import {
    useUser_GetCurrentResidentQuery,
    useUser_UpdateResidentMutation
} from 'src/graphql/generated';
import { connect } from 'react-redux';
import Editeprofile from 'src/assets/icons/editeprofile';
import { useImageUploader, useUploadInput } from 'src/hooks/useMediaUploader';
import { getFullImageUrl } from '@/utils/helper/ui';
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import storageKeys from 'src/data/storageKeys';
import { useGetUser } from 'src/auth/UserProvider';
import { SecurityProfileTabItems, SuperProfilePagesComponent } from './data';
import useManageTab from 'src/hooks/useManageTab';
import { setPageData } from 'src/redux/actions/actions';
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

const Profileresident = () => {
    const dispatch = useDispatch();
    const user = useGetUser();
    const { activeTab, handleChangeActiveTab } = useManageTab(SecurityProfileTabItems);
    const mutationErrorHandler = useMutationErrorHandler();
    const [imageuser, setimageuser] = useState('');
    const [reload, setreload] = useState(false);
    const { uploadOnFile, state: stateimage } = useImageUploader();
    const { InputComponent, onFilePick } = useUploadInput(uploadOnFile);
    const { mutate, isLoading } = useUser_UpdateResidentMutation();
    const { data: datauser } = useUser_GetCurrentResidentQuery(undefined, {
        enabled: reload === true
    });
    const { enqueueSnackbar } = useSnackbar();
    const [show, setShow] = useState(false);
    const pageData = useSelector(({ pageData }: any) => pageData);

    useEffect(() => {
        if (
            datauser?.user_getCurrentResident?.result?.photoUrl == null ||
            datauser?.user_getCurrentResident?.result?.photoUrl == undefined
        )
            setimageuser('/images/men.png');
        else {
            setimageuser(datauser?.user_getCurrentResident?.result?.photoUrl);
            localStorage.setItem(
                storageKeys.fullnameprofile,
                datauser?.user_getCurrentResident?.result?.firstName +
                    ' ' +
                    datauser?.user_getCurrentResident?.result?.lastName
            );
            localStorage.setItem(
                storageKeys.imageprofile,
                datauser?.user_getCurrentResident?.result?.photoUrl
            );
            dispatch(
                setPageData({
                    ...pageData,
                    imageprofile: datauser?.user_getCurrentResident?.result?.photoUrl,
                    fullnameprofile:
                        datauser?.user_getCurrentResident?.result?.firstName +
                        ' ' +
                        datauser?.user_getCurrentResident?.result?.lastName
                })
            );
        }
    }, [datauser]);
    const onfiledelet = () => {
        setShow(true);
    };

    useEffect(() => {
        if (stateimage?.items[stateimage?.items?.length - 1]?.progress === '100') {
            mutate(
                {
                    input: {
                        photoUrl: stateimage?.items[stateimage?.items?.length - 1]?.url,
                        alternativeContact:
                            datauser?.user_getCurrentResident?.result?.alternativeContact,
                        gender: datauser?.user_getCurrentResident?.result?.gender,
                        activeStatus: datauser?.user_getCurrentResident?.result?.activeStatus,
                        firstName: datauser?.user_getCurrentResident?.result?.firstName,
                        lastName: datauser?.user_getCurrentResident?.result?.lastName,
                        dateOfBirth: datauser?.user_getCurrentResident?.result?.dateOfBirth,
                        phoneNumber: datauser?.user_getCurrentResident?.result?.phoneNumber,
                        //email: datauser?.user_getCurrentResident?.result?.email,
                        id: datauser?.user_getCurrentResident?.result?.id
                    }
                },
                {
                    onSuccess: () => {
                        setreload(true);
                        localStorage.setItem(
                            storageKeys.imageprofile,
                            stateimage?.items[stateimage?.items?.length - 1]?.url
                        );
                        localStorage.setItem(
                            storageKeys.fullnameprofile,
                            datauser?.user_getCurrentResident?.result?.firstName +
                                ' ' +
                                datauser?.user_getCurrentResident?.result?.lastName
                        );

                        dispatch(
                            setPageData({
                                ...pageData,
                                imageprofile: stateimage?.items[stateimage?.items?.length - 1]?.url,
                                fullnameprofile:
                                    datauser?.user_getCurrentResident?.result?.firstName +
                                    ' ' +
                                    datauser?.user_getCurrentResident?.result?.lastName
                            })
                        );
                        enqueueSnackbar('Operation was successful!', {
                            variant: 'success'
                        });
                        setreload(false);
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'user_updateResident');
                    }
                }
            );
            setimageuser(stateimage?.items[stateimage?.items?.length - 1].url);
        }
    }, [stateimage]);
    const handleimageUser = () => {
        mutate(
            {
                input: {
                    photoUrl: '',
                    alternativeContact:
                        datauser?.user_getCurrentResident?.result?.alternativeContact,
                    gender: datauser?.user_getCurrentResident?.result?.gender,
                    activeStatus: datauser?.user_getCurrentResident?.result?.activeStatus,
                    firstName: datauser?.user_getCurrentResident?.result?.firstName,
                    lastName: datauser?.user_getCurrentResident?.result?.lastName,
                    dateOfBirth: datauser?.user_getCurrentResident?.result?.dateOfBirth,
                    phoneNumber: datauser?.user_getCurrentResident?.result?.phoneNumber,
                    //email: datauser?.user_getCurrentResident?.result?.email,
                    id: datauser?.user_getCurrentResident?.result?.id
                }
            },
            {
                onSuccess: () => {
                    setreload(true);
                    localStorage.setItem(storageKeys.imageprofile, '');
                    dispatch(
                        setPageData({
                            ...pageData,
                            imageprofile: '',
                            fullnameprofile:
                                datauser?.user_getCurrentResident?.result?.firstName +
                                ' ' +
                                datauser?.user_getCurrentResident?.result?.lastName
                        })
                    );
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    });
                    setimageuser('');
                    setShow(false);
                    setreload(false);
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateResident');
                }
            }
        );
    };
    const handleClose = () => {
        setShow(false);
    };
    const hasUser = typeof user === 'object' && user !== null;

    if (!hasUser || typeof activeTab === 'undefined') return null;
    const PageComponent = SuperProfilePagesComponent[activeTab.id];
    return (
        <GlobalStyle.ProfileWrapper>
            <GlobalStyle.ProfileFormWrapper>
                <GlobalStyle.ProfileFormWrapper>
                    <residentstyle.profileheader>
                        <residentstyle.image>
                            <residentstyle.editeimage onClick={onFilePick}>
                                {InputComponent}
                                <Editeprofile />
                            </residentstyle.editeimage>
                            <residentstyle.profileimguser
                                src={
                                    (pageData?.imageprofile == '' ||
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
                                <residentstyle.profileimguserMiddle
                                    onClick={onfiledelet}
                                    src="/images/delete.png"
                                />
                            )}
                        </residentstyle.image>
                        <residentstyle.profilenameuser>
                            {pageData.fullnameprofile == '' || pageData.fullnameprofile == undefined
                                ? localStorage.getItem(storageKeys.fullnameprofile)
                                : pageData.fullnameprofile}
                        </residentstyle.profilenameuser>
                    </residentstyle.profileheader>
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
                    <residentstyle.rowpage>
                        <residentstyle.cellpage>
                            Are you sure you want to delete your image?
                        </residentstyle.cellpage>
                    </residentstyle.rowpage>
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
export default Profileresident;
