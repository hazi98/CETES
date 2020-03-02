var validated = false;

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
        case '28':
            tasaRendimiento.value = 7.25;
            break;
        case '91':
            tasaRendimiento.value = 7.30;
            break;
        case '182':
            tasaRendimiento.value = 7.25;
            break;
        case '336':
            tasaRendimiento.value = 7.18;
            break;
        default:
            break;
    }
    porcentajeRendimiento = tasaRendimiento.value / 100;
    tasaDescuento.value = ((porcentajeRendimiento / (1 + (porcentajeRendimiento * terminoPlazo.value) / 360)) * 100).toFixed(2);
    precio.value = (valorNominal / (1 + (porcentajeRendimiento * terminoPlazo.value) / 360)).toFixed(2);
    inversionCapital.value = precio.value * numTitulos.value;
}

function continuar() {
    validated = true;
    // Generar opciones de iteraciones
    var numSimulaciones = document.getElementById("num-simulaciones").value;
    var indexSimulacion = document.getElementById("index-simulacion");

    for (let i = 0; i < numSimulaciones; i++) {
        indexSimulacion.innerHTML += "<option value=" + (i + 1) + ">" + (i + 1) + "</option>";
    }

    $("#alert-datos-simulacion").attr("hidden", true);
    $("#card-datos-simulacion").attr("hidden", false);

    $("#body-datos-simulacion").collapse('show');
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

    tasaCetes = tasaCetes / 100;

    diasRestantes.value = terminoPlazo - diasDespues;
    tasaDescuento.value = ((tasaCetes / (1 + (tasaCetes * diasRestantes.value) / 360)) * 100).toFixed(2);
    precio2.value = (valorNominal / (1 + (tasaCetes * diasRestantes.value) / 360)).toFixed(2);
    mxnPrincipales.value = (numTitulos * precio2.value).toFixed(2);
    if (usdFx != "") {
        usdPrincipales.value = (invinicialMXN / usdFx).toFixed(2);
        mxnPandl.value = parseFloat(mxnPrincipales.value - inversionCapital).toFixed(2);
        usdPandl.value = parseFloat(mxnPandl.value / usdFx).toFixed(2);
        pandlFx.value = parseFloat(usdPrincipales.value - invinicialUSD).toFixed(2);
        pandlNetos.value = (parseFloat(pandlFx.value) + parseFloat(usdPandl.value)).toFixed(2);
    }
}