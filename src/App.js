import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './Navbar';
import DogsPanel from './components/DogsList';
import { Route, Routes } from 'react-router-dom';
import FavPanel from './components/FavoritesList';

function App() {
  return (
    <React.Fragment>
      <Routes>
                <Route exact  path="/" element={
                  <React.Fragment>
                    <Navbar/>
                    <DogsPanel/>
                    </React.Fragment>
                    }>
                </Route>
                <Route exact  path="/favorites" element={
                  <React.Fragment>
                  <Navbar/>
                  <FavPanel/>
                  </React.Fragment>
                   
                    }>
                </Route>
                </Routes>
    </React.Fragment>
  );
}

export default App;
