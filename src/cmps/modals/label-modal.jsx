import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { BsPencil } from "react-icons/bs"
import { FiCheck } from "react-icons/fi"
import { toggleLabel } from "../../store/actions/label.action"
import { DynamicModalCmp } from "../general/dynamic-modal-cmp"
import { boardService } from "../../services/board.service"

export const LabelModal = ({ boardId, groupId, task, labels, changeEditLabel }) => {
  const dispatch = useDispatch()

  const onToggleLabel = (labelId) => {
    dispatch(toggleLabel(boardId, groupId, task.id, labelId))
  }

  const onEditLabel = () => { }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalDetails = useRef()
  const modalTitle = useRef()

  const onCloseModal = () => {
    setIsModalOpen(false)
  };

  const onOpenModal = (ev, txt) => {
    if (isModalOpen) {
      setIsModalOpen(false)
    }
    modalTitle.current = txt
    modalDetails.current = ev.target.getBoundingClientRect()
    setIsModalOpen(true)
  }


  return (
    <div className="label-modal-container">
      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle.current}
          boardId={boardId}
          groupId={groupId}
          task={task}
          type={modalTitle}
          labels={labels}
          onCloseModal={onCloseModal}
        />
      )}

      <input
        placeholder="Search labels..."
        className="label-modal-main-input"
        type="text"
      />
      <h4 className="modal-small-title">Labels</h4>
      <div className="edit-modal-labels">
        <div className="label-list-modal">
          {labels.map((label) => {
            return (
              <div key={label.id} className="edit-label-container">
                <button className="edit-label-btn"

                  // onClick={(ev) => {onOpenModal(ev, 'Change label') }}

                  onClick={(ev) => {
                    ev.stopPropagation()
                    onOpenModal(ev, 'Change label')
                    changeEditLabel(label)
                  }}
                >
                  <BsPencil />
                </button>
                <div
                  // style={{ backgroundColor: label.color, '--i': 'blue'}}
                  style={{ '--label-color': label.color }}
                  className="task-label"
                  onClick={() => onToggleLabel(label.id)}
                >
                  {label.title && (
                    <span className="edit-label-title">{label.title}</span>
                  )}
                  {task.labelIds.includes(label.id) && (
                    <span className="label-check-icon">
                      <FiCheck />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button className="create-label-btn" onClick={(ev) => { onOpenModal(ev, 'Create label') }}>
          Create a new Label</button>
      </div>
    </div>
  );
};
