
import { useRef, useState } from "react";
import { DynamicModalCmp } from "../general/dynamic-modal-cmp";

export function CreateNewBoard() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalDetails = useRef();
  const modalTitle = useRef();

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    modalTitle.current = txt
    modalDetails.current = ev.target.getBoundingClientRect();
    setIsModalOpen(true);
  };

  return (
    <div className="new-board-container">
      {isModalOpen && (<DynamicModalCmp
        modalDetails={modalDetails.current}
        modalTitle={modalTitle.current}
        onCloseModal={onCloseModal}
      />)}
      <div className="new-board-preview" onClick={(ev) => onOpenModal(ev, 'Create Board')} >
        <div className="board-details" >
          <span className="board-title">Create new board</span>
        </div>
      </div>
    </div>
  );
}