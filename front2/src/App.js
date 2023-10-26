
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './App.css';


function App() {


  const navigate = useNavigate()

  const addProject = () => {
    navigate("/formproject")
  }

  return (
    <div className="App">


        <header>
          <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body p-2" data-bs-theme="dark">
            <NavLink to={"/"} className="navbar-brand">
              <i className="bi bi-house-heart display-6"></i> 
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <form className="form-inline my-2 my-lg-0 ms-auto">
                <button className='btn btn-outline-success mr-sm-2 ml-auto' onClick={() => addProject()}>
                  <i className="bi bi-patch-plus-fill"></i> Ajouter un projet
                </button>
              </form>
            </div>
          </nav>
        </header>

 
      <main>
        <div className="container" >
          <Outlet />

        </div>
      </main>

    </div>
  );
}

export default App;
