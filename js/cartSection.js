let cart;
// localStorage.clear()
if(JSON.parse(localStorage.getItem('cart')))  {
    cart = JSON.parse(localStorage.getItem('cart'))
} else {
    localStorage.setItem('cart', JSON.stringify([]))
    cart = JSON.parse(localStorage.getItem('cart'))
}
const totalCart=() =>{
    return cart.reduce((search, id) => search + id.price * id.cantidad, 0)
}
showCart();
function showCart(){
const cartSection = document.getElementById('cartSection');
if(cart.length == 0){
    const tableEmpty =`
        <div class="cartTitle p-5  position-absolute top-50 start-50 translate-middle">
            <h1><b>Tu carrito esta vacio</b></h1>
            <br>
            <h2>en nuestra seccion productos podras seleccionar los productos que mas te gusten</h2>
            <br>
            <a href="home.html">
            <button id="" class="btn btn-to-products">IR A PRODUCTOS</button>
            </a>
        </div>
        `
    cartSection.innerHTML += tableEmpty;
} else {
    const cartTitle = `
            <div class="cartTitle">
                <h1>EN SU CARRITO DE COMPRAS</h1>
                <h2>Hay ${cart.length} producto/s seleccionado/s</h2>
            </div>
            `;
    cartSection.innerHTML += cartTitle;
    const cartContainer = `
            <table class="table text-center">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">FOTO</th>
                    <th scope="col">NOMBRE PRODUCTO</th>
                    <th scope="col">CANTIDAD</th>
                    <th scope="col">PRECIO($)</th>
                    <th scope="col">SUBTOTAL($)</th>
                </tr>
                </thead>
                <tbody id="cartContent" class="align-middle">
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row"></th>
                        <td colspan="3"></td>
                        <td><b class="fs-4">TOTAL:</b></td>
                        <td><b class="fs-4">$${totalCart().toLocaleString()}</b></td>
                    </tr>
                </tfoot>
            </table>
            <div class="container-btn">
                <button id="buyBtn" class="btn btn-success m-4">CONFIRMAR COMPRA</button><button id="emptyBtn" class="btn btn-danger">VACIAR CARRITO</button>
            </div>
            `;
            cartSection.innerHTML += cartContainer;
            const cartContent = document.getElementById('cartContent')
            for (let i = 0; i < cart.length; i++) {
                const element = cart[i];
                const { id, name, img, price, cantidad } = element;
                const cartItem = `
                    <tr>
                        <th scope="row"><button id="trashItemBtn" data-producto="${id}" class="trashItem"></button></th>
                        <td><img src=${img} class="imgProductsCart" alt="${name}"></td>
                        <td>${name}</td>
                        <td><a id="addItem" class="btn btn-success btnItems" data-producto="${id}">+</a>${cantidad}<a id="subtractItem" class="btn btn-danger btnItems" data-producto="${id}">-</a></td>
                        <td>$${price.toLocaleString()}</td>
                        <td>$${(cantidad * price).toLocaleString()}</td>
                    </tr>
                    `;
                cartContent.innerHTML += cartItem
            }
}
}
let removeBtn = document.getElementsByClassName('trashItem');

for (let i = 0; i < removeBtn.length; i++) {
    const element = removeBtn[i];
    element.addEventListener('click', function(e){
        if(e.target.id === "trashItemBtn"){
            deleteItem(e.target.dataset.producto)
        }
    });   
}

function deleteItem(item){
    for(i in cart){
        if(cart[i].id == item){
            cart.splice(i,1)
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        }
    }
}

let emptyBtn = document.getElementById('emptyBtn');
emptyBtn.addEventListener('click', swalEmptyCart);
let buyBtn = document.getElementById('buyBtn');
buyBtn.addEventListener('click', buyCart);

function swalEmptyCart(e){
    {Swal.fire({
        title:'¿desea vaciar su carrito?',
        icon:'warning',
        showCancelButton: true,
        confirmButtonText: 'si, vaciar',
        cancelButtonText: 'cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                emptyCart()
            }
        })
    }
}

function emptyCart(e){
    localStorage.clear('cart')
    location.reload();
}

let btnItems = document.getElementsByClassName('btnItems');

for (let i = 0; i < btnItems.length; i++) {
    const element = btnItems[i];
    element.addEventListener('click', function(e){
        if(e.target.id === "addItem"){
            addItem(e.target.dataset.producto)
        }
        else{
            subtractItem(e.target.dataset.producto)
        }
    });   
}

function addItem(item){
    cart.forEach(element =>{
        if(element.id == item){
            const items = element
            element.cantidad++
            element = {...items}
            localStorage.setItem('cart', JSON.stringify(cart))
            location.reload();  
        }
    })
}

function subtractItem(item){
    cart.forEach(element =>{
        if(element.id == item){
            const items = element
            element.cantidad--
            if(element.cantidad === 0){
                deleteItem(item);
            }
            element = {...items}
            localStorage.setItem('cart', JSON.stringify(cart))
            location.reload();  
        }
    })
}

function buyCart(e){
    buyBtn.setAttribute('data-toggle', "modal")
    buyBtn.setAttribute('data-bs-toggle',"modal")
    buyBtn.setAttribute('data-bs-target', "#miModal")
    let mostrarModal = document.getElementById('mostrarModal');
    Swal.fire({
        title: `total: ${totalCart().toLocaleString()}`,
        icon: "info",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'comprar',
        cancelButtonText: 'cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'compra realizada',
            icon: 'success'
        })
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        )swalEmptyCart()
    });
}
