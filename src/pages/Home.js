import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate();
    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('user signed out ');
            navigate('/signup')
        })
    }
    return (
        <section className="Registration">
        <h1>Success!</h1>
        <p>
            <button onClick={userSignOut}> sign out</button>
        </p>
    </section>
    )
}

export default Home;
