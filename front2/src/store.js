import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./Components/projectSlice";


export default configureStore({
    reducer : {
        projects : projectSlice,
    }
})