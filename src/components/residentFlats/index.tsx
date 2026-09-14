import React, { FC, useEffect, useState } from 'react';
import { Menu, Typography } from '@mui/material';
import * as S from './residentFlats.style';
import ResidentFlatFillIcon from 'src/assets/icons/residentIconFill';
import ResidentFlatIcon from 'src/assets/icons/residentIcon';
import {
    useResidentUserGetQuery,
    useBlockManager_GetBlockManagersQuery,
    ActiveStatus,
    ApprovalStatus
} from 'src/graphql/generated';
import COLORS from '@/utils/theme/colors';
import useManageActiveResidentFlat from 'src/hooks/useManageActiveResidentFlat';
import { useGetUser } from 'src/auth/UserProvider';
import { useRouter } from 'next/router';
import storageKeys from 'src/data/storageKeys';
import Utils from '@/utils/utils';

const ResidentFlats: FC = () => {
    const user = useGetUser();
    const router = useRouter();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [activeFlatId, setActiveFlatId] = useState<number>();
    const [activeResidentFlatId, setactiveResidentFlatId] = useState<number>();
    const [listflat, setlistflat] = useState([]);

    const residentUser = useResidentUserGetQuery();
    const hasUser = typeof user === 'object' && user !== null;
    const blockmanager = useBlockManager_GetBlockManagersQuery(
        {
            where: { residentId: { eq: user.id } }
        },
        { enabled: hasUser }
    );

    useEffect(() => {
        var js = [],
            blockmanag = false;
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
                        /* +
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
            /* if (item?.activeStatus === ActiveStatus.Active)
                js.push({
                    address: item.block.complex.name + '/ ' + item.block.name + ' (Block manager)',
                    flatid: 0,
                    id: item.id,
                    block: item.block.id,
                    complexId: item.block.complex.id
                });*/
            if (item?.activeStatus === ActiveStatus.Active) blockmanag = true;
        });
        if (blockmanag)
            js.push({
                address: 'Block manager',
                flatid: 0,
                id: 0,
                block: 0,
                complexId: 0,
                credit: 0,
                paymentMode: 0
            });
        if (js.length > 0) setlistflat(js);
    }, [residentUser.isLoading, blockmanager.isLoading]);

    const { handleGetActiveFlatId, handleGetResidentFlatId, handleSetActiveResidentFlatId } =
        useManageActiveResidentFlat();

    useEffect(() => {
        setActiveFlatId(+handleGetActiveFlatId());
        setactiveResidentFlatId(+handleGetResidentFlatId());
    }, [handleGetActiveFlatId, handleGetResidentFlatId]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <S.IconWrapper onClick={handleClick}>
                <ResidentFlatFillIcon />
            </S.IconWrapper>

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                style={{ top: 29 }}
                PaperProps={{
                    style: {
                        maxHeight: '200px',
                        width: '340px',
                        maxWidth: '100vw',
                        overflow: 'scroll'
                    }
                }}>
                {listflat?.map((item, key) => {
                    const isActive = activeFlatId === item.flatid;
                    const color = isActive ? COLORS.info : COLORS.black1;

                    return (
                        <S.MenuItem
                            key={key}
                            onClick={() => {
                                handleSetActiveResidentFlatId(
                                    item.flatid.toString(),
                                    item.id.toString(),
                                    item.block.toString(),
                                    item.complexId.toString(),
                                    item.credit.toString(),
                                    item.paymentMode.toString()
                                );
                                /* if (
                                    (activeFlatId === 0 && item.flatid !== 0) ||
                                    (activeFlatId !== 0 && item.flatid === 0)
                                ) {
                                    setActiveFlatId(item.flatid);
                                    setactiveResidentFlatId(item.id);

                                    handleClose();
                                    if (activeFlatId === 0 && item.flatid !== 0)
                                        router.push('/resident');
                                    else router.push('/admin');
                                } else {*/
                                setActiveFlatId(item.flatid);
                                setactiveResidentFlatId(item.id);

                                handleClose();
                                if (item.flatid !== 0) {
                                    localStorage.setItem(storageKeys.usertype, 'resident');
                                    router.push('/resident');
                                } else {
                                    localStorage.setItem(storageKeys.usertype, 'BlockManager');
                                    router.push('/admin');
                                }
                            }}>
                            <ResidentFlatIcon color={color} width={16} />

                            <Typography
                                variant="body2"
                                color={color}
                                style={{ marginLeft: 15, marginTop: 3, width: 200 }}>
                                {item.address}
                            </Typography>
                        </S.MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
};

export default ResidentFlats;
