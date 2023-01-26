import React from "react"
import { AppHeader } from "./cmps/general/haeder/app-header"
import { HomePage } from "./pages/home-page"
import { LoginSignup } from "./pages/login-signup"
import { WorkSpace } from "./pages/work-space"
import { BoardApp } from "./pages/board-app"
import { TaskDetails } from "./cmps/board-app/task/task-details"
import { Dashboard } from "./pages/dashboard"
import { DynamicModalCmp } from "./cmps/general/dynamic-modal-cmp"
import { useSelector,useDispatch } from "react-redux"
import { setModal } from "./store/actions/app.actions.js"
import { Routes, Route } from 'react-router-dom'

function App() {
  const { modal } = useSelector(({ appModule }) => appModule)
  const dispatch = useDispatch()
  return (
    <div
      onClick={() => {
        if (modal) dispatch(setModal(null))
      }}
    >
      {modal && <DynamicModalCmp />}
      <AppHeader />
      <Routes>
        <Route element={<HomePage />} path={"/"} />
        <Route element={<LoginSignup />} path={"/signup"} />
        <Route element={<LoginSignup />} path={"/login"} />
        <Route element={<WorkSpace />} path={"/workspace"} />
        <Route element={<BoardApp />} path={"/board/:boardId"}>
          <Route element={<TaskDetails />} path={":groupId/:taskId"} />
          <Route element={<Dashboard />} path="dashboard" />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
