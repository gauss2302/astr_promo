<script setup lang="ts">
import type { Prize } from "~/types/prize";

const props = defineProps<{
  prize: Prize;
  reverse?: boolean;
}>();
</script>

<template>
  <article
    class="flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
    :class="reverse ? 'sm:flex-row-reverse' : ''"
  >
    <!-- ТЕКСТ — центрирован по вертикали -->
    <div
      class="w-full sm:w-1/2 flex items-center justify-center sm:justify-start"
    >
      <div class="max-w-md text-center sm:text-left">
        <h3 class="text-white text-xl sm:text-2xl font-semibold leading-tight">
          {{ prize.place }} — {{ prize.title }}
        </h3>
        <p class="mt-3 text-[#F1F3F6]/80 text-base sm:text-lg">
          {{ prize.description }}
        </p>
      </div>
    </div>

    <!-- КАРТИНКА — центрирована, с offset -->
    <div class="w-full sm:w-1/2 flex justify-center">
      <div
        class="inline-block"
        :style="{
          transform: `translate(${prize.offsetX || 0}px, ${
            prize.offsetY || 0
          }px)`,
        }"
      >
        <img
          :src="prize.imageSrc"
          :alt="prize.imageAlt"
          :width="prize.imageWidth"
          :height="prize.imageHeight"
          class="block max-w-full h-auto object-contain max-h-[50vh] sm:max-h-[420px] rounded-xl shadow-lg"
          loading="lazy"
        />
      </div>
    </div>
  </article>
</template>
