import "./cards.scss";
import Card from '../card/Card';

const Cards = ({ cardData }) => {
  return (
    <div className='cards'>
        {cardData.map((item, index) => {
            return (
                <div className='parentContainer'>
                    <Card
                        title={item.title}
                        color={item.color}
                        value={item.value}
                        Png={item.png}
                    />
                </div>
            )
        })
        }
    </div>
  )
}

export default Cards;