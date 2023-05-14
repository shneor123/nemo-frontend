import { useState } from "react";
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { IoAdd } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { GroupPreview } from "./group-preview";
import { useForm } from "../../../hooks/useForm";
import { saveGroup } from "../../../store/actions/group.action";
import { SideManuBoard } from "../../menu/side-manu-board";

export const GroupList = ({ isPreviewEnd, filterBy, onSetFilterBy, boards, board, groups, boardId, activities, labelOpenState, labels, boardMembers }) => {
  const dispatch = useDispatch()
  const [isAddGroup, setIsAddGroup] = useState(false)
  const [newGroup, handleChange, clearFields] = useForm({ title: "" })

  const onAddGroup = (ev = null) => {
    ev.preventDefault()
    if (!newGroup.title) return
    dispatch(saveGroup(newGroup, boardId))

    setIsAddGroup(false);
    clearFields();
  }

  return (
    <>
      <Droppable droppableId="all-groups" type="group" direction="horizontal">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="group-list-container flex"
          >
            <SideManuBoard boards={boards} boardId={boardId} board={board} boardMembers={boardMembers} groups={board.groups} />
            {groups && groups.map((group, index) => {
              return (
                <GroupPreview
                  key={group.id}
                  filterBy={filterBy}
                  onSetFilterBy={onSetFilterBy}
                  group={group}
                  boardId={boardId}
                  index={index}
                  labelOpenState={labelOpenState}
                  activities={activities}
                  labels={labels}
                  boardMembers={boardMembers}
                  isPreviewEnd={isPreviewEnd}
                />
              )
            })}
            {!isAddGroup && (
              <div style={{ borderRadius: !isPreviewEnd ? '3px' : '10px', height: isPreviewEnd ? '45px' : '' }}
                className="add-group flex"
                onClick={() => setIsAddGroup(true)}
              > <IoAdd /> <p>Add another list</p>
              </div>
            )}
            {isAddGroup && (
              <div className="group-preview-wrapper">
                <div className="add-group-open " style={{ borderRadius: isPreviewEnd ? '20px' : '3px', height: isPreviewEnd ? '100px' : '' }}>
                  <form onSubmit={(ev) => onAddGroup(ev)}>
                    <input type="text"
                      style={{ marginTop: !isPreviewEnd ? '3px' : '15px' }}
                      name="title"
                      placeholder="Enter list title..."
                      value={newGroup.title}
                      onChange={handleChange}
                    />
                    <div className="add-group-btn group-btn flex align-center">
                      <button className="save-group ">Add list</button>
                      <button className="close-group group-btn" onClick={() => setIsAddGroup(false)}>
                        <IoMdClose />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </Droppable >
    </>
  )
}