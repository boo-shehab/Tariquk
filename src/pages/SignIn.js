import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase';
import Loading from "../components/Loading";

const USER_REGEX = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignIn = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setISLoading] = useState(true);

    useEffect(() => {
        userRef.current && userRef.current.focus();
        
        const lessen = onAuthStateChanged(auth, (userAuth) => {
            if(userAuth) {
                setAuthUser(userAuth);
                navigate('/')
                setISLoading(false);
            } else {
                setAuthUser(null);
                setISLoading(false);
                userRef.current && userRef.current.focus();
            }
        });

        return () => {
            lessen();
        };
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setISLoading(true);

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        signInWithEmailAndPassword(auth, user, pwd).then((userCredential) => {
            console.log(userCredential)
            setAuthUser(true)
            setUser('')
            setPwd('');
            setISLoading(false);
        }).catch((error) => {
            console.log(error)
        })
        console.log(user)
        console.log(pwd)
    }
    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('user signed out ');
            setAuthUser(null)
        })
    }

    return (
        <>
            {authUser ? (
                <section className="Registration">
                    <h1>Success!</h1>
                    <p>
                        <button onClick={userSignOut}> sign out</button>
                    </p>
                </section>
            ) : isLoading ? <Loading /> : (
                <section className="Registration">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sing in</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            The local part (before the '@' symbol) can contain letters, numbers, periods, and certain special characters.<br />
                            It may also include a quoted string enclosed in double quotes.<br />
                            The domain part (after the '@' symbol) should have a valid domain name, followed by a dot, and then the top-level domain (e.g., example.com).<br />
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <button disabled={!validName || !validPwd ? true : false}>Sign in</button>
                    </form>
                    <p>
                        Not registered befor?<br />
                        <span className="line">
                            <Link to='/signup'>Sign Up</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default SignIn