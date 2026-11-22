(() => {
  const itemsList = document.getElementById("confirmed-items");
  const totalElement = document.getElementById("confirmed-total");
  const statusElement = document.getElementById("confirmation-status");
  const currency = new Intl.NumberFormat("es-CO");

  try {
    const items = window.JSZZCart.read();
    items.forEach((item) => {
      const line = document.createElement("li");
      line.textContent = `${item.name} × ${item.quantity}: $ ${currency.format(item.price * item.quantity)}`;
      itemsList.append(line);
    });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalElement.textContent = `$ ${currency.format(total)}`;
    if (items.length === 0) {
      statusElement.textContent = "No encontramos un plan asociado a esta confirmación.";
    }
  } catch (error) {
    statusElement.textContent = "No se pudo cargar el detalle de tu plan.";
    console.error("Error al mostrar la confirmación:", error);
  }
})();
