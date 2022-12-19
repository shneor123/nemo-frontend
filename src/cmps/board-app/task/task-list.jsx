import { TaskPreview } from "./task-preview";
import {  Droppable } from "react-beautiful-dnd";
export const TaskList = ({ tasks, groupId, boardId, labelOpenState, labels, boardMembers }) => {
  return (
    <Droppable droppableId={groupId}  >
      {(provided) => (
        <section
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="task-list"
        >
          {tasks.map((task, index) => {
            return (
              <TaskPreview
                key={task.id}
                task={task}
                boardId={boardId}
                index={index}
                groupId={groupId}
                labelOpenState={labelOpenState}
                labelsTo={labels}
                boardMembers={boardMembers}
              />
            );
          })}
        </section>
      )}
    </Droppable>
  );
}