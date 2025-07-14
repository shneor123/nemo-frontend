import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBoard } from '../../store/actions/board.action'
import boardPreview from '../../assets/svg/board-preview.svg'
import { setModal } from '../../store/actions/app.actions';
import { MoreBackground } from './more-background';

export const AddBoard = () => {
  const dispatch = useDispatch()
  const [modalType, setOnMOdal] = useState(null)
  const [boardTitle, setBoardTitle] = useState('')
  const [selectedImg, setSelectedImg] = useState('')
  const [selectedColor, setSelectedColor] = useState('#b04632')

  const coverColors = [
    { id: 'c1', color: '#0079bf' },
    { id: 'c2', color: '#d29034' },
    { id: 'c3', color: '#519839' },
    { id: 'c4', color: '#b04632' },
    { id: 'c5', color: '#89609e' },
    // { id: 'c6', color: '#89609e' },
  ]

  const coverImgs = [
    {
      id: 'p1',
      img: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTA3NzN8MHwxfHNlYXJjaHwxMXx8cmFuZG9tfGVufDB8fHx8MTY3NDQ2MzIyNQ&ixlib=rb-4.0.3&q=80&w=1080'
    },
    {
      id: 'p2',
      img: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTA3NzN8MHwxfHNlYXJjaHwxNHx8cmFuZG9tfGVufDB8fHx8MTY3NDQ2MzIyNQ&ixlib=rb-4.0.3&q=80&w=1080',
    },
    {
      id: 'p3',
      img: 'https://www.nttdata.com/id/en/-/media/nttdataapac/common-images/digital/ai/digital_ai09_1024x576.jpg?h=576&la=en-ID&w=1024&hash=FE08D80EF739EABA191A91075BA62458990CF61B',
    },
    {
      id: 'p4',
      img: 'https://media.istockphoto.com/photos/artificial-intelligence-in-healthcare-new-ai-applications-in-medicine-picture-id1365534802?b=1&k=20&m=1365534802&s=170667a&w=0&h=NBzCGZn66ef7qeiRM38SenrFKcXePSqN6aWGq3j6ZsM=',
    },
  ]

  const chooseColor = (color) => {
    setSelectedImg('');
    setSelectedColor(color.color);
  }
  const chooseImg = (img) => {
    setSelectedImg(img.img);
    setSelectedColor('');
  }
  const onCloseModal = () => {
    dispatch(setModal(null))
  }
  const createNewBoard = () => {
    if (boardTitle) {
      console.log(selectedImg)
      const style = selectedImg ? { background: `url(${selectedImg}) center center / cover` } : { backgroundColor: selectedColor }
      const board = {
        title: boardTitle,
        style
      }
      dispatch(addBoard(board))
      onCloseModal()
    } else return
  }

  const onToggleModal = (type) => {
    if (modalType === type) setOnMOdal(null)
    else setOnMOdal(type)
  }


  return (
    <section className="add-board">
      <div className="board-preview-wrapper">
        <div
          className="board-preview-container"
          style={{ background: selectedColor || `url(${selectedImg}) center center / cover` }}>
          <img src={boardPreview} />
        </div>
      </div>
      <div className="background-container">
        <h4>Background</h4>
        <div className="background-picker">
          <ul className="background-list clean-list flex">
            {coverImgs.map((img) => {
              return (
                <li key={img.id} className="choose-img-list ">
                  <button
                    onClick={() => chooseImg(img)}
                    className="background-select"
                    style={{
                      background: `url(${img.img}) center center / cover`,
                    }}
                  ></button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="choose-color-list flex">
          {coverColors.map((color) => {
            return (
              <div key={color.id} className="choose-color-list ">
                <div
                  style={{ backgroundColor: color.color }}
                  className="color-selected"
                  onClick={() => chooseColor(color)}
                >
                </div>
              </div>
            )
          })}
          <button className="color-selected btn-color" onClick={() => onToggleModal('colors')}>
            {modalType === 'colors' && <MoreBackground chooseColor={chooseColor} chooseImg={chooseImg} onCloseModal={setOnMOdal} />}
            <span>...</span>
          </button>
        </div>

        <h4 className="title">Board title *</h4>
        <input type="text" className="add-board-title" required="" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)}></input>

        <div className="title-msg ">
          <span role="img" aria-label="wave"> 👋 </span>
          <p>Board title is required</p>
        </div>

        <button className={`create-btn ${boardTitle ? "full" : ""}`} onClick={createNewBoard}>
          Create New Board
        </button>
      </div>
    </section>
  )
}
