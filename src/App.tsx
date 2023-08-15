import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import {Home} from "./Home";
import {About} from "./About";
import {Miscellany} from "./Miscellany";

const reload = () => window.location.reload();
function App() {
  return (
      <BrowserRouter basename="/">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/miscellany" element={<Miscellany />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
