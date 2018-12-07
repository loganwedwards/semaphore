import React from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider, css } from 'styled-components'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const colors = {
  blue: '#07c',
  lightGrey: '#f6f6ff',
  green: 'rgba(84, 175, 107, 1)',
  black: 'rgba(33, 35, 35, 1)',
  darkBlue: 'rgba(6, 27, 43, 1)',
  white: 'rgba(237, 232, 232, 1)',
  grey: 'rgba(148, 149, 143, 1)',
  red: 'rgba(175, 84, 84, 1)'
}

const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64],
  colors: {
    ...colors
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  buttons: {
    primary: {
      color: colors.white,
      backgroundColor: colors.darkBlue
    },
    outline: {
      color: colors.darkBlue,
      backgroundColor: colors.white,
      boxShadow: 'inset 0 0 2px'
    }
  }
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
