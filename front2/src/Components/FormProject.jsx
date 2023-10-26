import {useRef } from "react"
import { useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { postProjects} from "./projectSlice"

const FormProject = () => {

    const titleRef = useRef()
    const descriptionRef = useRef()
    const startDateRef = useRef()
    const endDateRef = useRef()
    const selectStatusRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const submitHandler = (e) => {
        e.preventDefault()
        const title = titleRef.current.value
        console.log(title);
        const description = descriptionRef.current.value
        const startDate = startDateRef.current.value
        const endDate = endDateRef.current.value
        const status = selectStatusRef.current.value
        console.log(status);
        const newProject = { title, description, startDate, endDate, status }
        console.log(newProject);
        console.log("add");
        console.log(newProject);
       
            console.log("add");
            dispatch(postProjects(newProject))

       
        navigate("/")
    }

    const selectStatus = () => {

    }


    return (
        <>
            <h1>Ajouter un projet</h1>
            <hr />


            <hr />
            <form action="" onSubmit={submitHandler} >
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Title</span>
                    <input type="text" className="form-control" placeholder="title" aria-label="title" aria-describedby="basic-addon1" ref={titleRef} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Description</span>
                    <input type="text" className="form-control" placeholder="description" aria-label="description" aria-describedby="basic-addon1" ref={descriptionRef} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Start Date</span>
                    <input type="date" className="form-control" placeholder="start date" aria-label="start date" aria-describedby="basic-addon1" ref={startDateRef} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">End date</span>
                    <input type="date" className="form-control" placeholder="end date" aria-label="score" aria-describedby="basic-addon1" ref={endDateRef}  />
                </div>
                    <select className="form-select" aria-label="Default select example" ref={selectStatusRef}>
                        <option selected onClick={() => selectStatus()}>Sélectionner un status</option>
                        <option value="Non Débuté">Non Débuté</option>
                        <option value="En Cours">En Cours</option>
                        <option value="En Attente">En Attente</option>
                        <option value="Terminé">Terminé</option>
                    </select>
                   
    
                <h1> <button className="btn btn-danger"  >Add</button></h1>
            </form>

        </>
    )
}


export default FormProject

