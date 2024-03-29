import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { Draggable } from "react-beautiful-dnd"

import { BsPencil } from "react-icons/bs"
import { HiOutlineEye } from "react-icons/hi"

import { EditPreview } from "./task-edit"
import { DueDatePreview } from "./dates/due-date-preview"
import { removeTask } from "../../../store/actions/task.action"
import { toggleLabelPreview } from '../../../store/actions/label.action'
import { userService } from "../../../services/basic/user.service"
import { utilService } from "../../../services/basic/util.service"
import { labelService } from "../../../services/board/label.service"

export const TaskPreview = ({ boardId, groupId, task, index, labelOpenState, labelsTo, boardMembers, isPreviewEnd }) => {
  const { board } = useSelector(({ boardModule }) => boardModule)

  const user = userService.getLoggedinUser()
  const [isEdit, setIsEdit] = useState(false)
  const [labels, setLabels] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let sumTodos;
  let sumTodosDone;
  if (task.checklists.length) {
    sumTodos = task.checklists.reduce(
      (accumulator, checklist) => accumulator + checklist.todos.length,
      0
    );
    sumTodosDone = task.checklists.map((checklist) => {
      return checklist.todos.reduce(
        (accumulator, todo) => accumulator + todo.isDone,
        0
      );
    });
    sumTodosDone = sumTodosDone.reduce(
      (accumulator, todo) => accumulator + todo,
      0
    );
  }

  useEffect(() => {
    onSetLabels();
  }, [task])

  const onSetLabels = () => {
    const newLabels = labelService.getLabelsById(board, task);
    setLabels(newLabels);
  }
  const onOpenTaskDetails = () => {
    setIsEdit(false)
    navigate(`/board/${boardId}/${groupId}/${task.id}`);
  }
  const onRemoveTask = (ev) => {
    ev.stopPropagation();
    const activity = {
      txt: "deleted this task" + task.title,
      boardTxt: "deleted the " + task.title,
      byMember: userService.getLoggedinUser() || {
        username: "guest",
        fullname: "guest",
        imgUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      },
    }
    setIsEdit(false)
    dispatch(removeTask(boardId, groupId, task.id, activity));
  }
  const onToggleLabelPreview = (ev) => {
    ev.stopPropagation();
    dispatch(toggleLabelPreview(boardId))
  }
  const openQuickEdit = (ev) => {
    ev.stopPropagation();
    setIsEdit(!isEdit)
  }
  const onCloseQuickEdit = () => {
    setIsEdit(!isEdit)
  }
  const getTaskStyle = (isQuick) => {
    if (task.style) {
      if (task.style.imgUrl && task.style.isCover) {
        return { backgroundImage: `url('${task.style.imgUrl}')` }
      }
      if (task.style.bgColor) {
        if (isQuick) return { borderTop: `32px solid ${task.style.bgColor}` }

        if (!task.style.isCover) {
          return { borderTop: `32px solid ${task.style.bgColor}` }
        } else {
          return { backgroundColor: `${task.style.bgColor}` }
        }
      }
    } else return ''
  }
  const getTaskClass = (isQuick) => {
    if (task.style) {
      if (task.style.bgColor && task.style.isCover) {
        if (!isQuick) return 'task-preview styled'
        else return 'task-preview'
      } else if (task.style.bgColor && !task.style.isCover) {
        return 'task-preview'
      } else if (task.style.imgUrl && task.style.isCover && !task.style.isLight) {
        return 'task-preview styled img'
      } else if (task.style.imgUrl && task.style.isCover && task.style.isLight) {
        return 'task-preview styled img img-dark'
      } else if (task.style.imgUrl && !task.style.isCover) {
        return 'task-preview'
      }
      return 'task-preview'
    }
  }

  return (
    <>
      {isEdit ? <EditPreview
        onRemoveTask={onRemoveTask}
        closeQuickEdit={openQuickEdit}
        onOpenTaskDetails={onOpenTaskDetails}
        board={board}
        task={task}
        boardId={boardId}
        groupId={groupId}
        labelsTo={labelsTo}
        boardMembers={boardMembers}
        onCloseQuickEdit={onCloseQuickEdit}
        isPreviewEnd={isPreviewEnd}

      /> : <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            onClick={onOpenTaskDetails}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >

            {!task.archivedAt && <span>
              <div style={getTaskStyle()}
                className={`task-preview-wrapper ${isPreviewEnd ? 'preview-end' : ''} ${getTaskClass()} ${snapshot.isDragging && !snapshot.isDropAnimating ? 'tilted' : ''}`}>
                {!task.style.isCover && task.style.imgUrl && utilService.getExtension(task.style.imgUrl) === 'image' && (
                  <img className="task-preview-image" src={task.style.imgUrl} alt="..." />
                )}
                {!task.style.isCover && task.style.imgUrl && utilService.getExtension(task.style.imgUrl) === 'video' && (
                  <video muted controls>
                    <source src={task.style.imgUrl} type="video/mp4"></source>
                  </video>
                )}
                <div className="task-preview-container">
                  <div className="task-preview-edit-icon" onClick={openQuickEdit}> <BsPencil /> </div>
                  {!!labels?.length && !task.style.isCover && (
                    <div className="label-container">
                      {labels.map((label) => {
                        return (
                          <span key={label.id}
                            style={{ backgroundColor: label.color }}
                            className={`label-preview ${labelOpenState ? 'label-open' : ''}`}
                            onClick={onToggleLabelPreview}>
                            {labelOpenState && label.title}</span>
                        )
                      })}
                    </div>
                  )}
                  <div className={`${!task.style.isCover ? 'task-preview-title' : 'task-preview-title task-preview-titleCover'}`}></div>
                  <span className={`task-preview-title ${task.style.isLight ? 'task-preview-dark' : ''}`}>{task.title}</span>
                  {!task.style.isCover && <>
                    <div className="badges">
                      {user && !!task.members.filter(member => member._id === user._id).length && <span className="badge"><HiOutlineEye /></span>}
                      {!!task.description && <span className="badge"><span className="trellicons desc-icon"></span></span>}
                      {!!task.attachments?.length && <span className="badge"> <span className="trellicons attachment"></span></span>}
                      {!!sumTodos && (
                        <div style={
                          sumTodos === sumTodosDone ? {
                            backgroundColor: '#61bd4f',
                            color: 'white', borderRadius: '3px'
                          } : {}} className="badge checklist-badge">
                          <span className="trellicons checklist-icon"></span>
                          <div className="sum-todos-badge-title">
                            {sumTodosDone}/{sumTodos}
                          </div>
                        </div>
                      )}
                      {/* DUE DATE */}
                      <div className='badge date_icon'>
                        {task.dueDate && (
                          <DueDatePreview dueDate={task.dueDate}
                            task={task} boardId={board._id} groupId={groupId}
                          />
                        )}
                      </div>
                    </div>
                    {/* MENBER PREVIEW */}
                    <div className="task-members-preview">
                      {task?.members.map(member => {
                        return (
                          <div key={member._id} className="user-avatar">
                            {member?.imgUrl
                              ? <img src={member.imgUrl} className="user-img" alt={utilService.getInitials(member.fullname)} />
                              : <span className="user-initial">{utilService.getInitials(member.fullname)}</span>
                            }
                          </div>
                        )
                      })}
                    </div>
                  </>
                  }
                </div>
              </div>
            </span>
            }
          </div >
        )}
      </Draggable >}</>
  )
}