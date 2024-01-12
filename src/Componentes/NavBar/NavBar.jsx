import CartWidget from "../CartWidget/CartWidget";
import logo from '../../assets/img/kpopies-logo.png';
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="container-fluid">
      <nav className="row row-cols-3">
        <div className="logo col">
           <Link to="/">
             <img src={logo} alt="logo" />
           </Link> 
        </div>
        <div className="col">
          <ul className="nav-menu">
                <li><Link to="/category/skz">SKZ</Link></li>
                <li><Link to="/category/bts">BTS</Link></li>
                <li><Link to="/category/txt">TXT</Link></li>
            </ul>
        </div>
        <div className="col">
              <CartWidget/>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;