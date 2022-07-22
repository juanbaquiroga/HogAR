let users;
let cart;
let products;
// localStorage.clear()


// fetch('https://api-dolar-argentina.herokuapp.com/api/dolarblue')

if(JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('users')))  {
    cart = JSON.parse(localStorage.getItem('cart'));
    users = JSON.parse(localStorage.getItem('users'))
} else {
    localStorage.setItem('cart', JSON.stringify([]))
    localStorage.setItem('users', JSON.stringify([]))
    cart = JSON.parse(localStorage.getItem('cart'))
    users = JSON.parse(localStorage.getItem('users'))
}
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
    Swal.fire({
        title: `${idFound.name}`,
        text: "has añadido este item tu carrito",
        icon: "success",
        timer: 6000,
    });
}

