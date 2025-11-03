<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
const { t } = useI18n();

const props = defineProps<{ deadline?: string | number | Date }>();

const config = useRuntimeConfig();
const appUrl = computed(() => config.public?.app || "");
const registerUrl = computed(() => config.public?.register || "");

// Таймер
const now = ref(Date.now());
let timer: number | undefined;
onMounted(() => {
  timer = window.setInterval(() => (now.value = Date.now()), 1000);
});
onUnmounted(() => {
  if (timer) window.clearInterval(timer);
});

const deadlineMs = computed(() =>
  props.deadline ? new Date(props.deadline).getTime() : Date.now()
);
const remainingMs = computed(() =>
  props.deadline ? Math.max(0, deadlineMs.value - now.value) : 0
);

const days = computed(() =>
  Math.floor(remainingMs.value / (1000 * 60 * 60 * 24))
);
const hours = computed(() =>
  Math.floor((remainingMs.value / (1000 * 60 * 60)) % 24)
);
const minutes = computed(() =>
  Math.floor((remainingMs.value / (1000 * 60)) % 60)
);
const seconds = computed(() => Math.floor((remainingMs.value / 1000) % 60));
const isOver = computed(() => remainingMs.value <= 0);

function pad(n: number) {
  return n.toString().padStart(2, "0");
}
</script>

<template>
  <section class="hero-section">
    <!-- Видео фон (только для десктопа) -->
    <video
      autoplay
      loop
      muted
      playsinline
      class="video-bg"
      src="/img/back.webm"
    ></video>

    <!-- Фон-картинка (для мобильных) -->
    <div class="mobile-bg"></div>

    <div class="overlay"></div>

    <div
      class="relative z-10 w-full max-w-screen-lg px-6 sm:px-8 py-16 md:py-24 flex flex-col items-center text-center"
    >
      <h1
        class="mt-5 font-semibold leading-tight tracking-tight text-white"
        style="font-size: clamp(1.875rem, 4.5vw, 3.75rem)"
      >
        {{ $t("hero.title") }}
      </h1>

      <p
        class="mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-white/80"
      >
        {{ $t("hero.subtitle") }}
      </p>

      <!-- Таймер -->
      <div class="mt-8">
        <div class="flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          <div
            v-for="(box, idx) in [
              { label: $t('timer.days'), value: days },
              { label: $t('timer.hours'), value: hours },
              { label: $t('timer.minutes'), value: minutes },
              { label: $t('timer.seconds'), value: seconds },
            ]"
            :key="idx"
            class="min-w-[80px] rounded-2xl px-4 py-3 text-center shadow-sm"
            style="background: rgba(55, 58, 65, 0.6)"
          >
            <div
              class="text-2xl sm:text-3xl font-semibold tabular-nums"
              style="color: #d9fe43"
            >
              {{ pad(box.value) }}
            </div>
            <div class="mt-1 text-[11px] uppercase tracking-wide text-white/70">
              {{ box.label }}
            </div>
          </div>
        </div>

        <div v-if="isOver" class="mt-3 text-sm text-white/80">
          {{ $t("hero.ended") }}
        </div>
      </div>

      <!-- Кнопки -->
      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <a
          :href="registerUrl"
          class="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition"
          style="background: #d9fe43; color: #070708"
        >
          {{ $t("cta.participate") }}
        </a>

        <a
          v-if="appUrl"
          :href="appUrl"
          class="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition"
          style="background: #f1f3f6; color: #070708"
        >
          {{ $t("cta.download") }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- Заменяем только CSS (оставляем HTML/JS как есть) --- */

.hero-section {
  position: relative;
  overflow: hidden;
  min-height: 80svh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: #070708;
}

/* Видео — только на десктопе (уже скрываем на sm) */
.video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* Картинка — только на мобильных.
   Используем cover + центр, чтобы картинка точно заполнила экран.
   Добавил fallback-color и will-change для рендера. */
.mobile-bg {
  position: absolute;
  inset: 0;
  background-image: url("/img/44.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; /* <- важно: cover, не contain */
  background-color: #070708; /* fallback если изображение не подгрузилось */
  z-index: 0;
  display: none;
  will-change: transform, opacity;
}

/* Затемнение поверх видео/изображения.
   На мобильных делаем оверлей мягче, чтобы не «закрывать» картинку. */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(7, 7, 8, 0.6) 0%,
    rgba(7, 7, 8, 0.8) 60%,
    rgba(7, 7, 8, 0.95) 100%
  );
  z-index: 1;
}

/* --- Мобильные стили --- */
@media (max-width: 768px) {
  .video-bg {
    display: none;
  }

  .mobile-bg {
    display: block;
  }

  .hero-section {
    border-radius: 16px;
  }

  /* менее плотный оверлей на самых маленьких экранах */
  @media (max-width: 480px) {
    .overlay {
      background: linear-gradient(
        180deg,
        rgba(7, 7, 8, 0.35) 0%,
        rgba(7, 7, 8, 0.55) 60%,
        rgba(7, 7, 8, 0.8) 100%
      );
    }
  }
}

@media (max-width: 640px) {
  /* Контейнер таймера */
  .hero-section .flex.flex-wrap.items-stretch.justify-center.gap-3 {
    gap: 6px; /* немного меньше отступ между блоками */
  }

  /* Каждый блок таймера */
  .hero-section .min-w-\[80px\] {
    min-width: 64px; /* было 80px */
    padding: 6px 8px; /* чуть меньше внутренний отступ */
    border-radius: 12px;
  }

  /* Цифры */
  .hero-section .text-2xl,
  .hero-section .text-3xl {
    font-size: 1.25rem; /* примерно 20px */
    line-height: 1.2;
  }

  /* Подписи (дни, часы...) */
  .hero-section .text-\[11px\] {
    font-size: 10px;
  }
}
</style>
