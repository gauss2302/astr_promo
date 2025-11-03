<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";

type Step = {
  title: string;
  desc: string;
  icon: string;
  href?: string;
};

const props = defineProps<{ steps?: Step[] }>();
const { t, te } = useI18n();

const showParticipate = ref(false);

/** Русский fallback, если в i18n нет ключей */
const FALLBACK_STEPS: Step[] = [
  {
    title: "Зарегистрируйтесь в приложении Asterium",
    desc: "Создайте аккаунт за пару минут и войдите.",
    icon: "/icons/asterium_logo.svg",
    href: "#register",
  },
  {
    title: "Пройдите KYC 1 и KYC 2",
    desc: "Подтвердите личность, чтобы открыть все функции.",
    icon: "/icons/asterium_logo.svg",
  },
  {
    title: "Закажите карту Asterium Daily",
    desc: "Оформите карту прямо в приложении — быстро и удобно.",
    icon: "/icons/asterium_logo.svg",
  },
  {
    title: "Пользуйтесь картой и зарабатывайте баллы",
    desc: "Оплачивайте покупки и копите баллы для розыгрыша.",
    icon: "/icons/asterium_logo.svg",
  },
];

/** Если проп не передан — пытаемся собрать шаги из i18n (how.steps.*), иначе — берём проп */
const i18nSteps = computed<Step[]>(() => {
  // Проверяем наличие хотя бы первого ключа — если есть, считаем что всё заполнено
  if (te("how.steps.0.title")) {
    return FALLBACK_STEPS.map((s, i) => ({
      ...s,
      title: t(`how.steps.${i}.title`),
      desc: t(`how.steps.${i}.desc`),
      // Иконки/ссылки обычно не локализуют, но поддержим возможность
      icon: te(`how.steps.${i}.icon`) ? t(`how.steps.${i}.icon`) : s.icon,
      href: te(`how.steps.${i}.href`) ? t(`how.steps.${i}.href`) : s.href,
    }));
  }
  return FALLBACK_STEPS;
});

const steps = computed<Step[]>(() =>
  props.steps?.length ? props.steps : i18nSteps.value
);

/** Лёгкая анимация появления секции при скролле */
const root = ref<HTMLElement | null>(null);
let io: IntersectionObserver | null = null;
onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io?.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  if (root.value) io.observe(root.value);
});
onUnmounted(() => io?.disconnect());
</script>

<template>
  <section
    id="how"
    ref="root"
    class="opacity-0 translate-y-6 transition-all duration-700 bg-[#070708]"
  >
    <div
      class="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20"
    >
      <header class="mb-10 sm:mb-12 text-center">
        <h2 class="text-3xl font-semibold text-white">{{ $t("how.title") }}</h2>
        <p class="mt-2 text-[#F1F3F6]/80">
          {{ $t("how.subtitle") }}
        </p>
      </header>

      <!-- Список шагов -->
      <ol class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <li
          v-for="(step, i) in steps"
          :key="step.title + i"
          class="group relative rounded-2xl ring-1 ring-[#373A41]/60 bg-[#0B0C0E] p-5 sm:p-6 hover:ring-[#D9FE43]/60 transition"
        >
          <!-- Верхняя строка: номер + иконка -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-3">
              <span
                class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold text-sm"
                style="background: #373a41; color: #d9fe43"
                aria-hidden="true"
                >{{ i + 1 }}</span
              >
              <h3
                class="text-white font-semibold text-base sm:text-lg leading-tight"
              >
                {{ step.title }}
              </h3>
            </div>

            <img
              :src="step.icon"
              alt=""
              class="h-8 w-8 shrink-0 opacity-90 group-hover:opacity-100"
            />
          </div>

          <p
            class="mt-3 ml-12 text-sm sm:text-base text-[#F1F3F6]/85 leading-relaxed"
          >
            {{ step.desc }}
          </p>

          <!-- CTA по шагу (если есть) -->
          <div v-if="step.href" class="mt-4 ml-12">
            <a
              :href="step.href"
              class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition"
              style="background: #d9fe43; color: #070708"
            >
              {{ $t("how.stepCta") }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>

          <!-- Декоративный прогресс -->
          <!-- Мобильные: скрываем только у последнего элемента -->
          <div
            v-if="i !== steps.length - 1"
            class="pointer-events-none absolute -bottom-4 left-8 right-8 h-0.5 opacity-30 block md:hidden"
            style="
              background: linear-gradient(
                90deg,
                rgba(217, 254, 67, 0) 0%,
                rgba(217, 254, 67, 0.6) 50%,
                rgba(217, 254, 67, 0) 100%
              );
            "
            aria-hidden="true"
          />

          <!-- md+ экраны: скрываем у двух последних элементов (последняя строка) -->
          <div
            v-if="i < steps.length - 2"
            class="pointer-events-none absolute -bottom-4 left-8 right-8 h-0.5 opacity-30 hidden md:block"
            style="
              background: linear-gradient(
                90deg,
                rgba(217, 254, 67, 0) 0%,
                rgba(217, 254, 67, 0.6) 50%,
                rgba(217, 254, 67, 0) 100%
              );
            "
            aria-hidden="true"
          />
        </li>
      </ol>

      <!-- Общий CTA -->
      <div class="mt-12 flex justify-center">
        <a
          href="#"
          @click.prevent="showParticipate = true"
          class="rounded-2xl px-6 py-3 text-sm font-semibold transition"
          style="background: #d9fe43; color: #070708"
        >
          {{ $t("how.cta") }}
        </a>
        <ParticipateModal v-model="showParticipate" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.in-view {
  opacity: 1;
  transform: translateY(0);
}
</style>
