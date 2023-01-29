import { useState, useEffect, useRef } from 'react'
import { boardService } from '../../services/board/board.service'
import { utilService } from '../../services/basic/util.service'

import { AccessKey } from '../../.secret/api'

export function ImgsMenuModal({ board, isImgModalOpen }) {
    const unsplash = useRef()
    const [img, setImg] = useState('')
    const [res, setRes] = useState(unsplash.current || [])

    useEffect(() => {
        setRes(utilService.getDemoImages())
    }, [])

    const onPickImg = (url) => {
        const style = { bgImg: url }
        onUpdateBoard({ ...board, style: style })
    }

    const onUpdateBoard = async (updatedBoard) => {
        try {
            await boardService.save(updatedBoard, board.id)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchRequest = async () => {
        const data = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${AccessKey}`)
        const dataJ = await data.json()
        const result = dataJ.results
        const miniRes = result.map((img) => img.urls)
        setRes(miniRes)
        unsplash.current = miniRes
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        fetchRequest()
        setImg('')
    }

    if (!board) return
    return (
        <div className="background-list" style={{ display: isImgModalOpen }}>
            <div className="img-container">
                <div className="search-photos">
                    <form onSubmit={onSubmit}>
                        <input
                            placeholder="Search Anything..."
                            type="text"
                            value={img}
                            onChange={(ev) => setImg(ev.target.value)}
                        ></input>
                    </form>
                    <span className="icon"></span>
                </div>

                <div className="unsplash-container">
                    <div className="img-container ">
                        {!!res.length &&
                            res.map((val, idx) => (
                                <div
                                    key={idx}
                                    className="image"
                                    style={{ backgroundImage: `url('${val.full}')` }}
                                    onClick={() => onPickImg(val.full)}
                                >
                                </div>
                            ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
