import './App.css';
import React, {useState, useEffect} from "react";
import Main from "./Main";
import Map from "./Map";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Restaurant from "./Restaurant";

function App() {

  const [restaurants, setRestaurants] = useState(
    ""
  );

  const [locationData, setLocationData] = useState("")
  const [cuisine, setCuisine] = useState([]);
  const [city, setCity] = useState([]);
  const [loadingIp, setLoadingIp] = useState(true);
  const [error, setError] = useState(false)


const [selectedCity, setSelectedCity] = useState("0");
const [selectedCuisine, setSelectedCuisine] = useState("0");

  const getData = async () => {
    let jsonResponse = []
    try {
      const queryString = "?city=" + selectedCity + "&cuisine=" + selectedCuisine

      console.log("Luis console here...")
      console.log(typeof(selectedCity))
      console.log(selectedCuisine)


      //added by LH

      let response="";


      if((selectedCity!=="0") && (selectedCuisine!=="0") ) {
        console.log("luis is wokring  both")
        response = await fetch(`https://mini-yelp-backend-luish.herokuapp.com/filters/${queryString}`, { cache: 'no-cache' })
      } else if((selectedCity!=="0")&&(selectedCuisine==="0" )){
        response = await fetch(`https://mini-yelp-backend-luish.herokuapp.com/restaurants/cities/${selectedCity}`, { cache: 'no-cache' })
      }else if((selectedCity==="0")&&(selectedCuisine!=="0")){
        response = await fetch(`https://mini-yelp-backend-luish.herokuapp.com/restaurants/cuisine/${selectedCuisine}`, { cache: 'no-cache' })
      }else{
        response = await fetch(`https://mini-yelp-backend-luish.herokuapp.com/restaurants/`, { cache: 'no-cache' })
      }

      // End of addition 


      //let response = await fetch(`http://mini-yelp-backend-luish.herokuapp.com/restaurants${queryString}`, { cache: 'no-cache' })
      //let response = await fetch(`http://localhost:3000/filters/${queryString}`, { cache: 'no-cache' })

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
    return jsonResponse
  }

  const getCities = async () => {
    let cities = []
    try {
      let response = await fetch(`https://mini-yelp-backend1.herokuapp.com/cities/`, { cache: 'no-cache' })
      if (response.ok) {
        cities = await response.json()
      }
    } catch (error) {
      cities.error = error.message
    }
    setCity(cities)
  }

  const getCuisines = async () => {
    let cuisines = [];
    try {
      let response = await fetch(`https://mini-yelp-backend1.herokuapp.com/cuisines/`, { cache: 'no-cache' })
      console.log("CUISINES");
      console.log(response);
      if (response.ok) {
        cuisines = await response.json()
      }
    } catch (error) {
      console.log(error);
      cuisines.error = error.message
    }
    setCuisine(cuisines)
  }

  const search = async () => {
    const currentSearch = await getData();
    console.log(currentSearch)
    console.log(currentSearch)
    setRestaurants(currentSearch)
  }

  const getIp = async () => {
    let ipUrl = "https://geo.ipify.org/api/v1?apiKey=";
    let ipApiKey = "at_VF7kJXfX3dBVqla8cpVBLGmfQO3cg";
    let currentIpInfo = {error: "unknown"};
    try {
      const response = await fetch(ipUrl + ipApiKey)
      if(response.ok) {
        currentIpInfo = await response.json()
      }else{
        return currentIpInfo
      }
    } catch(error) {
      currentIpInfo.error = error.message
    }
    return currentIpInfo
  }


const handleSelectChange = (selectName, newValue) => {
  if(selectName === "city"){
    setSelectedCity(newValue)
  }
  else if(selectName === "cuisine"){
    setSelectedCuisine(newValue)
  }
  getData()
}

  useEffect(() => {
    async function getLoc() {
      setLocationData(await getIp());
      setLoadingIp(false);
      getCities();
      getCuisines();
      }
    
      getLoc()

      search();
  }, []
  )

useEffect(
  () => {
  search()
  }, [selectedCity, selectedCuisine]
)


  let mapcomponent;
  if(loadingIp){
    mapcomponent = <div className="mapPlaceholder"></div>
  }else if(!loadingIp){
    mapcomponent = (
      <Map 
      getData={getData}
      query={restaurants} 
      cities={city}
      cuisine={cuisine}
      locationData={locationData}
      selectedCity={selectedCity}
      selectedCuisine={selectedCuisine}
      handleSelectChange={handleSelectChange}
      />
    )
  }

  return (
    <div className="App">
      {mapcomponent}
    <BrowserRouter>
      <Switch>
        <Route exact path="/" >
          <Main 
          restaurants={restaurants} 
          />
        </Route>
      
        <Route path="/:id" >
          <Restaurant />
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}
export default App;