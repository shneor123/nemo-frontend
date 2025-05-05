import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'

export const MoreBackground = ({ onCloseModal, chooseColor, chooseImg }) => {
    const coverColors = [
        { id: 'c1', color: '#0079bf' },
        { id: 'c2', color: '#d29034' },
        { id: 'c3', color: '#519839' },
        { id: 'c4', color: '#b04632' },
        { id: 'c5', color: '#89609e' },
        { id: 'c6', color: '#89609e' },
    ]
    const coverImgs = [
        {
            id: 'p1',
            img: 'https://media.istockphoto.com/photos/artificial-intelligence-in-healthcare-new-ai-applications-in-medicine-picture-id1365534802?b=1&k=20&m=1365534802&s=170667a&w=0&h=NBzCGZn66ef7qeiRM38SenrFKcXePSqN6aWGq3j6ZsM='
        },
        {
            id: 'p2',
            img: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI4NzN8MHwxfHNlYXJjaHw0fHxtb3VudGFpbnxlbnwwfHx8fDE2NDgyMjMxMjg&ixlib=rb-1.2.1&q=85'
        },
        {
            id: 'p3',
            img: 'https://www.nttdata.com/id/en/-/media/nttdataapac/common-images/digital/ai/digital_ai09_1024x576.jpg?h=576&la=en-ID&w=1024&hash=FE08D80EF739EABA191A91075BA62458990CF61B',
        },
        {
            id: 'p4',
            img: 'https://images.unsplash.com/photo-1433477155337-9aea4e790195?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb'
        },
        {
            id: 'p5',
            img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI4NzN8MHwxfHNlYXJjaHwzfHxtb3VudGFpbnxlbnwwfHx8fDE2NDgyMjMxMjg&ixlib=rb-1.2.1&q=85'
        },
        {
            id: 'p6',
            img: 'https://images.unsplash.com/photo-1613336026275-d6d473084e85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTA3NzN8MHwxfHNlYXJjaHwxNnx8cmFuZG9tfGVufDB8fHx8MTY3NDQ2MzIyNQ&ixlib=rb-4.0.3&q=80&w=1080'
        },
    ]
    return (
        <section className="more-background more-select">
            <section className='haeder'>
                <h3>Board background</h3>
                <button className="modal-close-btn" onClick={onCloseModal}> <span><CgClose /></span> </button>
            </section>
            <div className="background-picker">
                <span>Board background</span>
                <span className='see-more'>  See More</span>
                <span className='title-color'>Photos</span>
                <ul className="background-list clean-list flex">
                    {coverImgs.map((img) => {
                        return (
                            <li key={img.id} className="choose-img-list ">
                                <button
                                    onClick={() => chooseImg(img)}
                                    className="background-select"
                                    style={{ background: `url(${img.img}) center center / cover` }}>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="background-container">
                <span className='see-more'>See More</span>
                <span className='title-color'>Colors</span>
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
                </div>
            </div>
        </section>
    )
}
