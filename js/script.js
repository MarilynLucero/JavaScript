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

let carritoLibro = [];
let libroStock = [];

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
    traeStock().then((libroStock)=>{
        libroStock.forEach((libro) => {
        const {nombre, autor, editorial, costo, id} = libro; //desestructuracion
        mensajeStock += `<li class="list-group-item list-group-item-primary"> ${nombre} ~ ${autor} ~ ${editorial}. 
        ${costo} 
        <button id=${id} type="button" class="btn btn-primary agregando">Agregar</button>
         </li>`
        });
    
        mensajeStock += `</ul>`;
        librosVerificar.innerHTML = mensajeStock;
        const agregando = document.getElementsByClassName("agregando");
        for (let i = 0; i < agregando.length; i++) {
            agregando[i].addEventListener("click", () => {
                agregar(agregando[i].id)
            });
        };
    });
};

function cotizacion() {
    contentcotizar.innerHTML = `
     <h3>Ingresá el valor de tu libro</h3>
        <div class="input-group mb-3 campo">
        <input id="campoCotizar1" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
     </div>
     <button id="botonCotizar1" type="button" class="btn btn-warning">Continuá</button>`
    document.getElementById("botonCotizar1").addEventListener('click', () => {
        let precioLibro = parseInt(document.getElementById("campoCotizar1").value);
        if (isNaN(precioLibro)) {
            alert("El dato ingresado es inválido.")
        }else{
        cotizacionMetodo(precioLibro);
        };

    });
}

function cotizacionMetodo(precioLibro) {
    contentcotizar.innerHTML = `
    <h3>Ingresá tu metodo de pago.</h3>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="metododepago" id="efectivo">
    <label class="form-check-label" for="efectivo">
      Efectivo
    </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="metododepago" id="tarjeta" checked>
    <label class="form-check-label" for="tarjeta">
      Tarjeta de crédito
    </label>
     </div>
    <button id="botonCotizar2" type="button" class="btn btn-warning">Continuá</button>`
    document.getElementById("botonCotizar2").addEventListener('click', () => {
        let formaDePago = "";
        (true == document.getElementById("efectivo").value) ? formaDePago = "1": formaDePago = "2"; //aplicando operador ternario


        const precioConIva = suma(precioLibro, iva(precioLibro));
        let precioTotal = 0;

        if (formaDePago == '1') {
            const descuentoAplicado = descuento(precioConIva, 0.05);
            precioTotal = precioConIva - descuentoAplicado;
            contentcotizar.innerHTML = `<h1>El valor de tu libro es $${precioTotal}</h1>`;
        

        } else {
            cotizacionTarjeta(precioConIva);
        }
    });

};

function cotizacionTarjeta(precioConIva) {
    contentcotizar.innerHTML = `
    <h3>Ingresá tu metodo de pago.</h3>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="creditoDebito" id="debito">
    <label class="form-check-label" for="debito">
      Débito
    </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="creditoDebito" id="credito" checked>
    <label class="form-check-label" for="credito">
      Crédito
    </label>
     </div>
    <button id="botonCotizar3" type="button" class="btn btn-warning">Continuá</button>`
    document.getElementById("botonCotizar3").addEventListener('click', () => {
        let debitoCredito = "";
        (true == document.getElementById("debito").value) ? debitoCredito = "1" : debitoCredito = "2"; //aplicando operador ternario
        switch (debitoCredito) {
            case '1':
                //Pago con otra tarjeta
                precioTotal = precioConIva;
                contentcotizar.innerHTML = `<h1>El valor de tu libro es $${precioTotal}</h1>`;
                break;
            case '2':
                cotizacionCredito(precioConIva);
                break;
        }
    });
}

function cotizacionCredito(precioConIva) {
    //Pago con tarjeta de credito
    contentcotizar.innerHTML = `
    <h3>Ingresá tu metodo de pago.</h3>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="cuotas" id="1">
    <label class="form-check-label" for="1">
      1 Cuota
    </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="cuotas" id="3" checked>
    <label class="form-check-label" for="3">
      3 Cuotas
    </label>
     </div>
     <div class="form-check">
    <input class="form-check-input" type="radio" name="cuotas" id="6" checked>
    <label class="form-check-label" for="6">
      6 Cuotas
    </label>
     </div>
    <button id="botonCotizar4" type="button" class="btn btn-warning">Continuá</button>`
    document.getElementById("botonCotizar4").addEventListener('click', () => {
        let cantidadCuotas = "";
        if (true == document.getElementById("1").value) {
            cantidadCuotas = "1";
        } else if (true == document.getElementById("3").value) {
            cantidadCuotas = "2";
        } else {
            cantidadCuotas = "3";
        }
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
    });
}

function miCarrito() {
    let mensajeCarrito = `<h1>Estos son los libros en tu carrito \n</h1>`
    traeStock().then((libroStock)=>{
        for (let i = 0; i < carritoLibro.length; i++) {
            //carritolibro guarda la posicion del libro en libroStock.
            const {nombre, autor, editorial, costo, id} = libroStock[carritoLibro[i]]; //desestructuracion
            mensajeCarrito += `<div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">Este libro es de ${autor}, de la editorial ${editorial}. Por un precio de ${costo}.</p>
            <a href="#" id=${id} class="btn btn-primary eliminando">Eliminar del carrito</a>
            </div>
            </div>`
            console.log(carritoLibro.length);
        };
        
        carritoDelete.innerHTML = mensajeCarrito;
        const eliminando = document.getElementsByClassName("eliminando");
        for (let i = 0; i < eliminando.length; i++) {
            eliminando[i].addEventListener("click", () => {
                eliminar(libroStock, eliminando[i].id)
            });
        };
    });
};


//buscar libro
function buscaLibro() {
    traeStock().then((libroStock)=>{
        const encontrado = libroStock.filter((libro) => libro.stock > 0)
        let mensajeBuscar = `<h1>Estos son los libros que tenemos disponibles.</h1>`
        for (let i = 0; i < encontrado.length; i++) {
            //encuentra los libros en stock.
            const {nombre, autor, editorial, costo, id} = encontrado[i]; //desestructuracion
            mensajeBuscar += `<div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">Este libro es de ${autor}, de la editorial ${editorial}. Por un precio de ${costo}.</p>
            <a href="#" id=${id} class="btn btn-primary agregandodeStock">Agregar al carrito</a>
            </div>
        </div>`
        };
        contentstock.innerHTML = mensajeBuscar;
        const agregandodeStock = document.getElementsByClassName("agregandodeStock");
        for (let i = 0; i < agregandodeStock.length; i++) {
            agregandodeStock[i].addEventListener("click", () => {
                agregar(libroStock,agregandodeStock[i].id)
            });
        };
    });
};

//Agregar
function buscarporId(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return i;
        }
    };
};

function agregar(libroStock,id) {
    const arg = [libroStock, id]
    
    let libroAgregar = buscarporId(...arg); //aplicando spread
    
    carritoLibro.push(libroAgregar); 
    Swal.fire({
        title: 'Libro agregado con éxito!',
        text: 'Se agregó tu libro al carrito',
        icon: 'success',
        confirmButtonText: 'Continuar'
    })
  guardeCarrito();
};

//Eliminar

function eliminar(libroStock, id) {
    let libroEliminar = buscarporId(libroStock, id);
    libroEliminar = carritoLibro.indexOf(libroEliminar);
    carritoLibro.splice(libroEliminar, 1);
    Swal.fire({
        title: 'Libro eliminado!',
        text: 'Se ha eliminado con éxito tu libro!',
        icon: 'error',
        confirmButtonText: 'Continuar'
    });
    guardeCarrito();
};

//Guardar carrito.

function guardeCarrito() {
    sessionStorage.setItem('carrito', JSON.stringify(carritoLibro));
};

function cargarCarrito(){
    carritoLibro= JSON.parse(sessionStorage.getItem('carrito'));
    carritoLibro!=null ? carritoLibro : carritoLibro=[]; //operador ternario
}; 

function mapaLocalizacion(){
let map = L.map('map').setView([-32.896696, -68.837596], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-32.896696, -68.837596]).addTo(map)
    .bindPopup('Estamos en Rondeau.<br> Esq. San Juan.')
    .openPopup();
};

async function traeStock() {
    const response = await fetch('./data/libros.json');
    const data = await response.json();
    console.log(data);
    return data;
}

mapaLocalizacion();
cargarCarrito(); 