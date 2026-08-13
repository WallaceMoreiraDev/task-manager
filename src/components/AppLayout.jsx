import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="app-container">
      <header className="menu-cima">
        <div className="brand-logo">✨ TaskMaster</div>
        <div className="user-profile">
          <div className="avatar">W</div>
          <span>Nome usuário</span>
        </div>
      </header>
      <div className="container-main">
        <aside className="menu-lateral">
          <p className="menu-label">MENU PRINCIPAL</p>
          <nav>
            <NavLink to='/dashboard' end className={({ isActive }) => isActive ? "link-menu active" : "link-menu"}>
              📋 Minhas Tarefas
            </NavLink>
            <NavLink to='criar-tarefa' className={({ isActive }) => isActive ? "link-menu active" : "link-menu"}>
              ➕ Criar Tarefa
            </NavLink>
          </nav>
        </aside>
        <main className="content-area">
          <Outlet context={{ tasks, setTasks }} />
        </main>
      </div>
    </div>
  );
}

export default App;
