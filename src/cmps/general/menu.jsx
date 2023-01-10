import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { FiChevronLeft } from "react-icons/fi"

import { MainMenu } from "../menu/main-menu"
import { ColorMenuModal } from "../menu/color-menu"
import { FilterMenu } from "../menu/filter-menu"
import { ImgsMenuModal } from "../menu/imgs-menu"

export const Menu = ({ isMenuOpen, onCloseMenu, activities, board }) => {
  const [isColorModalOpen, setIsColorModalOpen] = useState('none');
  const [isImgModalOpen, setIsImgModalOpen] = useState('none');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState('none');
  const [isMainMenuOpen, setIsMainMenuOpen] = useState('block');

  const onOpenColors = () => {
    setIsMainMenuOpen('none')
    setIsFilterModalOpen('none')
    setIsColorModalOpen('block')
    setIsImgModalOpen('none')
  }
  const onOpenImges = () => {
    setIsImgModalOpen('block')
    setIsMainMenuOpen('none')
    setIsFilterModalOpen('none')
    setIsColorModalOpen('none')
  }
  const onOpenFilter = () => {
    setIsMainMenuOpen('none')
    setIsFilterModalOpen('block')
    setIsColorModalOpen('none')
    setIsImgModalOpen('none')

  }

  const onOpenMenu = () => {
    setIsMainMenuOpen('block')
    setIsColorModalOpen('none')
    setIsFilterModalOpen('none')
    setIsImgModalOpen('none')

  }

  return (
    <div className={`pop-up-menu ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="modal-header-wrapper">
        <div className="modal-header">
          {isMainMenuOpen === 'block' && 'Menu'}
          {isColorModalOpen === 'block' && 'Colors'}
          {isImgModalOpen === 'block' && 'Photos'}
          {isFilterModalOpen === 'block' && 'Filter'}
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
        <ColorMenuModal board={board} isColorModalOpen={isColorModalOpen} />
        <ImgsMenuModal board={board} isImgModalOpen={isImgModalOpen} />
        <FilterMenu board={board} isFilterModalOpen={isFilterModalOpen} />
        <MainMenu
          onOpenColors={onOpenColors}
          onOpenFilter={onOpenFilter}
          onOpenImges={onOpenImges}
          isMainMenuOpen={isMainMenuOpen}
          activities={activities}
          boardId={board.id}
        />
      </div>
    </div>
  )
}