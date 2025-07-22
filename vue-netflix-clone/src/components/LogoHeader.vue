<template>
  <header class="logo-header">
    <router-link to="/">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="Netflix"
        class="logo"
      />
    </router-link>
  </header>
</template>

<style scoped>
.logo-header {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem 2rem 1rem 3rem; /* Pushed further right for desktop */
  background: transparent;
  z-index: 10;
}

.logo {
  width: 160px; /* Default size for desktop */
  transition: width 0.3s ease; /* Smooth size change */
}

/* Mobile view adjustments */
@media (max-width: 600px) {
  .logo-header {
    padding: 1rem 0 1rem 2rem; /* Increased left padding to move logo away from edge */
    background: #000; /* Dark background for mobile view */
  }

  .logo {
    width: 120px; /* Slightly smaller logo for mobile */
  }
}
</style>
