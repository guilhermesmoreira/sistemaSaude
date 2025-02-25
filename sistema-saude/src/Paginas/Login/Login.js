import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Login.module.css";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    
    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            //Faz a requisição para o endpoint de login
            const response = await axios.post("http://localhost:5006/api/Auth/login", {
                email,
                senha,
            });
            console.log("Response Data:", response.data);

            //Extrai o token e a role da resposta
            const { token, role } = response.data;

            //Armazena o token no localStorage
            localStorage.setItem("token", token);

            // Redireciona o usuario com base na role
            if (role === 0) {  // Se a role for 1 (Administrador)
                navigate("/homeAdmin");
            } else if (role === 1) {  // Se a role for 2 (Desenvolvedor)
                navigate("/Home");
            } else if (role === 2) {  // Se a role for 3 (Gestor)
                navigate("/Usuarios");
            } else {
                setError("Categoria de usuário desconhecida.");
            }
        } catch (err) {
            //Exibe a mensagem de erro
            setError("Email ou senha inválidos.");
            console.error(err);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.logoContainer}>
                {/* <img className={style.logo} src={ForegroundImage} alt="Itera360" />                 */}
            </div>

            <div className={style.formContainer}>
                <form className={style.form} action="#" method="POST">
                    <div>
                        <label htmlFor="email" className={style.label}>
                            Email:
                        </label>
                        <div className={style.inputContainer}>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                autoComplete="email" 
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                className={style.input} />
                        </div>
                    </div>
                    <div>
                        <div className={style.senhaHeader}>
                            <label htmlFor="password" className={style.label}>
                                Senha:
                            </label>
                            <div className={style.forgotPassword}>
                                <a href="/esqueci-senha" className={style.forgotPasswordLink}>Esqueceu sua senha?</a>
                            </div>
                        </div>
                        <div className={style.inputContainer}>
                            <input 
                                type="password" 
                                name="password"
                                id="password" 
                                autoComplete="current-password" 
                                onChange={(e) => setSenha(e.target.value)}
                                required 
                                className={style.input} />
                        </div>
                    </div>
                    {error && <p className={style.error}>{error}</p>}
                    <div>
                        <button type="submit" className={style.button} onClick={handleLogin}>
                            Entrar
                        </button>
                    </div>
                </form>                
            </div>
        </div>
    );
};

export default Login;
