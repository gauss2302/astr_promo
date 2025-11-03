<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section class="py-24 bg-[#070708] text-[#F1F3F6]">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h2 class="text-3xl font-semibold mb-12">{{ t("points.title") }}</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 1 -->
        <div class="bg-[#373A41] p-6 rounded-2xl shadow-sm">
          <h3 class="text-[#D9FE43] text-xl mb-3">
            {{ t("points.items.0.title") }}
          </h3>
          <p>{{ t("points.items.0.desc") }}</p>
        </div>
        <!-- 2 -->
        <div class="bg-[#373A41] p-6 rounded-2xl shadow-sm">
          <h3 class="text-[#D9FE43] text-xl mb-3">
            {{ t("points.items.1.title") }}
          </h3>
          <p>{{ t("points.items.1.desc") }}</p>
        </div>
        <!-- 3 -->
        <div class="bg-[#373A41] p-6 rounded-2xl shadow-sm">
          <h3 class="text-[#D9FE43] text-xl mb-3">
            {{ t("points.items.2.title") }}
          </h3>
          <p>{{ t("points.items.2.desc") }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
