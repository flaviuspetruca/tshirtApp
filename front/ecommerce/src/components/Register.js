import React, { useState } from 'react';
import { Redirect , useHistory} from 'react-router-dom';

const Register = (isLogged) => {
    const history = useHistory();
    let classDMatch = "text-secondary d-none";
    let classLength = "text-secondary d-none";
    let classPass = "form-control rounded-pill border-0 shadow-sm px-4";
    
    function handleSubmit(event) {
        event.preventDefault();
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    
    if(password != repassword)
        classPass = "form-control rounded-pill border-0 shadow-sm px-4 text-danger"
    else
        classPass = "form-control rounded-pill border-0 shadow-sm px-4 text-secondary"

    const verifyLength = () => {
        if(password.length < 6 && password != '')
            classLength = "text-secondary d-block";
        else
            classLength = "text-secondary d-none";
        return classLength;
    }

    const verifyPass = () => {
        if(password != repassword)
            classDMatch = "text-secondary d-block";
        else
            classDMatch = "text-secondary d-none";
        return classDMatch;
    }

    classLength = verifyLength();
    classDMatch = verifyPass();

    const s = async () => {
        if(classDMatch == "text-secondary d-block" || classLength == "text-secondary d-block" )
            return;

        const info = {
            name: name,
            email: email,
            password: password
        }
        const data = await fetch(
            'http://localhost:3000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });
        if(data.status == 200)
            history.push("/signin");
            
    }

    return(
        <div className="container">
            {isLogged.isLogged? <Redirect to="/"/>:
            <div className="row articol">
                <div className="col-sm-6 justify-content-center login">
                    <h3 className="display-4">Register</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                            <input id="inputName" type="name" onChange={e => setName(e.target.value)} placeholder="Name" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4"/>
                        </div>
                        <div className="form-group mb-3">
                            <input id="inputEmail" type="email" onChange={e => setEmail(e.target.value)} placeholder="Email address" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4"/>
                        </div>
                        <div className="form-group mb-3">
                            <input id="inputPassword" type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-secondary"/>
                        </div>
                        <div className="form-group mb-3">
                            <input id="inputPassword" type="password" onChange={e => setRePassword(e.target.value)} placeholder="Re-Type Password" required="" className={classPass}/>
                        </div>
                        <h6 className={classDMatch}>Passwords don't match!</h6>
                        <h6 className={classLength}>Passwords must be at least 6 characters long!</h6>
                        <button onClick={s} className="btn btn-primary btn-block text-uppercase rounded-pill shadow-sm">Register</button>
                    </form>
                </div>
            </div>
    }</div>
    )
};

export default Register;