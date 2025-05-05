import React from "react"
import { SectionOneHomePage } from "./home/section-1"
import { SectionTowHomePage } from "./home/section-2"
import { SectionTreeHomePage } from "./home/section-3.jsx"

export const HomePage = () => {
  return (
    <section className="home-page">
    <SectionOneHomePage />
    <SectionTowHomePage />
    <SectionTreeHomePage />
    </section >

  )
}