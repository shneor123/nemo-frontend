
import { AiOutlineSearch } from "react-icons/ai";
import { Activity } from "../general/activity"
import colors from '../../assets/img/colors.jpg'
import imgs from '../../assets/img/imgs.jpg'

export const MainMenu = ({ isMainMenuOpen, activities, boardId, onOpenColors, onOpenFilter }) => {
    return (
        <section style={{ display: isMainMenuOpen }}>
            <section className="upper-side-menu">
                <button onClick={onOpenFilter} className="btn-opt">
                    <AiOutlineSearch />
                    Filter cards
                </button>
            </section>

            <section className="background-teaser-container">
                <div className="board-background">
                    <div className="image-container background-color-teaser" onClick={onOpenColors}>
                        <img src={colors} />
                        <div className="title">Colors</div>
                    </div>
                    <div className="image-container">
                        <img src={imgs} />
                        <div className="title">photos</div>
                    </div>

                </div>
            </section>
            <Activity activities={activities} boardId={boardId} />
        </section>
    )
}
