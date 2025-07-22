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
  padding: 1.5rem 2rem 1.5rem 10rem; /* ⬅️ pushed further right */
  background: transparent;
  z-index: 10;
}

.logo {
  width: 160px; /* ⬆️ increased size */
}
</style>
