import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { FiChevronLeft } from "react-icons/fi"

import { MainMenu } from "../menu/main-menu"
import { ColorMenuModal } from "../menu/color-menu"
import { FilterMenu } from "../menu/filter-menu"
import { ImgsMenuModal } from "../menu/imgs-menu"
import { ArchivedList } from "../menu/archived/archived-list"
import { boardService } from "../../services/board/board.service"
import { AboutThisBoard } from "../board-app/task/about-this-board"

export const Menu = ({ isMenuOpen, onCloseMenu, activities, board, groups }) => {
  const [isColorModalOpen, setIsColorModalOpen] = useState('none')
  const [isImgModalOpen, setIsImgModalOpen] = useState('none')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState('none')
  const [isArchivedModalOpen, setIsArchivedModalOpen] = useState('none')
  const [iOpenAboutBoard, setIOpenAboutBoard] = useState('none')
  const [isMainMenuOpen, setIsMainMenuOpen] = useState('block')

  const onOpenColors = () => {
    setIsMainMenuOpen('none')
    setIsFilterModalOpen('none')
    setIsColorModalOpen('block')
    setIsImgModalOpen('none')
    setIsArchivedModalOpen('none')
    setIOpenAboutBoard('none')
  }
  const onOpenImges = () => {
    setIsImgModalOpen('block')
    setIsMainMenuOpen('none')
    setIsFilterModalOpen('none')
    setIsColorModalOpen('none')
    setIsArchivedModalOpen('none')
    setIOpenAboutBoard('none')

  }
  const onOpenFilter = () => {
    setIsMainMenuOpen('none')
    setIsFilterModalOpen('block')
    setIsColorModalOpen('none')
    setIsArchivedModalOpen('none')
    setIsImgModalOpen('none')
    setIOpenAboutBoard('none')

  }
  const onOpenMenu = () => {
    setIsMainMenuOpen('block')
    setIsColorModalOpen('none')
    setIsFilterModalOpen('none')
    setIsArchivedModalOpen('none')
    setIsImgModalOpen('none')
    setIOpenAboutBoard('none')

  }
  const onOpenArchived = () => {
    setIsMainMenuOpen('none')
    setIsColorModalOpen('none')
    setIsFilterModalOpen('none')
    setIsImgModalOpen('none')
    setIsArchivedModalOpen('block')
    setIOpenAboutBoard('none')

  }
  const onOpenAboutBoard = () => {
    setIsMainMenuOpen('none')
    setIsColorModalOpen('none')
    setIsFilterModalOpen('none')
    setIsImgModalOpen('none')
    setIsArchivedModalOpen('none')
    setIOpenAboutBoard('block')

  }
  const onUpdateBoard = async (updatedBoard) => {
    try {
      await boardService.save(updatedBoard)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={`pop-up-menu ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="modal-header-wrapper">
        <div className="modal-header">
          {isMainMenuOpen === 'block' && 'Menu'}
          {isColorModalOpen === 'block' && 'Colors'}
          {isImgModalOpen === 'block' && 'Photos'}
          {isFilterModalOpen === 'block' && 'Filter'}
          {isArchivedModalOpen === 'block' && 'Archived'}
          {iOpenAboutBoard === 'block' && 'About this board'}
          <span
            onClick={onOpenMenu}
            style={{ display: isMainMenuOpen === 'none' ? 'inline-block' : 'none' }}
            className="back-menu">
            <FiChevronLeft size={25} /></span>
          <span style={{ top: '7px' }} onClick={onCloseMenu} className="modal-close-btn">
            <IoMdClose size={25} />
          </span>
        </div>
      </div>
      <div className="menu-content-wrapper">
        <AboutThisBoard board={board} iOpenAboutBoard={iOpenAboutBoard} />
        <ColorMenuModal board={board} isColorModalOpen={isColorModalOpen} />
        <ImgsMenuModal  board={board} isImgModalOpen={isImgModalOpen} />
        <FilterMenu board={board} isFilterModalOpen={isFilterModalOpen} />
        <ArchivedList board={board} isArchivedModalOpen={isArchivedModalOpen} onUpdateBoard={onUpdateBoard} />
        <MainMenu
          onOpenArchived={onOpenArchived}
          onOpenColors={onOpenColors}
          onOpenFilter={onOpenFilter}
          onOpenImges={onOpenImges}
          onOpenAboutBoard={onOpenAboutBoard}
          isMainMenuOpen={isMainMenuOpen}
          activities={activities}
          boardId={board.id}
        />
      </div>
    </div>
  )
}