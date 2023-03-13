import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Pokemon } from './src/components/Pokemon/Pokemon';
import { MainPage } from './src/components/MainPage/MainPage';
import './public/sass/main.scss';
import { Root } from './src/components/Root/Root';

function App() {
  return (
    <Root>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/:title" element={<Pokemon />}/>
        </Routes>
      </div>
    </Root>
  );
}
export default App;
