
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const param=new URLSearchParams(search);
  // console.log(search);
  // console.log(param.get('city'));
  const cityID=param.get('city');
  return cityID;
}



//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  //console.log(config.backendEndpoint);
  try{
  const pro=await fetch(config.backendEndpoint+"/adventures?city="+city);
  const res=pro.json();
  //console.log(res);
  return res;
  
  }
  catch(err)
  {
    return null;
  }

    
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures);
  adventures.forEach(act => {
    //console.log(act);
    let dt=document.getElementById("data");
    let adv=document.createElement("div");
    adv.setAttribute("class","col-6 col-lg-3 mb-3");
    let content=`
    <a href="detail/?adventure=${act.id}" id=${act.id}>    
      <div id=${act.id} class="card activity-card">    
        <img src=${act.image} class="card-img-top" alt="..." />    
        <div class="category-banner">${act.category}</div>    
        <div class="card-body d-md-flex justify-content-between" style="width:100%">    
          <p class="card-title fw-normal">${act.name}</p>    
          <p class="card-text fw-normal">₹${act.costPerHead}</p>    
        </div>    
        <div class="card-body d-md-flex justify-content-between" style="width:100%">    
          <p class="card-title fw-normal">Duration</p>    
          <p class="card-text fw-normal">${act.duration} Hours</p>   
        </div>    
      </div>    
     </a>   
    `;
    adv.innerHTML=content;
    dt.appendChild(adv);
    //return dt;
  });
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredListByDuration = [];
  for(let i = 0;i<list.length;i++)
  {
    if(list[i].duration>=low && list[i].duration<=high)
      filteredListByDuration.push(list[i]);
  }
  return filteredListByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filtList = [];
  for(let i = 0;i<categoryList.length;i++)
  {
    for(let j = 0;j<list.length;j++)
    {
      if(list[j].category===categoryList[i])
        filtList.push(list[j]);
    }
  }
  return filtList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  let list1 = list;
  if(filters.category.length){
    list1 = filterByCategory(list, filters.category);
  }
  list = list1;
  if(filters.duration.length!=0)
  {
    const m = filters.duration.split("-");
    list1 = filterByDuration(list,m[0],m[1])
  }
  list = list1;
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  return localStorage.setItem('filters',JSON.stringify(filters));
  //return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage(ls) {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  
  let str=localStorage.getItem('filters');
  // Place holder for functionality to work in the Stubs
  return JSON.parse(str);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  //console.log(filters[0].category);
  if(filters["category"].length>0)
  {
    for(var i=0;i<filters["category"].length;i++)
    {
      let par=document.getElementById("category-list");
      let ch=document.createElement("p");
      ch.setAttribute("class","category-filter");
      ch.innerText=`
      ${filters.category[i]}
      `;
      par.appendChild(ch);
    }    
  }
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
