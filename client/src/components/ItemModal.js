import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import ShoppingList from "./shoppingList";

class ItemModal extends Component {
  state = {
    modal: false,
    name: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="wide-modal"
        >
          <ModalHeader toggle={this.toggle}>Add items to cart</ModalHeader>
          <ModalBody>
            <ShoppingList />
          </ModalBody>
        </Modal>
        <button className="btn-cartlist" onClick={this.toggle}>
          Add Item
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
