//calcula cuotas con o sin interes
//descuento del 5% si paga en efectivo
//descuento adicional si paga con tarjetas del banco santander rio debito 10%
//1c- 0% 3c-8% 6c-12% 

const iva = (x) => (x * 0.21);
const suma = (a,b) => a + b;
const descuento = (x, y) => x * y;
const interes = descuento;


let precioLibro = parseInt(prompt('Ingresá el valor de tu libro'));
let formaDePago = prompt(`Ingresá tu metodo de pago  
1-Efectivo
2-Tarjeta de crédito`)

const precioConIva = suma(precioLibro,iva(precioLibro));
let precioTotal = 0;

if(formaDePago=='1'){
    const descuentoAplicado = descuento(precioConIva, 0.05);
    precioTotal = precioConIva-descuentoAplicado;
    alert(precioTotal); 


} else if (formaDePago==2){
    let debitoCredito = prompt('Va a ser con debito o credito? \n1-Débito \n2-Crédito')
        switch (debitoCredito) {
            case '1':
                //Pago con tarjeta debito
                let santanderTarjeta = prompt('Vas a pagar con santanderio rio? \n1-Si \n2-No')
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

