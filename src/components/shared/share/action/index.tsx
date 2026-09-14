import React, { FC } from 'react';
import { IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Delete from 'src/assets/icons/Delete';
import Accept from 'src/assets/icons/accept';
import Reject from 'src/assets/icons/rejectmenu';
import Edit from 'src/assets/icons/Edit';
import Property from 'src/assets/icons/property-resident';
import Convertoservice from 'src/assets/icons/servicesMenuIcon';
import Seeicon from 'src/assets/icons/see';
import BlockMenu from 'src/assets/icons/blockmenu';
import Expire from 'src/assets/icons/expire';
import * as S from './action.style';

const Action: FC<{
    handleEdit?(): void;
    handleDelete?(): void;
    handleConvertToservice?(): void;
    handleSeeProfile?(): void;
    handleSetasblock?(): void;
    handleAccepts?(): void;
    handleReject?(): void;
    handleUserproperty?(): void;
    handleSetasexpire?(): void;
}> = ({
    handleDelete,
    handleEdit,
    handleConvertToservice,
    handleSeeProfile,
    handleSetasblock,
    handleAccepts,
    handleReject,
    handleUserproperty,
    handleSetasexpire
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isShowEdit = typeof handleEdit === 'function',
        isShowDelete = typeof handleDelete === 'function',
        isShowConvertToservice = typeof handleConvertToservice === 'function',
        isShowSeeProfile = typeof handleSeeProfile === 'function',
        isShowSetasblock = typeof handleSetasblock === 'function',
        isShowSetAccept = typeof handleAccepts === 'function',
        isShowSetReject = typeof handleReject === 'function',
        isShowUserproperty = typeof handleUserproperty === 'function',
        isShowSetasexpire = typeof handleSetasexpire === 'function';
    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: '200px',
                        width: '22ch'
                    }
                }}>
                {isShowSetasblock && (
                    <S.MenuItem
                        onClick={() => {
                            handleSetasblock();
                            handleClose();
                        }}>
                        <BlockMenu /> <span style={{ marginLeft: '10px' }}>Set as block admin</span>
                    </S.MenuItem>
                )}
                {isShowSetasexpire && (
                    <S.MenuItem
                        onClick={() => {
                            handleSetasexpire();
                            handleClose();
                        }}>
                        <Expire /> <span style={{ marginLeft: '10px' }}>Set as expire</span>
                    </S.MenuItem>
                )}
                {isShowUserproperty && (
                    <S.MenuItem
                        onClick={() => {
                            handleUserproperty();
                            handleClose();
                        }}>
                        <Property /> <span style={{ marginLeft: '10px' }}>Property resident</span>
                    </S.MenuItem>
                )}
                {isShowEdit && (
                    <S.MenuItem
                        onClick={() => {
                            handleEdit();
                            handleClose();
                        }}>
                        <Edit /> <span style={{ marginLeft: '10px' }}>Edit item</span>
                    </S.MenuItem>
                )}

                {isShowConvertToservice && (
                    <S.MenuItem
                        onClick={() => {
                            handleConvertToservice();
                            handleClose();
                        }}>
                        <Convertoservice />
                        <span style={{ marginLeft: '10px' }}>Convert to service</span>
                    </S.MenuItem>
                )}

                {isShowSeeProfile && (
                    <S.MenuItem
                        onClick={() => {
                            handleSeeProfile();
                            handleClose();
                        }}>
                        <Seeicon /> <span style={{ marginLeft: '10px' }}>View item</span>
                    </S.MenuItem>
                )}

                {isShowDelete && (
                    <S.MenuItem
                        onClick={() => {
                            handleDelete();
                            handleClose();
                        }}>
                        <Delete />{' '}
                        <span style={{ marginLeft: '10px', color: '#E63C49' }}>Delete item</span>
                    </S.MenuItem>
                )}

                {isShowSetAccept && (
                    <S.MenuItem
                        onClick={() => {
                            handleAccepts();
                            handleClose();
                        }}>
                        <Accept />{' '}
                        <span style={{ marginLeft: '10px', color: '#3DCC79' }}>Accept</span>
                    </S.MenuItem>
                )}
                {isShowSetReject && (
                    <S.MenuItem
                        onClick={() => {
                            handleReject();
                            handleClose();
                        }}>
                        <Reject />{' '}
                        <span style={{ marginLeft: '10px', color: '#E63C49' }}>Reject</span>
                    </S.MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default Action;
