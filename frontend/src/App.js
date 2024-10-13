import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Parte1 from './componentes/parte1';
import InfoTarjeta from './componentes/infoTarjeta';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Parte1 />} />
          <Route path="/games/:id" element={<InfoTarjeta />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
