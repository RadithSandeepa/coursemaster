import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import { listData } from "../../lib/dummyData";
import "./list.scss";
import Lottie from 'lottie-react';
import animationData from "../../assets/BookAnimation.json";

function List() {

  const data = listData;

  return (
    <div className='list'>
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {data && data.map(item => (
            <Card key={item.code} item={item}/>
          ))}
        </div>
      </div>
      <div className="imgContainer">
        <Lottie animationData={animationData} />
      </div>
    </div>
  )
}

export default List