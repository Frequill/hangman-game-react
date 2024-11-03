import Game from './pages/game/game';
import Homescreen from './pages/homescreen/homescreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homescreen />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
