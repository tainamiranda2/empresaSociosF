import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';

export const CadastrarSocios = () => {
    const [formData, setFormData] = useState({
        nome: '',
        endereco: '',
        telfone: '',
        empresa_id: 1
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nome || !formData.endereco || !formData.telfone) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const dataToSend = queryString.stringify(formData);
            await axios.post('http://127.0.0.1:8000/api/socio', dataToSend, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log('socio cadastrada com sucesso.');
            // Limpar o formulário após o cadastro bem-sucedido
            setFormData({
                nome: '',
                endereco: '',
                telfone: '',
                empresa_id: 1
            });
            setError('');
        } catch (error) {
            console.error('Erro ao cadastrar socio:', error);
            setError('Erro ao cadastrar socio. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/socio/cadastrar">Cadastrar</Link>
            </nav>
            <h1>Cadastrar Nova socio</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="endereco">Endereço:</label>
                    <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="telfone">telfone:</label>
                    <input
                        type="text"
                        id="telfone"
                        name="telfone"
                        value={formData.telfone}
                        onChange={handleChange}
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};
