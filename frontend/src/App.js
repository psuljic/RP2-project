import ItemCard from './components/ItemCard';
import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AboutPage from './components/AboutPage';

function App(){
  return (
    <div className='container-fluid'>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<ItemCard />} />
          <Route path="/about" element={<AboutPage />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
