export type Modal = {
    closeButton?: boolean;
    Body: React.FC<any>;
    Container?: React.FC<any>;
    id?: string | number;
    title?: string;
    navbarModal?: boolean;
};
