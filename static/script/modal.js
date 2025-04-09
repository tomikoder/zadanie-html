const product_modal = document.getElementById("product_modal");
const mobile_menu_button = document.getElementById("mobile_menu_button");
const mobile_menu_modal = document.getElementById("mobile_menu_modal");
let is_open_menu = false;

document.addEventListener("click", function (event) {
  const clickedItem = event.target.closest(".product_item");
  if (clickedItem) {
    const id = clickedItem.children[1].textContent;
    const text = clickedItem.children[2].textContent;
    document.getElementById("modal_product_id").textContent = id;
    document.getElementById("modal_product_text").textContent = text;
    product_modal.style.display = "block";
  }
});

document.addEventListener("click", function (event) {
  const clickedItem = event.target.closest("#mobile_menu_modal li a");
  if (clickedItem) {
    mobile_menu_modal.style.display = "none";
    is_open_menu = !is_open_menu;
  }
});

mobile_menu_button.addEventListener("click", function (event) {
  if (!is_open_menu) {
    mobile_menu_modal.style.display = "block";
  } else {
    mobile_menu_modal.style.display = "none";
  }
  is_open_menu = !is_open_menu;
});

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  product_modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == product_modal) {
    product_modal.style.display = "none";
  } else if (event.target == mobile_menu_modal) {
    mobile_menu_modal.style.display = "none";
    is_open_menu = !is_open_menu;
  }
};
