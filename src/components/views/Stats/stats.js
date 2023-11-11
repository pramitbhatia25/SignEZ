import './index.css';
import Header from "../../shared/Header/header";
import "react-toggle/style.css";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import itemsData from '../../../store.json'; // Assuming store.json is in the same directory as this file
import ClockLoader from "react-spinners/ClockLoader";

Chart.register(...registerables);


function Stats(props) {

  function Card(props) {
    return <div className='stat_card'>
      <div className='stat_num'>
        {props.num}
      </div>
      <div className='stat_text'>
        {props.text}
      </div>
    </div>
  }

  function ImageCard({ name, image }) {
    const handleDownload = (event) => {
      event.preventDefault(); // Prevent the default anchor link behavior
      const link = document.createElement('a');
      link.href = image; // Set the image URL
      link.download = `${name}.jpg`; // Set the filename for the downloaded image
      link.click();
    };
    return (
      <div className="image_card">
        <img src={image} alt={name} className="image_img" />
        <div className="image_name">{name}</div>
        <a href="" download={`${name}.jpg`} className="image_link" onClick={handleDownload}>
          <button className="image_link">Download</button>
        </a>
      </div>
    );
  }

  const card_data = [
    { 'text': "points available", 'num': props.user.points.toString() },
    { 'text': "minutes spent today", 'num': "15" },
    { 'text': "signing accuracy", 'num': "60%" },
  ]

  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Points History',
        data: [500, 200, 350, 400, props.user.points],
        fill: true,
        backgroundColor: 'aqua', // Aqua background color
        borderColor: 'rgba(0, 128, 128, 1)', // Aqua line color
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Points',
          color: 'aqua', // Aqua label color
        },
        ticks: {
          color: 'aqua', // Aqua label color
        }
      },
      x: {
        title: {
          display: true,
          text: 'Day',
          color: 'aqua', // Aqua label color
        },
        ticks: {
          color: 'aqua', // Aqua label color
        }
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'aqua', // Black legend text color
        },
      },
    },
  };


  const [items, setItems] = useState(itemsData);
  const [userImages, setUserImages] = useState([]); // State to store user's images
  let [filteredItems, setFilteredImages] = useState([])
  const [loading, setLoading] = useState(true)

  // useEffect(() => {

  // }, [props.user.images])

  useEffect(() => {
    console.log(loading)
    if (props.user && props.user.images && props.user.images.length > 0) {
      setUserImages(props.user.images);
      setFilteredImages(items.filter((item) => userImages.includes(item.name)));
      setLoading(false)
    }
  }, [props.user.images])


  return (
    <div className="trypage">
      <Header setSignedIn={props.setSignedIn} signedIn={props.signedIn} openLogIn={props.openLogIn} closeLogIn={props.closeLogIn} openSignUp={props.openSignUp} closeSignUp={props.closeSignUp} />
      <div className="stat_page">
        <div className="part1">
          <div className="part_title p1_title">
            Hey, {props.user.name}, here's your daily points stats:
          </div>
          <div className="part1_info">
            You have {props.user.points} points available.
          </div>
          <div className='part_content p1_content'>
            <Line data={data} options={options} />
          </div>
        </div>
        <div className="part2">
          <div className="part_title p2_title">
            More Stats
          </div>
          <div className='part_content p2_content'>
            {card_data.map((card, index) => (
              <Card key={index} num={card.num} text={card.text} />
            ))}
          </div>
        </div>
        <div className="part3">
          <div className="part_title p3_title">
            My Rewards
          </div>
          <div className='part_content p3_content'>
            { loading ?
              <>

                <ClockLoader
                  color={"white"}
                  size={'50px'}
                  className='clock'
                />Loading...
  
              </>:
              filteredItems.map((item, index) => (
              <ImageCard key={index} name={item.name} image={item.image} pointsRequired={item.pointsRequired} />
            ))
          }
          </div>
        </div>
      </div>
    </div>
  );

}

export default Stats;