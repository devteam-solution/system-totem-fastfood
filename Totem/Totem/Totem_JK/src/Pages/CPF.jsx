import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./CPF.css";

export default function CPF() {
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();

    function formatarCPF(valor) {
        valor = valor.replace(/\D/g, "");

        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        return valor;
    }

    function handleChange(e) {
        setCpf(formatarCPF(e.target.value));
    }

    function confirmar() {
        if (cpf.length >= 11) {
            localStorage.setItem("cpf", cpf);
        }

        navigate("/menu");
    }

    function pular() {
        localStorage.removeItem("cpf");
        navigate("/menu");
    }

    return (
        <motion.div
            className="cpf-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="cpf-container">
                <h1>GANHE PONTOS</h1>

                <p>
                    Digite seu CPF e participe do nosso programa de fidelidade.
                    <span className="highlight">Acumule pontos a cada pedido</span>
                    <span className="optional">(opcional)</span>
                </p>

                <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={handleChange}
                    maxLength={14}
                />

                <div className="buttons">
                    <button className="confirmar" onClick={confirmar}>
                        CONFIRMAR
                    </button>

                    <button className="pular" onClick={pular}>
                        PULAR
                    </button>
                </div>
            </div>
        </motion.div>
    );
}