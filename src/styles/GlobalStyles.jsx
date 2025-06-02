import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
    --color-white: rgb(241, 241, 243);
    --color-gray: rgb(198, 199, 205);
    --color-red: rgb(209, 46, 69);
    --color-darkgray: rgb(49, 51, 64);
}


body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color:rgb(226, 227, 230);
 ;
}
`;

export default GlobalStyles;
