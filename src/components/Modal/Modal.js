import React from 'react';
import { Modal as MuiModal, Dialog } from '@material-ui/core';

const Modal = () => {
  return (
    <Dialog>
      <MuiModal
        open={true}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="div"></div>
      </MuiModal>
    </Dialog>
  );
};

export default Modal;
