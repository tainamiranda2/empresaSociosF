import { Link, useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

export const AtualizarSocios = () => {
    const { id } = useParams(); // Obtendo o id da URL usando o hook useParams()

    const [formData, setFormData] = useState({
        nome: '',
        endereco: '',
        telfone: '',
        empresa_id: 1
    });
    const [error, setError] = useState('');
    const history=useNavigate()

    useEffect(() => {
        const fetchsocio = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/socio/${id}`);
                const socio = response.data;
                setFormData({
                    nome: socio.nome,
                    endereco: socio.endereco,
                    telfone: socio.telfone
                });
            } catch (error) {
                console.error('Erro ao buscar socio:', error);
            }
        };
        
        fetchsocio();
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
        if (!formData.nome || !formData.endereco || !formData.telfone) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const dataToSend = queryString.stringify(formData);
            await axios.put(`http://127.0.0.1:8000/api/socio/${id}`, dataToSend, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log('socio atualizada com sucesso.');
 history('/socios');
        } catch (error) {
            console.error('Erro ao atualizar socio:', error);
            setError('Erro ao atualizar socio. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/socio/cadastrar">Cadastrar</Link>
            </nav>
            <h1>Atualizar socio</h1>
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
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
};
