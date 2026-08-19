import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router";
import useLogin from "../features/login/hooks/useLogin";

function App() {
  const [tasks, setTasks] = useState([]);
  const { handleLogout } = useLogin();

  return (
    <div className="app-container">
      <header className="menu-cima">
        <div className="brand-logo">✨ TaskMaster</div>
        <div className="user-profile">
          <div className="user-info">
            <div className="avatar">W</div>
            <span>Wallace</span>
          </div>
          <button className="btn-logout" title="Sair da conta" onClick={(e) => { handleLogout(e) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sair
          </button>
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
