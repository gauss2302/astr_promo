<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <section
    class="relative w-screen h-screen overflow-hidden flex items-center justify-center text-center"
  >
    <!-- Фото на весь экран -->
    <img
      src="/img/404.png"
      alt="404 background"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Тёмный градиент для контраста -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90"
      aria-hidden="true"
    ></div>

    <!-- Контент -->
    <div class="relative z-10 px-6">
      <h1 class="text-6xl sm:text-8xl font-bold text-[#D9FE43] drop-shadow-lg">
        404
      </h1>
      <p class="mt-4 text-lg sm:text-xl text-[#F1F3F6]/90">
        Страница не найдена
      </p>
      <button
        @click="handleError"
        class="mt-8 px-6 py-3 bg-[#D9FE43] text-[#070708] font-semibold rounded-2xl shadow-md transition hover:brightness-95"
      >
        На главную
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Маленькая анимация появления */
section {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(1.02);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
