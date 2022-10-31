import React from 'react'
import { BoardPreview } from './board-preview.jsx'
import { CreateNewBoard } from "./new-board"



export function BoardList({ boards, updateBoard, onToggleStar, isStarBoard }) {
    return (
        <section className='board-list-container'>

            {!isStarBoard && <CreateNewBoard />}

            {boards.map(board => 
                <BoardPreview
                    key={board._id}
                    board={board}
                    updateBoard={updateBoard}
                    onToggleStar={onToggleStar}

                />
            )}
        </section>
    )

}