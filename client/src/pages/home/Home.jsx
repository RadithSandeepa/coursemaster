import SearchBar from "../../components/searchBar/SearchBar";
import "./home.scss";
import { useSpring, animated } from "react-spring";
import Lottie from 'lottie-react';
import animationData from "../../assets/Animation.json";

function Number({ n }) {
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 200,
        config: {mass: 1, tension: 20, friction: 10},
    });
    return <animated.span>{number.to(n => n.toFixed(0))}</animated.span>
}

function Home() {
  return (
    <div className="homePage">
        <div className="textContainer">
            <div className="wrapper">
                <h1 className="title">Unlock Your Academic Journey!</h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid harum,
                     ab unde cum dolor a error veniam, blanditiis, repellat mollitia iste. 
                    Quidem ab repudiandae sapiente doloribus culpa facere adipisci iusto!
                </p>
                <SearchBar />
                <div className="boxes">
                    <div className="box">
                        <h1><Number n={16} />+</h1>
                        <h2>Years of Experience</h2>
                    </div>
                    <div className="box">
                        <h1><Number n={200} /></h1>
                        <h2>Award Granted</h2>
                    </div>
                    <div className="box">
                        <h1><Number n={2000} />+</h1>
                        <h2>Courses Ready</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="imgContainer">
            {/* <img src="/bg.png" alt="" /> */}
            <Lottie  className="lottie" animationData={animationData} />
        </div>
    </div>
  )
}

export default Home
