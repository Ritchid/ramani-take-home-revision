import React, { ReactElement, useCallback, useMemo, useState } from "react";

import Modal, {IModal} from "../../components/modal";
import { MODAL_SIZES } from "../../resources/enums";

interface IModalHook extends Partial<IModal>{
    show?: boolean;
    content?: JSX.Element | ReactElement | null;
    scrollable?: boolean;
}


function useModal() {
    const [modalProps, setModalProps] = useState<IModalHook>({
        show: false,
        content: null,
        centered: false,
        fullscreen: false,
        size: MODAL_SIZES.MD,
        staticBackDrop: false,
        showBackDrop: true,
        showCloseButton: true,
        title: "",
        scrollable: false
    });

    const showModal = (props: IModalHook) =>{
        setModalProps({...modalProps, ...props, show: true});
    }

    const closeModal = useCallback(() =>{
        setModalProps({...modalProps, show: false});
    }, []);


    const ModalComponent = useMemo(() =>(
        <Modal 
            open={modalProps.show}
            onClose={closeModal}
            showCloseButton={modalProps.showCloseButton}
            centered={modalProps.centered}
            fullscreen={modalProps.fullscreen}
            size={modalProps.size}
            staticBackDrop={modalProps.staticBackDrop}
            showBackDrop={modalProps.showBackDrop}
            title={String(modalProps.title)}
            scrollable={modalProps.scrollable}
        >
            {modalProps.content}
        </Modal>
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [modalProps]);


    return {ModalComponent, showModal, closeModal,}
}

export default useModal;