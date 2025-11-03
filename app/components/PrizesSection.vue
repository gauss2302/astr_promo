<script setup lang="ts">
import PrizeItem from "~/components/PrizeItem.vue";
import { ref, computed } from "vue";
import type { Prize } from "~/types/prize";
const { t, te } = useI18n();

const prizes = ref<Prize[]>([
  {
    place: "1 место",
    title: "1 ETH",
    imageSrc: "/img/eth.png",
    imageWidth: 260,
    imageHeight: 260,
    offsetY: 0,
  },
  {
    place: "2 место",
    title: "iPhone 17 Pro Max",
    imageSrc: "/img/iphone_17.png",
    imageWidth: 480,
    imageHeight: 560,
    offsetY: 0,
  },
  {
    place: "3 место",
    title: "Мерч-бокс Asterium",
    imageSrc: "/img/merch_asterium.png",
    imageWidth: 480,
    imageHeight: 560,
    offsetY: -10,
    offsetX: 10,
  },
  {
    place: "4–10 места",
    title: "Карта Asterium Visa + 100 HUMO",
    imageSrc: "/img/visa_new.png",
    imageWidth: 280,
    imageHeight: 200,
    offsetY: 10,
  },
  {
    place: "11–25 места",
    title: "50 HUMO каждому",
    imageSrc: "/img/HUMO_Token.png",
    imageWidth: 300,
    imageHeight: 300,
    offsetY: -25,
  },
]);

// Локализация с fallback на русский
const i18nPrizes = computed(() =>
  prizes.value.map((p, i) => ({
    ...p,
    place: te(`prizes.list.${i}.place`) ? t(`prizes.list.${i}.place`) : p.place,
    title: te(`prizes.list.${i}.title`) ? t(`prizes.list.${i}.title`) : p.title,
    description: te(`prizes.list.${i}.description`)
      ? t(`prizes.list.${i}.description`)
      : p.description,
    imageAlt: te(`prizes.list.${i}.imageAlt`)
      ? t(`prizes.list.${i}.imageAlt`)
      : p.imageAlt,
  }))
);
</script>

<template>
  <section id="prizes" class="pl-10 sm:pl-8 lg:pl-12">
    <div class="mx-auto w-full max-w-screen-xl">
      <header class="mb-10 sm:mb-12 text-center">
        <h2 class="text-3xl font-semibold text-white">
          {{ $t("prizes.title") }}
        </h2>
        <p class="mt-2 text-[#F1F3F6]/80 text-base">
          {{ $t("prizes.subtitle") }}
        </p>
      </header>

      <div class="space-y-12 sm:space-y-14 lg:space-y-16">
        <PrizeItem
          v-for="(prize, i) in i18nPrizes"
          :key="prize.place + i"
          :prize="prize"
          :reverse="i % 2 === 1"
        />
      </div>
    </div>
  </section>
</template>
