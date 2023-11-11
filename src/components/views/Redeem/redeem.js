import React, { useEffect } from "react";
import Header from "../../shared/Header/header";
import './index.css'
import { useState } from "react";
import { UPDATE_POINTS_API_URL, ADD_IMAGE_URL } from '../../../apiConfig'; // Import the API URL
import itemsData from '../../../store.json'; // Assuming store.json is in the same directory as this file

function Redeem(props) {

  function Card({ name, image, pointsRequired, onBuy }) {
    console.log(name)
    return (
      <div className="card">
        <img src={image} alt={name} className="card-image" />
        <div className="card-text">{name}</div>
        <div className="points-required">Points Required: {pointsRequired}</div>
        <div className="">
          <button onClick={() => onBuy(pointsRequired)} disabled={props.user.points < pointsRequired}>
            Buy
          </button>
        </div>
      </div>
    );
  }


  const [items, setItems] = useState(itemsData);

  async function handleBuy(pointsRequired, itemName) {
    if (props.user.points >= pointsRequired) {
      
      const newPoints = props.user.points - pointsRequired;
      props.user.points -= 1
      await updateUserPoints(newPoints);
      await addImageToUser(itemName);

      window.location.reload();
    }
  }

  useEffect(() => {

    const ownedImages = props.user.images;
    const filteredItems = items.filter((item) => !ownedImages.includes(item.name));
    setItems(filteredItems);
    }, [props.user.images]);


  async function updateUserPoints(newPoints) {
    try {
      const response = await fetch(UPDATE_POINTS_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: props.user.email,
          points: newPoints,
        }),
      });
      const data = await response.json();
      if (data.status === 'ok') {
        console.log('Points Updated');
      } else {
        console.error('Failed to update points');
      }
    } catch (error) {
      console.error('Error updating points:', error);
    }
  }

  async function addImageToUser(imageName) {
    try {
      const response = await fetch(ADD_IMAGE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: props.user.email,
          imageName: imageName,
        }),
      });
      const data = await response.json();
      if (data.status === 'ok') {
        console.log('Image Added to User');
      } else {
        console.error('Failed to add image to user');
      }
    } catch (error) {
      console.error('Error adding image to user:', error);
    }
  }

  return (
    <>
      <Header
        setSignedIn={props.setSignedIn}
        signedIn={props.signedIn}
        openLogIn={props.openLogIn}
        closeLogIn={props.closeLogIn}
        openSignUp={props.openSignUp}
        closeSignUp={props.closeSignUp}
      />
      <div className="store">
        <div className="points_total">
          {props.user.name}, you have {props.user.points} points left.
        </div>
        <div className="items">
          {items.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              image={item.image}
              pointsRequired={item.pointsRequired}
              onBuy={() => handleBuy(item.pointsRequired, item.name)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default Redeem;