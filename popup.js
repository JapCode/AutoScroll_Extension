// Recuperar el estado almacenado y actualizar la interfaz de usuario
chrome.storage.sync.get(["isActive"], function (result) {
  const statusElement = document.getElementById("status");
  const toggleButton = document.getElementById("toggleButton");

  if (result.isActive) {
    statusElement.textContent = "Activado";
    toggleButton.textContent = "Desactivar";
  } else {
    statusElement.textContent = "Desactivado";
    toggleButton.textContent = "Activar";
  }

  // Manejar el clic en el botón
  toggleButton.addEventListener("click", function () {
    // Cambiar el estado activo/desactivado
    result.isActive = !result.isActive;
    // Guardar el estado en el almacenamiento
    chrome.storage.sync.set({ isActive: result.isActive });

    // Actualizar la interfaz de usuario
    if (result.isActive) {
      statusElement.textContent = "Activado";
      toggleButton.textContent = "Desactivar";
    } else {
      statusElement.textContent = "Desactivado";
      toggleButton.textContent = "Activar";
    }
  });
});
