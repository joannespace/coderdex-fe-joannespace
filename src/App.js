import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import './App.css';
import { Footer } from './components/Footer';
import Header from './components/Header';
import { PageTitle } from './components/PageTitile';
import PokeList from './components/PokeList';
import { SearchBox } from './components/SearchBox';
import { MThemeProvider } from './themeContext/MThemeProvider';



function App() {
  return (
    <div className="App">
      <MThemeProvider>
        <Header />
        <PageTitle />
        <SearchBox />
        <PokeList />
        <Footer />
      </MThemeProvider>
    </div>
  );
}

export default App;
