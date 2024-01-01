// Recuperar el estado almacenado (activo o desactivado)
let isActive = false;

chrome.storage.sync.get(["isActive"], function (result) {
  isActive = result.isActive || false;
});

function scrollAutomatically() {
  if (isActive) {
    window.scrollBy(0, 10); // Desplázate 10 píxeles hacia abajo
  }
}

setInterval(scrollAutomatically, 1000);

// Escuchar eventos del teclado
window.addEventListener("keydown", function (event) {
  // Verificar si la tecla presionada es la barra espaciadora (código 32)
  if (event.keyCode === 32) {
    // Cambiar el estado activo/desactivado al presionar la barra espaciadora
    isActive = !isActive;
    // Guardar el estado en el almacenamiento
    chrome.storage.sync.set({ isActive: isActive });
  }
});
