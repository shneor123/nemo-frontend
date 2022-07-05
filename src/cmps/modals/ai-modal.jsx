// external
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
// services
import { aiService } from "../../services/ai.service"
import { utilService } from "../../services/util.service"
// actions
import { saveChecklist } from "../../store/actions/checklist.action"
// react
import { useDispatch } from "react-redux"
// assets
import clara from '../../assets/img/clara.png'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { useState } from "react"


export function AiModal({ task, boardId, groupId }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const dispatch = useDispatch()
  const onCreateAiChecklist = ({ checklistTitle, todoTitles }) => {
    const checklist = { title: checklistTitle }
    checklist.id = utilService.makeId()
    checklist.todos = []
    todoTitles.map((title) => {
      checklist.todos.push({
        id: utilService.makeId(),
        isDone: false,
        title,
      })
    })
    dispatch(saveChecklist(checklist, boardId, groupId, task.id))
  }
  const commands = [
    {
      command: "build a to-do list for *",
      callback: async (sttInput) => {
        try {
          const response = await aiService.getAiTextCompletion(sttInput)
          onCreateAiChecklist(response)
        } catch (err) {
          console.log('could not get response from stt : ', err)
        }
      },
    },
  ]
  const { listening } = useSpeechRecognition()
  let { transcript, resetTranscript } = useSpeechRecognition({ commands })











  return (
    <div className="ai-modal-container">
      <div className="clara-img-container avatar">
        <img src={clara} alt="" />
      </div>
      <h1 style={{ margin: '0', marginBottom: '10px' }}>Hi, I'm Clara, your AI powered assistant</h1>
      <p>I was built with the <a href="https://openai.com/blog/openai-api/">GPT-3 engine from OpenAI</a></p>

      <div style={{ marginTop: '10px', marginBottom: '15px', borderRadius: '50%', width: '20px', aspectRatio: 1, backgroundColor: `${listening ? '#eb258eb4' : '#091e4235'}` }}></div>
      <p style={{ fontSize: '19px' }}>{transcript}</p>
      <div className="ai-modal-btn-container">
        <button className="ai-modal-btn" onClick={() => SpeechRecognition.startListening({ language: "en-US" })}>Start </button>
        <button className="ai-modal-btn" onClick={SpeechRecognition.stopListening}>Stop</button>
        <button className="ai-modal-btn" onClick={resetTranscript}>Reset</button>
      </div>
      <button onClick={() => setIsExpanded(!isExpanded)} className="ai-modal-btn ai-commands-btn"><span>Commands</span>  <span className="command-btn-icon">{isExpanded ? <MdOutlineExpandLess size={20} /> : <MdOutlineExpandMore size={20} />}</span></button>
      {isExpanded && <div className="commands-container">
        <p>To activate press start and say</p>
        <p>Build a todo list for &lt;your to do list name&gt;</p>
      </div>}
    </div>
  );
}