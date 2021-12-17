const cart = () => {
  const cartBtn = document.getElementById("cart");
  const cartModal = document.querySelector(".cart");
  const cartCloseBtn = cartModal.querySelector(".cart-close");

  cartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";
  });

  cartCloseBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });
};

export default cart;
