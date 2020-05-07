import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-family: 'Baloo Bhaina 2', sans-serif;
    }

    body {
      position: relative;
     min-height: 100%;
    }
    p {
      margin: 0;
      padding: 0;
    }

    a {
      text-decoration:none;
      color:#000;
    }
    
`;

export default GlobalStyles;
