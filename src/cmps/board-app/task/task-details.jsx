import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { GrClose } from 'react-icons/gr'
import { AiOutlineCreditCard } from "react-icons/ai";
import { RiArchiveLine } from "react-icons/ri";
import { TaskSidebar } from "./task-sidebar";
import { TaskDetailsMain } from "./task-details-main";
import { saveTask } from "../../../store/actions/task.action";
import { useForm } from "../../../hooks/useForm";
import { TaskDetailsCover } from "../../board-app/task/task-details-cover";

export const TaskDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { boardId, groupId, taskId } = useParams();
  const [task, setTask] = useState(null);
  const [group, setGroup] = useState(null);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const { board } = useSelector((storeState) => storeState.boardModule)
  // might need use effect for users as well
  const { users } = useSelector((storeState) => storeState.userModule)
  const [fields, handleChange, _, setFields] = useForm(null)

  useEffect(() => {
    const currGroup = board?.groups.find(group => group.id === groupId);
    setGroup(currGroup)
    const currTask = currGroup?.tasks?.find(task => task.id === taskId);
    setTask(currTask)
    // setFields({ title: currTask.title })
  }, [board]);

  const handleKeyEvent = (e) => {
    if (e.key === "Escape") navigate(-1);
  };

  const onSaveTask = (ev = null) => {
    if (ev) ev.preventDefault();
    task.title = fields.title
    dispatch(saveTask(task, boardId, groupId));
  };

  if (task) {
    return (
      <section
        tabIndex={"0"}
        onKeyDown={handleKeyEvent}
        onClick={() => navigate(`/board/${boardId}`)}
        className="task-details-wrapper"
      >

        <div className="task-details" onClick={(ev) => ev.stopPropagation()}>
          {task.style && <TaskDetailsCover task={task} boardId={boardId} groupId={groupId} />}
          {task?.style?.bgColor &&
            <div className="task-details-back-btn" onClick={() => navigate(`/board/${boardId}`)}>
              <GrClose />
            </div>}
          {!!task?.style?.bgColor || <div className="task-details-back-btn"
            onClick={() => navigate(`/board/${boardId}`)}><GrClose />
          </div>}

          {task.archivedAt && (
            <div className="task-archived">
              <div className="archive-icon-container">
                <RiArchiveLine className="archive-icon" />
              </div>
              <p>This task is archived.</p>
            </div>
          )}
          <div className="task-details-header">
            <span className="header-icon"> <AiOutlineCreditCard /></span>
            <form onSubmit={onSaveTask}>
              <input
                onClick={() => setIsEditTitle(true)}
                className="task-details-title"
                type="text"
                name="title"
                onBlur={onSaveTask}
                value={task.title}
                onChange={handleChange}
              />
            </form>
            <p>
              In list <span className="task-title-group">{group.title}</span>
            </p>
          </div>
          <div className="helper-container">
            <TaskDetailsMain board={board} task={task} boardId={boardId} groupId={groupId} labels={board.labels} activities={board.activities} boardMembers={board.members} />
            <TaskSidebar
              board={board}
              groups={board.groups}
              boardId={boardId}
              groupId={groupId}
              taskId={taskId}
              labels={board.labels}
              boardMembers={board.members}
              task={task}
              users={users}
            />
          </div>
        </div>
      </section>
    );
  }
};

