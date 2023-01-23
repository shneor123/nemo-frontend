import React from "react";
import { AppHeader } from "./cmps/general/haeder/app-header";
import { Routes, Route } from 'react-router-dom'
import { HomePage } from "./pages/home-page.jsx";
import { LoginSignup } from "./pages/login-signup.jsx";
import { WorkSpace } from "./pages/work-space.jsx";
import { BoardApp } from "./pages/board-app.jsx";
import { TaskDetails } from "./cmps/board-app/task/task-details.jsx";
import { Dashboard } from "./pages/dashboard.jsx";
import { DynamicModalCmp } from "./cmps/general/dynamic-modal-cmp.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setModal } from "./store/actions/app.actions.js";

function App() {
  const { modal } = useSelector(({ appModule }) => appModule)
  const dispatch = useDispatch()
  return (
    <div
      onClick={() => { if (modal) dispatch(setModal(null)) }}>
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
