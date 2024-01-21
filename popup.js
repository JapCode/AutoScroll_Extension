chrome.storage.sync.get(["isActive", "scrollSpeed"], function (result) {
  const statusElement = document.getElementById("status");
  const toggleButton = document.getElementById("toggleButton");
  const speedInput = document.getElementById("speedInput");

  if (result.isActive) {
    statusElement.textContent = "Activado";
    toggleButton.textContent = "Desactivar";
  } else {
    statusElement.textContent = "Desactivado";
    toggleButton.textContent = "Activar";
  }

  speedInput.value = result.scrollSpeed || 5; // Establecer el valor del campo de velocidad

  toggleButton.addEventListener("click", function () {
    result.isActive = !result.isActive;
    chrome.storage.sync.set({ isActive: result.isActive });

    if (result.isActive) {
      statusElement.textContent = "Activado";
      toggleButton.textContent = "Desactivar";
    } else {
      statusElement.textContent = "Desactivado";
      toggleButton.textContent = "Activar";
    }

    // Enviar el mensaje al script de contenido con la velocidad actual
    chrome.runtime.sendMessage({
      action: "updateSpeed",
      speed: result.scrollSpeed,
    });
  });

  // Manejar cambios en la velocidad
  speedInput.addEventListener("input", function () {
    const speedValue = parseInt(speedInput.value);
    chrome.storage.sync.set({ scrollSpeed: speedValue });

    // Enviar el mensaje al script de contenido con la nueva velocidad
    chrome.runtime.sendMessage({ action: "updateSpeed", speed: speedValue });
  });
});
