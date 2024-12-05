const LIMIT = 12;

const pages = document.querySelector(".pagination .pages");

function upperCaseWord(word) {
  return word.at(0).toUpperCase() + word.slice(1, word.length);
}

async function renderCategories() {
  const [categories, error] = await resolvePromise(getCategories());
  if (error) {
    return;
  }

  const mapped = categories.map((category) => {
    return {
      name: category
        .split("-")
        .map((part) => upperCaseWord(part))
        .join(" "),
      category,
    };
  });

  const categoriesEl = document.querySelector(".categories .list-group");
  categoriesEl.innerHTML = "";

  mapped.forEach((element) => {
    categoriesEl.innerHTML += `<li class='list-group-item' onclick="filterByCategory(event)" data-category="${element.category}">${element.name}</li>`;
  });
}

async function renderProducts(skipProducts = 0, search = "", category = "") {
  const [productsResponse, error] = await resolvePromise(
    search
      ? searchProducts(search)
      : category
      ? getProductsByCategory(category)
      : getProducts(12, skipProducts, search)
  );

  if (error) {
    return;
  }

  const { limit, products, skip, total } = productsResponse;

  const productsEl = document.querySelector(".products .row");
  productsEl.innerHTML = "";

  products.forEach((product) => {
    let rating = "";

    for (let i = 0; i < Math.round(product.rating); i++) {
      rating += '<span class="m-icon">kid_star</span>';
    }

    productsEl.innerHTML += `
      <div class="product-container col-md-6 col-lg-4">
        <div class="product">
          <div class="image">
            <img
              src="${product.thumbnail}"
              alt="${product.title}"
            />
          </div>
          <div class="title">
           ${product.title}
          </div>
          <div class="in-stock">
            <span class="icon m-icon">sell</span>
            <span>${product.stock > 0 ? "in stock" : "not in stock"}</span>
          </div>
          <div class="rating">
            ${rating}
          </div>
          <div class="original-price">
            <span class="o-price">${product.price}</span>
            <span class="reduction">-${product.discountPercentage}%</span>
          </div>
          <div class="reducted-price">${(
            product.price -
            (product.price * product.discountPercentage) / 100
          ).toLocaleString()} lei</div>
        </div>
      </div>
    `;

    renderPagesButtons(limit, skip, total);
  });
}

function renderPagesButtons(limit, skip, total) {
  const pagesNumber = Math.ceil(total / limit);
  const currentPage = Math.ceil(skip / limit) + 1;

  function renderButton(btnNumber) {
    return `<button onclick="renderProducts(${
      (btnNumber - 1) * limit
    })" class="btn ${
      btnNumber !== currentPage ? "btn-light" : "btn-primary"
    }">${btnNumber}</button>`;
  }

  let content = "";

  for (let i = 0; i < 2; i++) {
    content += renderButton(i + 1);

    if (pagesNumber - i - 1 <= 0) {
      break;
    }
  }

  if (pagesNumber > 5) {
    content += "<span>...</span>";
  }

  content += renderButton(pagesNumber);

  pages.innerHTML = content;
}

function initSearch() {
  let timer;
  const searchInput = document.querySelector(".search-products");
  searchInput.addEventListener("keyup", (event) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      renderProducts(0, event.target.value);
    }, 300);
  });
}

function filterByCategory(event) {
  let current;
  const currentElement = event.srcElement;
  const elements = currentElement.parentElement.children;

  for (const el of elements) {
    if (el.classList.contains("selected")) {
      current = el;
    }
  }

  if (current === currentElement) {
    currentElement.classList.remove("selected");
    renderProducts();
    return;
  }

  currentElement.classList.add("selected");
  renderProducts(0, "", currentElement.dataset.category);
}

renderCategories();
renderProducts();
initSearch();
