const first_select_item = document.getElementById("first_select_item");
const menu_items = document.querySelectorAll(".list_item");
let menu_open = false;

first_select_item.addEventListener("click", function (event) {
  menu_items.forEach((item) => {
    item.classList.toggle("show");
  });
  menu_open = true;
});

menu_items.forEach((item) => {
  item.addEventListener("mouseover", function (event) {});
});
