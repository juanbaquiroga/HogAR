
let Products = fetch('json/products.json')
    .then( (res) => res.json())
    .then((data) => {
        Products = data
        showProducts(Products)
    })
    
console.log(fetch('json/products.json'))
// localStorage.clear()
let users;
let cart;

if(JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('users')))  {
    cart = JSON.parse(localStorage.getItem('cart'));
    users = JSON.parse(localStorage.getItem('users'))
} else {
    localStorage.setItem('cart', JSON.stringify([]))
    localStorage.setItem('users', JSON.stringify([]))
    cart = JSON.parse(localStorage.getItem('cart'))
    users = JSON.parse(localStorage.getItem('users'))
}

function showProducts (){
    for (let i = 0; i < Products.length; i++) {
        const element = Products[i];
        const { id, name, price, img } = element
            const card = `
            <div class="card">
                    <img src=${img} class="imgProducts" alt="${name}">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">$${price}</p>
                    </div>
                    <div class="comprar">
                        <button id=${id} class="btn btn-dark agregar-carrito">Agregar al Carrito</button>
                    </div>
                </div>
                `
            const containerProduct = document.getElementById('containerProduct')
            containerProduct.innerHTML += card
    }
}

const addBtn = document.getElementsByClassName('agregar-carrito');

for (let i = 0; i < addBtn.length; i++) {
    const element = addBtn[i];
    element.addEventListener('click', addCart)
}

function addCart(e){
    
    const btn = e.target;
    const idBoton = btn.getAttribute('id')
    const idFound = Products.find(prod => prod.id == idBoton)
    const inCart = cart.find(prod => prod.id == idFound.id)
    if(!inCart) {
        cart.push({...idFound, cantidad: 1})
        console.log('si')
        swal({
            title: `${idFound.name}`,
            text: "has añadido este item tu carrito",
            icon: "success",
          });
    } else {
        let cartFilter = cart.filter(id => id.id != inCart.id)
        cart = [...cartFilter, {...inCart, cantidad: inCart.cantidad + 1}]
        swal({
            title: `${idFound.name}`,
            text: "has añadido este item tu carrito",
            icon: "success",
            timer: 6000,
          });
    }
    localStorage.setItem('cart', JSON.stringify(cart))

}
