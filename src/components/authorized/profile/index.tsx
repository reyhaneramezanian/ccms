import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as residentstyle from '../resident.style';
import { Box, Button, Typography, Modal } from '@mui/material';
import Tabs from '../../tabs/tabs';
import { setPageData } from 'src/redux/actions/actions';
import { tabs, EresidentTabsKey } from './data';
import Personal from './Personal/editModal';
import Peroperty from './Peroperty/editModal';
import Setting from './Setting/editModal';
import AddButton from '../../addButton';
import { useInitialProps } from '@/components/table_container/useTableProps';
import { dashbord } from '../../admin/data';
import {
    useUser_UpdateAuthorizedUserMutation,
    SortEnumType,
    UserType,
    useUser_GetCurrentAuthorizedUserQuery
} from 'src/graphql/generated';
import { connect } from 'react-redux';
import Editeprofile from 'src/assets/icons/editeprofile';
import { useImageUploader, useUploadInput } from 'src/hooks/useMediaUploader';
import { getFullImageUrl } from '@/utils/helper/ui';
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import { closeModal, newModal } from 'src/redux/actions/actions';
import storageKeys from 'src/data/storageKeys';
import { useGetUser } from 'src/auth/UserProvider';
import Delete from 'src/assets/icons/Delete';

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

const Profileresident = ({ pageData, setPageData }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const user = useGetUser();
    const hasUser = typeof user === 'object' && user !== null;

    const { activeTab = tabs[0] } = pageData;
    const mutationErrorHandler = useMutationErrorHandler();
    const [imageuser, setimageuser] = useState('');
    const [deleteitems, setdeleteitems] = useState([]);
    const { uploadOnFile, state: stateimage } = useImageUploader();
    const { InputComponent, onFilePick } = useUploadInput(uploadOnFile);
    const { mutate, isLoading } = useUser_UpdateAuthorizedUserMutation();
    const { data: datauser } = useUser_GetCurrentAuthorizedUserQuery();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (
            datauser?.user_getCurrentAuthorizedUser?.result?.photoUrl == null ||
            datauser?.user_getCurrentAuthorizedUser?.result?.photoUrl == undefined
        )
            setimageuser('/images/men.png');
        else {
            setimageuser(datauser?.user_getCurrentAuthorizedUser?.result?.photoUrl);
            localStorage.setItem(
                storageKeys.fullnameprofile,
                datauser?.user_getCurrentAuthorizedUser?.result?.firstName +
                    ' ' +
                    datauser?.user_getCurrentAuthorizedUser?.result?.lastName
            );
            localStorage.setItem(
                storageKeys.imageprofile,
                datauser?.user_getCurrentAuthorizedUser?.result?.photoUrl
            );
            dispatch(
                setPageData({
                    ...pageData,
                    imageprofile: datauser?.user_getCurrentAuthorizedUser?.result?.photoUrl,
                    fullnameprofile:
                        datauser?.user_getCurrentAuthorizedUser?.result?.firstName +
                        ' ' +
                        datauser?.user_getCurrentAuthorizedUser?.result?.lastName
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
                        relation: datauser?.user_getCurrentAuthorizedUser?.result?.relation,
                        gender: datauser?.user_getCurrentAuthorizedUser?.result?.gender,
                        activeStatus: datauser?.user_getCurrentAuthorizedUser?.result?.activeStatus,
                        firstName: datauser?.user_getCurrentAuthorizedUser?.result?.firstName,
                        lastName: datauser?.user_getCurrentAuthorizedUser?.result?.lastName,
                        dateOfBirth: datauser?.user_getCurrentAuthorizedUser?.result?.dateOfBirth,
                        phoneNumber: datauser?.user_getCurrentAuthorizedUser?.result?.phoneNumber,
                        residentFlatId:
                            datauser?.user_getCurrentAuthorizedUser?.result?.residentFlatId,
                        id: datauser?.user_getCurrentAuthorizedUser?.result?.id
                    }
                },
                {
                    onSuccess: () => {
                        localStorage.setItem(
                            storageKeys.imageprofile,
                            stateimage?.items[stateimage?.items?.length - 1]?.url
                        );
                        localStorage.setItem(
                            storageKeys.fullnameprofile,
                            datauser?.user_getCurrentAuthorizedUser?.result?.firstName +
                                ' ' +
                                datauser?.user_getCurrentAuthorizedUser?.result?.lastName
                        );

                        dispatch(
                            setPageData({
                                ...pageData,
                                imageprofile: stateimage?.items[stateimage?.items?.length - 1]?.url,
                                fullnameprofile:
                                    datauser?.user_getCurrentAuthorizedUser?.result?.firstName +
                                    ' ' +
                                    datauser?.user_getCurrentAuthorizedUser?.result?.lastName
                            })
                        );
                        enqueueSnackbar('Operation was successful!', {
                            variant: 'success'
                        });
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'user_updateAuthorizedUser');
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
                    relation: datauser?.user_getCurrentAuthorizedUser?.result?.relation,
                    gender: datauser?.user_getCurrentAuthorizedUser?.result?.gender,
                    activeStatus: datauser?.user_getCurrentAuthorizedUser?.result?.activeStatus,
                    firstName: datauser?.user_getCurrentAuthorizedUser?.result?.firstName,
                    lastName: datauser?.user_getCurrentAuthorizedUser?.result?.lastName,
                    dateOfBirth: datauser?.user_getCurrentAuthorizedUser?.result?.dateOfBirth,
                    phoneNumber: datauser?.user_getCurrentAuthorizedUser?.result?.phoneNumber,
                    residentFlatId: datauser?.user_getCurrentAuthorizedUser?.result?.residentFlatId,
                    id: datauser?.user_getCurrentAuthorizedUser?.result?.id
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
                                datauser?.user_getCurrentAuthorizedUser?.result?.firstName +
                                ' ' +
                                datauser?.user_getCurrentAuthorizedUser?.result?.lastName
                        })
                    );
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    });
                    setimageuser('');
                    setShow(false);
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateAuthorizedUser');
                }
            }
        );
    };

    return (
        <residentstyle.container>
            <residentstyle.profileheader>
                <residentstyle.image>
                    <residentstyle.editeimage onClick={onFilePick}>
                        {InputComponent}
                        <Editeprofile />
                    </residentstyle.editeimage>
                    <residentstyle.profileimguser
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
                        <residentstyle.profileimguserMiddle
                            onClick={onfiledelet}
                            src="/images/delete.png"
                        />
                    )}
                </residentstyle.image>
                <residentstyle.profilenameuser>
                    {pageData.fullnameprofile}
                </residentstyle.profilenameuser>
            </residentstyle.profileheader>
            <residentstyle.profiletabe>
                <Tabs
                    onTabChange={(tab) =>
                        dispatch(setPageData({ ...pageData, activeTab: tab /*activePage: 1*/ }))
                    }
                    // smallTab={smallTab}
                    activeTab={activeTab}
                    //activeTabParent={0}
                    tabs={tabs}
                    // fulloverlay={fulloverlay}
                    // rows={props.rows}
                />
            </residentstyle.profiletabe>

            <residentstyle.profiletabe>
                {activeTab.label === EresidentTabsKey.Personal ? (
                    <Personal />
                ) : activeTab.label === EresidentTabsKey.Property ? (
                    <Peroperty />
                ) : (
                    <Setting />
                )}
            </residentstyle.profiletabe>

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
        </residentstyle.container>
    );
};

const mapStateToProps = ({ pageData }) => ({ pageData });

const mapDispatchToProps = { setPageData };

export default connect(mapStateToProps, mapDispatchToProps)(Profileresident);
