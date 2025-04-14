const first_select_item = document.getElementById("first_select_item");
const drop_down_list = document.getElementById("drop_down_list");
const menu_items = document.querySelectorAll(".list_item");
const products_list = document.getElementById("products_list");

let open_menu = false;
let downloaded_prdoucts;
let number_of_products_to_display = Number(
  first_select_item.children[0].children[0].textContent.trim()
);

let curr_product_index = 0;

function toggle_list_items() {
  menu_items.forEach((item) => {
    item.classList.toggle("show");
  });
  open_menu = !open_menu;
}

async function download_products() {
  const response = await fetch(
    `https://brandstestowy.smallhost.pl/api/random?pageSize=100`
  );
  const converted_data = await response.json();
  return converted_data["data"];
}

function get_product(downloaded_prdoucts) {
  let curr_product = downloaded_prdoucts[curr_product_index];
  let curr_product_div = document.createElement("div");

  curr_product_div.classList.add("product_item");
  let p_tag = document.createElement("p");
  let id = curr_product["id"];
  let span_tag1;
  let span_tag2;
  p_tag.textContent = "ID: " + id;
  span_tag1 = document.createElement("span");
  span_tag2 = document.createElement("span");
  span_tag1.textContent = curr_product["id"];
  span_tag2.textContent = curr_product["text"];
  curr_product_div.appendChild(p_tag);
  curr_product_div.appendChild(span_tag1);
  curr_product_div.appendChild(span_tag2);
  curr_product_index++;
  return curr_product_div;
}

function put_products(downloaded_prdoucts) {
  let counter = 0;
  while (curr_product_index < number_of_products_to_display && counter < 4) {
    let prdouct_to_insert = get_product(downloaded_prdoucts);
    products_list.appendChild(prdouct_to_insert);
    counter++;
  }
}

downloaded_prdoucts = await download_products();

first_select_item.addEventListener("click", function (event) {
  toggle_list_items();
});

document.addEventListener("click", function (event) {
  if (!drop_down_list.contains(event.target) && open_menu) {
    toggle_list_items();
  }
});

menu_items.forEach((item) => {
  item.addEventListener("click", function (event) {
    let new_number = Number(item.textContent.trim());
    first_select_item.children[0].children[0].textContent = new_number;
    if (
      new_number < number_of_products_to_display &&
      curr_product_index + 1 > new_number
    ) {
      let number_items_to_remove = curr_product_index + 1 - new_number;
      let products_list_children = products_list.children;
      for (let i = 0; i < number_items_to_remove; i++) {
        products_list_children[products_list_children.length - 1].remove();
      }
      curr_product_index = new_number - 1;
    }
    number_of_products_to_display = new_number;
    toggle_list_items();
  });
});

let timeout;
window.addEventListener("scroll", function () {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    if (scrollPosition >= maxScroll - window.innerHeight * 0.5) {
      put_products(downloaded_prdoucts);
    }
  }, 200);
});
