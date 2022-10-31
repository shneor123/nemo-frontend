import { AiOutlineCreditCard } from "react-icons/ai";
import { TiTag } from "react-icons/ti";
import { BsPerson } from "react-icons/bs";
import { MdOutlineScreenShare } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md"
import { DynamicModalCmp } from "../../general/dynamic-modal-cmp";
import { useState } from "react";
import { useRef } from "react";
import { GiRobotAntennas } from 'react-icons/gi'

export const EditBtn = ({ onOpenTaskDetails, onRemoveTask, boardId, labels, groupId, task, closeQuickEdit, boardMembers }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalDetails = useRef();
    const modalTitle = useRef();

    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    const onOpenModal = (ev, txt) => {
        // closeQuickEdit()
        if (isModalOpen) {
            setIsModalOpen(false);
        }
        modalTitle.current = txt;
        modalDetails.current = ev.target.getBoundingClientRect();
        setIsModalOpen(true);
    };

    return (
        <div className="edit-btn">
            {isModalOpen && (
                <DynamicModalCmp
                    modalDetails={modalDetails.current}
                    modalTitle={modalTitle.current}
                    boardId={boardId}
                    groupId={groupId}
                    task={task}
                    type={modalTitle}
                    labels={labels}
                    boardMembers={boardMembers}
                    onCloseModal={onCloseModal}
                />
            )}
            <span className="quick-card-editor-buttons-item" onClick={onOpenTaskDetails}><AiOutlineCreditCard /> Open card</span>

            <span className="quick-card-editor-buttons-item" onClick={(ev) => { onOpenModal(ev, 'Labels') }}>< TiTag /> Edit labels</span>

            <span className="quick-card-editor-buttons-item" onClick={(ev) => { onOpenModal(ev, 'Members') }}><BsPerson /> Change members</span>

            <span className="quick-card-editor-buttons-item" onClick={(ev) => { onOpenModal(ev, 'Cover') }}><MdOutlineScreenShare /> Change cover</span>

            <span className="quick-card-editor-buttons-item" onClick={(ev) => { onOpenModal(ev, 'Dates') }}><BsClock />  Edit dates</span>

            <span className="quick-card-editor-buttons-item" onClick={(ev) => { onOpenModal(ev, 'AI Clara') }}><GiRobotAntennas /> AI Clara</span>

            <span className="quick-card-editor-buttons-item" onClick={onRemoveTask}><MdDeleteOutline /> Remove task</span>

        </div>
    )
}