import React, {useState} from 'react';

function SearchBar (props) {
    console.log("searchprops")
    console.log(props)
    return(
        <header className="App-header">
            <div>
            <h1 className="headTitle">Mini-Yelp</h1>
            </div>
            <div className="searchfilters">
                <div className="filterSelect">
                    <label>City</label>
                    <select 
                    onChange={(event) => props.handleSelectChange("city",event.target.value)} 
                    value={props.selectedCity} name="cities" id="citiesSelect" className="inputField">
                        <option value={0}>Anywhere</option>
                        {props.cities.map((city) => {
                        return (<option value={city.name} >{city.name}</option>)
                        })}
                    </select>
                </div>

                
                <div className="filterSelect">
                    <label>Cuisine</label>
                    <select onChange={(event) => props.handleSelectChange("cuisine",event.target.value)} value={props.selectedCuisine} name="cities" id="cuisineSelect" className="inputField">
                        <option value={0}>All</option>
                        {props.cuisine.map((cuisine) => {
                            return (<option value={cuisine.name} >{cuisine.name}</option>)
                        })}
                    </select>
                </div>

            </div>
        </header>
    )
}

export default SearchBar