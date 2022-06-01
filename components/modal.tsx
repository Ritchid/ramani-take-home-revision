import React, { ReactElement } from "react";
import Modal from "react-bootstrap/Modal";

import { MODAL_SIZES } from "../resources/enums";

export interface IModal {
    open?: boolean;
    fullscreen?: boolean;
    size?: MODAL_SIZES;
    staticBackDrop?: boolean;
    showBackDrop?: boolean;
    centered?: boolean;
    showCloseButton?: boolean;
    scrollable?: boolean;
    title: string;
    onClose?: () => void;
    children?: JSX.Element | ReactElement | null

}

function CustomModal({
  open = false,
  fullscreen = false,
  size = MODAL_SIZES.MD,
  staticBackDrop = false,
  showBackDrop = true,
  centered = false,
  showCloseButton = true,
  scrollable=true,
  title,
  onClose,
  children = null,
}: IModal) {
  const backdrop = staticBackDrop ? "static" : showBackDrop ? true : false;
  const keyboard = backdrop === "static" ? false : true;

  return (
    <Modal
      show={open}
      onHide={onClose}
      fullscreen={fullscreen? true : undefined}
      size={"lg"}
      backdrop={backdrop}
      keyboard={keyboard}
      centered={centered}
      scrollable={scrollable}
    >
      <Modal.Header closeButton={showCloseButton}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {children}
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(CustomModal);