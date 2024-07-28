import "./card.scss";
import { Link } from "react-router-dom";

function Card({item}) {
  return (
    <div className='card'>
      <h2 className="title">
        <Link to={`/${item.id}`}>{item.name}</Link>
      </h2>
      <p className="info">
        <img src="/desc.png" alt="" />
        <span>{item.description}</span>
      </p>
      <p className="price">
        $ {item.price}
      </p>
      <div className="bottom">
        <div className="features">
          <div className="feature">
            <img src="/code.png" alt="" />
            <span>{item.code}</span>
          </div>
          <div className="feature">
            <img src="/star.png" alt="" />
            <span>{item.credits} credits</span>
          </div>
        </div>
        <div className="icon">
            <img src="/save.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Card;