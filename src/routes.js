import { HomePage } from './pages/home-page.jsx'
import { LoginSignup } from './pages/login-signup.jsx'
import { WorkSpace } from './pages/work-space.jsx'
import { BoardApp } from './pages/board-app.jsx'
import { TaskDetails } from './cmps/board-app/task/task-details.jsx'
// import { CarApp } from './pages/car-app.jsx'
// import { ChatApp } from './pages/chat-app.jsx'
// import { AdminApp } from './pages/admin-app.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
    },
    {
        path: '/workspace',
        component: <WorkSpace />,
    },
    {
        path: '/board/:boardId',
        component: <BoardApp />,
    },
    {
        path: '/signup',
        component: <LoginSignup />,
    },
    {
        path: '/login',
        component: <LoginSignup />,
    },
    {
        path: '/board/:boardId/:groupId/:taskId',
        component: <TaskDetails />,
    },
]

export default routes