import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './Login.css';
import mail_icon from '../Assets/mail.png';
import key_icon from '../Assets/key.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        // Se valida que ningun campo se quede vacío
        if (!email || !password) {
            setError('Todos los campos son obligatorios');
            return false;
        }

        // Validar el formato de correo electrónico utilizando una expresión regular
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailPattern.test(email)) {
            setError('El correo es inválido');
            return false;
        }

        // Validar la contraseña
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordPattern.test(password)) {
            setError('La contraseña debe tener al menos 6 caracteres, una letra mayúscula y un número');
            return false;
        }

        setError('');
        return true;
    };

    const handleLogin = () => {
        if (validateForm()) {
            navigate('/crud');
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={mail_icon} alt=''></img>
                    <input
                        type="email"
                        placeholder='E-Mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={key_icon} alt=''></img>
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div className="submit-container">
                <button className='btn submit' onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
