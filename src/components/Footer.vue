<template>
  <footer>
    <div class="footer-links">
      <div class="useful-links">
        <h4>Useful Links</h4>
        <ul>
          <li>Legal & Privacy</li>
          <li>Contact</li>
          <li>Gift Card</li>
        </ul>
      </div>
      <div class="shop-links">
        <h4>Shop</h4>
        <ul>
          <li>Televisions</li>
          <li>Washing Machines</li>
          <li>Air Conditioners</li>
        </ul>
      </div>
      <div class="account-links">
        <h4>My Account</h4>
        <ul>
          <li>My Profile</li>
          <li>Orders</li>
          <li>Wishlist</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2024 ProPortFolio. All rights reserved.</span>
      <span>Designed by YourName</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
footer {
  background-color: #e9f5e9; /* Light minty green */
  padding: 40px 20px;
}

.footer-links {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.footer-links div {
  flex: 1;
}

.footer-links h4 {
  margin-bottom: 10px;
  color: #2d6a4f; /* Minty green color */
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links ul li {
  margin-bottom: 10px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
</style>
