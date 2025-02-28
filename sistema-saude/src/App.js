import './App.css';
import EsqueciSenha from './Paginas/EsqueciSenha/EsqueciSenha';
import Login from './Paginas/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
