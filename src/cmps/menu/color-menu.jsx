import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveBg } from "../../store/actions/board.action";

export const ColorMenuModal = ({ board, isColorModalOpen }) => {
    const dispatch = useDispatch();

    useEffect(() => {
    }, [board]);



    const bgColors = [
        { id: 'c1', color: '#d29034' },
        { id: 'c2', color: '#0079bf' },
        { id: 'c3', color: '#b04632' },
        { id: 'c4', color: '#519839' },
        { id: 'c5', color: '#cd5a91' },
        { id: 'c6', color: '#89609e' },
        { id: 'c7', color: '#00aecc' },
        { id: 'c8', color: '#4bbf6b' },
        { id: 'c9', color: '#838c91' }
    ]

    const chooseBg = (color) => {
        changeBg(color)
    }


    const changeBg = (color) => {
        dispatch(saveBg(board._id, color));
    }


    return <section style={{ display: isColorModalOpen }} >

        <section className="bg-picker">
            <div className="bg-options-container">
                {bgColors.map((color) => {
                    return (
                        <div key={color.id} className="choose-color-list ">
                            <div
                                style={{ backgroundColor: color.color }}
                                className="color-selected"
                                onClick={() => chooseBg(color.color)}
                            >
                            </div>
                        </div>
                    )
                })}
            </div>

        </section>

    </section>
}