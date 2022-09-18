import MenuLayout from './component/MenuLayout'
import Login from './pages/Login';
import {loginState} from "./services/index"

function App() {
  if (loginState())
  {
    return <MenuLayout/>

  }
  else 
  {
    return <Login/>
    
  }
}

export default App;
