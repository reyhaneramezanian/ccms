export interface IConfirmationModalProps {
    id: string;
    type: 'delete' | 'deactivate';
    handleAccept(): void;
    isLoading?: boolean;
}
