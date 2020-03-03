/*jshint esversion: 6 */
var validated = false;

var Visitado;
var TasaCetes;
var UsdFx;

// Variables de simulacion
var DiasRestantes;
var Precio2;
var TasaDescuento;
var MxnPrincipales;
var UsdPrincipales;
var MxnPandl;
var UsdPandl;
var PandlFx;
var PandlNetos;

function actualizarInversion() {
  var invinicialUSD = document.getElementById("inversion-inicial-usd").value;
  var fx = document.getElementById("fx-usd").value;
  var invinicialMXN = document.getElementById("inversion-inicial-mxn");
  var valorNominal = document.getElementById("valor-nominal").value;
  var tasaRendimiento = document.getElementById("tasa-rendimiento");
  var terminoPlazo = document.getElementById("termino-plazo");
  var tasaDescuento = document.getElementById("tasa-descuento");
  var precio = document.getElementById("precio-cete");
  var numTitulos = document.getElementById("numero-titulos");
  var inversionCapital = document.getElementById("inversion-capital");

  invinicialMXN.value = invinicialUSD * fx;
  if (parseInt(invinicialMXN.value) != 0 && parseInt(precio.value) != 0) {
    numTitulos.value = parseInt(invinicialMXN.value / precio.value);
  }
  switch (terminoPlazo.value) {
    case "28":
      tasaRendimiento.value = 6.91;
      break;
    case "91":
      tasaRendimiento.value = 6.86;
      break;
    case "182":
      tasaRendimiento.value = 6.73;
      break;
    case "364":
      tasaRendimiento.value = 6.66;
      break;
    default:
      break;
  }
  porcentajeRendimiento = tasaRendimiento.value / 100;
  tasaDescuento.value = (
    (porcentajeRendimiento /
      (1 + (porcentajeRendimiento * terminoPlazo.value) / 360)) *
    100
  ).toFixed(4);
  precio.value = (
    valorNominal /
    (1 + (porcentajeRendimiento * terminoPlazo.value) / 360)
  ).toFixed(4);
  inversionCapital.value = (precio.value * numTitulos.value).toFixed(2);
}

function continuar() {
  validated = true;
  // Generar opciones de iteraciones
  var numSimulaciones = document.getElementById("num-simulaciones").value;
  var numTasas = document.getElementById("num-tasas").value;
  var indexSimulacion = document.getElementById("index-simulacion");
  var indexTasa = document.getElementById("index-tasa");

  // Inicializar select
  indexSimulacion.innerHTML = "";
  for (let i = 0; i < numSimulaciones; i++) {
    indexSimulacion.innerHTML +=
      "<option value=" + (i + 1) + ">" + (i + 1) + "</option>";
  }
  indexTasa.innerHTML = "";
  for (let i = 0; i < numTasas; i++) {
    indexTasa.innerHTML +=
      "<option value=" + (i + 1) + ">" + (i + 1) + "</option>";
  }
  // Crear arrays de simulaciones
  TasaCetes = new Array(numSimulaciones);
  UsdFx = new Array(numSimulaciones);
  DiasRestantes = new Array(numSimulaciones);
  Precio2 = new Array(numSimulaciones);
  TasaDescuento = new Array(numSimulaciones);
  MxnPrincipales = new Array(numSimulaciones);
  UsdPrincipales = new Array(numSimulaciones);
  MxnPandl = new Array(numSimulaciones);
  UsdPandl = new Array(numSimulaciones);
  PandlFx = new Array(numSimulaciones);
  PandlNetos = new Array(numSimulaciones);
  // Crear arrays de tasas
  for (let i = 0; i < numSimulaciones; i++) {
    TasaCetes[i] = new Array(numTasas);
    UsdFx[i] = new Array(numTasas);
    DiasRestantes[i] = new Array(numTasas);
    Precio2[i] = new Array(numTasas);
    TasaDescuento[i] = new Array(numTasas);
    MxnPrincipales[i] = new Array(numTasas);
    UsdPrincipales[i] = new Array(numTasas);
    MxnPandl[i] = new Array(numTasas);
    UsdPandl[i] = new Array(numTasas);
    PandlFx[i] = new Array(numTasas);
    PandlNetos[i] = new Array(numTasas);
  }

  // Inicializar arrays 2D
  for (let i = 0; i < numSimulaciones; i++) {
    for (let j = 0; j < numTasas; j++) {
      TasaCetes[i][j] = 0;
      UsdFx[i][j] = 0;
      DiasRestantes[i][j] = 0;
      Precio2[i][j] = 0;
      TasaDescuento[i][j] = 0;
      MxnPrincipales[i][j] = 0;
      UsdPrincipales[i][j] = 0;
      MxnPandl[i][j] = 0;
      UsdPandl[i][j] = 0;
      PandlFx[i][j] = 0;
      PandlNetos[i][j] = 0;
    }
  }

  $("#alert-datos-simulacion").attr("hidden", true);
  $("#card-datos-simulacion").attr("hidden", false);

  $("#body-datos-simulacion").collapse("show");
}

function obtenerDatos() {
  // Parametros x simulacion
  var tasaCetes = document.getElementById("tasa-cetes");
  var usdFx = document.getElementById("fx-usd-2");
  var indexSimulacion = document.getElementById("index-simulacion"); // Empieza en 1
  var indexTasa = document.getElementById("index-tasa"); // Empieza en 1
  let i = indexSimulacion.value - 1;
  let j = indexTasa.value - 1;

  // Variables de simulacion
  var diasRestantes = document.getElementById("dias-restantes");
  var precio2 = document.getElementById("precio-cete-2");
  var tasaDescuento = document.getElementById("tasa-descuento-2");
  var mxnPrincipales = document.getElementById("mxn-principales");
  var usdPrincipales = document.getElementById("usd-principales");
  var mxnPandl = document.getElementById("pandl-mxn");
  var usdPandl = document.getElementById("pandl-usd");
  var pandlFx = document.getElementById("pandl-fx-usd");
  var pandlNetos = document.getElementById("pandl-netos-usd");

  tasaCetes.value = TasaCetes[i][j];
  usdFx.value = UsdFx[i][j];
  diasRestantes.value = DiasRestantes[i][j];
  precio2.value = Precio2[i][j];
  tasaDescuento.value = TasaDescuento[i][j];
  mxnPrincipales.value = MxnPrincipales[i][j];
  usdPrincipales.value = UsdPrincipales[i][j];
  mxnPandl.value = MxnPandl[i][j];
  usdPandl.value = UsdPandl[i][j];
  pandlFx.value = PandlFx[i][j];
  pandlNetos.value = PandlNetos[i][j];
}

function actualizarSimulacion() {
  // Constantes
  var invinicialUSD = document.getElementById("inversion-inicial-usd").value;
  var invinicialMXN = document.getElementById("inversion-inicial-mxn").value;
  var inversionCapital = document.getElementById("inversion-capital").value;
  var valorNominal = document.getElementById("valor-nominal").value;
  var terminoPlazo = document.getElementById("termino-plazo").value;
  var numTitulos = document.getElementById("numero-titulos").value;

  // Parametros globales
  var diasDespues = document.getElementById("dias-despues").value;
  var numSimulaciones = document.getElementById("num-simulaciones").value;

  // Parametros x simulacion
  var tasaCetes = document.getElementById("tasa-cetes").value;
  var usdFx = document.getElementById("fx-usd-2").value;
  var indexSimulacion = document.getElementById("index-simulacion").value; // Empieza en 1

  // Variables de simulacion
  var diasRestantes = document.getElementById("dias-restantes");
  var precio2 = document.getElementById("precio-cete-2");
  var tasaDescuento = document.getElementById("tasa-descuento-2");
  var mxnPrincipales = document.getElementById("mxn-principales");
  var usdPrincipales = document.getElementById("usd-principales");
  var mxnPandl = document.getElementById("pandl-mxn");
  var usdPandl = document.getElementById("pandl-usd");
  var pandlFx = document.getElementById("pandl-fx-usd");
  var pandlNetos = document.getElementById("pandl-netos-usd");

  // Setear datos de la iteración

  // Calculos
  tasaCetes = tasaCetes / 100;
  diasRestantes.value = terminoPlazo - diasDespues;
  tasaDescuento.value = (
    (tasaCetes / (1 + (tasaCetes * diasRestantes.value) / 360)) *
    100
  ).toFixed(4);
  precio2.value = (
    valorNominal /
    (1 + (tasaCetes * diasRestantes.value) / 360)
  ).toFixed(4);
  mxnPrincipales.value = (numTitulos * precio2.value).toFixed(2);
  if (!isNaN(usdFx) && usdFx != "" && parseFloat(usdFx) != 0.00) {
    usdPrincipales.value = (mxnPrincipales.value / usdFx).toFixed(2);
    mxnPandl.value = parseFloat(
      mxnPrincipales.value - inversionCapital
    ).toFixed(2);
    usdPandl.value = parseFloat(mxnPandl.value / usdFx).toFixed(2);
    pandlFx.value = parseFloat(usdPrincipales.value - invinicialUSD).toFixed(2);
    pandlNetos.value = (
      parseFloat(pandlFx.value) + parseFloat(usdPandl.value)
    ).toFixed(2);
  }
}

function calcularTodo() {
  var i = document.getElementById("index-simulacion").value;
  var j = document.getElementById("index-tasa").value;
  i -= 1; // Quitar 1
  j -= 1; // Quitar 1

  for (let i = 0; i < array.length; i++) {

  }
}

function guardarSimulacion() {
  // Parametros x simulacion
  var i = document.getElementById("index-simulacion").value;
  var j = document.getElementById("index-tasa").value;
  i -= 1; // Quitar 1
  j -= 1; // Quitar 1

  TasaCetes[i][j] = document.getElementById("tasa-cetes").value;
  UsdFx[i][j] = document.getElementById("fx-usd-2").value;

  // Variables de simulacion
  DiasRestantes[i][j] = document.getElementById("dias-restantes").value;
  Precio2[i][j] = document.getElementById("precio-cete-2").value;
  TasaDescuento[i][j] = document.getElementById("tasa-descuento-2").value;
  MxnPrincipales[i][j] = document.getElementById("mxn-principales").value;
  UsdPrincipales[i][j] = document.getElementById("usd-principales").value;
  MxnPandl[i][j] = document.getElementById("pandl-mxn").value;
  UsdPandl[i][j] = document.getElementById("pandl-usd").value;
  PandlFx[i][j] = document.getElementById("pandl-fx-usd").value;
  PandlNetos[i][j] = document.getElementById("pandl-netos-usd").value;

  // Crear alerta
  $("#cambios-guardados").addClass("show");
}

function dismissAlert() {
  $("#cambios-guardados").removeClass("show");
}

function propagarFx() {
  var usdFxActual = document.getElementById("fx-usd-2").value;

  var numTasas = document.getElementById("num-tasas").value;
  numTasas = parseInt(numTasas);
  var i = document.getElementById("index-simulacion").value;
  i -= 1;

  // Recorrer verticalmente las tasas en la iteracion
  for (let j = 0; j < numTasas; j++) {
    UsdFx[i][j] = usdFxActual;
  }
}

function propagarTasa() {
  var tasaCetes = document.getElementById("tasa-cetes").value;

  var numSimulaciones = document.getElementById("num-simulaciones").value;
  numSimulaciones = parseInt(numSimulaciones);
  var j = document.getElementById("index-tasa").value;
  j -= 1;

  // Recorrer verticalmente las tasas en la iteracion
  for (let i = 0; i < numSimulaciones; i++) {
    TasaCetes[i][j] = tasaCetes;
  }
}

function borrar() {
  var numSimulaciones = document.getElementById("num-simulaciones").value;
  var numTasas = document.getElementById("num-tasas").value;

  // Borrar arrays 2D
  for (let i = 0; i < numSimulaciones; i++) {
    for (let j = 0; j < numTasas; j++) {
      TasaCetes[i][j] = 0;
      UsdFx[i][j] = 0;
      DiasRestantes[i][j] = 0;
      Precio2[i][j] = 0;
      TasaDescuento[i][j] = 0;
      MxnPrincipales[i][j] = 0;
      UsdPrincipales[i][j] = 0;
      MxnPandl[i][j] = 0;
      UsdPandl[i][j] = 0;
      PandlFx[i][j] = 0;
      PandlNetos[i][j] = 0;
    }
  }
}

function resultados() {
  var numSimulaciones = document.getElementById("num-simulaciones").value;
  numSimulaciones = parseInt(numSimulaciones);
  var numTasas = document.getElementById("num-tasas").value;
  numTasas = parseInt(numTasas);
  var tablaResultados = document.getElementById("tabla-resultados");
  tablaResultados.innerHTML = '';
  for (var i = 0; i < numSimulaciones; i++) {
    for (var j = 0; j < (numTasas + 1); j++) {
      // Poner tabla de resultados
      if (j == 0) {
        // Renglon de encabezados
        tablaResultados.innerHTML += '<table class="table my-3"><thead><tr scope="col" id="row-iteracion-' + i + '"><th># Iteracion ' + (i + 1) + "</th></tr></thead><tbody>" +
          '<tr id="row-tasa-cetes-' + i + '"><th>Tasa CETES</th></tr>' +
          '<tr id="row-fx-usd-2-' + i + '"><th>Fx USD → MXN nuevo</th></tr>' +
          '<tr id="row-dias-restantes-' + i + '"><th>Días restantes</th></tr>' +
          '<tr id="row-tasa-descuento-2-' + i + '"><th>Tasa de descuento</th></tr>' +
          '<tr id="row-precio-cete-2-' + i + '"><th>Precio CETE</th></tr>' +
          '<tr id="row-mxn-principales-' + i + '"><th>Inversión inicial nuevo Fx (MXN)</th></tr>' +
          '<tr id="row-usd-principales-' + i + '"><th>Inversión inicial nuevo Fx (USD)</th></tr>' +
          '<tr id="row-pandl-mxn-' + i + '"><th>Profit & Loss (MXN)</th></tr>' +
          '<tr id="row-pandl-usd-' + i + '"><th>Profit & Loss (USD)</th></tr>' +
          '<tr id="row-pandl-fx-usd-' + i + '"><th>Profit & Loss por Fx a USD</th></tr>' +
          '<tr id="row-pandl-netos-usd-' + i + '"><th>Profit & Loss netos (USD)</th></tr>';
      }
      else {
        // Renglones
        $("#row-iteracion-" + i).append("<th>" + (i + 1) + ", " + j + "</th>");
        $("#row-tasa-cetes-" + i).append("<td>" + TasaCetes[i][j - 1] + "</td>");
        $("#row-fx-usd-2-" + i).append("<td>" + UsdFx[i][j - 1] + "</td>");
        $("#row-dias-restantes-" + i).append("<td>" + DiasRestantes[i][j - 1] + "</td>");
        $("#row-tasa-descuento-2-" + i).append("<td>" + TasaDescuento[i][j - 1] + "</td>");
        $("#row-precio-cete-2-" + i).append("<td>" + Precio2[i][j - 1] + "</td>");
        $("#row-mxn-principales-" + i).append("<td>" + MxnPrincipales[i][j - 1] + "</td>");
        $("#row-usd-principales-" + i).append("<td>" + UsdPrincipales[i][j - 1] + "</td>");
        $("#row-pandl-mxn-" + i).append("<td>" + MxnPandl[i][j - 1] + "</td>");
        $("#row-pandl-usd-" + i).append("<td>" + UsdPandl[i][j - 1] + "</td>");
        $("#row-pandl-fx-usd-" + i).append("<td>" + PandlFx[i][j - 1] + "</td>");
        $("#row-pandl-netos-usd-" + i).append("<td>" + PandlNetos[i][j - 1] + "</td>");
      }
    }
    tablaResultados.innerHTML += "</tbody></table>";
  }

  $("#alert-resultados").attr("hidden", true);
  $("#alert-probabilidad").attr("hidden", true);
  $("#card-resultados").attr("hidden", false);
  $("#card-probabilidad").attr("hidden", false);

  $("#body-resultados").collapse("show");
  $("#body-probabilidad").collapse("show");
}

function probabilidad() {
  var numSimulaciones = document.getElementById("num-simulaciones").value;
  numSimulaciones = parseInt(numSimulaciones);
  var numTasas = document.getElementById("num-tasas").value;
  numTasas = parseInt(numTasas);
  var tablaProbabilidad = document.getElementById("tabla-probabilidad");
  tablaProbabilidad.innerHTML = '';

  var exitos = 0;
  var perdidas = 0;
  var total = numSimulaciones * numTasas;

  for (var i = 0; i < numSimulaciones; i++) {
    for (var j = 0; j < (numTasas + 1); j++) {
      if (j == 0) {
        tablaProbabilidad.innerHTML += '<table class="table my-3"><thead><tr scope="col" id="row-iteracion-probabilidad-' + i + '"><th># Iteracion ' + (i + 1) + "</th></tr></thead><tbody>" +
          '<tr id="row-fx-usd-probabilidad-' + i + '"><th>Fx ' + UsdFx[i][j] + "</th></tr>";
      }
      else {
        $("#row-iteracion-probabilidad-" + i).append("<th>" + (i + 1) + ", " + j + "</th>");
        $("#row-fx-usd-probabilidad-" + i).append("<td>" + PandlNetos[i][j - 1] + "</td>");

        // Checar si es éxito o pérdida
        if (Math.sign(PandlNetos[i][j - 1]) == 1) {
          // Éxito
          exitos++;
        }
        else if (Math.sign(PandlNetos[i][j - 1]) == -1) {
          // Pérdida
          perdidas++;
        }
      }
    }
    tablaProbabilidad.innerHTML += "</tbody>";
  }
  tablaProbabilidad.innerHTML += "</table>";

  var probabilidadExito = document.getElementById("probabilidad-exito");
  var probabilidadPerdida = document.getElementById("probabilidad-perdida");

  probabilidadExito.innerHTML += (exitos / total).toFixed(2);
  probabilidadPerdida.innerHTML += (perdidas / total).toFixed(2);
}
