import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.errorMessage}
      footer={<Button type="button" onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.errorMessage}</p>
    </Modal>
  );
};

export default ErrorModal;
