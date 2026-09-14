import { useSelector } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducer/reducer';

const store = (isLocale: boolean) =>
    createStore(
        reducer,
        isLocale
            ? window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
            : undefined
    );

export default store;

type RootReducer = ReturnType<typeof reducer>;

export const useAppSelector: import('react-redux').TypedUseSelectorHook<RootReducer> = useSelector;
