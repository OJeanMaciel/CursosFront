import { Link } from "react-router-dom";
import './Navbar.css';
import logo from '../../assets/logo.png';
import Container from '../container/Container';

function NavBar() {


  return (
    <nav className='navbar'>
        <img src={logo} alt="cursos" />
      <Container>
        <ul className='list' style={{ justifyContent: 'space-between' }}>
          <li>
            <Link className='item' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='item' to='/grade'>
              Grade/curricular
            </Link>
          </li>
          <li>
            <Link className='item' to='/cadastro'>
              Cadastro
            </Link>
          </li>
          <li>
            <Link className='item' to='/cursos'>
              Cursos
            </Link>
          </li>
          <li>
            <Link className='item' to='/about'>
              Sobre
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  )
}

export default NavBar;