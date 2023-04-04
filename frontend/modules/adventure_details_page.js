import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  //console.log(search);
  const param=new URLSearchParams(search);
  const advID=param.get('adventure');
  //console.log(advID);
  return advID;

  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  //console.log("fetch");
  try{
    const prom=await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId);
    const resp=await prom.json();
    //console.log(prom);
    //console.log(resp);
    return resp;
    }
    catch(err)
    {
      return null;
    }
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure);
    let advName=document.getElementById("adventure-name");
    advName.textContent=adventure.name;
    //console.log(advName.innerText);

    let advSub=document.getElementById("adventure-subtitle");
    advSub.textContent=adventure.subtitle;

    let pg=document.getElementById("photo-gallery");
    for(const ele in adventure.images){
    //console.log(`${ele[images].length}`);
    //console.log(adventure.images[ele])
    let img=document.createElement("div");
    // img.setAttribute("class","activity-card-image ");
    img.innerHTML=`
      <img class="activity-card-image" src="${adventure.images[ele]}">
    `;
    pg.appendChild(img);
  }
  let advCon=document.getElementById("adventure-content");
  advCon.innerText=adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let pg=document.getElementById("photo-gallery");

  pg.innerHTML=`
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner" id="carousel-id">
      <div class="carousel-item active">
        <img src="${images[0]}" class="activity-card-image" alt="image">
      </div>
    <div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
    `;
  
    //loop through remaining image links to add as seperate divs
    let cID=document.getElementById("carousel-id");
    for(let i=1;i<images.length;i++)
    {
      //console.log(ele);
      let imgDiv=document.createElement("div");
      imgDiv.setAttribute("class","carousel-item");
      let img=document.createElement("img");
      img.setAttribute("class","activity-card-image d-block");
      img.src=images[i];
      // console.log(img.src);
      img.alt="...";
      imgDiv.appendChild(img);
      cID.appendChild(imgDiv);
    }  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  //console.log(adventure);
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML=`${adventure.costPerHead}`;
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  //console.log(persons);
  let cost=document.getElementById("reservation-cost");
  cost.innerHTML=adventure.costPerHead*persons;

  console.log(adventure);

}

//Implementation of reservation form submission
function captureFormSubmit(presentAdventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // console.log(adventure);
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = form.elements["name"].value;
    const date = form.elements["date"].value;
    const person = form.elements["person"].value;
    const adventure = presentAdventure.id;
    const col = { name, date, person, adventure };
    const jsonData = JSON.stringify(col);
    //console.log(jsonData)
    //const url = config.backendEndpoint + "/reservations/new";
   // console.log(url);
    // console.log(url);
    try {
      
      let response = await fetch(config.backendEndpoint+"/reservations/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",},
          body: jsonData});
    //console.log(response);
    if (response.ok) {
      alert("Success!");
      location.reload();
    } else {
      alert("Failed!");
    }
  }catch (error) {
      console.error(error);
      alert("Failed!");
    } 
  });
  

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  //console.log(adventure);
  
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }
  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
