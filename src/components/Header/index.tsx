import React from 'react'
import logo from '../../asserts/logoWhite.svg';
import * as sx from './styles';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (<header style={sx.header}>
    <Link to={'/'} style={sx.link}>
      <img src={logo} alt="logo" />
    </Link>
  </header>
  )
}
