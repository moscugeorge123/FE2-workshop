async function getProduct(productId) {
  const [resp, error] = await resolveFetch(
    fetch(`https://dummyjson.com/products/${productId}`)
  );

  if (error) {
    throw new Error("Could not fetch the product " + productId);
  }

  return resp;
}

async function getProducts(limit = 12, skip = 0, search = "") {
  const [resp, error] = await resolveFetch(
    fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}&q=${search}`
    )
  );

  if (error) {
    throw new Error("Could not fetch the products");
  }

  return resp;
}

async function searchProducts(search = "") {
  const [resp, error] = await resolveFetch(
    fetch(`https://dummyjson.com/products/search?q=${search}`)
  );

  if (error) {
    throw new Error("Could not fetch the products");
  }

  return resp;
}

async function getProductsByCategory(category = "") {
  const [resp, error] = await resolveFetch(
    fetch(`https://dummyjson.com/products/category/${category}`)
  );

  if (error) {
    throw new Error("Could not fetch the products");
  }

  return resp;
}

async function getCategories() {
  const [resp, error] = await resolveFetch(
    fetch("https://dummyjson.com/products/category-list")
  );

  if (error) {
    throw new Error("Could not fetch the categories");
  }

  return resp;
}

async function loginAPI(username, password) {
  const [resp, error] = await resolvePromise(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          username,
          token:
            "kajshgduyasdkjhvaskdghvalsiydvlaushvdkaysdlouyavskjdvhas8d67fa8osyvdoa8svdbo8a7",
        });
      }, 1500);
    })
  );

  if (error) {
    throw new Error("Could not fetch the categories");
  }

  return resp;
}
