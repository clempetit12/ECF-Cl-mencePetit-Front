import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./Components/ErrorPage";
import FormProject from "./Components/FormProject";
import DisplayProjectDetails from "./Components/DisplayProjectsDetails";
import ProjectsList from "./Components/ProjectsList";
import Edit from "./Components/Edit";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {path : "/", element : <ProjectsList />},
          {path : "/formproject", element : <FormProject />},
          { path : "/projectdetails", element : <DisplayProjectDetails />},
          { path : "/editprojet", element : <Edit />},
        
        ],
      },
    ]);
  

export default router