import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { VscClose } from 'react-icons/vsc'
import { DashboardAllTasks } from '../cmps/dashboard/dashboard-all-tasks'
import { DashboardDueSoon } from '../cmps/dashboard/dashboard-due-soon'
import { DashboardOverdue } from '../cmps/dashboard/dashboard-overdue'
import { DashboardChart } from '../cmps/dashboard/dashboard-chart'
import { DashboardComplete } from '../cmps/dashboard/dashboard-complete'
import { useEffect } from 'react'


export const Dashboard = ({isPreviewEnd}) => {
  const { board } = useSelector((storeState) => storeState.boardModule)
  const navigate = useNavigate()

  const getTasks = () => {
    let tasks = []
    board.groups.forEach((group) => group.tasks.forEach((task) => tasks.push(task)))
    return tasks.filter((task) => !task.archivedAt)
  }
  const tasks = getTasks()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className="dashboard" onClick={() => navigate(`/board/${board._id}`)}>
      <main className="dashboard-modal" style={{ borderRadius: !isPreviewEnd ? '3px' : '10px', }} onClick={(ev) => ev.stopPropagation()}>
        <button className="close-btn" onClick={() => navigate(`/board/${board._id}`)}>
          <VscClose className="close-icon" />
        </button>

        <section className="info-container">
          <section className="dashboard-grid">
            <div className="all-task-container grid-item">
              <DashboardAllTasks tasks={tasks} />
            </div>
            <div className="complete-container grid-item">
              <DashboardComplete tasks={tasks} />
            </div>
            <div className="due-soon-container grid-item">
              <DashboardDueSoon tasks={tasks} />
            </div>
            <div className="overdue-container grid-item">
              <DashboardOverdue tasks={tasks} />
            </div>

          </section>
          <div className="main-chart-container">
            <DashboardChart tasks={tasks} board={board} />
          </div>
        </section>
      </main>
    </div>
  )
}
