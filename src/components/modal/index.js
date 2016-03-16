import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Tags from '../../containers/tags';

class TagModal extends Component {
  render () {
    return (
      <Modal show={this.props.modalVisible} onHide={this.props.close} dialogClassName='modal-xl'>
        <Modal.Body>
        <Tags />
          <h4>TAGS WILL BE SHOWN HERE</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

TagModal.propTypes = {
  modalVisible: PropTypes.bool,
  close: PropTypes.func
};

export default TagModal;
