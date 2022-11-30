var http_request = false;
function makeRequest(url) {
  http_request = false;

  if (window.XMLHttpRequest) {
    // Mozilla, Safari,...
    http_request = new XMLHttpRequest();
    if (http_request.overrideMimeType) {
      http_request.overrideMimeType("text/xml");
      // Ver nota sobre esta linea al final
    }
  } else if (window.ActiveXObject) {
    // IE
    try {
      http_request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        http_request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }

  if (!http_request) {
    alert("Falla :( No es posible crear una instancia XMLHTTP");
    return false;
  }
  http_request.onreadystatechange = muestraXML;
  http_request.open("GET", url, true);
  http_request.send();
}

function alertContents() {
  if (http_request.readyState == 4) {
    if (http_request.status == 200) {
      alert(http_request.responseText);
    } else {
      alert("Hubo problemas con la petición.");
    }
  }
}

function muestraXML() {
  var datos, preguntas, respuestas;
  var miCarrusel = document.getElementById("miCarrusel");
  var contenido; // aquí es donde voy a poner todo
  // CREO EL DIV CAROUSEL INNER
  contenido = "<div class='carousel-inner'>";
  // LEO EL XML, en concreto pregunta
  // datos = http_request.responseXML.documentElement.getElementsByTagName("pregunta");
  datos = http_request.responseXML.documentElement.getElementsByTagName("pregunta");

  for (let i = 0; i < datos.length; i++) {
    // FOR QUE LEE TODO EL XML
    // AQUÍ ESTARÁ TODO
    // FOR PRINCIPAL
    if (i == 0) {
      // Si i == 0, crear el item active
      contenido = contenido + "<div class='carousel-item active'>"; // creo el carrusel-item
      preguntas = datos[i].getElementsByTagName("pta"); // Recoge y almacena los datos de las preguntas.
      {
        try {
          for (let j = 0; j < preguntas.length; j++) {
            // AÑADO LA PREGUNTA A LA ETIQUETA H2
            contenido = contenido + "<h2 class='fa-solid fa-font'>" + preguntas[j].firstChild.nodeValue + "</h2>";
          }
          //}
        } catch (er) {
          contenido = contenido + "ERROR UNO";
        }
      }
      respuestas = datos[i].getElementsByTagName("rpta"); // Recoge y almacena los datos de las respuestas.
      {
        try {
          for (let k = 0; k < respuestas.length; k++) {
            contenido = contenido + "<div class='d-grid gap-2 col-4 mt-3' id='botones'>";
            // contenido = contenido + "<input type='button' class='btn btn-outline-primary'/>" + "<label>" + respuestas[k].firstChild.nodeValue + "</label>";
            contenido = contenido + "<div class='btn-gro/up'>";
            contenido =
              contenido +
              "<input type='radio' class='btn-check' name='options' id='option1'>"+"<label class='btn btn-primary' for='option'>"+respuestas[k].firstChild.nodeValue+"</label>";
            contenido = contenido + "</div>";
            contenido = contenido + "</div>";
          }
        } catch (er) {
          contenido = contenido + "ERROR DOS";
          // contenido += "</div>";
        }
      }
    } else {
      contenido = contenido + "<div class='carousel-item'>"; // creo el carrusel-item
      preguntas = datos[i].getElementsByTagName("pta"); // Recoge y almacena los datos de las preguntas.
      {
        try {
          for (let j = 0; j < preguntas.length; j++) {
            // AÑADO LA PREGUNTA A LA ETIQUETA H2
            contenido = contenido + "<h2 class='fa-sharp fa-solid fa-font-case'>" + preguntas[j].firstChild.nodeValue +"</h2>";
          }
        } catch (er) {
          contenido = contenido + "ERROR TRES";
        }
      }
      respuestas = datos[i].getElementsByTagName("rpta"); // Recoge y almacena los datos de las respuestas.
      {
        try {
          for (let k = 0; k < respuestas.length; k++) {
            contenido = contenido + "<div class='d-grid gap-2 col-4 mt-3'>";
            // contenido =
            //   contenido +
            //   "<input type='button' class='btn btn-outline-primary'/>" +
            //   "<label>" +
            //   respuestas[k].firstChild.nodeValue +
            //   "</label>";
            contenido = contenido + "<div class='btn-group'>";
            contenido =
              contenido +
              "<input type='radio' class='btn-check' name='options' id='option1'>"+"<label class='btn btn-primary' for='option'>"+respuestas[k].firstChild.nodeValue+"</label>";
            contenido = contenido + "</div>";
            contenido = contenido + "</div>";
          }
        } catch (er) {
          contenido = contenido + "ERROR CUATRO";
        }
      }
    }
    // contenido += "</div> asdadsa";
    contenido = contenido + "</div>";
  }
  contenido = contenido + "</div>";
  console.info(contenido);
  miCarrusel.innerHTML = contenido;
}
