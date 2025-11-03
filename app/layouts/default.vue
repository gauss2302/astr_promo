<script setup lang="ts">
import HeaderComponent from "~/components/layoutComponents/HeaderComponent.vue";
import FooterSection from "~/components/layoutComponents/FooterComponent.vue";
</script>

<template>
  <div class="bg-[#070708] text-white min-h-screen overflow-y-auto">
    <HeaderComponent />

    <div class="pt-20 px-4 overscroll-none">
      <slot />
    </div>

    <FooterSection />
  </div>
</template>
