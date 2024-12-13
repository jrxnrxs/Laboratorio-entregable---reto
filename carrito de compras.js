let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarLocalStorage();
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarLocalStorage();
    actualizarCarrito();
}

function actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toFixed(2));
}

function actualizarCarrito() {
    const carritoContenedor = document.getElementById('listaCarrito');
    const totalContenedor = document.getElementById('totalCarrito');
    const carritoBtn = document.getElementById('carrito');
    
    carritoContenedor.innerHTML = '';
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
        
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarDelCarrito(index);
        li.appendChild(btnEliminar);
        
        carritoContenedor.appendChild(li);
    });

    totalContenedor.textContent = total.toFixed(2);
    carritoBtn.textContent = `Ver Carrito (${carrito.length})`;
}

function mostrarCarrito() {
    const modal = document.getElementById('carritoModal');
    modal.style.display = 'flex';
    actualizarCarrito();
}

function cerrarCarrito() {
    const modal = document.getElementById('carritoModal');
    modal.style.display = 'none';
}

window.onload = actualizarCarrito;
