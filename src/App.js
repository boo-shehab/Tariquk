import { useEffect, useState } from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Loading from './components/Loading';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
function App() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [isLoading, setISLoading] = useState(true);
  useEffect(() => {
    
    const lessen = onAuthStateChanged(auth, (userAuth) => {
        if(userAuth) {
            setISLoading(false);
        } else {
          if(pathname !== '/singup' || pathname !== 'signin')
            navigate('/singup')
          setISLoading(false);
        }
    });

    return () => {
        lessen();
    };
}, []);

  return (
    <main className="App">
      {isLoading ? <Loading /> : 
        (
          <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/signin' element={<SignIn />}/>
          </Routes>
        )}
    </main>
      );
}

export default App;
