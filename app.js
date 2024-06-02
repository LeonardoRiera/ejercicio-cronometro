/* momento de obtener referencia de los elementos de html para manipularlos en JS ( CACH THE DOM ) */

const cronometro = document.getElementById("cronometro");

const botonInicioPausa = document.getElementById('boton-inicio-pausa');
const botonReiniciar = document.getElementById('boton-reiniciar');


/* con esta sintaxis creamos tres variables definidas en un arreglo y les asignamos sus correspondientes valores */

let [horas, minutos, segundos] = [0, 0, 0];


let intervaloDeTiempo;
let estadoCronometro = "pausado";


function actualizarCronometro() {
  /* logica de la mecanica del reloj */

  /* inicio en un segundo */
  segundos++;

  if (segundos / 60 === 1) {
    segundos = 0;
    minutos++

    if (minutos / 60 === 1) {
      minutos = 0;
      horas++;
    }
  }

  /* para menejar como se presentaran en el cronometro los numeros de un solo digito */
  /* se define agregar un cero antes del numero de un solo digito, es decir se asigna un formato por eso creamos estas variables y la funcion */
  /*  ej 01, 02, 03 ... */

  const segundosConFormato = asignarFormato(segundos);
  const minutosConFormato = asignarFormato(minutos);
  const horasConFormato = asignarFormato(horas);

  /* actualizar el contenido del cronometro, lo que se le muestra al usuario */
  cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;


}


function asignarFormato(unidadDeTiempo) {
  return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}



/* ahora falta vincular el reloj con los botones */


botonInicioPausa.addEventListener('click', function() {
  if (estadoCronometro === 'pausado') {
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);

    /* la unidad de actualizacion para el metodo setInterval es de mili segundos, por eso ponemos 1000 para 1 segundo */
    /* window es un tipo de objeto */



    /* actualizar el html dinamicamente con la direccion del icono */
    botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>';

    /* tambien necesito actualizar algunas clases porque el mismo boton que ahora estando pausado el cronometro, 
    tiene la clase iniciar, si el cronometro ya inicio va a necesital la clase pausar porque cambia el objetivo del boton */
    botonInicioPausa.classList.remove('iniciar');
    botonInicioPausa.classList.add('pausar');
    estadoCronometro = 'andando';
  } else {
    window.clearInterval(intervaloDeTiempo); /* otro metodo, frena el conteo */
    botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
    botonInicioPausa.classList.remove('pausar');
    botonInicioPausa.classList.add('iniciar');
    estadoCronometro = 'pausado';
   };
});


/* ahora debemos trabajar en reiniciar el cronometro */
botonReiniciar.addEventListener('click', function() {
  window.clearInterval(intervaloDeTiempo);

  horas = 0;
  minutos = 0;
  segundos = 0;

  /* reiniciar */ 
  cronometro.innerText = '00:00:00';

  /* actualizar botones */
  botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';

  botonInicioPausa.classList.remove('pausar');
  botonInicioPausa.classList.add('iniciar');

  estadoCronometro = 'pausado';
});
