import React, { FC, useEffect, useState } from 'react';
import { Menu, Typography } from '@mui/material';
import * as S from '../residentFlats/residentFlats.style';
import ResidentFlatFillIcon from 'src/assets/icons/residentIconFill';
import ResidentFlatIcon from 'src/assets/icons/residentIcon';
import { useUser_GetCurrentComplexManagerQuery, ActiveStatus } from 'src/graphql/generated';
import COLORS from '@/utils/theme/colors';
import useManageActiveResidentFlat from 'src/hooks/useManageActiveResidentFlat';
import { useGetUser } from 'src/auth/UserProvider';
import { useRouter } from 'next/router';

const complexmanager: FC = () => {
    const user = useGetUser();
    const router = useRouter();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [activeComplexId, setActiveComplexId] = useState<number>();
    const [activeResidentFlatId, setactiveResidentFlatId] = useState<number>();
    const [listcomplex, setlistcomplex] = useState([]);

    const complexUser = useUser_GetCurrentComplexManagerQuery();
    const hasUser = typeof user === 'object' && user !== null;

    useEffect(() => {
        var js = [];
        complexUser?.data?.user_getCurrentComplexManager?.result?.complexManagerComplexes?.forEach(
            (item, index) => {
                js.push({
                    address: item.complex.name,
                    flatid: item.complex.id,
                    id: item.complex.id,
                    block: item.complex.id,
                    complexId: item.complex.id
                });
            }
        );
        if (js.length > 0) setlistcomplex(js);
    }, [complexUser.isLoading]);

    const { handleGetActiveFlatId, handleGetResidentFlatId, handleSetActiveResidentFlatId } =
        useManageActiveResidentFlat();

    useEffect(() => {
        setActiveComplexId(+handleGetActiveFlatId());
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
                        maxWidth: '100vw'
                    }
                }}>
                {listcomplex?.map((item, key) => {
                    const isActive = activeComplexId === item.complexId;
                    const color = isActive ? COLORS.info : COLORS.black1;

                    return (
                        <S.MenuItem
                            key={key}
                            onClick={() => {
                                handleSetActiveResidentFlatId(
                                    item.flatid.toString(),
                                    item.id.toString(),
                                    item.block.toString(),
                                    item.complexId.toString()
                                );
                                setActiveComplexId(item.complexId);
                                handleClose();
                                router.push('/admin');
                            }}>
                            <ResidentFlatIcon color={color} />

                            <Typography
                                variant="body2"
                                color={color}
                                style={{ marginLeft: 15, marginTop: 3 }}>
                                {item.address}
                            </Typography>
                        </S.MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
};

export default complexmanager;
