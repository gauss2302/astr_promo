<script setup lang="ts">
import { computed } from "vue";
const { t } = useI18n();

const props = defineProps<{
  deadline?: string | number | Date;
}>();

const title = computed(() => t("winners.title"));

const { top25, pending, error, refresh } = useWinners();

const isOver = computed(() => {
  if (!props.deadline) return false;
  const t = new Date(props.deadline).getTime();
  return Date.now() >= t;
});
</script>

<template>
  <section id="winners" class="bg-[#070708] py-16 sm:py-20">
    <div class="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10">
      <header class="mb-8 sm:mb-12 text-center">
        <h2 class="text-2xl sm:text-3xl font-semibold text-white">
          {{ title }}
        </h2>
      </header>

      <!-- Кнопка обновления (справа, только если не завершено) -->
      <div class="flex justify-end mb-6" v-if="!isOver">
        <button
          @click="refresh()"
          class="rounded-xl px-4 py-2 text-sm font-semibold transition"
          style="background: #d9fe43; color: #070708"
        >
          {{ t("winners.refresh") }}
        </button>
      </div>

      <!-- Завершено -->
      <div
        v-if="isOver"
        class="rounded-3xl border border-[#373A41]/60 bg-[#0B0C0E] p-8 text-center"
      >
        <h3 class="text-2xl font-semibold text-white">
          {{ t("winners.ended.title") }}
        </h3>
        <p class="mt-2 text-[#F1F3F6]/80">
          {{ t("winners.ended.desc") }}
        </p>
      </div>

      <!-- Таблица (активна, пока не завершено) -->
      <div v-else>
        <div
          class="rounded-3xl border border-[#373A41]/60 bg-[#0B0C0E] overflow-hidden"
        >
          <!-- Заголовки таблицы -->
          <div
            class="hidden md:grid grid-cols-12 items-center px-5 py-3 text-xs uppercase tracking-wide text-[#F1F3F6]/60"
          >
            <div class="col-span-1">{{ t("winners.table.rank") }}</div>
            <div class="col-span-5">{{ t("winners.table.user") }}</div>
            <div class="col-span-3">{{ t("winners.table.points") }}</div>
            <div class="col-span-3">{{ t("winners.table.prize") }}</div>
          </div>

          <!-- Строки -->
          <ul class="divide-y divide-[#373A41]/60">
            <li
              v-for="w in top25"
              :key="w.id"
              class="grid grid-cols-12 items-center px-5 py-4"
            >
              <!-- Ранг -->
              <div class="col-span-12 md:col-span-1 mb-3 md:mb-0 flex md:block">
                <span
                  class="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                  :style="{
                    background:
                      w.rank === 1
                        ? '#D9FE43'
                        : w.rank === 2
                        ? '#F1F3F6'
                        : w.rank === 3
                        ? '#373A41'
                        : '#1B1C1F',
                    color: w.rank <= 2 ? '#070708' : '#F1F3F6',
                  }"
                >
                  {{ w.rank }}
                </span>
              </div>

              <!-- Кошелёк -->
              <div class="col-span-12 md:col-span-5 flex items-center gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-[#373A41]"
                >
                  <svg
                    class="h-5 w-5 text-[#F1F3F6]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div class="text-white font-mono text-sm leading-tight">
                  {{ w.wallet }}
                </div>
              </div>

              <!-- Поинты -->
              <div class="col-span-6 md:col-span-3 mt-3 md:mt-0 text-[#F1F3F6]">
                <span class="font-semibold tabular-nums">
                  {{ (w.points ?? 0).toLocaleString() }}
                </span>
              </div>

              <!-- Приз -->
              <div class="col-span-6 md:col-span-3 mt-3 md:mt-0">
                <span class="text-[#D9FE43] font-medium">
                  {{ w.prize || "—" }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
