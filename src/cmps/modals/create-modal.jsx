import React, { useRef } from 'react'
import { useDispatch } from "react-redux";
import { setModal } from "../../store/actions/app.actions";

export const CreateModal = () => {
    const createRef = useRef()
    const dispatch = useDispatch()

    const onOpenModal = (ev, modal) => {
        dispatch(setModal(modal))
    }

    return (
        <section class="create-board-modal-container">
            <section className="create-board-modal" ref={createRef}
                onClick={(ev) => onOpenModal(ev, {
                    element: createRef.current,
                    category: 'Create Board',
                    title: 'Create Board',
                    props: { element: createRef.current, },
                })}>
                <ul>
                    <li>
                        <svg stroke='currentColor' fill='currentColor' strokeWidth='0' version='1.1' viewBox='0 0 16 16' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5zM7 12c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-8c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v8zM13 9c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-5c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v5z'></path>
                        </svg>
                        <span>Create Board</span>
                        <p>A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.</p>
                    </li>
                </ul>
            </section>
        </section>
    )
}