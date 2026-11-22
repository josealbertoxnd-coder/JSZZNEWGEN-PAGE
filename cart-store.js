(() => {
  const storageKey = "jszznewgen-cart";

  function isCartItem(item) {
    return Boolean(
      item &&
      typeof item.id === "string" &&
      item.id.length > 0 &&
      typeof item.name === "string" &&
      item.name.length > 0 &&
      (item.description === undefined || typeof item.description === "string") &&
      Number.isSafeInteger(item.price) &&
      item.price > 0 &&
      Number.isInteger(item.quantity) &&
      item.quantity >= 1 &&
      item.quantity <= 99 &&
      Number.isSafeInteger(item.price * item.quantity)
    );
  }

  function isValidCart(items) {
    return Array.isArray(items) &&
      items.every(isCartItem) &&
      new Set(items.map((item) => item.id)).size === items.length &&
      Number.isSafeInteger(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }

  function read() {
    const savedCart = localStorage.getItem(storageKey);
    if (savedCart === null) return [];

    const items = JSON.parse(savedCart);
    if (!isValidCart(items)) {
      throw new Error("El formato del plan guardado no es válido.");
    }
    return items.map((item) => ({ ...item, description: item.description || "" }));
  }

  function write(items) {
    if (!isValidCart(items)) {
      throw new Error("No se puede guardar un plan con datos inválidos.");
    }
    localStorage.setItem(storageKey, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("jszznewgen:cart-change"));
  }

  function add(product, quantity = 1) {
    if (!isCartItem({ ...product, quantity })) {
      throw new Error("El producto o la cantidad no son válidos.");
    }

    const items = read();
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      const newQuantity = existing.quantity + quantity;
      if (newQuantity > 99 || !Number.isSafeInteger(existing.price * newQuantity)) {
        throw new Error("Alcanzaste el máximo permitido para este producto.");
      }
      existing.quantity = newQuantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: product.price,
        quantity
      });
    }

    write(items);
    return items;
  }

  window.JSZZCart = { read, write, add };
})();
