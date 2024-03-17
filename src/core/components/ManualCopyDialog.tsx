import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNotification } from '../hooks';

interface ManualCopyDialogProps {
  open: boolean;
  url: string;
  onClose: () => void;
}

function ManualCopyDialog({ open, url, onClose }: ManualCopyDialogProps) {
  const { showNotification } = useNotification();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url).then(() => {
      showNotification(
        'Copiouse a url da invitación no portapapeis',
        'success'
      );
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Copiar URL de invitación</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="invitationUrl"
          label="URL de Invitación"
          type="text"
          fullWidth
          variant="outlined"
          value={url}
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleCopyClick}>Copiar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ManualCopyDialog;
