//calcula cuotas con o sin interes
//descuento del 5% si paga en efectivo
//descuento adicional si paga con tarjetas del banco santander rio debito 10%
//1c- 0% 3c-8% 6c-12% 

const iva = (x) => (x * 0.21);
const suma = (a, b) => a + b;
const descuento = (x, y) => x * y;
const interes = descuento;
const verificar = document.querySelector("#verificar");
const cotizar = document.querySelector("#cotizar");
const carrito = document.querySelector("#carrito");
const stock = document.querySelector("#stock");
const alertdiv = document.querySelector("#alert");
const contentstock = document.querySelector("#contenidoStock");
const contentcotizar = document.querySelector("#contenidoCotizar");
const carritoDelete = document.querySelector("#carritoDelete")
const librosVerificar = document.querySelector("#librosVerificar")

const carritoLibro = [];
const libroStock = [{
    id: "libroA",  
    nombre: 'Cementerio De Animales',
    autor: 'Stephen King',
    editorial: 'Alfaguara',
    costo: '$5100',
    stock: 2
}, {
    id: "libroB", 
    nombre: 'Battle Royale',
    autor: 'Koushun Takami',
    editorial: 'Booket',
    costo: '$2500',
    stock: 4
}, {
    id: "libroC",
    nombre: 'La Vida Invisible De Addie Larue',
    autor: 'Victoria Schwab',
    editorial: 'Urano',
    costo: '$3500',
    stock: 0
}, {
    id: "libroD",
    nombre: 'Una Breve Historia De Casi Todo',
    autor: 'Bryson Bill',
    editorial: 'Corre la voz',
    costo: '$2400',
    stock: 0
}, {
    id: "libroE",
    nombre: 'Asesino De Brujas, La Bruja Blanca',
    autor: 'Shelby Mahurin',
    editorial: 'PUCK',
    costo: '$2900',
    stock: 1
}];

const loader = () => {
    verificar.addEventListener("click", consulta, false);
    cotizar.addEventListener("click", cotizacion, false);
    carrito.addEventListener("click", miCarrito, false);
    stock.addEventListener("click", buscaLibro, false);
};
window.onload = loader;

function consulta() {
    //Consulta de stock, agregar un carrito de compra.
    //Objeto: Nombre, autor, editorial, costo.
    let mensajeStock = `<h1>Estos son los libros a disposición. \n</h1><ul class="list-group">`
    for (let i = 0; i < libroStock.length; i++) {
        mensajeStock +=`<li class="list-group-item list-group-item-primary"> ${libroStock[i].nombre} ~ ${libroStock[i].autor} ~ ${libroStock[i].editorial}. 
        ${libroStock[i].costo} 
        <button id=${libroStock[i].id} type="button" class="btn btn-primary agregando">Agregar</button>
         </li>`
    };
    mensajeStock+=`</ul>`;
    librosVerificar.innerHTML = mensajeStock;
    const agregando = document.getElementsByClassName("agregando");
    for(let i = 0; i < agregando.length; i++){
        agregando[i].addEventListener("click", ()=>{Agregar(agregando[i].id)});
    };
    
}

function cotizacion() {
    let precioLibro = parseInt(prompt('Ingresá el valor de tu libro'));
    let formaDePago = prompt(`Ingresá tu metodo de pago  
    1-Efectivo
    2-Tarjeta de crédito`);

    const precioConIva = suma(precioLibro, iva(precioLibro));
    let precioTotal = 0;

    if (formaDePago == '1') {
        const descuentoAplicado = descuento(precioConIva, 0.05);
        precioTotal = precioConIva - descuentoAplicado;
        contentcotizar.innerHTML = `<h1>El valor de tu libro es $${precioTotal}</h1>`;


    } else if (formaDePago == 2) {
        let debitoCredito = prompt('Va a ser con debito o credito? \n1-Débito \n2-Crédito');
        switch (debitoCredito) {
            case '1':
                //Pago con tarjeta debito
                let santanderTarjeta = prompt('Vas a pagar con santanderio rio? \n1-Si \n2-No');
                switch (santanderTarjeta) {
                    case '1':
                        //Pago con santander rio
                        const descuentoSantander = descuento(precioConIva, 0.10);
                        precioTotal = precioConIva - descuentoSantander;
                        contentcotizar.innerHTML = `<h1>El valor de tu libro es $${precioTotal}</h1>`;
                        break;
                    case '2':
                        //Pago con otra tarjeta
                        precioTotal = precioConIva;
                        contentcotizar.innerHTML = `<h1>El valor de tu libro es $${precioTotal}</h1>`;
                        break;
                    default:
                        alertdiv.innerHTML = `<h1>Ingresaste una opción no válida, intenta nuevamente.</h1>`;
                        break;
                }
                break;
            case '2':
                //Pago con tarjeta de credito
                let cantidadCuotas = prompt('En cuantas cuotas vas a abonar? \n1-1 cuota \n2-3 cuotas \n3-6 cuotas')
                let precioconInteres = 0;
                let precioCuota = 0;
                switch (cantidadCuotas) {
                    case '1':
                        //1 cuota
                        precioTotal = precioConIva;
                        contentcotizar.innerHTML = `<h1>El valor de tu libro es $${precioTotal}</h1>`;
                        break;
                    case '2':
                        //3 cuotas
                        precioconInteres = interes(precioConIva, 0.08);
                        precioTotal = precioConIva + precioconInteres;
                        precioCuota = precioTotal / 3
                        contentcotizar.innerHTML = `<h1>El valor de tu libro es $${precioTotal} y el valor de tus cuotas es $${precioCuota}</h1>`;
                        break;
                    case '3':
                        //6 cuotas
                        precioconInteres = interes(precioConIva, 0.12);
                        precioTotal = precioConIva + precioconInteres;
                        precioCuota = precioTotal / 6
                        contentcotizar.innerHTML = `<h1>El valor de tu libro es $${precioTotal} y el valor de tus cuotas es $${precioCuota}</h1>`;
                        break;
                    default:
                        alertdiv.innerHTML = `<h1>Ingresaste una opción no válida, intenta nuevamente.</h1>`;
                        break;
                }
                break;
            default:
                alertdiv.innerHTML = `<h1>Ingresaste una opción no válida, intenta nuevamente.</h1>`;
                break;
        }
    } else {
        alertdiv.innerHTML = `<h1>Ingresaste una opción no válida, intenta nuevamente.</h1>`;
    }
}

function miCarrito() {
    let mensajeCarrito = `<h1>Estos son los libros en tu carrito \n</h1>`
    for (let i = 0; i < carritoLibro.length; i++) {
        //carritolibro guarda la posicion del libro en libroStock.
        mensajeCarrito += `<div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${libroStock[carritoLibro[i]].nombre}</h5>
        <p class="card-text">Este libro es de ${libroStock[carritoLibro[i]].autor}, de la editorial ${libroStock[carritoLibro[i]].editorial}. Por un precio de ${libroStock[carritoLibro[i]].costo}.</p>
        <a href="#" id=${libroStock[carritoLibro[i]].id} class="btn btn-primary eliminando">Eliminar del carrito</a>
        </div>
        </div>`
    };
    carritoDelete.innerHTML = mensajeCarrito;
    const eliminando = document.getElementsByClassName("eliminando");
    for(let i = 0; i < eliminando.length; i++){
        eliminando[i].addEventListener("click", ()=>{Eliminar(eliminando[i].id)});
    };
}


//buscar libro
function buscaLibro() {
    const encontrado = libroStock.filter((libro) => libro.stock > 0)
    let mensajeBuscar = `<h1>Estos son los libros que tenemos disponibles.</h1>`
    for (let i = 0; i < encontrado.length; i++) {
        //encuentra los libros en stock.
        mensajeBuscar += `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${encontrado[i].nombre}</h5>
          <p class="card-text">Este libro es de ${encontrado[i].autor}, de la editorial ${encontrado[i].editorial}. Por un precio de ${encontrado[i].costo}.</p>
          <a href="#" id=${encontrado[i].id} class="btn btn-primary agregandodeStock">Agregar al carrito</a>
        </div>
      </div>`
    };
    contentstock.innerHTML = mensajeBuscar;
    const agregandodeStock = document.getElementsByClassName("agregandodeStock");
    for(let i = 0; i < agregandodeStock.length; i++){
        agregandodeStock[i].addEventListener("click", ()=>{Agregar(agregandodeStock[i].id)});
    };
}

//Agregar
function buscarporId(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return i;
      }
    }
}

function Agregar(id){
    console.log(id);
    let libroAgregar = buscarporId(libroStock,id);
    carritoLibro.push(libroAgregar);
    alertdiv.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
    Libro agregado con éxito.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
  console.log(carritoLibro);
}

//Eliminar
function Eliminar(id){
    let libroEliminar = buscarporId(libroStock,id);
    libroEliminar=carritoLibro.indexOf(libroEliminar);
    carritoLibro.splice(libroEliminar, 1);
    alertdiv.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
    Libro Eliminado con éxito.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}