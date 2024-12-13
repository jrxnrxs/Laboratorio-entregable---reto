let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

function agregarAlCarrito(nombre, precio) {
    // Agregar producto al carrito
    carrito.push({ nombre, precio });
    total += precio;
    
    // Actualizar en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toFixed(2));
    
    // Actualizar la interfaz de usuario
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    // Eliminar producto del carrito
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    
    // Actualizar en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toFixed(2));
    
    // Actualizar la interfaz de usuario
    actualizarCarrito();
}

function actualizarCarrito() {
    // Actualizar la lista del carrito y el total
    const carritoContenedor = document.getElementById('listaCarrito');
    const totalContenedor = document.getElementById('totalCarrito');
    const carritoBtn = document.getElementById('carrito');
    
    // Limpiar el carrito visualmente
    carritoContenedor.innerHTML = '';
    
    // Agregar los productos al carrito visual
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio}`;
        
        // Agregar un botón para eliminar el producto
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarDelCarrito(index);
        li.appendChild(btnEliminar);
        
        carritoContenedor.appendChild(li);
    });
    
    // Actualizar el total
    totalContenedor.textContent = total.toFixed(2);
    
    // Actualizar el botón del carrito
    carritoBtn.textContent = `Ver Carrito (${carrito.length})`;
}

function mostrarCarrito() {
    // Mostrar el modal del carrito
    const modal = document.getElementById('carritoModal');
    modal.style.display = 'block';
    
    // Actualizar el carrito en el modal
    actualizarCarrito();
}

function cerrarCarrito() {
    // Cerrar el modal del carrito
    const modal = document.getElementById('carritoModal');
    modal.style.display = 'none';
}

// Inicializar el carrito cuando se cargue la página
window.onload = function() {
    actualizarCarrito();
};
