import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    height: -webkit-fill-available;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video, button{
    margin: 0;
    border: 0;
    padding: 0;
    vertical-align: baseline;
    font-size: 100%;
    box-sizing: border-box;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  menu, ol, ul {
    list-style: none;
  }
  * {
    box-sizing: border-box;
  } 
  html {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
    
    scroll-behavior: smooth;

    font-family: sans-serif;
    font-size: 62.5%;
    user-select: none;

    background-color: white;
  }
  ul, li {
    padding-left: 0rem;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input, button {
    outline: none; 
    border: none;
    background-color: transparent;
  }
  button {
    cursor: pointer;
    padding: 0;
  }
  input {
    appearance: none;
    
    &:focus {
      outline: none;
    }
  }
`
