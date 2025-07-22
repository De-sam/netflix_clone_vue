<template>
  <footer class="footer">
    <p class="call">Questions? Call 1-800-000-0000</p>
    <ul class="links">
      <li><a href="#">FAQ</a></li>
      <li><a href="#">Privacy</a></li>
      <li><a href="#">Terms of Use</a></li>
      <li><a href="#">Help Center</a></li>
    </ul>
  </footer>
</template>

<style scoped>
.footer {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  text-align: center;
  color: #999;
  font-size: 0.85rem;
}
.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  list-style: none;
  padding: 0;
}
a {
  color: #999;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
