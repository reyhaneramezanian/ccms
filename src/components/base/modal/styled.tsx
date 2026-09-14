import styled from '@emotion/styled';
import { MText } from '@/components/base/MText';

import { CommonModalProps } from '@/components/shared/modal/useModal'



import { Modal } from 'react-overlays';
import {
    MODAL_EXTERNAL_MAX_WIDTH,
    MODAL_INTERNAL_MAX_WIDTH,
    MODAL_SMALL_EXTERNAL_MAX_WIDTH
} from 'src/utils/theme/constant';

import { StyledColumn } from '../view-container/Column';
import { StyledRow } from '../view-container/Row';

interface ModalType {
    with_height?: 'true' | undefined;
    maxWidth?: AppBreakpointKeys;
}

interface ModalBody {
    sm?: boolean;
    pad?: number;
    center?: boolean;
}

export const BSModal = styled(Modal)<ModalType>(({ theme, with_height, maxWidth = 'md' }) => ({
    zIndex: theme.zIndex.modal,
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    borderStyle: 'none',
    outline: 0,
    border: 0,
    borderRadius: theme.shape.borderRadius.common,
    backgroundColor: '#FFF',
    transition: 'all 0.3s',
    ...(maxWidth && { maxWidth: theme.breakpoints[maxWidth] }),
    ...(with_height && {
        height: '100%',
        maxHeight: 1000,
        [theme.breakpoints.height.up.md]: {
            height: '80%'
        }
    })
}));

export const BaseModal = styled(Modal)<ModalType>(({ theme, with_height,  max_width = 'md' }) => ({
    zIndex: theme.zIndex.modal,
    padding: 32,
    // width: 450,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    borderStyle: 'none',
    borderRadius: '10px',
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    outline: 0,
    border: 0,
    backgroundColor: '#FFF',
    transition: 'all 0.3s',
    ...(max_width && { maxWidth: theme.breakpoints.values[max_width] }),
    ...(with_height && {
        height: '100%',
        maxHeight: 1000,
        [theme.breakpoints.height.up.md]: {
            height: '80%'
        }
    })
}));

export const Backdrop = styled.div(({ theme }) => ({
    zIndex: theme.zIndex.modal,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backdropFilter: 'blur(5px)',
}));


export const BSModalBody = styled.div<ModalBody>(({ theme, center }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'auto',
    ...(center && {
        alignItems: 'center'
    }),
    [theme.breakpoints.down.sm]: {
        width: '100%'
    }
}));

export const BSModalInternalBody = styled.div<ModalType>(({}) => ({
    maxWidth: MODAL_INTERNAL_MAX_WIDTH,
    width: '80%',
    margin: 'auto'
}));

export const StyledModalInternalBody = styled.div<ModalType>(({}) => ({
    maxWidth: MODAL_INTERNAL_MAX_WIDTH,
    width: '80%',
    margin: 'auto'
}));

export const SModalTitle = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 32
});

export const SModalLongTitle = styled(SModalTitle)(({ theme }) => ({
    [theme.breakpoints.height.down.md]: {
        '& > button': {
            position: 'absolute',
            top: 8,
            right: 8
        }
    }
}));

export const StyledModalAction = styled.div<ModalType>(({}) => ({}));

export const StyledModalContent = styled(BSModalBody)<{
    maxW?: number | string;
    w?: number | string;
}>(({ maxW = MODAL_EXTERNAL_MAX_WIDTH, w = '100%' }) => ({
    width: w,
    maxWidth: maxW,
    padding: 8
}));

export const StyledSmallModalContent = styled(StyledModalContent)(
    ({ maxW = MODAL_SMALL_EXTERNAL_MAX_WIDTH }) => ({
        maxWidth: maxW
    })
);

export const StyledModalActionsRow = styled(StyledRow)({
    width: '80%',
    maxWidth: MODAL_INTERNAL_MAX_WIDTH,
    margin: '24px  auto 0 auto',
    flex: 1
});

export const StyledModalActionsColumn = styled(StyledColumn)({
    width: '80%',
    maxWidth: MODAL_INTERNAL_MAX_WIDTH,
    margin: '24px  auto 0 auto',
    flex: 1
});

export const ModalActionSpace = styled.div({
    flex: 0.1
});

export const BSModalBox = styled.div({
    padding: '20px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '480px',
    borderRadius: '10px',
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    // maxWidth: MODAL_INTERNAL_MAX_WIDTH,
    // boxShadow: '0px 0px 5px 2px #E6E6E6',
    // maxWidth: MODAL_INTERNAL_MAX_WIDTH,
    margin: 'auto',
    position: 'relative'
}); 
//TODO: this color should be add somewhere in theme.
export const BSucessModalBox = styled.div({
    padding: '15px',
    // backgroundColor: '#E9F5EA',
    color: '#609B64',
    border: '4px solid #609B64',
    display: 'flex',
    borderRadius: '10px',
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    maxWidth: MODAL_INTERNAL_MAX_WIDTH,
    margin: 'auto',
}); 

export const BSModalTitle = styled(MText)({
    fontWeight: 'bold'
}); 


