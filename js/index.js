
class Producto {
    constructor(nombre, precio, categoria) {
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
    }
}
class Productos {
    constructor() {
        this.lista = []
    }
    agregarProducto(producto) {
        this.lista.push(producto)
    }
    removerProducto(producto) {
        this.lista = this.lista.filter((value) => {
            return value.nombre !== producto.nombre
        })
        this.showPrecioHtml()
    }
    removerProductoHtml(producto) {
        let elemento = document.getElementById(producto.nombre)
        elemento.remove()
    }
    calculateTotalPrice() {
        let total = 0;
        this.lista.map((value) => {
            total = total + parseInt(value.precio)
        })
        return total;
    }
    showPrecioHtml() {
        let total = document.getElementById('total');
        if (total) {
            total.remove();
        }
        let elemento = document.createElement('h1')
        elemento.id = 'total';
        elemento.textContent = `Total: ${this.calculateTotalPrice()}`
        document.body.append(elemento)
    }
    logLista() {
        console.log(this.lista);
    }
    renderHtml() {
        let contenedor = document.getElementById('cards')
        for (let index = 0; index < this.lista.length; index++) {
            const producto = this.lista[index];
            const elemento = document.createElement('div')
            elemento.id = producto.nombre;
            elemento.className = "card";
            elemento.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                </div>
                <div class="categoria">
                    <p class="card-cat">categoria: ${producto.categoria}</p>
                </div>
            `
            const button = document.createElement('button')
            button.textContent = "Eliminar"
            button.className = "btn btn-danger"
            button.onclick = () => {
                this.removerProducto(producto)
                this.removerProductoHtml(producto)
                this.logLista();
            }
            elemento.append(button)
            contenedor.append(elemento)
        }
        this.showPrecioHtml();
    }
    agregarProductoHtml(producto) {
        let contenedor = document.getElementById('cards')
        const elemento = document.createElement('div')
        elemento.className = "card"
        elemento.id = producto.nombre
        elemento.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
                <p class="card-cat">categoria: ${producto.categoria}</p>
            </div>
        `
        const button = document.createElement('button')
        button.textContent = "Eliminar"
        button.className = "btn btn-danger"
        button.onclick = () => {
            this.removerProducto(producto)
            this.removerProductoHtml(producto)
            this.logLista();
        }
        elemento.append(button)
        contenedor.append(elemento)
        this.showPrecioHtml();
    }
}
const PRODUCTOS = new Productos()

const p1 = new Producto('mate imperial',13000,'MATE')
const p2 = new Producto('termo stanley', 18000,'TERMO')
const p3 = new Producto('bombilla stanley', 12000,'BOMBILLA')


PRODUCTOS.agregarProducto(p1)
PRODUCTOS.agregarProducto(p2)
PRODUCTOS.agregarProducto(p3)


PRODUCTOS.renderHtml()
PRODUCTOS.logLista()



const submitForm = (id) => {
    let form = document.getElementById(id);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let nombre = form.children[0].value
        let precio = form.children[1].value
        let categoria = form.children[2].value
        let product = new Producto(nombre, parseInt(precio), categoria)
        PRODUCTOS.agregarProducto(product)
        PRODUCTOS.agregarProductoHtml(product)
        PRODUCTOS.logLista()
    })
}
submitForm('formulario')

