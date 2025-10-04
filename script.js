const form = document.getElementById('productForm');
const productList = document.getElementById('productList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById('name').value,
    price: parseFloat(document.getElementById('price').value),
    category: document.getElementById('category').value
  };

  const res = await fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });

  if (res.ok) {
    form.reset();
    loadProducts();
  }
});
async function loadProducts() {
  const res = await fetch('http://localhost:3000/products');
  const products = await res.json();

  productList.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.name} - ₹${p.price} (${p.category})`;
    productList.appendChild(li);
  });
}

loadProducts();
