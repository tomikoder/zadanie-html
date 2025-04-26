const first_select_item = document.getElementById("first_select_item");
const drop_down_list = document.getElementById("drop_down_list");
const menu_items = document.querySelectorAll(".list_item");
const products_list = document.getElementById("products_list");
const BASIC_PAGE_SIZE = 25;
let open_menu = false;
let page_size = Number(
  first_select_item.children[0].children[0].textContent.trim()
);
let page_number = 1;
let end = false;

function toggle_list_items() {
  menu_items.forEach((item) => {
    item.classList.toggle("show");
  });
  open_menu = !open_menu;
}

async function download_products(page_number) {
  const response = await fetch(
    `https://brandstestowy.smallhost.pl/api/random?pageNumber=${page_number}&pageSize=25`
  );
  const converted_data = await response.json();
  if (converted_data["totalPages"] == page_number) end = true;
  let data_to_return = converted_data["data"];
  return data_to_return;
}

function get_product(curr_product) {
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
  return curr_product_div;
}

function put_product(curr_product) {
  const prdouct_to_insert = get_product(curr_product);
  products_list.appendChild(prdouct_to_insert);
}

async function update_products(page_size) {
  let number_of_requests = page_size / BASIC_PAGE_SIZE;
  let requests = [];
  let page_number_copy = page_number;
  for (let i = 0; i < number_of_requests && !end; i++) {
    requests.push(download_products(page_number_copy));
    page_number_copy++;
  }
  let downloaded_products;
  try {
    downloaded_products = await Promise.all(requests);
  } catch (err) {
    alert(err);
    return;
  } finally {
    page_number = page_number_copy;
    let result = [];
    for (const index in downloaded_products) {
      result = result.concat(downloaded_products[index]);
    }
    result.forEach(put_product);
  }
}

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
    let new_page_size = Number(item.textContent.trim());
    first_select_item.children[0].children[0].textContent = new_page_size;
    page_size = new_page_size;
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
    if (scrollPosition >= maxScroll - window.innerHeight * 0.5 && !end) {
      update_products(page_size);
    }
  }, 200);
});
