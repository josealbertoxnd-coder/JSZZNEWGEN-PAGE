(() => {
  const form = document.getElementById("payment-form");
  const totalElement = document.getElementById("payment-total");
  const statusElement = document.getElementById("payment-status");
  const submitButton = form.querySelector('button[type="submit"]');
  const currency = new Intl.NumberFormat("es-CO");
  let canSubmit = true;

  function syncCart() {
    try {
      const items = window.JSZZCart.read();
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      totalElement.textContent = `$ ${currency.format(total)}`;
      statusElement.textContent = items.length
        ? ""
        : "Tu plan está vacío. Agrega una clase antes de continuar.";
      canSubmit = items.length > 0;
    } catch (error) {
      statusElement.textContent = "No se pudo validar tu plan. Vuelve al carrito e inténtalo de nuevo.";
      canSubmit = false;
      console.error("Error al validar el carrito para el pago:", error);
    }
    submitButton.disabled = !canSubmit;
  }

  form.addEventListener("submit", (event) => {
    syncCart();
    if (!canSubmit) event.preventDefault();
  });
  window.addEventListener("storage", (event) => {
    if (event.key === "jszznewgen-cart" || event.key === null) syncCart();
  });
  window.addEventListener("jszznewgen:cart-change", syncCart);
  syncCart();
})();
