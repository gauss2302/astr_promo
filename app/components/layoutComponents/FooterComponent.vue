<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <footer class="relative" id="contacts">
    <div
      class="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-8 sm:py-12"
    >
      <div class="relative overflow-hidden rounded-[3rem] bg-[#070708]">
        <!-- декор -->
        <div
          class="pointer-events-none absolute -top-[15vh] right-[5vw] w-[60vw] max-w-[900px] aspect-square blur-[22px] opacity-90"
          style="
            transform: rotate(5deg);
            background: radial-gradient(
                55% 55% at 70% 30%,
                rgba(217, 254, 67, 0.25) 0%,
                rgba(217, 254, 67, 0) 60%
              ),
              radial-gradient(
                60% 60% at 40% 50%,
                rgba(241, 243, 246, 0.15) 0%,
                rgba(241, 243, 246, 0) 70%
              ),
              radial-gradient(
                70% 70% at 60% 60%,
                rgba(55, 58, 65, 0.2) 0%,
                rgba(55, 58, 65, 0) 65%
              );
          "
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute top-[5vh] right-[10vw] w-[48vw] max-w-[720px] aspect-square opacity-20"
          style="
            transform: rotate(24deg);
            background: linear-gradient(
              60deg,
              rgba(0, 0, 0, 0.02) 25%,
              rgba(255, 255, 255, 0.06) 38%,
              rgba(0, 0, 0, 0.02) 70%
            );
            mask-image: radial-gradient(
              60% 60% at 50% 50%,
              black 40%,
              transparent 60%
            );
          "
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute bottom-10 right-[12vw] w-[35vw] max-w-[620px] aspect-[3/2] blur-[90px] opacity-30"
          style="background: #000"
        />
        <div
          class="pointer-events-none absolute bottom-4 right-[10vw] w-[28vw] max-w-[520px] aspect-[2/1.1] blur-[90px] opacity-35"
          style="background: #000"
        />
        <div
          class="pointer-events-none absolute bottom-6 right-[8vw] w-[26vw] max-w-[500px] aspect-[2/1] blur-[110px] mix-blend-plus-lighter opacity-70"
          style="background: #f373ff; transform: rotate(-18deg)"
        />
        <div
          class="pointer-events-none absolute -bottom-2 right-[6vw] w-[18vw] max-w-[360px] aspect-[2/1.2] blur-[70px] mix-blend-plus-lighter opacity-50"
          style="background: #f373ff; transform: rotate(-18deg)"
        />

        <!-- контент -->
        <div class="relative z-10 px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
          <div
            class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10"
          >
            <!-- меню -->
            <nav
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white"
            >
              <div>
                <h4 class="text-sm font-medium text-white mb-4">
                  {{ t("footer.menu.about") }}
                </h4>
                <ul class="space-y-2 text-sm text-white/60">
                  <li>
                    <a
                      href="https://asterium.uz/#products"
                      class="hover:text-white transition-colors"
                      >{{ t("footer.links.products") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://asterium.uz/#products"
                      class="hover:text-white transition-colors"
                      >{{ t("footer.links.ecosystem") }}</a
                    >
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-sm font-medium text-white mb-4">
                  {{ t("footer.menu.forUser") }}
                </h4>
                <ul class="space-y-2 text-sm text-white/60">
                  <li>
                    <a
                      href="https://asterium.uz/#faq"
                      class="hover:text-white transition-colors"
                      >{{ t("footer.links.support") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://asterium.uz/#knowledge-base"
                      class="hover:text-white transition-colors"
                      >{{ t("footer.links.kb") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://asterium.uz/faq"
                      class="hover:text-white transition-colors"
                      >{{ t("footer.links.faq") }}</a
                    >
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-sm font-medium text-white mb-4">
                  {{ t("footer.menu.docs") }}
                </h4>
                <ul class="space-y-2 text-sm text-white/60">
                  <li>
                    <a
                      href="https://asterium.uz/license"
                      class="hover:text-white transition-colors"
                      >{{ t("footer.links.license") }}</a
                    >
                  </li>
                </ul>
              </div>
            </nav>

            <!-- соц. иконки -->
            <div
              class="flex flex-col items-start lg:items-end gap-4 lg:min-w-[320px]"
            >
              <div class="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/asteriumwallet/"
                  target="_blank"
                  rel="noopener"
                  :aria-label="t('footer.social.instagram')"
                  class="grid place-items-center h-11 w-11 rounded-xl bg-[#070708] [background:radial-gradient(107.5%_107.5%_at_50%_215%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),#070708] ring-1 ring-white/10 hover:ring-white/30 transition"
                >
                  <img
                    src="/icons/instagram.svg"
                    alt="Instagram"
                    class="w-7 h-8 object-contain"
                  />
                </a>

                <a
                  href="https://t.me/asterium"
                  target="_blank"
                  rel="noopener"
                  :aria-label="t('footer.social.telegram')"
                  class="grid place-items-center h-11 w-11 rounded-xl bg-[#070708] [background:radial-gradient(107.5%_107.5%_at_50%_215%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),#070708] ring-1 ring-white/10 hover:ring-white/30 transition"
                >
                  <img
                    src="/icons/telegram.svg"
                    alt="Telegram"
                    class="w-7 h-8 object-contain"
                  />
                </a>

                <a
                  href="https://www.youtube.com/@AsteriumWallet"
                  target="_blank"
                  rel="noopener"
                  :aria-label="t('footer.social.linkedin')"
                  class="grid place-items-center h-11 w-11 rounded-xl bg-[#070708] [background:radial-gradient(107.5%_107.5%_at_50%_215%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),#070708] ring-1 ring-white/10 hover:ring-white/30 transition"
                >
                  <img
                    src="/icons/youtube.svg"
                    alt="YouTube"
                    class="w-7 h-8 object-contain"
                  />
                </a>
              </div>
            </div>
          </div>

          <!-- низ -->
          <div
            class="mt-12 lg:mt-16 flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-8"
          >
            <div class="space-y-3">
              <p class="max-w-xl text-white text-base/6 tracking-[-0.01em]">
                {{ t("footer.slogan") }}
              </p>
              <p class="text-white/60 text-sm">
                {{ t("footer.copyright") }}
              </p>
            </div>

            <!-- логотип-бейдж -->
            <div class="relative">
              <div
                class="relative h-40 w-40 rounded-[2.3rem] bg-[#0C0C0C] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9)] ring-1 ring-white/10"
              >
                <div
                  class="pointer-events-none absolute inset-0 rounded-[2.3rem] blur-[18px]"
                  style="box-shadow: inset 0 -64px 10px #4b7400"
                />
                <div
                  class="pointer-events-none absolute -inset-2 rounded-[2.3rem] blur-[20px] opacity-70"
                  style="box-shadow: inset 0 -24px 24px #d6ff32"
                />
                <div
                  class="pointer-events-none absolute inset-0 rounded-[2.3rem] blur-[6px] opacity-80"
                  style="box-shadow: inset 0 -3px 7px #ffffff"
                />
                <div class="absolute inset-0 grid place-items-center">
                  <img
                    src="/icons/asterium_logo.svg"
                    alt="Asterium"
                    class="w-20 h-20 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /content -->
      </div>
    </div>
  </footer>
</template>
