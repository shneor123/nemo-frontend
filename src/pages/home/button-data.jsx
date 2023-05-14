import React from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group';

export const ButtonData = ({ dataType, setDataType, setState, nodeRef }) => {
  return (
    <div>
      <div ref={nodeRef} className="button-container" onClick={() => setState((state) => !state)}>
        <button className={`button-data`} >
          <div disabled={dataType === 'Boards'} onClick={() => setDataType('Boards')} className={`${dataType === 'Boards' ? 'is-selected' : ''}`}>
            <h3>{'Boards'}</h3>
            <p>Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”</p>
          </div>
          <div disabled={dataType === 'Lists'} onClick={() => setDataType('Lists')} className={`${dataType === 'Lists' ? 'is-selected' : ''}`}>
            <h3>{'Lists'}</h3>
            <p>The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Trello.</p>
          </div>
          <div disabled={dataType === 'Cards'} onClick={() => setDataType('Cards')} className={`${dataType === 'Cards' ? 'is-selected' : ''}`}>
            <h3>{'Cards'}</h3>
            <p>'Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.</p>
          </div>
        </button>
      </div>
    </div>
  )
}