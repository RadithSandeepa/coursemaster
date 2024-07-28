import useFetch from "../../hooks/useFetch";
import "./card.scss"
import { useSpring, animated } from "react-spring";

function Number({ n }) {

  const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: {mass: 1, tension: 20, friction: 10},
  });
  return <animated.span>{number.to(n => n.toFixed(0))}</animated.span>
}

const Card = (props) => {
  const { data } = useFetch("/auth/count");

  const {Png, title} = props;
  let count = 0;

  if (data) {
    switch (title) {
      case "Courses":
        count = data.courseCount;
        break;
      case "Students":
        count = data.studentCount;
        break;
      case "Faculty":
        count = data.facultyCount;
        break;
      case "Rooms":
        count = data.roomCount;
        break;
      case "Resources":
        count = data.resourceCount;
        break;
      case "Enrollments":
        count = data.enrollmentCount;
        break;
      default:
        count = 0;
    }
  }

  return (
    <div className="card" style={{
        background: props.color.backGround,
        boxShadow: props.color.boxShadow
    }}>
        <div className="left">
         <p><Number n={count} /></p>
         <h2>{props.title}</h2>
        </div>
        <div className="right">
            <Png size="33"/>

        </div>
    </div>
  )
}

export default Card;