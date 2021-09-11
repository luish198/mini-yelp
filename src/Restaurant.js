import React, {useState} from 'react';
import SearchBar from "./SearchBar";
import {useParams} from "react-router-dom";
import { useEffect } from 'react/cjs/react.development';

function Restaurant (props) {

    let {id} = useParams()

const [restaurantData, setRestaurantData] = useState({})

    const getRestaurant = async () => {
        let jsonResponse = []
        try {
          let response = await fetch(`https://mini-yelp-backend1.herokuapp.com/restaurants/${id}`, { cache: 'no-cache' })
          console.log(response)
          if (response) {
            console.log("ARgh")
            console.log(jsonResponse)
            jsonResponse = await response.json()
          }
        } catch (error) {
          console.log(error);
          jsonResponse.error = error.message
        }
        setRestaurantData(...jsonResponse)
      };



      useEffect(() => {
        async function renderRestaurant() {
          await getRestaurant();
          }
          renderRestaurant()
      }, []

    )

    console.log("restaurantData")
    console.log(restaurantData)

    return(
        <div className="restaurantBody" key={`restaurantPage${restaurantData.id}`}>
            <div className="presentImg">
                <img src={`${restaurantData.picture}`} />        
            </div>

            <div className="restaurantText">
                <h2>{restaurantData.name}</h2>
                <div>Phone number: {restaurantData.phone}</div>
                <div>Website: <a target="_blank" href={`${restaurantData.website}`} >{restaurantData.website}</a></div>
            </div>
        </div>
    )
}

export default Restaurant