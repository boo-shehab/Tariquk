import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/signin' element={<SignIn />}/>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
