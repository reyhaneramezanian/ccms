import { FC } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';

const ScadaConfigurationEditModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(ScadaConfigurationEditModal.name));
    };

    return (
        <adminstyle.modalbox>
              <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                   // handleDectiveUser(v);
                }}
                initialValues={{Company:'',Description:'',Status:''}}
                validationSchema={Yup.object({
                    Company: Yup.string().required('This field is required'),
                    Description: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required'),

                })}>
                <Form>
                <adminstyle.modalFormRowWrapper>
                    <adminstyle.modalFormRowFieldWrapper>
                        <MInputFormik style={{width:'90%'}} name="Company" 
                        label="Company name" placeholder="Company name" fullWidth/>
                    </adminstyle.modalFormRowFieldWrapper>
                    <adminstyle.modalFormRowFieldWrapper>
                        <MInputFormik style={{  width:'90%'}} name="Description" 
                        label="Description" placeholder="Description" fullWidth/>
                    </adminstyle.modalFormRowFieldWrapper>
                    <adminstyle.modalFormRowFieldWrapper>
                        <MInputFormik style={{  width:'90%'}} name="Status" 
                        label="Status" placeholder="Status" fullWidth/>
                    </adminstyle.modalFormRowFieldWrapper>
                </adminstyle.modalFormRowWrapper>
                <adminstyle.modalButtonGroup>
                    <Box>
                        <Button variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>

                    <Box>
                        <Button variant="outlined" color="grey3" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </adminstyle.modalButtonGroup>
            </Form>
        </Formik>
        </adminstyle.modalbox>
    );
};

const handleShowScadaConfigurationEditModal = (data?: RowTable) => {
    return newModal({
        Body: ScadaConfigurationEditModal,
        title: `${typeof data === 'undefined' ? 'Add' : 'Edit'} SCADA configuration`,
        topBar: true,
        id: ScadaConfigurationEditModal.name,
        data
    });
};

export default handleShowScadaConfigurationEditModal;

