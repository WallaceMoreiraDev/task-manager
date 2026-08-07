import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="container">
      <div className="menu-cima">Div de cima</div>
      <div className="container-main">
        <aside className="menu-lateral">
          <p>Navegação</p>
          <ul>
            <NavLink to='/dashboard' end className="link-menu">Tarefas</NavLink>
            <NavLink to='criar-tarefa' className='link-menu'>Criar nova tarefa</NavLink>
          </ul>
        </aside>
        <Outlet context={{ tasks, setTasks }} />
      </div>
    </div>
  );
}

export default App;
