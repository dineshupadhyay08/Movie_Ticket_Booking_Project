/* eslint react-refresh/only-export-components: 0 */
import { createContext, useContext, useState } from "react";
import axios from 'axios'

axios.defaults.baseUrl = import.meta.env.VITE_BASE_URL

const AppContext = createContext();

function AppProvider({ children }) {

  const [isAdmin,setIsAdmin] = useState(false);
  const [show,setShow] = useState([])
  const [favoriteMovies,setFavoriteMovies] = useState([])

  const {user} = useUser

  const fetchIsAdmin = async ()=>{
    try{
      const {data} = await axios.get('/api/admin/is-admin',{headers:{Authorization: `Bearer `}})
    }catch(error){
      console.log(error)
    }
  }

  const value = {axios}

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
}

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };


