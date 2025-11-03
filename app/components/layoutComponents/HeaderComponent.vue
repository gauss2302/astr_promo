<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const { t, locale, locales, setLocale } = useI18n();

const headerRef = ref<HTMLElement | null>(null);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  const headerH = headerRef.value?.offsetHeight ?? 0;
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
  window.scrollTo({ top: y, behavior: "smooth" });
}

const langOpen = ref(false);
const langBtnRef = ref<HTMLElement | null>(null);
const langMenuRef = ref<HTMLElement | null>(null);

const langItems = computed(() =>
  (locales.value as any[]).map((l) => ({ code: l.code, name: l.name }))
);

function chooseLang(code: any) {
  setLocale(code);
  langOpen.value = false;
}

function onDocClick(e: MouseEvent) {
  const t = e.target as Node;
  if (!langOpen.value) return;
  if (
    langBtnRef.value &&
    !langBtnRef.value.contains(t) &&
    langMenuRef.value &&
    !langMenuRef.value.contains(t)
  ) {
    langOpen.value = false;
  }
}
function onEsc(e: KeyboardEvent) {
  if (e.key === "Escape") langOpen.value = false;
}

onMounted(() => {
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onEsc);
});
onUnmounted(() => {
  document.removeEventListener("click", onDocClick);
  document.removeEventListener("keydown", onEsc);
});
</script>

<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 right-0 z-50 bg-[#070708]/70 backdrop-blur-sm"
  >
    <div
      class="mx-auto flex items-center justify-between w-full max-w-screen-xl px-6 sm:px-8 md:px-10 lg:px-12 py-4"
    >
      <!-- Лого -->
      <div class="flex items-center gap-3 min-w-0">
        <img src="/icons/asterium_logo.svg" alt="Asterium" class="h-8 w-auto" />
        <span
          class="hidden xs:inline text-white text-lg font-semibold tracking-tight"
        >
          Asterium
        </span>
      </div>

      <!-- Навигация -->
      <nav class="hidden md:flex items-center gap-8 text-[#F1F3F6]">
        <button class="hover:text-[#D9FE43]" @click="scrollToId('prizes')">
          {{ t("nav.prizes") }}
        </button>
        <button class="hover:text-[#D9FE43]" @click="scrollToId('how')">
          {{ t("nav.how") }}
        </button>
        <button class="hover:text-[#D9FE43]" @click="scrollToId('winners')">
          {{ t("nav.winners") }}
        </button>
        <button class="hover:text-[#D9FE43]" @click="scrollToId('contacts')">
          {{ t("nav.contacts") }}
        </button>
      </nav>

      <div class="flex items-center gap-3">
        <!-- Языки -->
        <div
          class="hidden md:flex rounded-xl ring-1 ring-white/15 overflow-hidden"
        >
          <button
            v-for="l in langItems"
            :key="l.code"
            @click="chooseLang(l.code)"
            class="px-3 py-2 text-xs font-semibold uppercase"
            :class="
              locale === l.code
                ? 'bg-[#D9FE43] text-[#070708]'
                : 'text-[#F1F3F6]/80 hover:text-white transition-colors'
            "
            type="button"
          >
            {{ l.code }}
          </button>
        </div>

        <!-- Mobile dropdown -->
        <div class="relative md:hidden">
          <button
            ref="langBtnRef"
            @click="langOpen = !langOpen"
            class="flex items-center gap-2 px-3 py-2 rounded-xl ring-1 ring-white/15 text-xs font-semibold uppercase text-[#F1F3F6]"
          >
            {{ String(locale).toUpperCase() }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          </button>
          <div
            v-if="langOpen"
            ref="langMenuRef"
            class="absolute right-0 mt-2 w-40 rounded-xl bg-[#0B0C0E] ring-1 ring-white/10 shadow-lg overflow-hidden"
          >
            <button
              v-for="l in langItems"
              :key="l.code"
              @click="chooseLang(l.code)"
              class="w-full text-left px-3 py-2 text-sm text-[#F1F3F6]/90 hover:bg-white/5 uppercase"
            >
              {{ l.name }} ({{ l.code }})
            </button>
          </div>
        </div>

        <!-- CTA -->
        <a
          href="https://app.asterium.uz/sign-up#utm_source=google&utm_medium=cpa&utm_campaign=etherium-sign&utm_id=555&utm_term=asterium"
          class="rounded-2xl bg-[#D9FE43] text-[#070708] font-semibold px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm hover:brightness-95 transition"
        >
          {{ t("cta.participate") }}
        </a>
      </div>
    </div>
  </header>
</template>
