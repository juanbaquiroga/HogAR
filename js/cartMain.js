let users;
let cart;
let products;

// localStorage.clear()
if(JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('users')))  {
    cart = JSON.parse(localStorage.getItem('cart'));
    users = JSON.parse(localStorage.getItem('users'))
} else {
    localStorage.setItem('cart', JSON.stringify([]))
    localStorage.setItem('users', JSON.stringify([]))
    cart = JSON.parse(localStorage.getItem('cart'))
    users = JSON.parse(localStorage.getItem('users'))
}



const fetchCotizacion = () => {
    //fetch('./data.json').then((response) =>response.json())
	fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales').then((response) =>response.json())
	.then((result)=>{
        console.log(result)
        mostrarCotizacion(result)
	}).catch((err)=>{
		console.error(err)
	})
}
fetchCotizacion();

const mostrarCotizacion = (body) =>{
    let cotizacion = document.getElementById('cotizacion')
    cotizacion.innerHTML = 'Dolar Blue: ' + body[1].casa.venta 
}

function addedProductToast() {
    Toastify({
      text: "Agregaste un producto al carrito",
      duration: 2000,
      close: true,
      position: "center",
      backgroundColor: "#000",
    }).showToast();
};


fetchData();
function fetchData(){
    fetch('json/products.json')
    .then(function(res){
        return res.json();
    })
    .then((data) => {
        Products = data;
        let card ='';
        data.forEach(function(product){
            card += `
            <li class="card">
                <img src=${product.img} class="imgProducts" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                </div>
                <div class="comprar">
                    <button id="${product.id}" class="btn btn-dark agregar-carrito">Agregar al Carrito</button>
                </div>
            </li>
            `
        });
        const containerProduct = document.getElementById('containerProduct')
        containerProduct.innerHTML = card
    })
    .catch(function(error){
        document.write("Error en los servidores")
    })
}

document.addEventListener("click", (e)=>{
    if(e.target && e.target.matches("button.btn")){
        addCart(e.target.id);
    }
})

function addCart(e){
    const idFound = Products.find(prod => prod.id == e)
    const inCart = cart.find(prod => prod.id == idFound.id)
    if(!inCart) {
        cart.push({...idFound, cantidad: 1})
    } else {
        let cartFilter = cart.filter(id => id.id != inCart.id)
        cart = [...cartFilter, {...inCart, cantidad: inCart.cantidad + 1}]
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    Toastify({
        text: `Agregaste ${idFound.name} al carrito`,
        duration: 1500,
        close: true,
        position: "center",
        backgroundColor: "rgb(30, 30, 30)",
    }).showToast();
}

