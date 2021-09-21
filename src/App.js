import './styles/App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from './images/nfl_logo.png';
import Main from './views/Main';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Rubik',
      'BlinkMacSystemFont',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="NFL Logo" className="nfl-logo" />
          A visualisation of the history of the NFL
        </header>
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
