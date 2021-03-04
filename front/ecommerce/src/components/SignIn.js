import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';

const SignIn = (isLogged) => {
    const history = useHistory();
    function handleSubmit(event) {
        event.preventDefault();
    }

    const [refresh, setRefresh] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAlert, setAlert] = useState(false);
    
    const s = async () => {
        const info = {
            email: email,
            password: password
        }
        const data = await fetch(
            'http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });
        if(data.status == 200){
            const resp = await data.json();
            localStorage.setItem('token', resp.token);
            console.log("logged in");
            setAlert(false);
        }
        else if(data.status == 400){
            setAlert(true);
        }
        setRefresh(refresh+1);
    }

    return(
        <div className="container">
            {isLogged == true? <Redirect to="/"/>:
            <div className="row articol">
                <div className="col-sm-6 justify-content-center login">
                    <h3 className="display-4">Login</h3>
                    <h6 className={isAlert? "text-primary" : "d-none"}>Email or password is wrong. Try again.</h6>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input id="inputEmail" type="email" onChange={e => setEmail(e.target.value)} placeholder="Email address" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4"/>
                        </div>
                        <div className="form-group mb-3">
                            <input id="inputPassword" type="password" suggested="current-password" onChange={e => setPassword(e.target.value)} placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"/>
                        </div>
                        <button onClick={s} className="btn btn-primary btn-block text-uppercase rounded-pill shadow-sm">Sign in</button>
                        <div className="redirectRegister"><Link to={"/register"}>Don't have an account?</Link></div>
                    </form>
                </div>
            </div>
        }
        </div>
    )
};

export default SignIn;