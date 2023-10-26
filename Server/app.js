import express from "express";
import { ProjectsDao } from "./dao/ProjectsDao.js";
import { Project } from "./models/Project.js";

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

const projectsDao = new ProjectsDao();
app.use(express.json());

// Renvoie tous les projets
app.get('/projects', (req, res) => {
    res.json(projectsDao.getAll());
});

// Ajoute un nouveau projet
app.post('/projects', (req, res) => {
    const {title, description, startDate, endDate, status} = req.body;
    let project = new Project(null, title, description, startDate, endDate, status);
    res.json(projectsDao.save(project));
});

// Récupère les détails d'un projet spécifique
app.get('/projects/:projectId', (req, res) => {
    let project = projectsDao.findById(+req.params.projectId);

    if(project == undefined) {
        res.status(404).json({code: 404, message: "aucun projet trouvé avec cet id"});
    }

    res.json(project);
});

// Met à jour les détails d'un projet spécifique
app.put('/projects/:projectId', (req, res) => {
    
    const {id,title, description, startDate, endDate, status} = req.body;
    if(+req.params.projectId != id) res.sendStatus(409);
    let project = new Project(id,title, description, startDate, endDate, status);
    projectsDao.updateProject(project) ? res.sendStatus(200) : res.status(400).json({code: 400, message: "problème lors de la mise à jour du projet"})
});

// Supprimer un projet
app.delete('/projects/:projectId', (req, res) => {
    projectsDao.deleteProject(+req.params.projectId);
    res.sendStatus(200);
});


app.listen(3001, () => {
    projectsDao.readFile();
    console.log('http://127.0.0.1:3001');
});