import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import Cadastro from './pages/cadastro/Cadastro';
import Cursos from './pages/cursos/Cursos';
import Navbar from '../src/components/navbar/Navbar';
import Footer from '../src/components/footer/Footer';
import Container from "./components/container/Container";
import About from "./pages/about/about";
import NotFound from "./pages/notfound/NotFound";
import Grade from "./pages/grade/Grade";

function App() {
  return (
    <Router>
      <Navbar></Navbar>

      <Container customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/grade' element={<Grade />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/cursos' element={<Cursos />} />
          <Route path='/about' element={<About />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>

      <Footer></Footer>
    </Router>
  )
}

export default App;
