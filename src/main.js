
// Import axios
import axios from "axios";
// Create Async function Get endpoint from REST Countries API so we can load all the data.

async function fetchCountryData() {
  // Return a Promise
  try {
    const response = await axios.get('https://restcountries.com/v2/all?fields=name,region,flag,population,currencies,subregion,languages');
    const countries = response.data;
    console.table(countries);
    return countries;
    
        
  } catch(e) {
    // Add error message so that the user will be informed when the API-server is not responding
    console.error(e);
  }
  
}

// Create a function to sort the data on population from low to high. With the array sort(). I had to use the .then() method to call the Promise object from the async function. 
function sortDataPopulation() { 

  return fetchCountryData().then(countryArray => {
    // console.log(countryArray);
    countryArray.sort((a, b) => {
      return a.population - b.population 
    });
    // console.table(countryArray);
    return countryArray;
  });
  
}

function contentData() {
 
  return sortDataPopulation().then((sortedArray) => {
    // Used the map() method to get thrue the array and list the data on the webpage.
    const contentData = sortedArray.map((country) => {

      // console.log(country);
      
      
      return `
      
      <div class=placeholder-country>
        <div class="country-info">
        <span class='flag-country'><img src="${country.flag}" alt="This a flag of the country ${country.name}" /></span>
        <span class="${country.region}"><h4>${country.name}</h4></span>
        </div>
          <div class="country-specs">
            <img class="icon-pop" src="./population-bank.png" alt="population" />
            <p>Has a population of <strong>${country.population} people</strong></p>
          </div>
      </div>      
            
      `;
  

    });

    // console.log(contentData);
    // This is where the content from the array is placed inside the container .content-map-countries
    const listing = document.querySelector(".content-map-countries");
    listing.innerHTML = contentData.join("");
    

  });

 

}

contentData();

function regionColorizer() {

  return sortDataPopulation().then((sortedArray) => {

    const colorClasses = sortedArray.map((list) => {
      // console.log(list.region);
      const listSelector = list.region;
      let colorClass;
      
      const regions = document.getElementsByClassName(listSelector);
      for (let i = 0; i < regions.length; i++) {
        const region = regions[i];
        if (listSelector === 'Africa') {
          region.classList.add("region-africa");
        } 
        else if (listSelector === 'Americas') {
          region.classList.add("region-americas");
        } 
        else if (listSelector === 'Asia') {
          region.classList.add("region-asia");
        } 
        else if (listSelector === 'Europe') {
          region.classList.add("region-europe");
        } 
        else if (listSelector === 'Oceania') {
          region.classList.add("region-oceania");
        } 
        else {
          region.classList.add("region-global");
        }
        colorClass = region;
      }

      // console.log(colorClass);
      return colorClass;
    });

    // console.log(colorClasses);
    return colorClasses;
  });
}

regionColorizer();
