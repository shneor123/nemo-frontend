import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import {  BsPencil } from "react-icons/bs"
import { FiCheck } from "react-icons/fi"
import { toggleLabel } from "../../store/actions/label.action"
import { setModal } from "../../store/actions/app.actions"
import { useSelector } from "react-redux"

export const LabelModal = ({ boardId, groupId, task, labels, changeEditLabel }) => {
  const { modal } = useSelector(({ appModule }) => appModule)
  const dispatch = useDispatch()
  const modalRef = useRef()

  const onToggleLabel = (labelId) => {
    dispatch(toggleLabel(boardId, groupId, task.id, labelId))
  }

  const onOpenModal = (category) => {
    dispatch(
      setModal({
        element: modal.element,
        category,
        title: category,
        props: { boardId, groupId, task, labels, element: modal.element, },
      })
    )
  }


  return (
    <div className="label-modal-container" ref={modalRef}>
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
                <button className="edit-label-btn" ref={modalRef}
                  onClick={(ev) => {
                    ev.stopPropagation()
                    onOpenModal('Change label')
                    changeEditLabel(label)
                  }}>
                  <BsPencil /></button>
                <div style={{ '--label-color': label.color }} className="task-label" onClick={() => onToggleLabel(label.id)}>
                  {label.title && (<span className="edit-label-title">{label.title}</span>)}
                  {task.labelIds.includes(label.id) && (<span className="label-check-icon"><FiCheck /></span>)}
                </div>
              </div>
            );
          })}
        </div>
        <button className="create-label-btn" ref={modalRef}
          onClick={(ev) => {
            ev.stopPropagation()
            onOpenModal('Create label')
          }}>Create a new Label</button>
      </div>
    </div>
  );
};
