
import { useState } from "react";
import { Activity } from "../general/activity"

import { RiArchiveLine } from 'react-icons/ri'
import { AiOutlineSearch } from "react-icons/ai";
import { BsImage } from 'react-icons/bs'
import colors from '../../assets/img/colors.jpg'
import imgs from '../../assets/img/imgs.jpg'

export const MainMenu = ({ onOpenCustom, onOpenAboutBoard, onOpenArchived, onOpenImges, isMainMenuOpen, activities, boardId, onOpenColors, onOpenFilter }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <section style={{ display: isMainMenuOpen }}>
            <section className="upper-side-menu">
                <button onClick={onOpenAboutBoard} className="btn-opt">
                    <span class="fa-brands trello-icon"></span>
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

                <section>
                    <div className="mini-title">Costume</div>
                    <div className="costume" onClick={onOpenCustom}>
                        <div className="btn flex align-center justify-center">
                            <span className="fa-regular plus-icon"></span>
                        </div>
                    </div>
                </section>

            </section>
            }
            <Activity activities={activities} boardId={boardId} />
        </section>
    )
}
