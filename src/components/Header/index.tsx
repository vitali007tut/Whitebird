import React from 'react'
import logo from '../../asserts/logoWhite.svg';
import * as sx from './styles';

export const Header = () => {
  return (<header style={sx.header}>
        <a
          className="logo-link"
          href="https://whitebird.io/"
        >
        <img src={logo} className="white-logo" alt="logo" />
        </a>
  </header>
  )
}
