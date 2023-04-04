import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }

  //verification
  console.log("From init()");
  console.log(config);
  //console.log(cities);
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let res=await fetch(`${config.backendEndpoint}/cities`);
  //console.log(res);
  //let res=await fetch(`http://65.1.219.125:8082/cities`);
  let user=await res.json();
  console.log(user);
  return user;
  }
  catch(err){
    console.log(err);
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const par=document.getElementById("data");
  const child=document.createElement("div");
  child.setAttribute("class","tile col-sm-6 col-lg-3 mb-4");
  console.log(id);
  const content=
  `<a id=${id} href="pages/adventures/?city=${id}"> 
    <img src=${image} alt="alt">
    <h5 class="tile-text">${city}</h5>
    <p class="tile-text1">${description}</p>
  </a>`
  child.innerHTML=content;
  par.appendChild(child);
}

export { init, fetchCities, addCityToDOM };

//frontend/pages/adventures/index.html
