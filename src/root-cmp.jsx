import React from "react";
import { AppHeader } from "./cmps/general/app-header.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home-page.jsx";
import { LoginSignup } from "./pages/login-signup.jsx";
import { WorkSpace } from "./pages/work-space.jsx";
import { BoardApp } from "./pages/board-app.jsx";
import { TaskDetails } from "./cmps/board-app/task/task-details.jsx";

function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route element={<HomePage />} path={"/"} />
        <Route element={<LoginSignup />} path={"/signup"} />
        <Route element={<LoginSignup />} path={"/login"} />
        <Route element={<WorkSpace />} path={"/workspace"} />
        <Route element={<BoardApp />} path={"/board/:boardId"}>
          <Route element={<TaskDetails />} path={":groupId/:taskId"} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
