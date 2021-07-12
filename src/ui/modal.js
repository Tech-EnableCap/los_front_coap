import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./backdrop";
import "./modal.css";

function ModelOverlay(props) {
  const content = (
    <div className={`Modal ${props.className}`} style={props.style}>
      <header className={`Modal__header ${props.HeaderClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`Modal__content ${props.contentClass}`}>
          {props.children}
        </div>

        <footer className={`Modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}

function Modal(props) {
  return (
    <React.Fragment>
      {props.show && <Backdrop onPress={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={10}
        classNames="modal"
      >
        <ModelOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
}
export default Modal;
