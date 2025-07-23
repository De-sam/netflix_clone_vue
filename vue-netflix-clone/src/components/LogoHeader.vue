<template>
  <header class="logo-header">
    <router-link to="/" class="logo-link">
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
  top: 0;
  left: 0;
  padding: 1.2rem 0 0 10.6rem;
  background: transparent !important;
  box-shadow: none !important;
  z-index: 1;
}

.logo {
  width: 158px;
  transition: width 0.3s ease;
  filter: brightness(1.1);
}

@media (max-width: 600px) {
  .logo-header {
    padding: 1rem 0 0 2rem;
  }
  .logo {
    width: 110px;
  }
}
</style>
