<script setup lang="ts">
const deadline = "2025-12-31T21:00:00Z";

import HeroSection from "~/components/HeroSection.vue";
import PrizesSection from "~/components/PrizesSection.vue";
import HowToParticipate from "~/components/HowToParticipate.vue";
import WinnersSection from "~/components/WinnersSection.vue";
</script>

<template>
  <HeroSection :deadline="deadline" />
  <PrizesSection />
  <HowToParticipate />
  <FeaturesSection />
  <WinnersSection :deadline="deadline" />
</template>
