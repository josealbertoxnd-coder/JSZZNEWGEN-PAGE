(() => {
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest("button[data-add-to-cart]");
    if (!button) return;

    const feedback = button.parentElement.querySelector(".add-feedback");
    try {
      window.JSZZCart.add({
        id: button.dataset.id,
        name: button.dataset.name,
        description: button.dataset.description || "",
        price: Number(button.dataset.price)
      });
      button.textContent = "Agregado ✓";
      button.classList.add("is-added");
      if (feedback) feedback.textContent = `${button.dataset.name} agregado a tu plan.`;
      window.setTimeout(() => {
        button.textContent = "Agregar a mi plan";
        button.classList.remove("is-added");
      }, 1600);
    } catch (error) {
      if (feedback) feedback.textContent = "No se pudo agregar. Intenta de nuevo.";
      console.error("Error al agregar el producto al carrito:", error);
    }
  });
})();
