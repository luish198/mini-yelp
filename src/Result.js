import React from 'react';
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';

function Result (props) {
if(props.restaurant){
    return(
        <li className="contentRow" key="restaurant1">
            <div className="restaurantImg">
                <img src={`${props.restaurant.picture}`} />
            </div>
            
            <div className="restaurantInfo">
                <NavLink 
                    className="title"
                    to={`/${props.restaurant.id}`}
                >
                <h3> {props.restaurant.name} </h3>
                </NavLink>
                <p className="cuisine">Phone: {props.restaurant.phone} </p>
            </div>
        </li>
    )}else {
        return "loading..."
    }
}

export default Result