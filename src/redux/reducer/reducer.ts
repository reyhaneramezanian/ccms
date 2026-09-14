import { types } from 'src/redux/actions/actions';
import { Modal } from 'src/components/shared/modals/types.modals';
import { TableContainerProps } from '@/components/table_container/types.table.container';
import storageKeys from 'src/data/storageKeys';

export type PageDataType = Partial<
    TableContainerProps & { modalData?: any; sortData?: any; path: string }
>;
type State = {
    isSideBarActive: boolean;
    modals: Array<Modal>;
    pageData: PageDataType;
};
export const initialPageData: PageDataType = {
    path: '',
    activePage: 1,
    activePagebid: 1,
    searchData: {},
    sortData: { Sort: 'Sort' },
    dates: { DatePicker: {} } as any,
    showProfile: false,
    sessionItem: '',
    loading: false,
    searchdata: '',
    Bids: 0,
    showpopupedite: false,
    valueedite: [],
    sortDataListerHuduer: { Sort: 'Sort' },
    blockuser: true,
    imageuploud: [],
    checktable: [],
    actionmenu: 'close',
    filterstaff: [],
    flatId: 0,
    filterdata: [],
    activeTab: [],
    fullnameprofile: '',
    imageprofile: ''
};

const initialState = {
    isSideBarActive: false,
    modals: [] as Modal[],
    pageData: initialPageData,
    isDirtyForm: false,
    activeTabName: 'is-not-in-dashboard'
};

export default function reducer(
    state: State = initialState,
    action: { type: string; payload: any }
) {
    switch (action.type) {
        case types.ACTIVE_SIDEBAR:
            return {
                ...state,
                isSideBarActive: action.payload
            };

        case types.ACTIVE_TAB:
            return {
                ...state,
                activeTabName: action.payload
            };
        case types.NEW_MODAL:
            action.payload.id = action.payload.id ?? `${Date.now()}-${state.modals.length}`;
            return {
                ...state,
                modals: [...state.modals, action.payload]
            };
        case types.CLOSE_MODAL:
            return {
                ...state,
                modals: state.modals.filter((modal) => modal.id !== action.payload)
            };
        case types.SET_CHAT_KEY:
            return {
                ...state,
                chatKey: action.payload
            };
        case types.SET_PAGE_DATA:
            return {
                ...state,
                pageData: action.payload as PageDataType
            };
        case types.SET_DIRTY_FORM:
            return {
                ...state,
                isDirtyForm: action.payload
            };
        default:
            return state;
    }
}
