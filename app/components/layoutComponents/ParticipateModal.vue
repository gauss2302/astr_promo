<script setup lang="ts">
import { watch, onMounted, onUnmounted, nextTick } from "vue";
import { useI18n } from "#imports";
import { useParticipateModal } from "~/composables/useParticipate";

const { t, te, locale } = useI18n();

// 1) ЕДИНСТВЕННЫЙ источник истины по видимости
const open = defineModel<boolean>({ default: false });

// 2) Логика формы/валидации — без управления видимостью
const modal = useParticipateModal({
  async onSubmit(data) {
    // TODO: API
    // await $fetch('/api/participate', { method: 'POST', body: data })
    open.value = false; // закрываем после успешного сабмита
  },
  resetOnSubmit: true,
});

// 3) Закрыть
function close() {
  open.value = false;
}

// 4) Фокус на первом поле при открытии
watch(open, async (v) => {
  if (v) {
    await nextTick();
    modal.firstInputRef.value?.focus();
  }
});

// 5) Esc закрывает модалку
function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}
onMounted(() => document.addEventListener("keydown", onKey));
onUnmounted(() => document.removeEventListener("keydown", onKey));

// Хелпер для ошибок: если composable вернул код — локализуем, иначе показываем как есть
function err(key: "name" | "email" | "phone" | "agree") {
  const val = modal.errors.value[key];
  if (!val) return "";
  const maybeKey = `participate.errors.${val}`;
  return te(maybeKey) ? t(maybeKey) : String(val);
}

// Плейсхолдер телефона: локализованный + спец. формат для Узбекистана
const phonePlaceholder = computed(() => {
  if (modal.isUzbek) {
    return t("participate.fields.phone.placeholder_uz");
  }
  return t("participate.fields.phone.placeholder_intl");
});
</script>

<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <!-- backdrop -->
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        @click="close"
      />

      <!-- modal -->
      <div
        class="relative z-10 w-full max-w-md rounded-2xl bg-[#0B0C0E] ring-1 ring-white/10 text-[#F1F3F6] shadow-xl"
      >
        <div class="px-6 pt-5 pb-2 flex items-start justify-between">
          <h3 class="text-lg font-semibold">
            {{ t("participate.title") }}
          </h3>
          <button
            @click="close"
            class="p-1 rounded-lg hover:bg-white/5"
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 6l12 12M18 6l-12 12"
              />
            </svg>
          </button>
        </div>

        <form class="px-6 pb-6 space-y-4" @submit.prevent="modal.submit()">
          <!-- Имя -->
          <div>
            <label class="block text-sm mb-1">
              {{ t("participate.fields.name.label") }}
            </label>
            <input
              :ref="modal.firstInputRef"
              v-model="modal.form.value.name"
              @blur="modal.onBlur('name')"
              type="text"
              class="w-full rounded-xl bg-[#070708] ring-1 ring-[#373A41] focus:ring-[#D9FE43] focus:outline-none px-3 py-2"
              :placeholder="t('participate.fields.name.placeholder')"
              autocomplete="name"
            />
            <p v-if="modal.errors.value.name" class="mt-1 text-xs text-red-400">
              {{ err("name") }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm mb-1">
              {{ t("participate.fields.email.label") }}
            </label>
            <input
              v-model="modal.form.value.email"
              @blur="modal.onBlur('email')"
              type="email"
              class="w-full rounded-xl bg-[#070708] ring-1 ring-[#373A41] focus:ring-[#D9FE43] focus:outline-none px-3 py-2"
              :placeholder="t('participate.fields.email.placeholder')"
              autocomplete="email"
            />
            <p
              v-if="modal.errors.value.email"
              class="mt-1 text-xs text-red-400"
            >
              {{ err("email") }}
            </p>
          </div>

          <!-- Телефон -->
          <div>
            <label class="block text-sm mb-1">
              {{ t("participate.fields.phone.label") }}
            </label>
            <input
              v-model="modal.form.value.phone"
              @blur="modal.onBlur('phone')"
              type="tel"
              class="w-full rounded-xl bg-[#070708] ring-1 ring-[#373A41] focus:ring-[#D9FE43] focus:outline-none px-3 py-2"
              :placeholder="phonePlaceholder"
              autocomplete="tel"
            />
            <p
              v-if="modal.errors.value.phone"
              class="mt-1 text-xs text-red-400"
            >
              {{ err("phone") }}
            </p>
          </div>

          <!-- Agree -->
          <div class="flex items-center gap-2">
            <input
              id="agree"
              v-model="modal.form.value.agree"
              @blur="modal.onBlur('agree')"
              type="checkbox"
              class="h-4 w-4 rounded border-[#373A41] text-[#D9FE43] focus:ring-[#D9FE43]"
            />
            <label for="agree" class="text-sm">
              {{ t("participate.fields.agree.label") }}
            </label>
          </div>
          <p v-if="modal.errors.value.agree" class="text-xs text-red-400 -mt-2">
            {{ err("agree") }}
          </p>

          <!-- Actions -->
          <div class="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 rounded-xl text-sm hover:bg-white/5"
            >
              {{ t("participate.actions.cancel") }}
            </button>
            <button
              type="submit"
              :disabled="!modal.canSubmit || modal.submitting"
              class="px-5 py-2.5 rounded-2xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              style="background: #d9fe43; color: #070708"
            >
              <span v-if="!modal.submitting">{{
                t("participate.actions.submit")
              }}</span>
              <span v-else>{{ t("participate.actions.submitting") }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>
