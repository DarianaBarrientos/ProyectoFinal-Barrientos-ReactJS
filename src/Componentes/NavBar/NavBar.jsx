import CartWidget from "../CartWidget/CartWidget";
import logo from '../../assets/kpopies-logo.png'

function NavBar() {
  return (
    <div className="container-fluid">
      <nav className="row row-cols-3">
        <div className="logo col">
           <a href="">
             <img src={logo} alt="logo" />
           </a> 
        </div>
        <div className="col">
          <ul className="nav-menu">
                <li><a href="">SKZ</a></li>
                <li><a href="">BTS</a></li>
                <li><a href="">TXT</a></li>
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