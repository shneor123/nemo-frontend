import React, { useRef, useState } from "react"
import { AppHeader } from "./cmps/general/haeder/app-header"
import { HomePage } from "./pages/home-page"
import { LoginSignup } from "./pages/login-signup"
import { WorkSpace } from "./pages/work-space"
import { BoardApp } from "./pages/board-app"
import { TaskDetails } from "./cmps/board-app/task/task-details"
import { Dashboard } from "./pages/dashboard"
import { DynamicModalCmp } from "./cmps/general/dynamic-modal-cmp"
import { useSelector, useDispatch } from "react-redux"
import { setModal } from "./store/actions/app.actions.js"
import { Routes, Route } from 'react-router-dom'
import { UserProfile } from "./pages/user-profile"

function App() {
  const { modal } = useSelector(({ appModule }) => appModule)
  const dispatch = useDispatch()

  const changeThemeRef = useRef()
  const [isPreviewEnd, setIsPreviewEnd] = useState(false)
  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal))
  }

  const setPreviewEndTrue = () => {
    setIsPreviewEnd(true);
  };

  const setPreviewEndFalse = () => {
    setIsPreviewEnd(false);
  };




  return (
    <div
      onClick={() => {
        if (modal) dispatch(setModal(null))
      }}
    >
      {modal && <DynamicModalCmp  isPreviewEnd={isPreviewEnd}/>}
      <AppHeader changeThemeRef={changeThemeRef} setPreviewEndTrue={setPreviewEndTrue} setPreviewEndFalse={setPreviewEndFalse} />
      <Routes>
        <Route element={<HomePage />} path={"/"} />
        <Route element={<LoginSignup />} path={"/signup"} />
        <Route element={<LoginSignup />} path={"/login"} />
        <Route element={<WorkSpace />} path={"/workspace"} />
        <Route element={<BoardApp isPreviewEnd={isPreviewEnd} setPreviewEndTrue={setPreviewEndTrue} setPreviewEndFalse={setPreviewEndFalse} />} path={"/board/:boardId"}>
          <Route element={<TaskDetails isPreviewEnd={isPreviewEnd}/>} path={":groupId/:taskId"} />
          <Route element={<Dashboard isPreviewEnd={isPreviewEnd} />} path="dashboard" />
        </Route>
        <Route element={<UserProfile />} path={'/users/:id'} />
      </Routes>
    </div>
  )
}

export default App;
