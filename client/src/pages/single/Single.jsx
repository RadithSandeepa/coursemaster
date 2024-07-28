import "./single.scss";
import { singleData } from "../../lib/dummyData";
import Lottie from 'lottie-react';
import animationData from "../../assets/Education.json";


function Single() {
  return (
    <div className="single">
        <div className="details">
          <div className="wrapper">
              <div className="header">
                <div className="post">
                  <h1>{singleData.courseName}</h1>
                  <div className="duration">
                    <img src="/clock.png" alt="" />
                    <span>duration - {singleData.duration}</span>
                  </div>
                  <div className="price">
                      $ {singleData.price}
                  </div>
                </div>
                <div className="faculty">
                  <p className="title">{singleData.facultyMemberName}</p>
                  <span>{singleData.facultyId}</span>
                </div>
              </div>
              <div className="bottom">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quidem voluptatem ipsa reprehenderit. Enim, 
                excepturi est quas saepe doloremque aspernatur deserunt eius commodi molestias minus labore error quaerat 
                debitis. Illum labore maiores quam illo accusamus explicabo. Mollitia maxime, voluptas ea eligendi ut asperiores 
                fuga aut perspiciatis placeat quia commodi, minima aliquam, at sequi architecto ullam reiciendis quidem nulla nesciunt. 
                Assumenda possimus voluptatibus, numquam, sint, facilis nam pariatur eum saepe nostrum quo at suscipit illo ab odio eius 
                facere reprehenderit. Ipsa officia autem quo vero atque! Quia neque ut nam officiis expedita, maxime, dolores consequuntur, 
                voluptates sapiente amet placeat quo iste.
              </div>
              <div className="footer">
                <button className="submit">Enroll</button>
              </div>
          </div>
        </div>
        <div className="features">
          <div className="wrapper">
            <Lottie animationData={animationData} />
          </div>
        </div>
    </div>
  )
}

export default Single;