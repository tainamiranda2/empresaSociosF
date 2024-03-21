import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

export const Empresa = () => {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/empresa');
                setEmpresas(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar empresas:', error);
            }
        };

        fetchData();
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/empresa/${id}`);
            setEmpresas(empresas.filter(empresa => empresa.id !== id));
            console.log(`Empresa com ID ${id} excluída com sucesso.`);
        } catch (error) {
            console.error(`Erro ao excluir empresa com ID ${id}:`, error);
        }
    };
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/empresa/cadastrar">Cadastrar</Link>
            </nav>
           {empresas===0 ? (
<>
<h1>Não há empresa cadastradas.</h1>
</>
           ):(
<>
<h1>Todas empresa cadastradas.</h1>
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
          {empresas.map(empresa => (
            <tr key={empresa.id}>
              <td>{empresa.id}</td>
              <td>{empresa.nome}</td>
              <td>{empresa.endereco}</td>
              <td>{empresa.telefone}</td>
              <button  onClick={() => handleDelete(empresa.id)} >
                    Excluir
                      </button>
                      <Link className="enviarAoAdm" 
                    to={`/empresa/atualizar/${empresa.id}`}>
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
