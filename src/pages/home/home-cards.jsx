import React, { useRef, useState } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

export const HomeCards = ({ imgDada, setState, state ,mode,nodeRef}) => {
  return (
    <>
      <div className="main">
        <SwitchTransition mode={mode}>
          <CSSTransition
            key={state}
            nodeRef={nodeRef}
            addEndListener={(done) => {
              nodeRef.current.addEventListener("transitionend", done, false)
            }}
            classNames="fade"
          >
            <div ref={nodeRef} className="button-container" onClick={() => setState((state) => !state)}>
              <div className="guide-carousel">
                <div className='el-carousel'>
                  <img src={imgDada} className="carousel-img" />
                </div>
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  )
}



   
//     import React, { useRef, useState } from 'react'
// import { SwitchTransition, CSSTransition } from 'react-transition-group'

// export const HomeCards = ({ imgDada, setState, state ,mode,nodeRef}) => {
//   return (
//     <>
//       <div className="main">
//         <SwitchTransition mode={mode}>
//           <CSSTransition
//             key={state}
//             nodeRef={nodeRef}
//             addEndListener={(done) => {
//               nodeRef.current.addEventListener("transitionend", done, false)
//             }}
//             classNames="fade"
//           >
//             <div ref={nodeRef} className="button-container" onClick={() => setState((state) => !state)}>
//               <div className="guide-carousel">
//                 <div className='el-carousel'>
//                   <img src={imgDada} className="carousel-img" />
//                 </div>
//               </div>
//             </div>
//           </CSSTransition>
//         </SwitchTransition>
//       </div>
//     </>
//   )
// }
