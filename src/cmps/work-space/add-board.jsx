import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBoard } from '../../store/actions/board.action';
import boardPreview from '../../assets/svg/board-preview.svg';

export const AddBoard = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const [boardTitle, setBoardTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('#b04632');
  const [selectedImg, setSelectedImg] = useState('');

  const coverColors = [
    { id: 'c1', color: '#0079bf' },
    { id: 'c2', color: '#d29034' },
    { id: 'c3', color: '#519839' },
    { id: 'c4', color: '#b04632' },
    { id: 'c5', color: '#89609e' },
  ];

  const coverImgs = [
    {
      id: 'p1',
      img: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    },
    {
      id: 'p2',
      img: 'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 'p3',
      img: 'https://www.nttdata.com/id/en/-/media/nttdataapac/common-images/digital/ai/digital_ai09_1024x576.jpg?h=576&la=en-ID&w=1024&hash=FE08D80EF739EABA191A91075BA62458990CF61B',
    },
    {
      id: 'p4',
      img: 'https://media.istockphoto.com/photos/artificial-intelligence-in-healthcare-new-ai-applications-in-medicine-picture-id1365534802?b=1&k=20&m=1365534802&s=170667a&w=0&h=NBzCGZn66ef7qeiRM38SenrFKcXePSqN6aWGq3j6ZsM=',
    },
  ];
  // const inputModal = useRef(true);
  const chooseColor = (color) => {
    setSelectedImg('');
    // how is there color.color?
    setSelectedColor(color.color);
  };
  const chooseImg = (img) => {
    // how is there img.img?
    setSelectedImg(img.img);
    setSelectedColor('');
  };

  const createNewBoard = () => {
    if (boardTitle) {
      console.log(selectedImg);
      const style = selectedImg ? {background: `url(${selectedImg}) center center / cover`} : {backgroundColor: selectedColor} 
      const board = {
        title: boardTitle,
        style
      };
      // const board = { title: boardTitle, style: { background: selectedColor || `url(${selectedImg}) center center / cover` } };
      dispatch(addBoard(board));
      onCloseModal();
    } else return;
  };

  return (
    <section className="add-board">
      {/* board preview already exists, should be for instance example */}
      <div className="board-preview-wrapper">
        <div
          className="board-preview-container"
          style={{
            background:
              selectedColor || `url(${selectedImg}) center center / cover`,
          }}
        >
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
              );
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
                ></div>
              </div>
            );
          })}
        </div>
        <h4 className="title">Board title</h4>
        <input
          type="text"
          className="add-board-title"
          required=""
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        ></input>
        <button
          className={`create-btn ${boardTitle ? "full" : ""}`}
          onClick={createNewBoard}
        >
          Create New Board
        </button>
      </div>
    </section>
  );
};
