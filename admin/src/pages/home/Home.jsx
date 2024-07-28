import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Cards from "../../components/cards/Cards";
import { cardData, cardData2 } from '../../data/data';


const Home = () => {
  return (
    <div className="home">
        <Sidebar />
        <div className="right">
            <Navbar />
            <div className="content">
             <h1>Dashboard</h1>
             <Cards cardData={cardData}/>
             <Cards cardData={cardData2}/>
            </div>
            
        </div>
    </div>
  )
}

export default Home