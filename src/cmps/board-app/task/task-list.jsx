import { TaskPreview } from "./task-preview";
import { Droppable } from "react-beautiful-dnd";
export const TaskList = ({ tasks, groupId, boardId, labelOpenState, labels, boardMembers, isPreviewEnd }) => {
  return (
<Droppable droppableId={groupId}>
  {(provided) => (
    <section
      ref={provided.innerRef}
      {...provided.droppableProps}
      className="task-list"
    >
      {tasks.map((task, index) => (
        <TaskPreview
          key={task.id}
          task={task}
          boardId={boardId}
          index={index}
          groupId={groupId}
          labelOpenState={labelOpenState}
          labelsTo={labels}
          boardMembers={boardMembers}
          isPreviewEnd={isPreviewEnd}
        />
      ))}

      {/* חובה — אבל לא חייב טקסט */}
      {provided.placeholder}

      {/* אם אין משימות – אפשר להשאיר div ריק */}
      {tasks.length === 0 && <div style={{ minHeight: '20px' }}></div>}
    </section>
  )}
</Droppable>


  );
}