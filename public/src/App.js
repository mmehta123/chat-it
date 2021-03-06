import Register from "./components/Register";
import Login from "./components/Login";
import Chat from "./components/Chat";
import {BrowserRouter,Routes,Route} from "react-router-dom" 
import SetAvatar from "./components/SetAvatar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route  path="register" element={<Register/>}/>
          <Route path="login" element={<Login />} />
          <Route path="setAvatar" element={<SetAvatar />} />
          <Route path="" element={<Chat />} />
        </Routes>
      </BrowserRouter>
      
      </div>
  );
}

export default App;
