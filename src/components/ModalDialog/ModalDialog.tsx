import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ModalDialogProps } from "./ModalDialog.types.ts";
import { motion } from "framer-motion";

const ModalDialog = ({
  openDialog,
  handleCloseDialog,
  title,
  content,
}: ModalDialogProps) => {
  const DialogMotion = motion(Dialog);

  return (
    <DialogMotion
      initial={{ opacity: 0, scale: 2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0 }}
      open={openDialog}
      onClose={handleCloseDialog}
    >
      <DialogTitle variant="h4">{title}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </DialogMotion>
  );
};

export default ModalDialog;
