const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('ambos campos son obligatorios');
        return;
    }
    consultarApi(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

if (!alerta) {

    
    const alerta = document.createElement('div');
    
    alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rouded',
    'max-w-md','mx-auto','mt-6','text-center');

    alerta.innerHTML = `
    <strong class="font-bold">Error!!</strong>
    <span class="block">${mensaje}</span>
    `;
    container.appendChild(alerta)

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

    
}

function consultarApi(ciudad, pais) {
    
    const appId = 'b69105900fe5dd12c9bd0a8d20e0e68a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    console.log(url)


    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
       limpiarHTML();
    if (datos.cod === "404") {
        mostrarError('ciudad no encontrada');
    }
    mostrarClima(datos);
    })
}

function mostrarClima(datos) {
    const {name,main:{temp, temp_max, temp_min}} = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);
const nombreCiudad = document.createElement('p')
nombreCiudad.textContent = `Clima en ${name}`;
nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `Actual ${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Maxima ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');
    
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Minima ${min} &#8451;`;
    tempMinima.classList.add('text-xl');



   
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
resultadoDiv.appendChild(tempMinima);
    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = (grados) => {
    return parseInt(grados - 271.15);
}


function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML =`
    
  <div class="sk-circle1 sk-child"></div>
  <div class="sk-circle2 sk-child"></div>
  <div class="sk-circle3 sk-child"></div>
  <div class="sk-circle4 sk-child"></div>
  <div class="sk-circle5 sk-child"></div>
  <div class="sk-circle6 sk-child"></div>
  <div class="sk-circle7 sk-child"></div>
  <div class="sk-circle8 sk-child"></div>
  <div class="sk-circle9 sk-child"></div>
  <div class="sk-circle10 sk-child"></div>
  <div class="sk-circle11 sk-child"></div>
  <div class="sk-circle12 sk-child"></div>

    `;
    resultado.appendChild(divSpinner);
}