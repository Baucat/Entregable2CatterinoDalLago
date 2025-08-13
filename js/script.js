// Lista de productos
const productos = [
  { nombre: "Mandioca", precio: 500 },
  { nombre: "Uva", precio: 400 },
  { nombre: "Toronjas", precio: 300 },
  { nombre: "Papaya", precio: 100 },
  { nombre: "Pepino", precio: 350 }
];

// Recuperar carrito del LocalStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos del DOM
const listaProductos = document.getElementById("lista-productos");
const carritoLista = document.getElementById("carrito-lista");
const totalCarrito = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar-carrito");

// Función para mostrar productos
function mostrarProductos() {
  listaProductos.innerHTML = "";
  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <span>${producto.nombre} - $${producto.precio}</span>
      <input type="number" min="1" value="1" id="cantidad-${index}" style="width:50px;">
      <button onclick="agregarAlCarrito(${index})">Agregar</button>
    `;
    listaProductos.appendChild(div);
  });
}

// Función para agregar al carrito
function agregarAlCarrito(index) {
  const cantidad = parseInt(document.getElementById(`cantidad-${index}`).value);
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Cantidad inválida.");
    return;
  }

  const producto = productos[index];
  const existente = carrito.find(item => item.nombre === producto.nombre);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  guardarCarrito();
  mostrarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, idx) => {
    const li = document.createElement("li");
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    li.textContent = `${item.cantidad} kg de ${item.nombre} - $${subtotal}`;
    carritoLista.appendChild(li);
  });

  totalCarrito.textContent = `Total: $${total}`;
}

// Guardar carrito en LocalStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
});

// Inicializar
mostrarProductos();
mostrarCarrito();