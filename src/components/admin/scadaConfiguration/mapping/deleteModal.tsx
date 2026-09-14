import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { newModal } from 'src/redux/actions/actions';

const ScadaConfigurationDeleteModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const handleAccept = () => {
        console.log(data);
    };

    return (
        <ConfirmationModal
            id={ScadaConfigurationDeleteModal.name}
            type="delete"
            handleAccept={handleAccept}
        />
    );
};

const handleShowscadaConfigurationDeleteModal = (data: RowTable) => {
    return newModal({
        closeButton: true,
        Body: ScadaConfigurationDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: ScadaConfigurationDeleteModal.name,
        data
    });
};

export default handleShowscadaConfigurationDeleteModal;
