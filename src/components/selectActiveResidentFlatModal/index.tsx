import COLORS from '@/utils/theme/colors';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import storageKeys from 'src/data/storageKeys';
import {
    useResidentUserGetQuery,
    useUser_GetCurrentAuthorizedUserQuery,
    ActiveStatus,
    ApprovalStatus,
    UserType,
    useBlockManager_GetBlockManagersQuery,
    useUser_GetCurrentComplexManagerQuery
} from 'src/graphql/generated';
import useManageActiveResidentFlat from 'src/hooks/useManageActiveResidentFlat';
import { closeModal, newModal } from 'src/redux/actions/actions';
import * as S from './selectActiveResidentFlatModal.style';
import { useGetUser } from 'src/auth/UserProvider';
import Utils from '@/utils/utils';

const SelectActiveResidentFlat = () => {
    const user = useGetUser();

    const [activeFlatId, setActiveFlatId] = useState<number>();
    const [activeResidentFlatId, setactiveResidentFlatId] = useState<number>();
    const [activeblockId, setactiveblockId] = useState<number>();
    const [activecomplexId, setactivecomplexId] = useState<number>();
    const [blockmanage, setblockmanage] = useState<boolean>(false);
    const [activecredit, setactivecredit] = useState<string>();
    const [activepaymentMode, setactivepaymentMode] = useState<string>(false);

    const [listflat, setlistflat] = useState([]);

    const residentUser = useResidentUserGetQuery();
    const router = useRouter();
    const { handleSetActiveResidentFlatId } = useManageActiveResidentFlat();

    const hasUser = typeof user === 'object' && user !== null;
    const blockmanager = useBlockManager_GetBlockManagersQuery(
        {
            where: { residentId: { eq: user.id } }
        },
        { enabled: hasUser }
    );
    //const complexUser = useUser_GetCurrentComplexManagerQuery();

    useEffect(() => {
        var js = [],
            blockmanag = false;
        /* complexUser?.data?.user_getCurrentComplexManager?.result?.complexManagerComplexes?.forEach(
            (item, index) => {
                js.push({
                    address: item.complex.name,
                    flatid: item.complex.id,
                    id: item.complex.id,
                    block: item.complex.id,
                    complexId: item.complex.id
                });
            }
        );*/
        residentUser?.data?.user_getCurrentResident?.result?.residentFlats?.forEach(
            (item, index) => {
                if (
                    item.approvalStatus === ApprovalStatus.Approved &&
                    item.activeStatus === ActiveStatus.Active
                )
                    js.push({
                        address:
                            item.flat.floor.block.complex.name +
                            '/ ' +
                            item.flat.floor.block.name +
                            '/ ' +
                            item.flat.floor.name +
                            '/ ' +
                            item.flat.name,
                        /*+
                            ' (credit: ' +
                            Utils.convertNumberToPrice(item.flat.credit) +
                            ')'*/ flatid: item.flat.id,
                        id: item.id,
                        block: 0,
                        complexId: 0,
                        credit: item.flat.credit,
                        paymentMode: item.flat.floor.block.complex.paymentMode
                    });
            }
        );
        blockmanager?.data?.blockManager_getBlockManagers?.result?.items?.forEach((item, index) => {
            /* if (item?.activeStatus === ActiveStatus.Active) {
                setblockmanage(true);
                js.push({
                    address: item.block.complex.name + '/ ' + item.block.name + ' (Block manager)',
                    flatid: 0,
                    id: item.id,
                    block: item.block.id,
                    complexId: item.block.complex.id
                });
            }*/
            if (item?.activeStatus === ActiveStatus.Active) blockmanag = true;
        });
        if (blockmanag)
            js.push({
                address: 'Block manager',
                flatid: 0,
                id: 0,
                block: 0,
                complexId: 0,
                credit: '0',
                paymentMode: '0'
            });
        if (js.length > 0) setlistflat(js);
    }, [residentUser, blockmanager]);

    const handleActiveFlat = (
        flatId: number,
        id: number,
        block: number,
        complexId: number,
        credit: string,
        paymentMode: string
    ) => {
        setActiveFlatId(flatId);
        setactiveResidentFlatId(id);
        setactiveblockId(block);
        setactivecomplexId(complexId);
        setactivecredit(credit);
        setactivepaymentMode(paymentMode);
    };

    const handleChooseFlat = () => {
        if (activeFlatId !== undefined) {
            handleSetActiveResidentFlatId(
                activeFlatId?.toString(),
                activeResidentFlatId?.toString(),
                activeblockId?.toString(),
                activecomplexId?.toString(),
                activecredit?.toString(),
                activepaymentMode?.toString()
            );
            if (
                activeFlatId !== 0 //&& user.userType !== UserType.ComplexManager
            ) {
                localStorage.setItem(storageKeys.usertype, 'resident');
                router.push('/resident');
            } else if (user.userType !== UserType.ComplexManager) {
                localStorage.setItem(storageKeys.usertype, 'BlockManager');
                router.push('/admin');
            } else if (user.userType === UserType.ComplexManager) {
                localStorage.setItem(storageKeys.usertype, 'ComplexManager');
                router.push('/admin');
            } else router.push('/admin');
        }
    };

    if (user.userType !== UserType.ComplexManager && residentUser.isLoading) return null;
    // if (user.userType === UserType.ComplexManager && complexUser.isLoading) return null;
    return (
        <Box style={{ width: 500, maxWidth: '100%' }}>
            <Typography>
                {
                    /*user.userType === UserType.ComplexManager
                    ? 'Which complex do you want to log in?'
                    :*/ blockmanage
                        ? 'Which property/block do you want to log in?'
                        : 'Which property do you want to log in?'
                }
            </Typography>

            <Box paddingTop="10px">
                {listflat?.map((item, index) => {
                    const isActiveFlat = item.flatid === activeFlatId;

                    return (
                        <S.FlatBoxItem
                            isActive={isActiveFlat}
                            key={index}
                            onClick={() => {
                                handleActiveFlat(
                                    item.flatid,
                                    item.id,
                                    item.block,
                                    item.complexId,
                                    item.credit.toString(),
                                    item.paymentMode.toString()
                                );
                            }}>
                            <Typography
                                variant="body1"
                                color={isActiveFlat ? COLORS.white : COLORS.black1}>
                                {item.address}
                            </Typography>
                        </S.FlatBoxItem>
                    );
                })}
            </Box>

            <Box marginTop="30px" display="flex" justifyContent="flex-end">
                <Button variant="contained" onClick={handleChooseFlat}>
                    Choose
                </Button>
            </Box>
        </Box>
    );
};

const handleShowSelectActiveResidentFlatModal = () => {
    return newModal({
        title: 'Choose ',
        topBar: true,
        Body: SelectActiveResidentFlat,
        isNotCloseModal: true
    });
};

export default handleShowSelectActiveResidentFlatModal;
