import { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { DynamicModalCmp } from "../../general/dynamic-modal-cmp";

export const LabelsDataCard = ({ board, task, labels, boardId, groupId }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalDetails = useRef()
  const modalTitle = useRef()

  const onCloseModal = () => {
    setIsModalOpen(false)
  }
  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false)
    }
    modalTitle.current = txt
    modalDetails.current = ev.target.getBoundingClientRect()
    setIsModalOpen(true)
  }

  if (!task.labelIds || !task.labelIds.length) return;
  const labelsToRender = labels.filter(label => task.labelIds.includes(label.id))
  return (
    <div className="label-data">
      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle.current}
          boardId={boardId}
          groupId={groupId}
          task={task}
          board={board}
          labels={labels}
          type={modalTitle}
          onCloseModal={onCloseModal}
        />
      )}
      <h3 className="data-gutter-card-title">Labels</h3>
      {labelsToRender.map((label) => {
        return (
          <div
            key={label.id}
            style={{ backgroundColor: label.color, color: "#ffff" }}
            className="label-data-item"
          >
            {label.title}
          </div>
        );
      }
      )}
      <div className="add-data-gutter-btn" onClick={(ev) => { onOpenModal(ev, 'Labels') }}>
        <FiPlus />
      </div>
    </div>
  );
};
