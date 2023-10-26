import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProjects, fetchProjectSpecific, setSelectedProject } from "./projectSlice"
import { useNavigate } from "react-router-dom"

const DisplayProjectDetails = () => {

    const selectedproject = useSelector(state => state.projects.selectedProject)




    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteHandler = (selectedProject) => {
        dispatch(deleteProjects(selectedproject))
        dispatch(setSelectedProject(null))
        navigate("/")


    }


    const editHandler = (selectedProject) => {
        
        navigate("/editprojet")
    }

    useEffect(() => {
        dispatch(fetchProjectSpecific(selectedproject))
     
    }, [selectedproject])

    return (
        <>

            <h1>Détails projet</h1>
            <hr />
            <div className="d-flex justify-content-center ">
            <div className="card " style={{ width: '50rem' }}>
                <h5 className="card-title display-5"><b></b>{selectedproject.title}</h5>
                <div className="card-body">
                  
                    <p className="card-text"><b >Description du projet : </b>{selectedproject.description}</p>
                    <p className="card-text"><b>Date de début : </b>{selectedproject.startDate}</p>
                    <p className="card-text"><b>Date de fin estimée : </b>{selectedproject.endDate}</p>
                    <button className={`btn ${selectedproject.status === 'Non Débuté' ? 'btn-danger' : selectedproject.status === 'En Cours' ? 'btn-info' :  selectedproject.status === 'En Attente' ? 'btn-warning' : 'btn-success'}`}>
                    {selectedproject.status}
                  </button>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-danger" onClick={() => deleteHandler(selectedproject)}><i class="bi bi-trash3"></i> Delete</button>
                        <button className="btn btn-warning" onClick={() => editHandler(selectedproject)}><i class="bi bi-pencil"></i> Edit</button>



                    </div>
                </div>
            </div>
            </div>
          
        </>



    )

}


export default DisplayProjectDetails