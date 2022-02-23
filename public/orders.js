const fullMenuBtn = document.querySelector("#get-full-menu");
const allTagBtns = document.querySelectorAll("#tag-name");
const menuDisplay = document.querySelector("#menu-display");
//
function createMenuDisplay(data) {
  data.map((item) => {
    const itemName = document.createElement("h6");
    const itemPrice = document.createElement("p");
    itemName.textContent = item.item_name;
    itemPrice.textContent = item.price;
    itemName.appendChild(itemPrice);
    menuDisplay.appendChild(itemName);
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getFullMenu() {
  removeAllChildNodes(menuDisplay);
  axios.get("http://localhost:5687/api/menu-items").then((res) => {
    createMenuDisplay(res.data);
  });
}
console.log(allTagBtns);
function tagOrders(event) {
  removeAllChildNodes(menuDisplay);
  const itemTagId = event.target.value;
  axios.get(`http://localhost:5687/api/menu-tag/${itemTagId}`).then((res) => {
    createMenuDisplay(res.data);
  });
}

for (let i = 0; i < allTagBtns.length; i++) {
  allTagBtns[i].addEventListener("click", tagOrders);
}

fullMenuBtn.addEventListener("click", getFullMenu);
