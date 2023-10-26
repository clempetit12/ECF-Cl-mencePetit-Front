import {useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editProjects} from "./projectSlice"

const Edit = () => {

    const titleRef = useRef()
    const descriptionRef = useRef()
    const startDateRef = useRef()
    const endDateRef = useRef()
    const selectedProject = useSelector(state => state.projects.selectedProject)
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
        const status = selectStatusRef.current.options[selectStatusRef.current.selectedIndex].text;

        console.log(status);
        const newProject = {id: selectedProject.id, title: title, description: description, startDate : startDate, endDate : endDate, status:  status }
        console.log(newProject);
        console.log("edit");
        console.log(newProject);
       
            console.log("edit");
            dispatch(editProjects({projectId:selectedProject.id,...newProject}))
       

       
        navigate("/")
    }

    const selectStatus = () => {

    }


    return (
        <>
            <h1>Editer un projet</h1>
            <hr />


            <hr />
            <form action="" onSubmit={submitHandler} >
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Title</span>
                    <input type="text" className="form-control" placeholder="title" aria-label="title" aria-describedby="basic-addon1" ref={titleRef} defaultValue={selectedProject?.title} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Description</span>
                    <input type="text" className="form-control" placeholder="description" aria-label="description" aria-describedby="basic-addon1" ref={descriptionRef} defaultValue={selectedProject?.description} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Start Date</span>
                    <input type="date" className="form-control" placeholder="start date" aria-label="start date" aria-describedby="basic-addon1" ref={startDateRef} defaultValue={selectedProject?.startDate} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">End date</span>
                    <input type="date" className="form-control" placeholder="end date" aria-label="score" aria-describedby="basic-addon1" ref={endDateRef} defaultValue={selectedProject?.endDate} />
                </div>
                    <select className="form-select" aria-label="Default select example" ref={selectStatusRef} defaultValue={selectedProject?.status}>
                        <option selected onClick={() => selectStatus()}>Sélectionner un status</option>
                        <option value="1">Non Débuté</option>
                        <option value="2">En Cours</option>
                        <option value="3">En Attente</option>
                        <option value="3">Terminé</option>
                    </select>
                  
                <h1> <button className="btn btn-warning"  >Edit</button></h1>
            </form>

        </>
    )
}


export default Edit

