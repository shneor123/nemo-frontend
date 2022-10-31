import { TaskPreview } from "./task-preview";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { memo, useEffect, useState } from "react";
import { setTasks } from "../../../store/actions/task.action";
import { useDispatch } from "react-redux";
import { utilService } from "../../../services/util.service";
export const TaskList = ({ tasks, groupId, boardId, labelOpenState, labels, boardMembers }) => {
  const dispatch = useDispatch();
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