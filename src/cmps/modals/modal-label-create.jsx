import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../../services/board/board.service'
import { utilService } from '../../services/basic/util.service'

export const ModalLabelCreate = () => {
  const { board } = useSelector((storeState) => storeState.boardModule)
  console.log("🚀 ~ file: modal-label-create.jsx:9 ~ ModalLabelCreate ~ board", board)
  const [updatedBoard, setUpdatedBoard] = useState(board)
  const [labelName, setLabelName] = useState('')
  const [color, setColor] = useState('#7bc86c')

  const firstLoad = useRef(false)
  const searchInput = useRef(null)


  useEffect(() => {
    if (!firstLoad.current) firstLoad.current = true
    else onUpdateBoard(updatedBoard)
  }, [updatedBoard])

  const onCreateLabel = () => {
    const createBoard = board.labels.push({
      id: utilService.makeId(5),
      title: labelName,
      color: color,
    })
    onUpdateBoard(updatedBoard)
  }

  const onUpdateBoard = async (updatedBoard) => {
    try {
      await boardService.save(updatedBoard)
    } catch (err) {
      console.error(err)
    }
  }

  const onPickColor = (color) => {
    setColor(color)
  }

  const handleChange = ({ target }) => {
    setLabelName(target.value)
  }

  return (
    <div className="create-section">
      <div className="search-box">
        <h3 className="label">Name</h3>
        <input ref={searchInput}
          type="text"
          name="search"
          value={labelName}
          onChange={handleChange}
        />

      </div>

      <div className="create-box">
        <h3 className="label">Select a color</h3>

        <div className="colors-section">
          <div className="box-container">
            <button
              onClick={() => { onPickColor('#7BC86C') }}
              style={{ backgroundColor: `#7BC86C` }}
            ></button>
            <button
              onClick={() => { onPickColor('#F5DD29') }}
              style={{ backgroundColor: `#F5DD29` }}
            ></button>
            <button
              onClick={() => { onPickColor('#FFAF3F') }}
              style={{ backgroundColor: `#FFAF3F` }}
            ></button>
            <button
              onClick={() => { onPickColor('#EF7564') }}
              style={{ backgroundColor: `#EF7564` }}
            ></button>
            <button
              onClick={() => { onPickColor('#CD8DE5') }}
              style={{ backgroundColor: `#CD8DE5` }}
            ></button>
            <button
              onClick={() => { onPickColor('#5BA4CF') }}
              style={{ backgroundColor: `#5BA4CF` }}
            ></button>
            <button
              onClick={() => { onPickColor('#29CCE5') }}
              style={{ backgroundColor: `#29CCE5` }}
            ></button>
            <button
              onClick={() => { onPickColor('#6DECA9') }}
              style={{ backgroundColor: `#6DECA9` }}
            ></button>
            <button
              onClick={() => { onPickColor('#FF8ED4') }}
              style={{ backgroundColor: `#FF8ED4` }}
            ></button>
            <button
              onClick={() => { onPickColor('#172B4D') }}
              style={{ backgroundColor: `#172B4D` }}
            ></button>
          </div>
        </div>

        <button onClick={onCreateLabel}>Create</button>
      </div>
    </div>
  )
}
