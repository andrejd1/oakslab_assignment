import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ModalDialogProps } from "./ModalDialog.types.ts";

const ModalDialog = ({
  openDialog,
  handleCloseDialog,
  title,
  content,
}: ModalDialogProps) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle variant="h4">{title}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDialog;
