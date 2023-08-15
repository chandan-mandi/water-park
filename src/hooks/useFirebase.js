import axios from "axios";
import { getAuth, getIdToken, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import initializeFirebase from '../pages/Login/firebase/firebase.init';
initializeFirebase();

const useFirebase = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false)

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    /* const registerUser = (email, password, name, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name };
                setUser(newUser);
                const photoURL = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                saveUser(email, name, photoURL, 'POST');
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                navigate('/');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    } */
    const registerUser = (email, password, name, navigate) => {
        setIsLoading(true);
        const photoURL = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
        axios.post('http://localhost:5050/signUp', { email, password, name, photoURL })
            .then(data => {
                setIsLoading(false)
                if (data.data.insertedId) {
                    console.log('user created');
                    swal("Sign Up Successfully!", "You can Login Now!", "success")
                        .then(proceed => {
                            if (proceed) {
                                navigate("/login")
                            }
                        })

                }
            })
    }

    /*  const loginUser = (email, password, location, navigate) => {
         setIsLoading(true);
         signInWithEmailAndPassword(auth, email, password)
             .then((userCredential) => {
                 const destination = location?.state?.from || '/';
                 navigate(destination);
                 setAuthError('');
             })
             .catch((error) => {
                 setAuthError(error.message);
             })
             .finally(() => setIsLoading(false));
     } */

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true)
        axios.post("http://localhost:5050/login", { email, password })
            .then(data => {
                setIsLoading(false)
                console.log(data);
                if (data.data.email) {
                    localStorage.setItem('login', JSON.stringify(data.data))
                    const getLoginDetails = localStorage.getItem('login')
                    setUser(JSON.parse(getLoginDetails))
                    console.log(data.data);
                    setAuthError('');
                    swal("Login Successful!", "Welcome to Water Kingdom!", "success")
                        .then(proceed => {
                            if (proceed) {
                                const destination = location?.state?.from || '/';
                                navigate(destination);
                            }
                        })
                } else {
                    swal("Message", `${data.data.message}`, "info")
                }
                // window.location.reload(false)
            })
    }
    const signInWithGoogle = (location, navigate) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, user.photoURL, 'PUT');
                setAuthError('');
                const destination = location?.state?.from || '/';
                navigate(destination);
            }).catch((error) => {
                setAuthError(error.message);
            }).finally(() => setIsLoading(false));
    }
    useEffect(() => {
        const getLoginDetails = localStorage.getItem('login');
        if (getLoginDetails) {
            setUser(JSON.parse(getLoginDetails));
            setIsLoading(false)
        }
        else {
            setUser({})
        }
        setIsLoading(false)
    }, [])

    //Observe user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                .then(idToken => localStorage.setItem('idToken', idToken))
                localStorage.setItem('login', JSON.stringify(user))
                    const getLoginDetails = localStorage.getItem('login')
                    setUser(JSON.parse(getLoginDetails))
                console.log('google', user);
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])

    // admin checking
    useEffect(() => {
        fetch(`http://localhost:5050/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])

    const logOut = () => {
        setIsLoading(true);
        localStorage.removeItem('login')
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, photoURL, method) => {
        const user = { email, displayName, photoURL };
        fetch('http://localhost:5050/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        isLoading,
        user,
        registerUser,
        logOut,
        loginUser,
        authError,
        signInWithGoogle,
        admin
    }
}

export default useFirebase;