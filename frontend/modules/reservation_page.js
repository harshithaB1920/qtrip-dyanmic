import config from "../conf/index.js";
//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let res = await fetch(config.backendEndpoint + "/reservations/")
    let data = await res.json();
    // console.log(data)
    return data;
  }
  catch(e){
  // Place holder for functionality to work in the Stubs
    return null;
  }
}
//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  if(reservations.length){
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
    let table = document.getElementById("reservation-table");
    reservations.forEach((key) => {
      let reservationList = document.createElement("tr");
      reservationList.innerHTML = `<th>${key.id}</th>                                   
                                  <td>${key.name}</td>                                   
                                  <td>${key.adventureName}</td>                                   
                                  <td>${key.person}</td>                                  
                                  <td>${new Date(key.date).toLocaleDateString("en-IN")}</td>                                   <td>${key.price}</td>                                   <td>${new Date(key.time).toLocaleString("en-IN", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                  }).replace(" at",",")}</td>                                  <td id=${key.id}><a href="/pages/adventures/detail/?adventure=${key.adventure}" class="reservation-visit-button" id="${key.adventure}">Visit Adventure</a></td>`;
      table.appendChild(reservationList);
  })}
  else{
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}
export { fetchReservations, addReservationToTable };
