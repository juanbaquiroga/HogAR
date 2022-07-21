
let users=[];
// localStorage.clear()
if(JSON.parse(localStorage.getItem('users')))  {
    users = JSON.parse(localStorage.getItem('users'))
} else {
    localStorage.setItem('users', JSON.stringify([]))
    users = JSON.parse(localStorage.getItem('users'))
}

const DOMlogin = document.getElementById('domLogin');
DOMlogin.innerHTML = `
        <div class="formulario"></div>                
            <h2 class="title">BIENVENIDO</h2>
            <form>
                <div class="">
                    <label for="user" class="form-label">Ingresa tu nombre</label>
                    <input type="user" class="form-control" name="user" id="name">
                </div>
                <div class="">
                    <label for="email" class="form-label">Correo Electronico</label>
                    <input type="email" class="form-control" name="email" id="email">
                </div>
            </form>
            <button type="button" id="getInfo" class="btn btn-dark">Iniciar Sesion</button>
        </div>
`;

const DOMgetInfo = document.getElementById('getInfo');
DOMgetInfo.addEventListener('click',setUser)

class GetUser {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

}

function setUser() {

  let name = document.getElementById('name').value;

  let email = document.getElementById('email').value

  let user = new GetUser(name, email);

  users.push(user);

  localStorage.setItem('users', JSON.stringify(users));

  window.location.replace("home.html");
}



