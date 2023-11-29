import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BreedsPage from './components/breed/BreedsPage.js';
import ClientsPage from './components/client/ClientsPage.js';
import BlankPage from './components/BlankPage.js';
import LoginPage from './components/LoginPage.js'
import Navbar from './components/Navbar.js';
import RequireAuth from './components/RequireAuth.js';
import './styles/Styles.css'

export const App = () => (
  <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<BlankPage/>} exact/>
        <Route path="/login" element={<LoginPage/>} exact/>
        <Route
          element={
            <RequireAuth
              allowedRoles={['user', 'admin']}
            />
          }
        >
          <Route path="/breeds" element={<BreedsPage />} exact />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={['user', 'admin']}
            />
          }
        >
          <Route path="/clients" element={<ClientsPage />} exact />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
