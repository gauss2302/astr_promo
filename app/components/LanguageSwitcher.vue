<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const available = computed(() =>
  (locales.value as any[]).map((l) => ({ code: l.code, name: l.name }))
);
</script>

<template>
  <div class="flex rounded-xl ring-1 ring-white/15 overflow-hidden">
    <button
      v-for="l in available"
      :key="l.code"
      @click="setLocale(l.code)"
      class="px-3 py-2 text-sm font-semibold uppercase"
      :class="
        locale === l.code
          ? 'bg-[#D9FE43] text-[#070708]'
          : 'bg-transparent text-[#F1F3F6]/80 hover:text-white transition-colors'
      "
    >
      {{ l.code }}
    </button>
  </div>
</template>
