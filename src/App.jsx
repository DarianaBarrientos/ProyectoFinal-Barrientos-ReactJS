import ItemListContainer from './Componentes/ItemListContainer/ItemListContainer'
import './App.css'
import NavBar from './Componentes/NavBar/NavBar'

function App() {
  return (
    <div>
      <NavBar/>
      <ItemListContainer greeting='Bienvenidos a KPOPIES!'/>
    </div>
  )
}

export default App
