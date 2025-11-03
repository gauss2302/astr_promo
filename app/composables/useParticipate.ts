// ~/composables/useParticipate.ts
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
  watchEffect,
  type Ref,
} from "vue";
import { useI18n } from "#imports";

export type ParticipateForm = {
  name: string;
  email: string;
  phone: string;
  agree: boolean;
};

export type UseParticipateOptions = {
  resetOnSubmit?: boolean;
  onSubmit?: (data: ParticipateForm) => Promise<void> | void;
};

export function useParticipateModal(options: UseParticipateOptions = {}) {
  const { t } = useI18n();

  // Видимость модалки
  const open = ref(false);

  // Данные формы
  const form = ref<ParticipateForm>({
    name: "",
    email: "",
    phone: "",
    agree: false,
  });

  // Touched-флаги
  const touched = ref<Record<keyof ParticipateForm, boolean>>({
    name: false,
    email: false,
    phone: false,
    agree: false,
  });

  // ===== Валидация =====
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const phoneClean = computed(() => form.value.phone.replace(/[^\d+]/g, ""));
  const isUzbek = computed(
    () =>
      phoneClean.value.startsWith("+998") || phoneClean.value.startsWith("998")
  );

  const nameValid = computed(() => form.value.name.trim().length >= 2);
  const emailValid = computed(() => emailRe.test(form.value.email));
  const phoneValid = computed(() => {
    const p = phoneClean.value;
    if (isUzbek.value) return /^\+?998\d{9}$/.test(p); // +998XXXXXXXXX
    return /^\+?\d{9,15}$/.test(p);
  });
  const agreeValid = computed(() => form.value.agree);

  /**
   * Ошибки как КОДЫ (для гибкости)
   * Пустая строка — нет ошибки.
   */
  const errors = computed(() => ({
    name: !nameValid.value && touched.value.name ? "required" : "",
    email: !emailValid.value && touched.value.email ? "invalid_email" : "",
    phone:
      !phoneValid.value && touched.value.phone
        ? isUzbek.value
          ? "invalid_phone_uz"
          : "invalid_phone_intl"
        : "",
    agree: !agreeValid.value && touched.value.agree ? "must_agree" : "",
  }));

  /**
   * Ошибки как ПЕРЕВЕДЁННЫЕ СТРОКИ
   * Если нужен сразу текст — бери этот объект.
   */
  const errorsText = computed(() => ({
    name: errors.value.name ? t(`participate.errors.${errors.value.name}`) : "",
    email: errors.value.email
      ? t(`participate.errors.${errors.value.email}`)
      : "",
    phone: errors.value.phone
      ? t(`participate.errors.${errors.value.phone}`)
      : "",
    agree: errors.value.agree
      ? t(`participate.errors.${errors.value.agree}`)
      : "",
  }));

  // Можно ли сабмитить
  const canSubmit = computed(
    () =>
      nameValid.value &&
      emailValid.value &&
      phoneValid.value &&
      agreeValid.value
  );

  // Отметить поле как тронутое
  function onBlur<K extends keyof ParticipateForm>(k: K) {
    touched.value[k] = true;
  }

  // Управление модалкой
  function setOpen(v: boolean) {
    open.value = v;
  }
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  // Сброс формы
  function resetForm() {
    form.value = { name: "", email: "", phone: "", agree: false };
    touched.value = { name: false, email: false, phone: false, agree: false };
  }

  // Сабмит
  const submitting = ref(false);
  async function submit() {
    // Проставляем touched, чтобы показать ошибки, если есть
    touched.value = { name: true, email: true, phone: true, agree: true };
    if (!canSubmit.value || submitting.value) return;
    submitting.value = true;
    try {
      await options.onSubmit?.({ ...form.value });
      closeModal();
      if (options.resetOnSubmit ?? true) resetForm();
    } finally {
      submitting.value = false;
    }
  }

  // a11y: Esc закрывает
  function onKey(e: KeyboardEvent) {
    if (e.key === "Escape") closeModal();
  }
  onMounted(() => document.addEventListener("keydown", onKey));
  onUnmounted(() => document.removeEventListener("keydown", onKey));

  // автофокус при открытии
  const firstInputRef: Ref<HTMLInputElement | null> = ref(null);
  async function focusFirst() {
    await nextTick();
    firstInputRef.value?.focus();
  }
  watchEffect(() => {
    if (open.value) focusFirst();
  });

  return {
    // состояния
    open,
    setOpen,
    openModal,
    closeModal,
    form,
    touched,
    submitting,

    // валидация
    errors, // коды ошибок (required, invalid_email, invalid_phone_uz, invalid_phone_intl, must_agree)
    errorsText, // переведённые строки по i18n
    canSubmit,
    isUzbek,
    phoneClean,
    onBlur,
    submit,

    // фокус
    firstInputRef,

    // утилиты
    resetForm,
  };
}
