import ItemListContainer from './Componentes/ItemListContainer/ItemListContainer';
import './App.css';
import NavBar from './Componentes/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './Componentes/ItemDetailContainer/ItemDetailContainer';
import CartWidget from './Componentes/CartWidget/CartWidget';
import Error from './Componentes/Error/Error';

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>

      <Routes>

        <Route path={'/'} element={<ItemListContainer/>}/>
        <Route path={'/category/:id'} element={<ItemListContainer/>}/>
        <Route path={'/item/:id'} element={<ItemDetailContainer/>}/>
        <Route path={'/cart'} element={<CartWidget/>}/>
        <Route path={'*'} element={<Error/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
