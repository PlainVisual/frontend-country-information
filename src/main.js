
// Import axios
import axios from "axios";
// Create Async function Get endpoint from REST Countries API so we can load all the data.

// Create a variabele to store the array from the Async function outside the scope.
let countries = [];


fetchCountryData();

async function fetchCountryData() {
  // Return a Promise
  try {
    const response = await axios.get('https://restcountries.com/v2/all?fields=name,alpha2Code,region,capital,flag,population,currencies,subregion,languages');
    // Let variabele get updated with the array from axios.get
    countries = response.data;

    // Sort the data population
    sortDataPopulation(countries);
    // console.table(countries);
    // Display the data in the app
    contentData(countries);
    // console.table(countries);
    // Adds the class region so that this can have an specific color
    regionColorizer(countries);

    popupscreen(countries);



    
            
  } catch(e) {
      
    // Add error message so that the user will be informed when the API-server is not responding
    console.error(e);
    const errorMsg = document.querySelector('.error-msg')
    errorMsg.innerHTML = `<h3>----- No data was loaded -----</h3>`
    return errorMsg;

  }
  
}



// ------------ Search and Filter header -------------------------
// Searchbar with addeventlistener on input
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener('input', (e) => {

    e.preventDefault();
    const searchString = e.target.value;
    // console.log(e.target.value.length);
    filterSearch(countries, searchString);
  
  });

// The filter search with the arguments of searchstring and array
function filterSearch(countries, searchString) {
  const filteredCountries = countries.filter((country) => {
    // console.log(country.name);
    
    return country.name.toLowerCase().includes(searchString.toLowerCase()) || country.region.toLowerCase().includes(searchString.toLowerCase());
   
  });

  contentData(filteredCountries);
  regionColorizer(filteredCountries);
  popupscreen(filteredCountries);
  
}

// Radio buttons for the filter of the regions

const radioIds = [
  "region-all",
  "region-europe", 
  "region-asia", 
  "region-americas", 
  "region-africa", 
  "region-oceania",
];

for (let i = 0; i < radioIds.length; i++) {
  const radioBtn = document.getElementById(radioIds[i]);

  radioBtn.addEventListener('change', (e) => {
    e.preventDefault();
    const radioId = e.target.value;
    if (radioBtn.checked === true) {
      regionCheck(countries, radioId);
    } 
  });
}

function regionCheck(countries, radioId) {
    const filteredRegions = countries.filter((region) => {
      // console.log(country.name);
      if (region.region === radioId) {
        // console.log(radioId);
        return region.region.toLowerCase().includes(radioId.toLowerCase());
      } else if (radioId === "region-all")  {
       
        return countries;
      }     
  
    });
  
    contentData(filteredRegions);
    regionColorizer(filteredRegions);
    popupscreen(filteredRegions);
    
  }


// Create a function to sort the data on population from low to high. With the array sort().
function sortDataPopulation(population) { 

  //  console.log(population);
    population.sort((a, b) => {
      return a.population - b.population 
    });

          
}

// Used the map() method to get thrue the array and list the data on the webpage.
function contentData(sortedArray) {
     
    const contentData = sortedArray.map((country) => {

      // console.log(country);
      return `
      
      <article class="placeholder-country">
        <span id="${country.alpha2Code}" class="card__overlay"></span>
        <div class="country-info">
        <span class='flag-country'><img src="${country.flag}" alt="This a flag of the country ${country.name}" /></span>
        <span class="${country.region}"><h4>${country.name}</h4></span>
        </div>
          <div class="country-specs">
            <img class="icon-pop" src="./population-bank.png" alt="population" />
            <p>Has a population of <strong>${country.population} people</strong></p>
          </div>
      </article>
                 
      `;
  

    });

    // console.log(contentData);
    // This is where the content from the array is placed inside the container .content-map-countries
    const listing = document.querySelector(".content-map-countries");
    listing.innerHTML = contentData.join("");
        
}   

function regionColorizer(colorized) {

    colorized.map((list) => {
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

}

function popupscreen(countries) {
  countries.map((idInfo) => {
    const popup = document.getElementById(idInfo.alpha2Code);
    popup.addEventListener("click", () => {

      const searchResult = document.querySelector(".search-wrapper");
      searchResult.classList.add("open-popup");
      showInfo(idInfo);
    });
    
  });
 
}

const close = document.getElementById("close-btn");
close.addEventListener("click", () => {
  console.log("hallo");
  const searchResult = document.querySelector(".search-wrapper");
  searchResult.classList.remove("open-popup");
  
});

function showInfo(idInfo) {
  const infoBox = document.querySelector(".search-result-content");
  let infoText;
  if (idInfo.currencies && idInfo.capital !== undefined) {
    
    let currencyInfo;
        if (idInfo.currencies.length === 2) {
          currencyInfo = `
          and you can 💵 pay with ${idInfo.currencies[0].name} and ${idInfo.currencies[1].name}'s.
          `;
        } else {
          currencyInfo = 
          `and you can 💵 pay with ${idInfo.currencies[0].name}'s.
          `;
        }

        infoText = `
        <div class="country-info search-info">
          <span class='flag-country'><img src="${idInfo.flag}" alt="This a flag of the country ${idInfo.name}" /></span>
          <span class="${idInfo.region}"><h4>${idInfo.name}</h4></span>
          </div>
          <div class="country-specs search-specs">
              <p>${idInfo.name} is situated in ${idInfo.subregion}. It has a 🧑🏼‍🤝‍🧑🏼 population of ${idInfo.population} people. The 🏙️ capital is ${idInfo.capital} ${currencyInfo}</p>
          </div>
        
        `;
        
  } else {
    infoText = `
    <div class="country-info search-info">
        <span class='flag-country'><img src="${idInfo.flag}" alt="This a flag of the country ${idInfo.name}" /></span>
        <span class="${idInfo.region}"><h4>${idInfo.name}</h4></span>
    </div>
    <div class="country-specs search-specs">
        <p>${idInfo.name} is situated in ${idInfo.subregion}. It has a 🧑🏼‍🤝‍🧑🏼 population of ${idInfo.population} people.</p> </br><span class="info-note">The capital is not available at this moment and no currency information is available.</span>
    </div>
    `;
  }
  infoBox.innerHTML = infoText;
  
}

