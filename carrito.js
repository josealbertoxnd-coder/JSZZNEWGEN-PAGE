(() => {
  const itemsElement = document.getElementById("cart-items");
  const statusElement = document.getElementById("cart-status");
  const checkoutLink = document.getElementById("checkout-link");
  const currency = new Intl.NumberFormat("es-CO");
  let items = [];

  function loadCart() {
    try {
      items = window.JSZZCart.read();
    } catch (error) {
      items = [];
      statusElement.textContent = "No se pudo recuperar el plan guardado. Vuelve a agregar tus clases.";
      console.error("Error al recuperar el carrito:", error);
    }
    render();
  }

  const formatPrice = (value) => `$ ${currency.format(value)}`;

  function createCell(label, className) {
    const cell = document.createElement("td");
    cell.dataset.label = label;
    if (className) cell.className = className;
    return cell;
  }

  function makeButton(action, text, label, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.action = action;
    button.textContent = text;
    button.setAttribute("aria-label", label);
    if (className) button.className = className;
    return button;
  }

  function render() {
    itemsElement.replaceChildren();

    if (items.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.className = "empty-cart-row";
      const emptyCell = document.createElement("td");
      emptyCell.colSpan = 5;
      emptyCell.textContent = "Tu plan está vacío. Agrega una clase para comenzar.";
      emptyRow.append(emptyCell);
      itemsElement.append(emptyRow);
    }

    items.forEach((item, index) => {
      const row = document.createElement("tr");
      row.className = "cart-item";
      row.dataset.id = item.id;

      const nameCell = createCell("Plan o clase");
      const itemIndex = document.createElement("span");
      itemIndex.className = "cart-item-index";
      itemIndex.textContent = `${String(index + 1).padStart(2, "0")} / ENTRENAMIENTO`;
      const name = document.createElement("strong");
      name.textContent = item.name;
      nameCell.append(itemIndex, name);
      if (item.description) {
        const description = document.createElement("small");
        description.textContent = item.description;
        nameCell.append(description);
      }

      const priceCell = createCell("Precio");
      priceCell.textContent = formatPrice(item.price);

      const quantityCell = createCell("Cantidad");
      const control = document.createElement("div");
      control.className = "quantity-control";
      control.setAttribute("aria-label", `Cantidad de ${item.name}`);
      const decrease = makeButton("decrease", "−", `Quitar una unidad de ${item.name}`);
      decrease.disabled = item.quantity <= 1;
      control.append(decrease);
      const quantity = document.createElement("output");
      quantity.className = "quantity-value";
      quantity.setAttribute("aria-live", "polite");
      quantity.textContent = item.quantity;
      const increase = makeButton("increase", "+", `Agregar una unidad de ${item.name}`);
      increase.disabled = item.quantity >= 99;
      control.append(quantity, increase);
      quantityCell.append(control);

      const subtotalCell = createCell("Subtotal", "item-subtotal");
      subtotalCell.textContent = formatPrice(item.price * item.quantity);

      const actionsCell = createCell("Acciones");
      actionsCell.append(makeButton("remove", "Quitar", `Quitar ${item.name} del plan`, "remove-item"));
      row.append(nameCell, priceCell, quantityCell, subtotalCell, actionsCell);
      itemsElement.append(row);
    });

    const units = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("cart-count").textContent =
      `${items.length} ${items.length === 1 ? "DISCIPLINA" : "DISCIPLINAS"}`;
    document.getElementById("summary-items").textContent = items.length;
    document.getElementById("summary-quantity").textContent = units;
    document.getElementById("cart-total").textContent = formatPrice(total);

    const empty = items.length === 0;
    checkoutLink.setAttribute("aria-disabled", String(empty));
    if (empty) {
      checkoutLink.removeAttribute("href");
      if (!statusElement.textContent.startsWith("No se pudo recuperar")) {
        statusElement.textContent = "";
      }
    } else {
      checkoutLink.href = "pago.html";
    }
  }

  itemsElement.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const row = button.closest(".cart-item");
    if (!row) return;
    const item = items.find((entry) => entry.id === row.dataset.id);
    if (!item) return;

    let updatedItems;
    if (button.dataset.action === "increase" && item.quantity < 99) {
      updatedItems = items.map((entry) =>
        entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
      );
    } else if (button.dataset.action === "decrease" && item.quantity > 1) {
      updatedItems = items.map((entry) =>
        entry.id === item.id ? { ...entry, quantity: entry.quantity - 1 } : entry
      );
    } else if (button.dataset.action === "remove") {
      updatedItems = items.filter((entry) => entry.id !== item.id);
    } else {
      return;
    }

    try {
      window.JSZZCart.write(updatedItems);
      items = updatedItems;
      statusElement.textContent = "Plan actualizado y guardado.";
      render();
    } catch (error) {
      statusElement.textContent = "No se pudo guardar el cambio. Intenta de nuevo.";
      console.error("Error al actualizar el carrito:", error);
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "jszznewgen-cart" || event.key === null) loadCart();
  });
  window.addEventListener("jszznewgen:cart-change", loadCart);
  loadCart();
})();
