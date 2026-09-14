import { Modal } from 'src/components/shared/modals/types.modals';
import { PageDataType } from '../reducer/reducer';

export const types = {
    ACTIVE_SIDEBAR: 'ACTIVE_SIDEBAR',
    NEW_MODAL: 'NEW_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
    SET_PAGE_DATA: 'SET_PAGE_DATA',
    SET_DIRTY_FORM: 'SET_DIRTY_FORM',
    ACTIVE_TAB: 'ACTIVE_TAB',
    SET_CHAT_KEY: 'SET_CHAT_KEY'
};

export function activeSideBar(mustActive: boolean) {
    return {
        type: types.ACTIVE_SIDEBAR,
        payload: mustActive
    };
}

export function activeTab(tabName: string) {
    return {
        type: types.ACTIVE_TAB,
        payload: tabName
    };
}

export function newModal(modal: Partial<Modal>) {
    return {
        type: types.NEW_MODAL,
        payload: modal
    };
}

export function setChatKey(key: any) {
    return {
        type: types.SET_CHAT_KEY,
        payload: key
    };
}

export function closeModal(id: string) {
    return {
        type: types.CLOSE_MODAL,
        payload: id
    };
}

export function setPageData(pageData: PageDataType) {
    return {
        type: types.SET_PAGE_DATA,
        payload: pageData
    };
}

export function setIsDirtyForm(isDirty: boolean) {
    return {
        type: types.SET_DIRTY_FORM,
        payload: isDirty
    };
}
