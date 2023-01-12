import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { utilService } from '../../../services/basic/util.service'

import { TaskPreviewIcons } from './task-preview-icons'
import { DynamicModalCmp } from '../../general/dynamic-modal-cmp'

export const ArchivedPreview = ({ task, groupId, index, board, onUpdateBoard }) => {
  const navigate = useNavigate()
  const [updatedTask, setUpdatedTask] = useState(task)
  const taskRef = useRef()

  const onOpenDetails = (ev) => {
    ev.stopPropagation()
    navigate(`${groupId}/${task.id}`)
  }

  const getTaskStyle = (isQuick) => {
    if (task.style) {
      if (task.style.imgUrl && task.style.coverSize) {
        return { background: `url(${task.style.imgUrl})` }
      }
      if (task.style.backgroundColor) {
        if (isQuick) return { borderTop: `32px solid ${task.style.backgroundColor}` }

        if (!task.style.coverSize) {
          return { borderTop: `32px solid ${task.style.backgroundColor}` }
        } else {
          return { backgroundColor: `${task.style.backgroundColor}` }
        }
      }
    } else return ''
  }

  const getTaskClass = (isQuick) => {
    if (task.style) {
      if (task.style.backgroundColor && task.style.coverSize) {
        if (!isQuick) return 'task-preview- styled'
        else return 'task-preview- color-header'
      } else if (task.style.backgroundColor && !task.style.coverSize) {
        return 'task-preview- color-header'
      } else if (task.style.imgUrl && task.style.coverSize) {
        return 'task-preview- styled img'
      } else if (task.style.imgUrl && !task.style.coverSize) {
        return 'task-preview- img-header'
      }
      return 'task-preview-'
    }
  }

  const getChecklistLength = () => {
    const todosLength = task.checklists.reduce((acc1, checklist) => (acc1 += checklist.todos.length), 0)
    const doneLength = task.checklists.reduce((acc2, checklist) => (acc2 += getDoneTodos(checklist)), 0)
    const activeCount = doneLength + '/' + todosLength
    return activeCount
  }

  const getDoneTodos = (checklist) => {
    let doneTodos = checklist.todos.filter((todo) => todo.isDone)
    return doneTodos.length
  }

  const getTimeStyle = () => {
    var dateFormat = utilService.getDateTimeFormat(task.dueDate)
    if (task?.isDane && task.isDane) {
      dateFormat.statusDate = 'complete'
    }

    if (dateFormat.statusDate === '') return { backgroundColor: '', color: '#505f79' }
    if (dateFormat.statusDate === 'overdue') return { backgroundColor: '#EB5A46', color: '#ffff' }
    if (dateFormat.statusDate === 'duesoon') return { backgroundColor: '#F2D600', color: '#ffff' }
    if (dateFormat.statusDate === 'complete') return { backgroundColor: '#61BD4F', color: '#ffff' }
  }

  const OnSentToBoard = () => {
    const newTask = { ...updatedTask }
    newTask.archivedAt = null

    const groupIdx = board.groups.findIndex((group) => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex((groupTask) => groupTask.id === task.id)
    board.groups[groupIdx].tasks[taskIdx] = newTask

    setUpdatedTask(newTask)
    onUpdateBoard({ ...board })
  }

  const OnDelete = () => {
    let newTask = { ...updatedTask }
    newTask = null

    const groupIdx = board.groups.findIndex((group) => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex((groupTask) => groupTask.id === task.id)
    board.groups[groupIdx].tasks.splice(taskIdx, 1)

    setUpdatedTask(newTask)
    onUpdateBoard(board)
  }


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
  };

  return (
    <div className="task-preview">
      {isModalOpen && (
        <DynamicModalCmp
          modalDetails={modalDetails.current}
          modalTitle={modalTitle.current}
          type={modalTitle}
          OnDelete={OnDelete}
          onCloseModal={onCloseModal}
        />
      )}
      <div ref={taskRef}>
        <section className={`${getTaskClass()}`} onClick={onOpenDetails} style={getTaskStyle()}>
          {!task.style.coverSize && task.style.imgUrl && (
            <img className="task-img-container" src={task.style.imgUrl} alt="..." />
          )}
          <div className="task-info">
            <div className="task-title-container">
              <h2 className="task-title"> {task.title} </h2>
            </div>

            <TaskPreviewIcons
              task={task}
              getTimeStyle={getTimeStyle}
              getChecklistLength={getChecklistLength}
            />
          </div>
        </section>
      </div>

      <div className="edit">
        <a onClick={OnSentToBoard}>Send to board</a>
        <span>
          <a onClick={(ev) => { onOpenModal(ev, 'task-delete') }}>
            <span>Delete</span>
          </a>
        </span>
      </div>
    </div>
  )
}
