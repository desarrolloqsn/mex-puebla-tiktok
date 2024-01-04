/** @format */

import { Route, Routes } from "react-router";
import React, { useEffect } from "react";
import "./App.css";
import Login from "./contenedores/Login";
import Dashboard from "./contenedores/Dashboard/Dashboard.jsx";
import ModificarCliente from "./contenedores/Clientes/Modificar";
import ModificarUsuario from "./contenedores/Clientes/Modificar/ModificarUsuario";
import Perfil from "./contenedores/Perfil";
import Series from "./contenedores/Series";
import Nav from "./componentes/Nav";
import DashGrafos from "./contenedores/Dashboard/DashboardGrafos";
import DashModelo from "./contenedores/Dashboard/DashboardModelo";
import { useDispatch, useSelector } from "react-redux";
import Informes from "./contenedores/Informe/informes/src/components/Informes/Informes";
import { Navigate } from "react-router-dom";
import { getDashData, getDash, getDataClientDash } from "./redux/actions";
import RecuperarContraseña from "./contenedores/Login/RecuperarContraseña";
import DashboardLista from "./contenedores/Dashboard/DashboardLista";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function App() {
  const user = useSelector((state) => state.user);
  const loadingGetDataDash = useSelector((state) => state.loadingGetDataDash);
  const red = useSelector(state=>state.red)
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem('user') !== null;
  const navigate = useNavigate();
 const token = useSelector ((state)=> state.token)
  useEffect(() => {
    window.onload = () => {
      if (window.performance) {
        if (performance.navigation.type === 1 || null) {
          const isLogin = localStorage.getItem('user');

          if (isLogin !== null) {
            localStorage.clear();
            dispatch({ type: 'LOGOUT' });
            navigate('/app');
            window.location.reload();
          }
        } else {
          
        }
      }
    };
  }, [dispatch, navigate]);

    // Guardar el objeto user en el localStorage
    useEffect(() => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      
      }
    }, [user]);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    let redirectPath = "/app";
 

  if (storedUser && storedUser.empleado) {
    const id_empleado_rol = storedUser.empleado.id_empleado_rol;
    const existeDash = storedUser.existeDash;
  

    if (id_empleado_rol === 4 || null) {
      dispatch(getDataClientDash(storedUser.empleado.id_empleado_cliente));
      if (existeDash && token) {
        redirectPath = "/dashboard/lista";
      } else {

        //VEEEEEEEEEEEERRRRRRRRRRRRR
        dispatch(getDashData(storedUser.empleado.id_empleado_cliente,50, red));
        if (!loadingGetDataDash) {
          redirectPath = "/dashboard";
        }
      }
    } else {
      dispatch(getDash());
      redirectPath = "/dashboard/lista";
    }
    
  }
 
  return (
    <div className="App">
      <Routes>
        <Route
          path="/app"
          element={storedUser ? <Navigate to={redirectPath} replace /> : <Login />}
        />
        
        <Route path="/dashboard/*" element={<DashboardContainer />} />
        <Route path="/informes" element={<Informes />} />
        <Route
          path="/recuperarContraseña/*"
          element={<RecuperarContraseña />}
        />
      </Routes>
    </div>
  );
}




function DashboardContainer() {
 
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/grafos" element={<DashGrafos />} />
        {/* <Route path="/grafoComunidades" element={<GrafoComunidadesSolo />} /> */}
         <Route path="/modificarcliente" element={<ModificarCliente />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/series" element={<Series />} />
        <Route path="/Atributos" element={<DashModelo />} />
        <Route path="/Clima social" element={<DashModelo />} />
        <Route path="/Continuidad y cambio" element={<DashModelo />} />
        <Route path="/Emociones Básicas (Plutchik)" element={<DashModelo />} />
        <Route path="/Preocupaciones" element={<DashModelo />} />
        {/* <Route path="/Preocupaciones - Ven" element={<DashModelo />} /> */}
        <Route path="/Red motivacional del voto" element={<DashModelo />} />
        <Route path="/Sentimientos" element={<DashModelo />} />
        <Route path="/lista" element={<DashboardLista />} />
        {/* <Route path="/Voto Emocional y Racional" element={<DashModelo />} /> */}
        
      </Routes>
     
    </>
  );
}
export default App;

