import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import IconPerson from './Icon_Person.svg';
import JSEncrypt from 'jsencrypt';
import { AuthContext } from '../../componentes/segurança/JWT/AuthContext';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo2cBt7RB3MxbS2W7I80c
apVubGlB+XYaWl0lc9AHHJHMVpJd6ZKfkwMSU+M8pz8bsVQ5QM/7haNBpHKeN6Wk
wIMaER4evtWiEjHwH4NW6wt1TOShFbNnvLZcZyLqsJ9BaYj96oLOUDb5yV5XJEJU
HzqtWWBZxkWczOjRu8QKE2F5weNbSE5T19+ebZBubKIm03/IOOLaDzXw4DyzN1Eh
00sfMpqe50RqEhH6LpWgp4zpo2o430WE2Mh9X4vJN6K9t640BCT6doLzxTn7LyFZ
+bOlN7/hlqBLRbHYYbhOGrZOc2SCh63YixMfxtbE24ZIxzQuZXdJa8oGb+AO0onW
zQIDAQAB
-----END PUBLIC KEY-----`;

    const isEdge = () => /Edge/.test(navigator.userAgent);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setPasswordError('');
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const maxLength = 50;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength || password.length > maxLength) {
            return `A senha deve ter entre ${minLength} e ${maxLength} caracteres.`;
        }
        if (!hasUpperCase) {
            return 'A senha deve conter pelo menos uma letra maiúscula.';
        }
        if (!hasNumber) {
            return 'A senha deve conter pelo menos um número.';
        }
        if (!hasSymbol) {
            return 'A senha deve conter pelo menos um símbolo.';
        }
        return '';
    };

    const encryptData = (data) => {
        const encryptor = new JSEncrypt();
        encryptor.setPublicKey(publicKey);
        return encryptor.encrypt(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const error = validatePassword(password);

        if (error) {
            setPasswordError(error);
            return;
        }

        const encryptedUsername = encryptData(username);
        const encryptedPassword = encryptData(password);
        let payload;

        if (isLogin) {
            payload = {
                usuario: encryptedUsername,
                senha: encryptedPassword,
            };
        } else {
            payload = {
                nome: name,
                usuario: encryptedUsername,
                senha: encryptedPassword,
            };
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/auth/${isLogin ? 'login' : 'cadastro'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();

                if (isLogin) {
                    const token = data.token;
                    const nomeUsuario = data.user.nome;

                    if (token) {
                        login(token, nomeUsuario);
                        navigate('/dashboard');
                    }
                } else {
                    // Após o cadastro, faça login imediatamente
                    const loginPayload = {
                        usuario: encryptedUsername,
                        senha: encryptedPassword,
                    };

                    const loginResponse = await fetch(`http://127.0.0.1:5000/api/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                        },
                        body: JSON.stringify(loginPayload),
                    });

                    if (loginResponse.ok) {
                        const loginData = await loginResponse.json();
                        const token = loginData.token;
                        const nomeUsuario = loginData.user.nome;

                        if (token) {
                            login(token, nomeUsuario);
                            navigate('/dashboard');
                        }
                    } else {
                        console.error("Falha no login após cadastro:", await loginResponse.text());
                    }
                }
            } else {
                console.error(isLogin ? "Falha no login:" : "Falha no cadastro:", await response.text());
            }
        } catch (error) {
            console.error("Erro ao comunicar com o servidor:", error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>
                    <img src={IconPerson} alt="Ícone de Login" className="icon" />
                </h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group_Login">
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Digite seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={!isLogin}
                            />
                        </div>
                    )}
                    <div className="input-group_Login">
                        <label htmlFor="username">Usuário</label>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input
                                type="text"
                                id="username"
                                placeholder="Digite seu usuário"
                                required
                            />
                        </div>
                    </div>
                    <div className="input-group_Login">
                        <label htmlFor="password">Senha</label>
                        <div className="password-input">
                            <div className="input-with-icon">
                                <FontAwesomeIcon icon={faLock} className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Digite sua senha"
                                    required
                                    className={passwordError ? 'error' : ''}
                                    autoComplete="new-password"
                                    style={{ width: '100%', paddingRight: '30px' }} // Mantém o padding
                                />
                                {!isEdge() && (
                                    <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                )}
                            </div>
                            {passwordError && <span className="error-message">{passwordError}</span>}
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="auth-button color-button-green">
                            {isLogin ? 'Entrar' : 'Cadastrar'}
                        </button>
                        {isLogin && (
                            <button type="button" className="auth-button color-button-red" onClick={toggleForm}>
                                Cadastrar
                            </button>
                        )}
                        {!isLogin && (
                            <button type="button" className="auth-button color-button-red" onClick={toggleForm}>
                                Voltar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
