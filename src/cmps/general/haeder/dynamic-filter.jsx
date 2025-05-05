import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { setModal } from '../../../store/actions/app.actions';

export const DynamicFilter = ({ boards, onToggleStar }) => {
    const { modal } = useSelector(({ appModule }) => appModule);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onGoTo = (boardId) => {
        navigate(`/board/${boardId}`);
    };

    const closeAndNavigate = (boardId) => {
        dispatch(setModal(null));
        onGoTo(boardId);
    };

    return (
        <ul className='dynamic-filter'>
            <p className='empty-star'>{modal.title === 'Starred boards' && boards.length === 0 ? 'Star important boards to access them quickly and easily.' : ''}</p>
            {boards && boards.map(board => (
                <li key={board._id} className='filter-item' onClick={() => closeAndNavigate(board._id)}>
                    <div style={{
                        background: board.style.background ? `${board.style.background}` : `url(${board.style.bgImg
                            ? `${board.style.bgImg}` : `${board.style.imgUrl}`})center center / cover`, backgroundColor: `${board.style.backgroundColor}`
                    }}></div>
                    <p>{board.title}</p>
                    <div className={`star-wrapper ${board.isStar ? 'starred' : 'no-starred'}`}>
                        {board.isStar
                            ? <TiStarFullOutline className="star-icon star" onClick={(ev) => onToggleStar(ev, board._id)} />
                            : <TiStarOutline className="star-icon" onClick={(ev) => onToggleStar(ev, board._id)} />
                        }
                    </div>
                </li>
            ))}
        </ul>
    );
};
