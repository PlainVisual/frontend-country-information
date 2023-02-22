
// Import axios
import axios from "axios";
// Create Async function Get endpoint from REST Countries API so we can load all the data.

async function fetchCountryData() {

  try {
    const response = await axios.get('https://restcountries.com/v2/all?fields=name,region,flag,population');
    const countries = response.data;
    return countries;
    // console.log(countries);
        
  } catch(e) {
    console.error(e);
  }
  
}

// Create a function to sort the data on population from low to high
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

    

    const contentData = sortedArray.map((country) => {

      // console.log(country);
      
      
      return `
      
      <div class=placeholder-country>
        <span><img class='flag-country' src="${country.flag}" alt="This a flag of the country ${country.name}" /></span>
        <span class="${country.region}"><h4>${country.name}</h4></span>
        <p>Has a population of ${country.population} people</p>
      </div>      
            
      `;
  

    });

    // console.log(contentData);
    const listing = document.querySelector(".content-map-countries");

    listing.innerHTML = contentData.join("");
    

  });

 

}

contentData();


// function regionColorizer() {
//   return sortDataPopulation().then((sortedArray) => {
//     const colorClasses = sortedArray.map((list) => {
//       // console.log(list.region);
//       const listSelector = list.region;
//       let colorClass;

//       if (listSelector === 'Africa') {
//         colorClass = document.getElementById(listSelector);
//         colorClass.classList.add("region-africa");
//         } else if (listSelector === 'Americas') {
//         colorClass = document.getElementById(listSelector);
//         colorClass.classList.add("region-americas");
//       } else if (listSelector === 'Asia') {
//         colorClass = document.getElementById(listSelector);
//         colorClass.classList.add("region-asia");
//       } else if (listSelector === 'Europe') {
//         colorClass = document.getElementById(listSelector);
//         colorClass.classList.add("region-europe");
//       } else if (listSelector === 'Oceania') {
//         colorClass = document.getElementById(listSelector);
//         colorClass.classList.add("region-oceania");
//       } else {
//         colorClass = document.getElementById(listSelector);
//         colorClass.classList.add("region-global");
//       }

//       // console.log(colorClass);
//       return colorClass;
//     });

//     // console.log(colorClasses);
//     return colorClasses;
//   });
// }

// regionColorizer()

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
        } else if (listSelector === 'Americas') {
          region.classList.add("region-americas");
        } else if (listSelector === 'Asia') {
          region.classList.add("region-asia");
        } else if (listSelector === 'Europe') {
          region.classList.add("region-europe");
        } else if (listSelector === 'Oceania') {
          region.classList.add("region-oceania");
        } else {
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
