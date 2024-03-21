import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

export const Socios = () => {
    const [socios, setSocios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/socio');
                setSocios(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar socios:', error);
            }
        };

        fetchData();
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/socio/${id}`);
            setSocios(socios.filter(socio => socio.id !== id));
            console.log(`socio com ID ${id} excluída com sucesso.`);
        } catch (error) {
            console.error(`Erro ao excluir socio com ID ${id}:`, error);
        }
    };
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/socio/cadastrar">Cadastrar</Link>
            </nav>
           {socios===0 ? (
<>
<h1>Não há socio cadastradas.</h1>
</>
           ):(
<>
<h1>Todas socio cadastradas.</h1>
<table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {socios.map(socio => (
            <tr key={socio.id}>
              <td>{socio.id}</td>
              <td>{socio.nome}</td>
              <td>{socio.endereco}</td>
              <td>{socio.telefone}</td>
              <button  onClick={() => handleDelete(socio.id)} >
                    Excluir
                      </button>
                      <Link className="enviarAoAdm" 
                    to={`/socio/atualizar/${socio.id}`}>
                      Atualizar
                      </Link>
            </tr>
          ))}
        </tbody>
      </table>
</>
           ) }
        </div>
    );
}
