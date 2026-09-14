import handleShowSelectActiveResidentFlatModal from '@/components/selectActiveResidentFlatModal';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUser } from 'src/auth/UserProvider';
import storageKeys from 'src/data/storageKeys';
import {
    useResidentUserGetQuery,
    useUser_GetCurrentAuthorizedUserQuery,
    UserType,
    ActiveStatus,
    ApprovalStatus,
    useBlockManager_GetBlockManagersQuery,
    useUser_GetCurrentComplexManagerQuery
} from 'src/graphql/generated';
import { useSnackbar } from 'notistack';
import { useAuthPage } from '@/components/auth/services/useAuth';

const useManageActiveResidentFlat = (isRoot?: boolean) => {
    const { enqueueSnackbar } = useSnackbar();
    const user = useGetUser();
    const hasUser = typeof user === 'object' && user !== null;
    const { signOut, isSignOutLoading } = useAuthPage();
    /* const complexUser = useUser_GetCurrentComplexManagerQuery(undefined, {
        enabled: hasUser && user.userType === UserType.ComplexManager
    });*/
    const residentUser = useResidentUserGetQuery(undefined, {
        enabled: hasUser && user.userType === UserType.Resident
    });
    const authorizedUser = useUser_GetCurrentAuthorizedUserQuery(undefined, {
        enabled: hasUser && user.userType === UserType.AuthorizedUser
    });
    const blockmanager = useBlockManager_GetBlockManagersQuery(
        {
            where: { residentId: { eq: user.id } }
        },
        { enabled: hasUser && user.userType === UserType.Resident }
    );
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (
            !hasUser ||
            !isRoot ||
            localStorage.getItem(storageKeys.showmodal) === 'show' ||
            (user.userType !== UserType.Resident && user.userType !== UserType.AuthorizedUser) ||
            // user.userType !== UserType.ComplexManager
            (residentUser.isLoading && authorizedUser.isLoading && blockmanager.isLoading) ||
            //complexUser.isLoading
            (typeof handleGetActiveFlatId() === 'string' &&
                typeof handleGetResidentFlatId() === 'string')
        ) {
            if (user.userType === UserType.ComplexManager) router.push('/admin');
            else return;
        }

        handleShowModal();
        // eslint-disable-next-line
    }, [
        user,
        hasUser,
        isRoot,
        residentUser.isLoading,
        authorizedUser.isLoading,
        blockmanager.isLoading
        //complexUser.isLoading
    ]);
    function handleSetActiveResidentFlatId(
        flatId?: string,
        id?: string,
        block?: string,
        complexId?: string,
        credit?: string,
        paymentMode?: string
    ) {
        localStorage.setItem(storageKeys.activeResidentFlatId, flatId);
        localStorage.setItem(storageKeys.ResidentFlatId, id);
        localStorage.setItem(storageKeys.activeblockId, block);
        localStorage.setItem(storageKeys.activecomplexId, complexId);
        localStorage.setItem(storageKeys.creditFaltId, credit);
        localStorage.setItem(storageKeys.paymentModeComplex, paymentMode);
    }

    function handleShowModal() {
        var js = [],
            residentFlats,
            blockmanag = false,
            complexlist = [];
        /*if (user.userType === UserType.ComplexManager) if (complexUser.isLoading) return;
        if (user.userType === UserType.ComplexManager) {
            residentFlats =
                complexUser?.data?.user_getCurrentComplexManager?.result?.complexManagerComplexes;
        }*/
        if (user.userType === UserType.Resident) if (residentUser.isLoading) return;
        if (user.userType === UserType.Resident) {
            residentFlats =
                residentUser?.data?.user_getCurrentResident?.result?.residentFlats?.filter(
                    (item) =>
                        item.approvalStatus == ApprovalStatus.Approved &&
                        item.activeStatus === ActiveStatus.Active
                );
            if (residentFlats.length == 0) {
                enqueueSnackbar('You have not active flat', { variant: 'error' });
                signOut();
            }

            blockmanager?.data?.blockManager_getBlockManagers?.result?.items?.forEach(
                (item, index) => {
                    if (item?.activeStatus === ActiveStatus.Active) blockmanag = true;
                }
            );
        }
        if (user.userType === UserType.AuthorizedUser) if (authorizedUser.isLoading) return;

        if (user.userType === UserType.AuthorizedUser) {
            js.push(authorizedUser?.data?.user_getCurrentAuthorizedUser?.result.residentFlat);
            var residentFlats = js;
        }
        if (!Array.isArray(residentFlats)) return;
        if (blockmanager.isLoading) return;

        if (residentFlats.length != 0 && (residentFlats.length > 1 || blockmanag)) {
            localStorage.setItem(storageKeys.showmodal, 'show');
            dispatch(handleShowSelectActiveResidentFlatModal());
            return;
        }

        /* if (user.userType !== UserType.ComplexManager) {
            handleSetActiveResidentFlatId(
                residentFlats[0]?.flat?.id.toString(),
                residentFlats[0]?.id.toString(),
                '0',
                '0'
            );
            router.push('/resident');
        } else {*/
        if (residentFlats.length !== 0) {
            handleSetActiveResidentFlatId(
                residentFlats[0]?.flat?.id.toString(),
                residentFlats[0]?.id.toString(),
                '0',
                '0',
                residentFlats[0]?.flat?.credit,
                residentFlats[0]?.flat?.floor?.block?.complex?.paymentMode
            );
            router.push('/resident');
        }
        // }
    }

    function handleGetActiveFlatId(): string | undefined {
        if (
            !hasUser ||
            (user.userType !== UserType.Resident && user.userType !== UserType.AuthorizedUser)
            // user.userType !== UserType.ComplexManager
        )
            return;

        const activeResidentFlatId = localStorage.getItem(storageKeys.activeResidentFlatId);
        return activeResidentFlatId;
    }
    function handleGetResidentFlatId(): string | undefined {
        if (
            !hasUser ||
            (user.userType !== UserType.Resident && user.userType !== UserType.AuthorizedUser)
            //user.userType !== UserType.ComplexManager
        )
            return;

        const ResidentFlatId = localStorage.getItem(storageKeys.ResidentFlatId);
        return ResidentFlatId;
    }

    function handleClearActiveResidentFlatId() {
        localStorage.removeItem(storageKeys.activeResidentFlatId);
        localStorage.removeItem(storageKeys.ResidentFlatId);
        localStorage.removeItem(storageKeys.activeblockId);
        localStorage.removeItem(storageKeys.activecomplexId);
        localStorage.removeItem(storageKeys.creditFaltId);
        localStorage.removeItem(storageKeys.paymentModeComplex);
    }

    return {
        handleGetResidentFlatId,
        handleGetActiveFlatId,
        handleClearActiveResidentFlatId,
        handleSetActiveResidentFlatId
    };
};

export default useManageActiveResidentFlat;
