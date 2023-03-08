import React, { FC } from 'react';

// images
import logo from '../../../public/images/Pokeball.png';

// types
import { IHeader } from './Header.types';

export const Header: FC<IHeader> = ({ setFirstPageHandler }) => (
  <div className='header-wrapper' onClick={setFirstPageHandler}>
    <img
      className='header-logo'
      src={logo}
      alt="logo"
    />
    <h1 className='header-title'>Pokedex</h1>
  </div>
);
