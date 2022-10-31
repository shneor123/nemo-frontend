import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TaskSidebar } from "./task-sidebar";
import { TaskDetailsMain } from "./task-details-main";
import { useSelector } from "react-redux";
import { GrClose } from 'react-icons/gr'
import { saveTask } from "../../../store/actions/task.action";
import { AiOutlineCreditCard } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useForm } from "../../../hooks/useForm";

export const TaskDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { boardId, groupId, taskId } = useParams();
  const [task, setTask] = useState(null);
  const [group, setGroup] = useState(null);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [taskTitle, setTaskTitle] = useState(null);
  const { board } = useSelector((storeState) => storeState.boardModule)
  // might need use effect for users as well
  const { users } = useSelector((storeState) => storeState.userModule)
  const [fields, handleChange, _, setFields] = useForm(null)

  useEffect(() => {
    const currGroup = board?.groups.find(group => group.id === groupId);
    const currTask = currGroup?.tasks?.find(task => task.id === taskId);
    setTask(currTask)
    setGroup(currGroup)
    setFields({ title: currTask.title })
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
        // onClick={() => navigate(-1)}
        onClick={() => navigate(`/board/${boardId}`)}
        className="task-details-wrapper"
      >

        <div className="task-details" onClick={(ev) => ev.stopPropagation()}>
          {task?.style?.backgroundColor &&
            <div className="cover-color" style={{ backgroundColor: task.style.backgroundColor }}>
              <div className="task-details-back-btn"
                onClick={() => navigate(`/board/${boardId}`)}
              // onClick={() => navigate(-1)}
              ><GrClose /> </div>
            </div>}
          {!!task?.style?.backgroundColor || <div className="task-details-back-btn"
            //  onClick={() => navigate(-1)}
            onClick={() => navigate(`/board/${boardId}`)}
          ><GrClose /> </div>}

          <div className="task-details-header">
            <span className="header-icon"> <AiOutlineCreditCard /></span>
            <form onSubmit={onSaveTask}>
              <input
                onClick={() => setIsEditTitle(true)}
                className="task-details-title"
                type="text"
                name="title"
                onBlur={onSaveTask}
                value={fields.title}
                onChange={handleChange}
              />
            </form>
            <p>
              In list <span className="task-title-group">{group.title}</span>
            </p>
          </div>
          <div className="helper-container">
            <TaskDetailsMain task={task} boardId={boardId} groupId={groupId} labels={board.labels} activities={board.activities} />
            <TaskSidebar
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

