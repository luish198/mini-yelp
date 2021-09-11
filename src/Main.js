import React, { useState } from 'react';
import Result from "./Result";

function Main(props) {

console.log("Mainprops")
console.log(props.restaurants)
if(props.restaurants){
  return (
    <main>
      <ul className="content">
        {props.restaurants.map((result) => {
          return (
          <Result
          restaurant={result}
          />
          )})}
        <Result />
      </ul>
    </main>
  );
} else{
  return <div>"loading..."</div>
}
}

export default Main;