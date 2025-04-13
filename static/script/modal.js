const product_modal = document.getElementById("product_modal");
const mobile_menu_button = document.getElementById("mobile_menu_button");
const mobile_menu_modal = document.getElementById("mobile_menu_modal");

document.addEventListener("click", function (event) {
  const clickedItem = event.target.closest(".product_item");
  if (clickedItem) {
    const id = clickedItem.children[1].textContent;
    const text = clickedItem.children[2].textContent;
    document.getElementById("modal_product_id").textContent = id;
    document.getElementById("modal_product_text").textContent = text;
    product_modal.classList.toggle("show");
  }
});

document.addEventListener("click", function (event) {
  const clickedItem = event.target.closest("#mobile_menu_modal li a");
  if (clickedItem) {
    mobile_menu_modal.classList.toggle("show");
  }
});

mobile_menu_button.addEventListener("click", function (event) {
  mobile_menu_modal.classList.toggle("show");
});

let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  product_modal.classList.toggle("show");
};

window.onclick = function (event) {
  if (event.target == product_modal) {
    product_modal.classList.toggle("show");
  } else if (event.target == mobile_menu_modal) {
    mobile_menu_modal.classList.toggle("show");
  }
};
