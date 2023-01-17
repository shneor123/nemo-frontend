import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { utilService } from '../../services/basic/util.service';
import { GrClose } from 'react-icons/gr';
import { updateBoard } from '../../store/actions/board.action';
import { useDispatch } from 'react-redux';
import { boardService } from '../../services/board/board.service';
import { useNavigate } from 'react-router';

export const CopyModal = ({ task, isMove = false, group }) => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const { boards } = useSelector((storeState) => storeState.boardModule)

    const [titleText, setTitleText] = useState(task.title);
    const [selectedBoard, setSelectedBoard] = useState(board);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedTaskPos, setSelectedTaskPos] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleFocus = event => {
        event.target.select();
    }

    const handleSubmit = (ev) => {
        (isMove) ? onMoveTask(ev) : onCopyTask(ev)
    }

    const handleBoardChange = ({ target }) => {
        const { value } = target
        const selectedBoard = boards.find(board => board._id === value)
        setSelectedBoard(selectedBoard)
        setSelectedGroup(selectedBoard.groups[0])
        setSelectedTaskPos(selectedBoard.groups[0].tasks.length)
    }

    const handleGroupChange = (ev) => {
        ev.preventDefault()
        const { value } = ev.target
        const selectedGroup = selectedBoard.groups.find(group => group.id === value)
        setSelectedGroup(selectedGroup)
        setSelectedTaskPos(selectedGroup.tasks.length)
    }

    const onCopyTask = () => {
        let taskToCopy = { ...task, id: utilService.makeId(), createdAt: Date.now(), title: titleText }
        if (selectedBoard._id !== board._id) taskToCopy.members = []
        const destinationGroupIdx = selectedBoard.groups.findIndex(group => group.id === selectedGroup.id)
        selectedBoard.groups[destinationGroupIdx].tasks.splice(selectedTaskPos, 0, taskToCopy)
        updateBoard(selectedBoard)
        dispatch(updateBoard(selectedBoard))
    }

    const onMoveTask = async (ev) => {
        ev.preventDefault()

        // Same Board - Same Group
        if (selectedBoard._id === board._id) {
            if (selectedGroup.id === group.id) {
                // Same board - same group 
                const currGroupIdx = board.groups.findIndex(group => group.id === selectedGroup.id)
                const taskIdx = board.groups[currGroupIdx].tasks.findIndex(currTask => currTask.id === task.id)
                board.groups[currGroupIdx].tasks.splice(taskIdx, 1)
                board.groups[currGroupIdx].tasks.splice(selectedTaskPos, 0, task)
                dispatch(updateBoard(board))
            } else {
                // Same board, different group
                const currGroupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id)
                const taskIdx = board.groups[currGroupIdx].tasks.findIndex(currTask => currTask.id === task.id)
                board.groups[currGroupIdx].tasks.splice(taskIdx, 1)
                const destinationGroupIdx = board.groups.findIndex(currGroup => currGroup.id === selectedGroup.id)
                board.groups[destinationGroupIdx].tasks.splice(selectedTaskPos, 0, task)
                dispatch(updateBoard(board))
                // Task's group has changed - so to keep TaskDetails open, changing the url 
                navigate(`/board/${board._id}/${selectedGroup.id}/${task.id}`)
            }
        } else {
            // Different Board
            // remove from curr board
            const currGroupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id)
            const taskIdx = board.groups[currGroupIdx].tasks.findIndex(currTask => currTask.id === task.id)
            board.groups[currGroupIdx].tasks.splice(taskIdx, 1)
            dispatch(updateBoard(board))
            // adding to the destination board
            const destinationGroupIdx = selectedBoard.groups.findIndex(group => group.id === selectedGroup.id)
            selectedBoard.groups[destinationGroupIdx].tasks.splice(selectedTaskPos, 0, task)
            await boardService.updateWithoutSocket(selectedBoard)
        }
    }

    return (
        <section className="copy-modal-content">
            <section className="modal-content">
                <div className="modal-title">
                    {!isMove && <>
                        <h4 className='title copy-title'>Title</h4>
                        <textarea
                            type="text"
                            className="modal-main-input"
                            value={titleText}
                            name="titleText"
                            onChange={ev => { setTitleText(ev.target.value) }}
                            autoFocus
                            onFocus={handleFocus}
                        ></textarea>
                    </>}
                    <h4 className={`${!isMove ? 'title-copy-to' : 'title-copy-destination'}`}>{(isMove) ? 'Select destination' : 'Copy to...'}</h4>
                    <div className='main-select-container'>
                        <div className='flex column'>
                            <span className='select-description'>Board</span>
                            <span className='select-title'>{selectedBoard?.title}</span>
                        </div>
                        {/* Select Board - by the boards that have one group or more */}
                        <select className='main-select' onChange={(ev) => { handleBoardChange(ev) }}>
                            {boards.map(board => (
                                board.groups.length > 0 &&
                                <option key={board._id} value={board._id}> {board.title} </option>
                            ))}
                        </select>
                    </div>
                    <div className='lower-selects-container'>
                        <div className='main-select-container group'>
                            <div className='flex column'>
                                <span className='select-description'>List</span>
                                <span className='select-title'>{selectedGroup?.title}</span>
                            </div>
                            {/* Select List */}
                            <select className='main-select' onChange={(ev) => { handleGroupChange(ev) }}>
                                {selectedBoard?.groups.map(group => (<option key={group.id} value={group.id}>{group.title}</option>))}
                            </select>
                        </div>
                        <div className='main-select-container position'>
                            <div className='flex column'>
                                <span className='select-description'>Position</span>
                                <span className='select-title'>{(!selectedTaskPos && selectedTaskPos !== 0) ? selectedTaskPos : +selectedTaskPos + 1}</span>
                            </div>
                            {/* Select Task Position in the list - showing to the user the index + 1 place (not to show 0) */}
                            {selectedGroup && <select className='main-select' >
                                {/* Not allowing to click when there is no Chosen List */}
                                {selectedGroup?.tasks.map((task, index) => (
                                    <option key={task.id} value={index}>{index + 1}</option>
                                ))}
                                <option value={selectedGroup?.tasks.length}>{selectedGroup?.tasks.length + 1}</option>
                            </select>}
                        </div>
                    </div>
                </div>
                <button className='secondary-btn' onClick={(ev) => {
                    ev.preventDefault()
                    handleSubmit(ev)
                }}>{(isMove) ? 'Move' : 'Create Card'}</button>
            </section>
        </section>
    )
}
