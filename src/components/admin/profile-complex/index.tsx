import * as GlobalStyle from '@/components/style';
import COLORS from '@/utils/theme/colors';
import { useGetUser } from 'src/auth/UserProvider';
import useManageTab from 'src/hooks/useManageTab';
import { Box, Button, Typography, Modal } from '@mui/material';
import {
    SecurityProfileTabItems,
    SuperProfilePagesComponent,
    ComplexProfilePagesComponent,
    BlockProfilePagesComponent
} from './data';
import * as S from './style.profile';
import * as adminstyle from '../admin.style';
import Editeprofile from 'src/assets/icons/editeprofile';
import { useImageUploader, useUploadInput } from 'src/hooks/useMediaUploader';
import { getFullImageUrl } from '@/utils/helper/ui';
import { useSnackbar } from 'notistack';
import {
    useUser_GetCurrentComplexManagerQuery,
    useUser_UpdateComplexManagerMutation
} from 'src/graphql/generated';
import { useEffect, useState } from 'react';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import storageKeys from 'src/data/storageKeys';
import { setPageData } from 'src/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
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
    const dispatch = useDispatch();
    const { activeTab, handleChangeActiveTab } = useManageTab(SecurityProfileTabItems);
    const { enqueueSnackbar } = useSnackbar();
    const [gender, setgender] = useState(0);
    const [activeStatu, setactiveStatu] = useState(0);
    const [reload, setreload] = useState(false);
    const mutationErrorHandler = useMutationErrorHandler();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const [show, setShow] = useState(false);
    const [imageuser, setimageuser] = useState('');
    const [imagenew, setimagenew] = useState('');

    const { uploadOnFile, state: stateimage } = useImageUploader();
    const { InputComponent, onFilePick } = useUploadInput(uploadOnFile);

    const { mutate, isLoading } = useUser_UpdateComplexManagerMutation();
    const { data: datauser } = useUser_GetCurrentComplexManagerQuery(undefined, {
        enabled: reload === true
    });

    useEffect(() => {
        if (
            datauser?.user_getCurrentComplexManager?.result?.photoUrl == null ||
            datauser?.user_getCurrentComplexManager?.result?.photoUrl == undefined
        )
            setimageuser('/images/men.png');
        else {
            setimageuser(datauser?.user_getCurrentComplexManager?.result?.photoUrl);
            localStorage.setItem(
                storageKeys.fullnameprofile,
                datauser?.user_getCurrentComplexManager?.result?.firstName +
                    ' ' +
                    datauser?.user_getCurrentComplexManager?.result?.lastName
            );
            localStorage.setItem(
                storageKeys.imageprofile,
                datauser?.user_getCurrentComplexManager?.result?.photoUrl
            );
            dispatch(
                setPageData({
                    ...pageData,
                    imageprofile: datauser?.user_getCurrentComplexManager?.result?.photoUrl,
                    fullnameprofile:
                        datauser?.user_getCurrentComplexManager?.result?.firstName +
                        ' ' +
                        datauser?.user_getCurrentComplexManager?.result?.lastName
                })
            );
        }
    }, [datauser]);
    /* useEffect(() => {
        if (stateimage?.items[stateimage?.items?.length - 1]?.progress === '100') {
            setimagenew(stateimage?.items[stateimage?.items?.length - 1].url);
            setimageuser(stateimage?.items[stateimage?.items?.length - 1].url);
        }
    }, [stateimage]);*/
    useEffect(() => {
        if (stateimage?.items[stateimage?.items?.length - 1]?.progress === '100') {
            mutate(
                {
                    input: {
                        photoUrl: stateimage?.items[stateimage?.items?.length - 1]?.url,
                        gender: datauser?.user_getCurrentComplexManager?.result?.gender,
                        activeStatus: datauser?.user_getCurrentComplexManager?.result?.activeStatus,
                        firstName: datauser?.user_getCurrentComplexManager?.result?.firstName,
                        lastName: datauser?.user_getCurrentComplexManager?.result?.lastName,
                        phoneNumber: datauser?.user_getCurrentComplexManager?.result?.phoneNumber,
                        id: datauser?.user_getCurrentComplexManager?.result?.id,
                        dateOfBirth: datauser?.user_getCurrentComplexManager?.result?.dateOfBirth
                    }
                },
                {
                    onSuccess: () => {
                        setreload(true);
                        setimagenew(stateimage?.items[stateimage?.items?.length - 1]?.url);
                        localStorage.setItem(
                            storageKeys.imageprofile,
                            stateimage?.items[stateimage?.items?.length - 1]?.url
                        );
                        localStorage.setItem(
                            storageKeys.fullnameprofile,
                            datauser?.user_getCurrentComplexManager?.result?.firstName +
                                ' ' +
                                datauser?.user_getCurrentComplexManager?.result?.lastName
                        );

                        dispatch(
                            setPageData({
                                ...pageData,
                                imageprofile: stateimage?.items[stateimage?.items?.length - 1]?.url,
                                fullnameprofile:
                                    datauser?.user_getCurrentComplexManager?.result?.firstName +
                                    ' ' +
                                    datauser?.user_getCurrentComplexManager?.result?.lastName
                            })
                        );
                        enqueueSnackbar('Operation was successful!', {
                            variant: 'success'
                        });
                        setreload(false);
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'user_updateSuperAdminProfile');
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
                    gender: datauser?.user_getCurrentComplexManager?.result?.gender,
                    activeStatus: datauser?.user_getCurrentComplexManager?.result?.activeStatus,
                    firstName: datauser?.user_getCurrentComplexManager?.result?.firstName,
                    lastName: datauser?.user_getCurrentComplexManager?.result?.lastName,
                    phoneNumber: datauser?.user_getCurrentComplexManager?.result?.phoneNumber,
                    id: datauser?.user_getCurrentComplexManager?.result?.id,
                    dateOfBirth: datauser?.user_getCurrentComplexManager?.result?.dateOfBirth
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
                                datauser?.user_getCurrentComplexManager?.result?.firstName +
                                ' ' +
                                datauser?.user_getCurrentComplexManager?.result?.lastName
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
                    mutationErrorHandler(err, 'user_updateSuperAdminProfile');
                }
            }
        );
    };
    const hasUser = typeof user === 'object' && user !== null;

    if (!hasUser || typeof activeTab === 'undefined') return null;
    const PageComponent = SuperProfilePagesComponent[activeTab.id];
    return (
        <GlobalStyle.ProfileWrapper>
            <GlobalStyle.ProfileFormWrapper>
                <GlobalStyle.ProfileFormWrapper>
                    <adminstyle.profileheader>
                        <adminstyle.image>
                            <adminstyle.editeimage onClick={onFilePick}>
                                {InputComponent}
                                <Editeprofile />
                            </adminstyle.editeimage>
                            <adminstyle.profileimguser
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
                                <adminstyle.profileimguserMiddle
                                    onClick={onfiledelet}
                                    src="/images/delete.png"
                                />
                            )}
                        </adminstyle.image>
                        <adminstyle.profilenameuser>
                            {pageData.fullnameprofile == '' || pageData.fullnameprofile == undefined
                                ? localStorage.getItem(storageKeys.fullnameprofile)
                                : pageData.fullnameprofile}
                        </adminstyle.profilenameuser>
                    </adminstyle.profileheader>
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
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            Are you sure you want to delete your image?
                        </adminstyle.cellpage>
                    </adminstyle.rowpage>
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
