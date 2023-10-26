import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchProjects, setFilterProject, setSelectedProject } from "./projectSlice"
import styles from "./projects.module.css"

const ProjectsList = () => {

  const projects = useSelector(state => state.projects.projects)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedproject = useSelector(state => state.projects.selectedProject)
  const filter = useSelector((state) => state.projects.filter);


  const detailsHandler = (project) => {
    console.log("details");

    dispatch(setSelectedProject(project))

    navigate("/projectdetails")
  }

  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') {
      return true;
    } else {
      return project.status === filter;
    }
  });



  useEffect(() => {
    dispatch(fetchProjects())
    console.log(selectedproject);
  }, [selectedproject])

  return (
    <>
      <h1 className="display-4 mt-2">Projets</h1>
      <hr />

      <div className="input-group mb-3">

        <label className="input-group-text" for="inputGroupSelect01">Sélectionnez votre projet</label>

        <select value={filter} onChange={(e) => dispatch(setFilterProject(e.target.value))} className="form-select" aria-label="Default select example">
          <option value="All" >Tous les projets</option>
          <option value="Non Débuté" >Non Débuté</option>
          <option value="En Cours" >En Cours</option>
          <option value="En Attente" >En Attente</option>
          <option value="Terminé" >Terminé</option>

        </select>


      </div>
      <hr />

      <div className={styles.card}>
        {filteredProjects.length === 0 ? (
          <p>Il n'y a pas de projets</p>
        ) : filteredProjects.map((project) =>
          <div className="card m-3  " style={{ width: '18rem' }}>
            <div className="card-deck">
              <div className="card-header display-6">
                <span key={project.id} className="card-title "> {project.title}</span>
              </div>
              <div className="card-body" >
                <div className="d-grid gap-2 d-md-flex justify-content-center">
                  <button className="btn btn-outline-light" onClick={() => detailsHandler(project)}> <i class="bi bi-info-circle"></i> Details</button>

                  <button className={`btn ${project.status === 'Non Débuté' ? 'btn-danger' : project.status === 'En Cours' ? 'btn-info' :  project.status === 'En Attente' ? 'btn-warning' : 'btn-success'}`}>
                    {project.status}
                  </button>

          
                </div>
                <div >
                </div>

              </div>
            </div>
          </div>)}



      </div>

    </>

  )
}

export default ProjectsList




