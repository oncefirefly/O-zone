import renderCart from "./renderCart";
import postData from "./postData";

const cart = () => {
  const cartBtn = document.getElementById("cart");
  const cartModal = document.querySelector(".cart");
  const cartCloseBtn = cartModal.querySelector(".cart-close");
  const cartTotal = cartModal.querySelector(".cart-total > span");
  const cartSendBtn = cartModal.querySelector(".cart-confirm");
  const goodsWrapper = document.querySelector(".goods");
  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartCounter = cartBtn.querySelector(".counter");

  cartCounter.textContent = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).length
    : 0;

  cartBtn.addEventListener("click", () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    cartModal.style.display = "flex";

    renderCart(cart);

    cartTotal.textContent = cart.reduce((sum, goodItem) => {
      return sum + goodItem.price;
    }, 0);
  });

  cartCloseBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  cartModal.addEventListener("click", (event) => {
    if (event.target.closest(".cart-body") === null) {
      cartModal.style.display = "none";
    };
  })

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cartModal.style.display = "none";
    }
  });

  goodsWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-primary")) {
      const card = event.target.closest(".card");
      const key = card.dataset.key;
      const goods = JSON.parse(localStorage.getItem("goods"));
      const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      const goodItem = goods.find((item) => {
        return item.id === +key;
      });

      cart.push(goodItem);

      localStorage.setItem("cart", JSON.stringify(cart));

      cartCounter.textContent = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")).length
        : cart.length;

      localStorage.setItem("cartCounter", cartCounter.textContent);
    }
  });

  cartWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-primary")) {
      const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      const card = event.target.closest(".card");
      const key = card.dataset.key;
      const index = cart.findIndex((item) => {
        return item.id === +key;
      });

      cart.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cart));

      renderCart(cart);

      cartTotal.textContent = cart.reduce((sum, goodItem) => {
        return sum + goodItem.price;
      }, 0);
    }
  });

  cartSendBtn.addEventListener("click", () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    postData(cart).then(() => {
      localStorage.removeItem("cart");

      renderCart([]);

      cartTotal.textContent = 0;
      cartCounter.textContent = 0;
    });
  });
};

export default cart;
