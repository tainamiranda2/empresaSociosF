
import { Link } from "react-router-dom";
import home from '../home.png'
export const Home=()=>{
    return(

        <div>
            <nav>
            <Link  to="/">Home</Link>
            <Link to="/socios">Socios</Link>
            <Link to="/empresa">Empresa</Link>

            </nav>
<img src={home}/>
        </div>
        
    )
}