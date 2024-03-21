import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Socios } from './pages/socios/Socios'
import { Home } from './home/Home';
import { Empresa } from './pages/empresa/Empresa';
import { Cadastrar } from './pages/empresa/Cadastrar';
import { Atualizar } from './pages/empresa/Atualizar';
import { CadastrarSocios } from './pages/socios/CadastrarSocios';
import { AtualizarSocios } from './pages/socios/AtualizarSocios';


const Routas =()=>{
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>}/>

            <Route path="/socios" element={<Socios/>}/>
            <Route path="/socio/cadastrar" element={<CadastrarSocios/>}/>
            <Route path="/socio/atualizar/:id" element={<AtualizarSocios/>}/>

            <Route path="/empresa" element={<Empresa/>}/>
            <Route path="/empresa/cadastrar" element={<Cadastrar/>}/>
            <Route path="/empresa/atualizar/:id" element={<Atualizar/>}/>

        </Routes>
        </BrowserRouter>
    )
}
export default Routas;