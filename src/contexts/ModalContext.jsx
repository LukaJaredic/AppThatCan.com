import React, { createContext, useContext, useState } from "react";
import { Modal } from "antd";
import "./Modal.scss";

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [modal, setModal] = useState({ open: false, content: <></> });

  const openModal = (content) => {
    setModal({ open: true, content });
  };

  const closeModal = () => {
    setModal({ open: false, content: <></> });
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal, setModal }}>
      {children}
      <Modal
        centered={true}
        footer={null}
        title={null}
        visible={modal.open}
        destroyOnClose={true}
      >
        {modal.content}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};

export default ModalContextProvider;
