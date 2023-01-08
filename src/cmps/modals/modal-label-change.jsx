import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../../services/board.service'

export const ModalLabelChange = ({ task, editLabel }) => {
  const [labelName, setLabelName] = useState(editLabel.title)
  const [color, setColor] = useState(editLabel.color)
  const { board } = useSelector((storeState) => storeState.boardModule)
  console.log("🚀 ~ file: modal-label-change.jsx:9 ~ ModalLabelChange ~ board", board)

  const searchInput = useRef(null)

  if (!editLabel) return
  if (!task) return
  if (!board) return

  const onSave = (ev) => {
    ev.preventDefault()
    const boardLabelIdx = board.labels.findIndex((boardLabel) => boardLabel._id === editLabel.id)
    board.labels[boardLabelIdx] = {
      id: editLabel.id,
      title: labelName,
      color: color,
    }
    onUpdateBoard(board)
  }

  const onUpdateBoard = async (updatedBoard) => {
    try {
      await boardService.save(updatedBoard)
    } catch (err) {
      console.error(err)
    }
  }



  const onDelete = (ev) => {
    ev.preventDefault()
    const boardLabelIdx = board.labels.findIndex((boardLabel) => boardLabel.id === editLabel.id)
    board.labels.splice(boardLabelIdx, 1)

    for (let i = 0; i < board.groups.length; i++) {
      const group = board.groups[i]
      for (let j = 0; j < group.tasks.length; j++) {
        const groupTask = group.tasks[j]
        for (let k = 0; k < groupTask.labelIds.length; k++) {
          const labelId = groupTask.labelIds[k]
          if (labelId === editLabel.id) {
            groupTask.labelIds.splice(k, 1)
          }
        }
      }
    }
    onUpdateBoard(board)
  }

  const onPickColor = (color) => {
    setColor(color)
  }

  const handleChange = ({ target }) => {
    setLabelName(target.value)
  }


  return (
    <div className="change-section">
      <div className="change-box">
        <h3 className="label">Name</h3>
        <input
          ref={searchInput}
          type="text"
          name="search"
          value={labelName}
          onChange={handleChange}
        />

      </div>

      <div className="change-box">
        <h3 className="label">Select a color</h3>

        <div className="colors-section">
          <div className="box-container">
            <button
              onClick={() => { onPickColor('#61bd4f') }}
              style={{ backgroundColor: `#61bd4f` }}
            ></button>
            <button
              onClick={() => { onPickColor('#f2d600') }}
              style={{ backgroundColor: `#f2d600` }}
            ></button>
            <button
              onClick={() => { onPickColor('#ff9f1a') }}
              style={{ backgroundColor: `#ff9f1a` }}
            ></button>
            <button
              onClick={() => { onPickColor('#EB5A44') }}
              style={{ backgroundColor: `#EB5A44` }}
            ></button>
            <button
              onClick={() => { onPickColor('#c377e0') }}
              style={{ backgroundColor: `#c377e0` }}
            ></button>
            <button
              onClick={() => { onPickColor('#0079bf') }}
              style={{ backgroundColor: `#0079bf` }}
            ></button>
            <button
              onClick={() => { onPickColor('#00c2e0') }}
              style={{ backgroundColor: `#00c2e0` }}
            ></button>
            <button
              onClick={() => { onPickColor('#51e898') }}
              style={{ backgroundColor: `#51e898` }}
            ></button>
            <button
              onClick={() => { onPickColor('#ff78cb') }}
              style={{ backgroundColor: `#ff78cb` }}
            ></button>
            <button
              onClick={() => { onPickColor('#344563') }}
              style={{ backgroundColor: `#344563` }}
            ></button>
          </div>
        </div>

        <button onClick={onSave}>Save</button>
        <button onClick={onDelete} className="delete">Delete</button>
      </div>
    </div>
  )
}
