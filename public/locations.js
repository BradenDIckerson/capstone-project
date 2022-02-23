const locationSelect = document.querySelector("#location-select");
const addressDisplay = document.querySelector("#address-display");

window.addEventListener("DOMContentLoaded", () => {
  //your logic goes here i.e the axios call to get all locations
  axios
    .get("http://localhost:5687/api/locations")
    //loop over array returned from axios in .then
    .then((res) => {
      console.log(res.data);
      res.data.forEach((location) => {
        //inside the loop created new elements for data
        const option = document.createElement("option");
        //append new elements to parent (body.append child)(document.createNewElement)(createElement)
        option.setAttribute("value", location["state"]);
        option.textContent = `${location.city}, ${location.state}`;
        locationSelect.appendChild(option);
      });
    });
});

locationSelect.addEventListener("change", (event) => {
  const address = document.createElement("p");
  // console.log(event.target.value)
  const state = event.target.value;
  axios.get(`http://localhost:5687/api/location/${state}`).then((res) => {
    const { address } = res.data[0];
    console.log(res.data[0].address);
    address.setAttribute()
    address.textContent = `${res.data[0]}`;
    addressDisplay.appendChild(address);
  });
});
