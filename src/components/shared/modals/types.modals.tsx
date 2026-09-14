export interface IModalBodyProps<D = any> {
    closeModal(): void;
    id: string;
    activetab: string;
    data: D;
}

export interface Modal {
    closeButton?: boolean;
    Body: React.FC<IModalBodyProps>;
    Container?: React.FC<any>;
    id?: string;
    title?: string;
    callback?: any;
    navbarModal?: boolean;
    text?: string;
    onSubmit?: () => void;
    topBar?: boolean;
    data?: any;
    isNotCloseModal?: boolean;
}
