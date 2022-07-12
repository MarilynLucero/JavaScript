let numero= prompt('Ingresá una número del 1 al 5 y te recomendamos un libro sorpresa.\nIngresá 0 para salir.');
do{
    switch(numero) {
        case '1':
            alert('Asesino de Brujas 1 - Shelby Mahurin');
            break;
        case '2':
            alert('Battle Royale - Koushun Takami');
            break;
        case '3':
            alert('It - Stephen King');
            break;
        case '4':
            alert('La Vida Invisible De Addie Larue - Victoria Schwab');
            break;
        case '5':
            alert('Muerte En El Nilo - Agatha Christie');
            break;
        default:
            alert('Ingresaste una opción inválida');
            break;       
    }
    numero= prompt('Ingresá una número del 1 al 5 y te recomendamos un libro sorpresa.\nIngresá 0 para salir.');
}while(numero!='0')