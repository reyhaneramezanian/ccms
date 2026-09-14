import { useSnackbar } from 'notistack';
import { useModal } from 'src/components/modals';

import Button from '@mui/material/Button';
import { Spacer } from 'src/components/base/spacer';

export default function Template() {
    const { enqueueSnackbar } = useSnackbar();
    const { newModal } = useModal();

    return (
        <div>
            <Button
                variant="contained"
                size="small"
                onClick={() => enqueueSnackbar('snack', { variant: 'success' })}>
                new snack
            </Button>
            <Spacer space={'10px'} />
            <Button
                variant="contained"
                size="small"
                onClick={() =>
                    newModal({
                        title: 'Modal',
                        closeButton: false,
                        Body: ModalBody
                    })
                }>
                new modal
            </Button>
        </div>
    );
}

function ModalBody({ closeModal }) {
    return (
        <div style={{ minWidth: '300px' }}>
            <p>Modal Body</p>
            <button onClick={closeModal}>close</button>
        </div>
    );
}
