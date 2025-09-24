import {Routes,Route} from "react-router-dom"
import './App.css'
import Layout from "../pages/Layout"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Index from "../pages/Index"
import { UserContextProvider } from "./UserContext"
import Create from "../pages/Create"
import PostPage from "../pages/PostPage"
import Campo from "../pages/Campo"
import Finanzas from "../pages/Finanzas"
import Tecnologia from "../pages/Tecnologia"
import Ciencia from "../pages/Ciencia"
import Buscador from "../components/Buscador"

function App() {
 return(
  <>
  <UserContextProvider>
  <Routes>
     <Route path="/" element={<Layout/>}>
     <Route index element={<Index/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>} />
     <Route path="/create" element={<Create/>} />
     <Route path="/post/:id" element={<PostPage/>}/>
     <Route path="/Campo" element={<Campo/>}/>
     <Route path="/Finanzas" element={<Finanzas/>}/>
     <Route path="/Tecnología" element={<Tecnologia/>}/>
     <Route path="/Ciencia" element={<Ciencia/>}/>
     <Route path="/Buscador" element={<Buscador/>}/>
     

     </Route>
     
  </Routes>
  </UserContextProvider>
  
 
  </>
 
 )
}
export default App
