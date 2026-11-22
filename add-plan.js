(() => {
  const form = document.getElementById("add-plan-form");
  const quantityInput = document.getElementById("cantidad");
  const statusElement = document.getElementById("add-plan-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    statusElement.textContent = "";
    if (!quantityInput.reportValidity()) return;

    try {
      window.JSZZCart.add({
        id: "spinning-8",
        name: "Spinning",
        description: "Paquete de 8 clases",
        price: 60000
      }, Number(quantityInput.value));
      window.location.href = "carrito.html";
    } catch (error) {
      statusElement.textContent = "No se pudo agregar el paquete. Intenta de nuevo.";
      console.error("Error al agregar Spinning al carrito:", error);
    }
  });
})();
