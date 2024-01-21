let isActive = false;
let scrollSpeed = 5; // Valor predeterminado

chrome.storage.sync.get(["isActive", "scrollSpeed"], function (result) {
  isActive = result.isActive || false;
  scrollSpeed = result.scrollSpeed || 5;

  // Resto del código
});

function scrollAutomatically() {
  if (isActive) {
    window.scrollBy(0, scrollSpeed); // Desplázate según la velocidad configurada
  }
}

setInterval(scrollAutomatically, 16); // Aproximadamente 60 FPS para un desplazamiento más suave

window.addEventListener("keydown", function (event) {
  // Verificar si la tecla presionada es Ctrl + Shift
  if (event.ctrlKey && event.shiftKey) {
    isActive = !isActive;
    chrome.storage.sync.set({ isActive: isActive });
  }
});

// Escuchar mensajes del popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateSpeed") {
    // Actualizar la velocidad del desplazamiento
    scrollSpeed = request.speed;
  }
});
