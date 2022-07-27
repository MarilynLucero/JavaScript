//calcula cuotas con o sin interes
//descuento del 5% si paga en efectivo
//descuento adicional si paga con tarjetas del banco santander rio debito 10%
//1c- 0% 3c-8% 6c-12% 

const iva = (x) => (x * 0.21);
const suma = (a,b) => a + b;
const descuento = (x, y) => x * y;
const interes = descuento;
const carritoLibro= [];
const libroStock = [{ nombre:'Cementerio De Animales', autor:'Stephen King', editorial:'Alfaguara', costo:'$5100', stock: 2}, {nombre:'Battle Royale', autor:'Koushun Takami', editorial:'Booket', costo:'$2500', stock: 4},{nombre:'La Vida Invisible De Addie Larue', autor:'Victoria Schwab', editorial:'Urano', costo:'$3500', stock: 0},{nombre:'Una Breve Historia De Casi Todo', autor:'Bryson Bill', editorial:'Corre la voz', costo:'$2400', stock: 0},{nombre:'Asesino De Brujas, La Bruja Blanca', autor:'Shelby Mahurin', editorial:'PUCK', costo:'$2900', stock: 1}];

function menu(){
    let menuLibro= prompt('Elegí la opción deseada: \n1-Consulta de stock. \n2-Cotizacion del producto. \n3-Mi carrito. \n4-Consulta nuestro stock disponible.')

    switch(menuLibro){
        case '1':
            Consulta();
            break;
        
        case '2':
            Cotizacion();
            break;    

        case '3':
            miCarrito();
            break; 
        case '4':
            buscaLibro();
            break;
        default:
            alert('Ingresaste una opción no válida, intenta nuevamente.')
            break;    
    }
}

function Consulta(){
    //Consulta de stock, agregar un carrito de compra.
    //Objeto: Nombre, autor, editorial, costo.
    let mensajeStock= 'Estos son los libros a disposición: \n'
    for(let i=0; i<libroStock.length; i++ ){
        mensajeStock+= i + '-' + libroStock[i].nombre + ' ~ ' + libroStock[i].autor + '\n';
    };
    let libroElegido = prompt(mensajeStock);
    let eleccion = prompt('Tu libro elegido es: ' + libroStock[libroElegido].nombre + ' ~ ' + libroStock[libroElegido].autor + ' de la editorial ' + libroStock[libroElegido].editorial + '. El costo de tu libro es: ' + libroStock[libroElegido].costo+'.' + '\nDeseas agregarlo a tu carrito?\n1-Si \n2-No');
    if(eleccion=='1'){
        carritoLibro.push(libroElegido);
        let preguntaCarrito= prompt('Deseas agregar otro libro? \n1-Si \n-2No');
        switch(preguntaCarrito){
            case '1':
                Consulta();
                break;

            case '2':
                menu();
                break;
        }
    }
}

function Cotizacion(){
    let precioLibro = parseInt(prompt('Ingresá el valor de tu libro'));
    let formaDePago = prompt(`Ingresá tu metodo de pago  
    1-Efectivo
    2-Tarjeta de crédito`);

    const precioConIva = suma(precioLibro,iva(precioLibro));
    let precioTotal = 0;

    if(formaDePago=='1'){
        const descuentoAplicado = descuento(precioConIva, 0.05);
        precioTotal = precioConIva-descuentoAplicado;
        alert(precioTotal); 


    } else if (formaDePago==2){
        let debitoCredito = prompt('Va a ser con debito o credito? \n1-Débito \n2-Crédito');
            switch (debitoCredito) {
                case '1':
                    //Pago con tarjeta debito
                    let santanderTarjeta = prompt('Vas a pagar con santanderio rio? \n1-Si \n2-No');
                    switch(santanderTarjeta){
                        case '1':
                            //Pago con santander rio
                            const descuentoSantander = descuento(precioConIva, 0.10);
                            precioTotal = precioConIva-descuentoSantander;
                            alert(precioTotal);
                            break;
                        case '2':
                            //Pago con otra tarjeta
                            precioTotal = precioConIva;
                            alert(precioTotal);
                            break;
                        default:
                        alert('No existe esa opción ingresada, intenta nuevamente');
                        break;
                    }
                    break;
                case '2':
                    //Pago con tarjeta de credito
                    let cantidadCuotas = prompt('En cuantas cuotas vas a abonar? \n1-1 cuota \n2-3 cuotas \n3-6 cuotas')
                    let precioconInteres = 0;
                    let precioCuota =0;
                    switch(cantidadCuotas){
                        case '1':
                            //1 cuota
                            precioTotal = precioConIva;
                            alert(precioTotal);
                            break;
                        case '2':
                            //3 cuotas
                            precioconInteres = interes(precioConIva, 0.08);
                            precioTotal = precioConIva+precioconInteres;
                            precioCuota= precioTotal/3
                            alert('El valor total de tu compra es ' + precioTotal + ' y el valor de tus cuotas es: ' + precioCuota);
                            break;
                        case '3':
                            //6 cuotas
                            precioconInteres = interes(precioConIva, 0.12);
                            precioTotal = precioConIva+precioconInteres;
                            precioCuota= precioTotal/6
                            alert('El valor total de tu compra es ' + precioTotal + ' y el valor de tus cuotas es: ' + precioCuota);
                            break;
                        default:
                        alert('No existe esa opción ingresada, intenta nuevamente');
                        break;
                    }
                    break;
                default:
                    alert('No existe esa opción ingresada, intenta nuevamente');
                    break;
            }
    }else{
        alert('No existe esa opción ingresada, intenta nuevamente');
    }
}

function miCarrito(){
    let mensajeCarrito= 'Estos son los libros en tu carrito: \n'
    for(let i=0; i<carritoLibro.length; i++ ){
        //carritolibro guarda la posicion del libro en libroStock.
        mensajeCarrito+= i + '-' + libroStock[carritoLibro[i]].nombre + ' ~ ' + libroStock[carritoLibro[i]].autor + ' ' + libroStock[carritoLibro[i]].costo + '\n';
    };
    alert(mensajeCarrito);
    let eliminarCarrito= prompt('Desea eliminar alguno? \n1-Si \n2-No');

    switch(eliminarCarrito){
        case '1':
            let libroEliminado= prompt(mensajeCarrito + '\nCuál?');
            carritoLibro.splice(libroEliminado,1);
            miCarrito();
            break;
        case '2':
            menu();
            break;
    }
}

//buscar libro
function buscaLibro(){
    const encontrado = libroStock.filter((libro)=>libro.stock>0)
    let mensajeBuscar= 'Estos son los libros que tenemos en stock: \n'
    for(let i=0; i<encontrado.length; i++ ){
        //encuentra los libros en stock.
        mensajeBuscar+= i + '-' + encontrado[i].nombre + ' ~ ' + encontrado[i].autor + '. Tenemos ' + encontrado[i].stock + ' unidades, ' + encontrado[i].costo + '\n';
    };
    alert(mensajeBuscar);
}
menu();