import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./EsqueciSenha.module.css";
import axios from "axios";
import saude from "../../assets/saude.png";

const EsqueciSenha = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const handleEsqueciSenha = async (e) => {
        e.preventDefault();

        try {
            // Faz a requisição para o endpoint de esqueci-senha
            const response = await axios.post("http://localhost:5006/api/Auth/esqueci-senha", {
                email,
            });

            console.log("Response Data:", response.data);

            // Exibe a mensagem de sucesso
            setSuccessMessage(response.data.message);
            setError(""); // Limpa a mensagem de erro se a recuperação for bem-sucedida

            // Aqui você pode redirecionar o usuário ou fazer outra ação, se necessário
            // Exemplo: navigate("/outra-pagina");
        } catch (err) {
            // Exibe a mensagem de erro se a requisição falhar
            setError("Erro ao enviar o e-mail de recuperação.");
            setSuccessMessage(""); // Limpa a mensagem de sucesso se houver erro
            console.error(err);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.logoContainer}>
                <img className={style.logo} src={saude} alt="saude" />   
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
                                className={style.input}
                            />
                        </div>
                    </div>
                    {/* Exibe a mensagem de erro */}
                    {error && <p className={style.error}>{error}</p>}

                    {/* Exibe a mensagem de sucesso */}
                    {successMessage && <p className={style.success}>{successMessage}</p>}

                    <div>
                        <button type="submit" className={style.button} onClick={handleEsqueciSenha}>
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EsqueciSenha;
