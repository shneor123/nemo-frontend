import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeTask } from "../../../store/actions/task.action";
import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, memo } from "react";
import { labelService } from "../../../services/label.service";
import { BsPencil } from "react-icons/bs";
import { FiCheckSquare, FiPaperclip } from "react-icons/fi";
import { GrTextAlignFull } from "react-icons/gr"
import { toggleLabelPreview } from '../../../store/actions/label.action'
import { userService } from "../../../services/user.service";
import { HiOutlineEye } from "react-icons/hi"
import { EditPreview } from "./task-edit";

export const TaskPreview = ({ boardId, groupId, task, index, labelOpenState, labelsTo, boardMembers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [labels, setLabels] = useState([]);
  const user = userService.getLoggedinUser()
  const { board } = useSelector((storeState) => storeState.boardModule)
  const [isEdit, setIsEdit] = useState(false)

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
  }, [task]);


  const onSetLabels = () => {
    const newLabels = labelService.getLabelsById(board, task);
    setLabels(newLabels);
  };

  const onOpenTaskDetails = () => {
    setIsEdit(false)
    navigate(`/board/${boardId}/${groupId}/${task.id}`);
  };

  const onRemoveTask = (ev) => {
    ev.stopPropagation();
    setIsEdit(false)
    dispatch(removeTask(boardId, groupId, task.id));
  };

  const onToggleLabelPreview = (ev) => {
    ev.stopPropagation();
    dispatch(toggleLabelPreview(boardId))
  };

  const openQuickEdit = (ev) => {
    ev.stopPropagation();
    setIsEdit(!isEdit)
  }

  const onCloseQuickEdit = () => {
    setIsEdit(!isEdit)
  }


  return (
    <>{isEdit ? <EditPreview
      onRemoveTask={onRemoveTask}
      closeQuickEdit={openQuickEdit}
      onOpenTaskDetails={onOpenTaskDetails}
      task={task}
      boardId={boardId}
      groupId={groupId}
      labelsTo={labelsTo}
      boardMembers={boardMembers}
      onCloseQuickEdit={onCloseQuickEdit}

    /> : <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          onClick={onOpenTaskDetails}
          className="task-preview-wrapper"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.attachments.length > 0 && <div style={{ backgroundImage: `url(${task.attachments[0].url})` }} className="task-preview-image"></div>}
          {task?.style?.backgroundColor && task.coverSize === "uncover" && (
            <div style={task.style} className="task-preview-color-top"></div>
          )}
          {/* <button onClick={onRemoveTask}>fdjisa</button> */}
          {/* {task?.style?.backgroundColor && task.coverSize === "cover" && <div style={task.style} className="task-preview-cover-container">} */}
          <div
            style={task.coverSize === "cover" ? task.style : {}}
            className="task-preview-container"
          >
            <div className="task-preview-edit-icon" onClick={openQuickEdit}>
              <BsPencil />
            </div>
            {!!labels?.length && (
              <div className="label-container">
                {labels.map((label) => {
                  return (
                    <span
                      onClick={onToggleLabelPreview}
                      key={label.id}
                      style={{ backgroundColor: label.color }}
                      className={`label-preview ${labelOpenState ? 'label-open' : ''}`}
                    >{labelOpenState && label.title}</span>
                  );
                })}
              </div>
            )}
            <span className="task-preview-title">{task.title}</span>

            <div className="badges">
              {user && !!task.members.filter(member => member._id === user._id).length && <span className="badge"><HiOutlineEye /></span>}
              {/* todo: add date badge here  */}
              {!!task.description && <span className="badge"><GrTextAlignFull /></span>}
              {!!task.attachments?.length && <span className="badge"> <FiPaperclip /></span>}
              {!!sumTodos && (
                <div style={
                  sumTodos === sumTodosDone ? {
                    backgroundColor: '#61bd4f',
                    color: 'white', borderRadius: '3px'
                  } : {}} className="badge checklist-badge">
                  <FiCheckSquare />
                  {/* <FiCheckSquare style={{paddingTop:'2px'}} /> */}
                  <div className="sum-todos-badge-title">
                    {sumTodosDone}/{sumTodos}
                  </div>
                </div>
              )}
            </div>
            <div className="task-members-preview">
              {task?.members.map(member => {
                return <div key={member._id} style={{ background: `url(${member.imgUrl}) center center / cover ` }} className="user-avatar"></div>
              })}
            </div>
          </div>
        </div>
      )}
    </Draggable>}</>
  );
};
