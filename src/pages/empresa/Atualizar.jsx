import { Link, useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

export const Atualizar = () => {
    const { id } = useParams(); // Obtendo o id da URL usando o hook useParams()

    const [formData, setFormData] = useState({
        nome: '',
        endereco: '',
        telefone: ''
    });
    const [error, setError] = useState('');
    const history=useNavigate()

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/empresa/${id}`);
                const empresa = response.data;
                setFormData({
                    nome: empresa.nome,
                    endereco: empresa.endereco,
                    telefone: empresa.telefone
                });
            } catch (error) {
                console.error('Erro ao buscar empresa:', error);
            }
        };
        
        fetchEmpresa();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        if (!formData.nome || !formData.endereco || !formData.telefone) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const dataToSend = queryString.stringify(formData);
            await axios.put(`http://127.0.0.1:8000/api/empresa/${id}`, dataToSend, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log('Empresa atualizada com sucesso.');
 history('/empresa');
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error);
            setError('Erro ao atualizar empresa. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/empresa/cadastrar">Cadastrar</Link>
            </nav>
            <h1>Atualizar Empresa</h1>
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
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
};
