import { createGlobalStyle, ThemeProvider } from "styled-components";
import { IzeponkutStyles } from '../src/lib/IzeponkutCommons';

const GlobalStyle = createGlobalStyle`
/*Resetar CSS(Necolas Reset CSS) */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

  body {
    font-family: sans-serif;
    background-color: #D9E6F6;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${IzeponkutStyles}
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
