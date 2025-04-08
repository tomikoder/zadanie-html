var modal = document.getElementById("product_modal");

// Get the button that opens the modal

document.addEventListener("click", function (event) {
  const clickedItem = event.target.closest(".product_item");
  if (clickedItem) {
    const id = clickedItem.children[1].textContent;
    const text = clickedItem.children[2].textContent;
    document.getElementById("modal_product_id").textContent = id;
    document.getElementById("modal_product_text").textContent = text;
    modal.style.display = "block";
  }
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
