import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Récupérer les projets
export const fetchProjects = createAsyncThunk(
    "projects/fetchProjects",
    async () => {
        const response = await fetch(`http://127.0.0.1:3001/projects`)
        const data = await response.json()
        console.log(data);
        const projects = []
        for (const key in data) {
            projects.push({ id: key, ...data[key] })
        }
        return projects

    }

)

//Récupérer détails projet spécifique
export const fetchProjectSpecific = createAsyncThunk(
    "projects/fetchProjectSpecific",
    async (selectedProject) => {
        const response = await fetch(`http://127.0.0.1:3001/projects/${selectedProject.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(selectedProject)
        })
        const data = await response.json()
        console.log(data);
        return selectedProject


    }
)


//Ajouter des projets
export const postProjects = createAsyncThunk(
    "projects/postProjects",
    async (newProject) => {
        const response = await fetch(`http://127.0.0.1:3001/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProject)
        })
        const data = await response.json()
        console.log(data);
        return {
            id: data.id,
            ...newProject
        }


    }
)
//Supprimer des projets
export const deleteProjects = createAsyncThunk(
    "projects/deleteProjects",
    async (selectedProject) => {
        const response = await fetch(`http://127.0.0.1:3001/projects/${selectedProject.id}`, {
            method: "DELETE",
        })
        if (response.status === 200) {
            return selectedProject; 
        }



    }
)

//Editer un projet
export const editProjects = createAsyncThunk(
    "projects/editProjects",
    async ({ projectId, ...newProject }) => {
        const response = await fetch(`http://127.0.0.1:3001/projects/${projectId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProject)
        })
        const data = await response.json()
        console.log(data);
        console.log(newProject);


        return { projectId, ...data }

    }
)

const projectSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [],
        formulaireMode: " ",
        selectedProject: null,
        filter: "All"
        
     
       

    },
    reducers: {
    
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload
        },
        setFilterProject: (state, action) => {
            state.filter = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.projects = action.payload
            console.log(state.projects);
        })
        builder.addCase(postProjects.fulfilled, (state, action) => {
            state.projects.push(action.payload)
            console.log(state.projects);
        })
        builder.addCase(deleteProjects.fulfilled, (state, action) => {
            let foundProject = state.projects.find(p => p.id === action.payload.id)
            console.log(foundProject);
            if (foundProject) {
                state.projects = state.projects.filter(p => p.id !== action.payload.id)
            }
        })
        builder.addCase(editProjects.fulfilled, (state, action) => {
       
                state.projects = [...state.projects.filter(p => p.id !== action.payload.id), action.payload]
                console.log(state.projects);
            

        })
     
    
    }
}

)
    
    
export const { setSelectedProject, setFilterProject } = projectSlice.actions
export default projectSlice.reducer
