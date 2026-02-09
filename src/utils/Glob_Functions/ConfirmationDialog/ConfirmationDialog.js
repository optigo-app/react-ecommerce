import React from 'react';
import "./for_confirmation.scss"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1.2,
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
        },
      }}
      className='DRM'
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontSize: 18,
          fontWeight: 600,
          color: "#111",
          pb: 1,
          textAlign: "center",
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent sx={{ px: 2, pb: 1 }}>
        <DialogContentText
          id="alert-dialog-description"
          sx={{
            fontSize: 14.5,
            color: "#555",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          {content}
        </DialogContentText>
      </DialogContent>

      <Divider sx={{ my: 1 }} />

      <DialogActions
        sx={{
          px: 1,
          pb: 1.5,
          display: "flex",
          gap: 1.5,
        }}
      >
        {/* Remove Button */}
        <Button
          onClick={onConfirm}
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: 15,
            bgcolor: "#d32f2f",
            color: "#fff",
            borderRadius: 2,
            py: 1,
            "&:hover": {
              bgcolor: "#b32727",
            },
          }}
        >
          Remove
        </Button>

        {/* Cancel Button */}
        <Button
          onClick={onClose}
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: 500,
            fontSize: 15,
            bgcolor: "#f5f5f5",
            color: "#333",
            borderRadius: 2,
            py: 1,
            "&:hover": {
              bgcolor: "#e9e9e9",
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;


// import React from 'react';
// import "./for_confirmation.scss"
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { Divider } from '@mui/material';

// const ConfirmationDialog = ({ open, onClose, onConfirm, title, content }) => {
//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       aria-labelledby="alert-dialog-title"
//       aria-describedby="alert-dialog-description"
//       className='DRM'
//     >
//       <DialogTitle id="alert-dialog-title" className='alert-TitleCl'>{title}</DialogTitle>
//       <DialogContent>
//         <DialogContentText id="alert-dialog-description" className='alert-titleContent'>
//           {content}
//         </DialogContentText>
//       </DialogContent>
//       <Divider />
//       <DialogActions>
//         <Button className='for_DialogBtn' onClick={onConfirm} autoFocus fullWidth>
//           Remove
//         </Button>
//         <Divider orientation="vertical" flexItem />
//         <Button className='for_DialogBtn' onClick={onClose} autoFocus fullWidth>
//           Cancel
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ConfirmationDialog;
