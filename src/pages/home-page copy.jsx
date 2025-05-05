import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import imgHero from "../assets/img/home-page/home1.jpeg"
import imgDemo from "../assets/img/home-page/white-wave-bg.svg"
import { HomeCards } from "./home/home-cards"
import { ButtonData } from "./home/button-data"

export const HomePage = () => {
  const [dataType, setDataType] = useState('Boards')
  const [state, setState] = useState(true)
  const [mode, setMode] = useState("out-in")
  const nodeRef = useRef(null)

  let carouselActiveItem = 0
  let imgDada = []
  switch (dataType) {
    case 'Boards':
      imgDada.push("https://res.cloudinary.com/ca-cloud/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669886243/Trello/guide-01_reaa50.jpg")
      carouselActiveItem = 0
      break
    case 'Lists':
      imgDada.push("https://res.cloudinary.com/ca-cloud/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669886243/Trello/guide-02_kzfibw.jpg")
      carouselActiveItem = 1
      break
    case 'Cards':
      imgDada.push("https://res.cloudinary.com/ca-cloud/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669886243/Trello/guide-03_aqoqhq.jpg")
      carouselActiveItem = 2
      break
    default:
      break
  }
  return (
    <section className="home-page ">
      <section className="header flex row align-center justify-between"></section>
      <section>
        <img className="wave" src={imgDemo} alt="" />
        <div className="demo-invite flex row align-start w-100 justify-center wrap">
          <div>
            <h1>Nemo brings all your tasks, teammates, and tools together!</h1>
            <p>Keep everything in the same place, even if your team isn't.</p>
            <div className="flex row gap20 justify-center ">
              <Link to={'/workspace'} className="btn-demo">See Demo</Link>
            </div>
          </div>
          <img className="img1" src={imgHero} />
        </div>
      </section>

      <div className="product">
        <div className="product-info">
          <h4>TRELLO 101</h4>
          <h2>A productivity powerhouse</h2>
          <p>
            Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who's
            doing what and what needs to get done. Learn more in our <a>guide for getting started</a>.
          </p>
        </div>
        <section className="product-guide">
          <div className="product-guide-preview">
            <div className="guide-cards">
              <div className="guide-card">
                <ButtonData setDataType={setDataType} dataType={dataType} setState={setState} state={state} nodeRef={nodeRef} mode={mode} />
              </div>
            </div>
            <HomeCards imgDada={imgDada} setState={setState} state={state} nodeRef={nodeRef} mode={mode} />
          </div>
        </section>
      </div >
    </section >

  )
}