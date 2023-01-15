
import { useState } from "react";
import { Activity } from "../general/activity"

import { RiArchiveLine } from 'react-icons/ri'
import { AiOutlineSearch } from "react-icons/ai";
import { BsImage } from 'react-icons/bs'
import colors from '../../assets/img/colors.jpg'
import imgs from '../../assets/img/imgs.jpg'

export const MainMenu = ({ onOpenAboutBoard, onOpenArchived, onOpenImges, isMainMenuOpen, activities, boardId, onOpenColors, onOpenFilter }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <section style={{ display: isMainMenuOpen }}>
            <section className="upper-side-menu">
                <button onClick={onOpenAboutBoard} className="btn-opt">
                    <svg stroke='currentColor' fill='currentColor' strokeWidth='0' version='1.1' viewBox='0 0 16 16' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5zM7 12c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-8c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v8zM13 9c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-5c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v5z'></path>
                    </svg>
                    About this board
                </button>
                <hr className="side-menu hr" />
                <button onClick={onOpenArchived} className="btn-opt">
                    <RiArchiveLine />
                    Archived items
                </button>
                <hr className="side-menu hr" />
                <button onClick={onOpenFilter} className="btn-opt">
                    <AiOutlineSearch />
                    Filter cards
                </button>
                <hr className="side-menu hr" />
                <button onClick={() => setIsOpen(!isOpen)} className="btn-opt">
                    <BsImage />
                    Change background
                </button>
            </section>

            {isOpen && <section className="background-teaser-container">
                <div className="board-background">
                    <div className="image-container background-color-teaser" onClick={onOpenColors}>
                        <img src={colors} />
                        <div className="title">Colors</div>
                    </div>

                    <div className="image-container" onClick={onOpenImges}>
                        <img src={imgs} />
                        <div className="title">Photos</div>
                    </div>
                </div>
            </section>
            }
            <Activity activities={activities} boardId={boardId} />
        </section>
    )
}
