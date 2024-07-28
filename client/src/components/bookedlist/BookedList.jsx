import "./bookedlist.scss";
import Card from "../card/Card";
import { listData } from "../../lib/dummyData";

function BookedList() {
  return (
    <div className='bookedlist'>
        {listData.map((item) => (
            <Card item={item} key={item.id} />
        ))}
    </div>
  )
}

export default BookedList;