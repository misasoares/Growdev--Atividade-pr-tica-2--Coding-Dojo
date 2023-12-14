import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column'
};

interface ModalProps {
    modal: boolean
    closeModal: (arg0: boolean) => void
}

export default function BasicModal({ modal, closeModal }: ModalProps) {
    const [open, setOpen] = React.useState(modal);



    function handleClose() {
        closeModal(false)
    }

    React.useEffect(() => {
        console.log(open, ' ASDKJFASDLKN')
    }, [open])

    return (
        <div>
            <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Criar avaliação
                    </Typography>
                    
                        <TextField label='Aluno a ser avaliado' />
                        <TextField label='Disciplina' />
                        <TextField label='Nota' />
                    
                    <Button onClick={handleClose} variant='contained'>Concluir</Button>
                    <Button onClick={handleClose} variant='contained' color='error'>Cancelar</Button>

                   
                </Box>
            </Modal>
        </div>
    );
}