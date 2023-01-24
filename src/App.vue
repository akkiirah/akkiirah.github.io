<script setup lang="ts">
import Nav from './components/Nav.vue';
import Welcome from './components/Welcome.vue';
import Content from './components/Content.vue';
</script>

<template>
  <header>
    <div class="header_wrap">
      <Nav /> 
    </div>
  </header> 
  <div class="welcome">
    <Welcome />
  </div>
  <main> 
    <div class="content_wrap">
      <Content />  
    </div>
  </main>
</template>