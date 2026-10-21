<script setup lang="ts">
// Thin-line icon set (1.25 stroke) drawn for this site.
withDefaults(defineProps<{ name: IconName; size?: number | string }>(), { size: 20 })
</script>

<script lang="ts">
const paths = {
  home: '<path d="M4 10.5 12 4l8 6.5V20H14.5v-5.5h-5V20H4z"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx=".5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx=".5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx=".5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx=".5"/>',
  frame: '<rect x="3.5" y="4.5" width="17" height="15" rx=".5"/><rect x="6.5" y="7.5" width="11" height="9"/><path d="m6.5 16.5 3.5-4 2.5 2.5 2-2 3 3.5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  bag: '<path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  arrow: '<path d="M4 12h15m-5-5 5 5-5 5"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  phone: '<path d="M6.5 4h3l1.5 4-2 1.2a10 10 0 0 0 5.8 5.8L16 13l4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1"/><path d="m4 6.5 8 6 8-6"/>',
  pin: '<path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.8" r="2.3"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  share: '<path d="M12 3.5v11"/><path d="m8.5 7 3.5-3.5L15.5 7"/><path d="M8 10.5H6.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H16"/>',
  install: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M12 7v7"/><path d="m9.2 11.4 2.8 2.8 2.8-2.8"/><path d="M10.5 18.5h3"/>',
  diamond: '<path d="M6.5 4h11L21 9l-9 11L3 9l3.5-5Z"/><path d="M3 9h18M9.5 4 8 9l4 11 4-11-1.5-5"/>',
  shield: '<path d="M12 3.5 19 6v5.5c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6l7-2.5Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  gift: '<rect x="4" y="9" width="16" height="11" rx=".5"/><path d="M3 9h18M12 9v11M12 9S10.8 4.5 8.4 4.5a2.2 2.2 0 0 0 0 4.5M12 9s1.2-4.5 3.6-4.5a2.2 2.2 0 0 1 0 4.5"/>',
  hand: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12m0-6.5V5a1.5 1.5 0 0 1 3 0v7m0-5.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5A6.5 6.5 0 0 1 5 17l-1.6-3a1.5 1.5 0 0 1 2.5-1.6L8 15"/>',
  brush: '<path d="M19.5 4.5c-2 1-7.6 6.4-9 8.6l1.4 1.4c2.2-1.4 7.6-7 8.6-9a.7.7 0 0 0-1-1Z"/><path d="M10.2 13.4c-2 0-3.2 1.4-3.2 3.1 0 1.3-.9 2.2-2.5 2.5 3.6 1.6 7.4.6 7.2-3.1"/>',
  rings: '<circle cx="9" cy="14" r="5"/><circle cx="15" cy="14" r="5"/><path d="m7.5 6.5 1.5-2h0l1.5 2"/>',
  engrave: '<path d="M4 20h16"/><path d="m14.5 5.5 3 3L9 17H6v-3l8.5-8.5Z"/>',
  sparkle: '<path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z"/><path d="M19 15.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5Z"/>',
  lotus: '<path d="M12 19c-3.5 0-7-2.2-8.5-6 2.6-.4 5.3.6 7 2.6M12 19c3.5 0 7-2.2 8.5-6-2.6-.4-5.3.6-7 2.6M12 19c-2-1.8-3-4-3-6.5S10.2 7.4 12 5c1.8 2.4 3 5 3 7.5S14 17.2 12 19Z"/>',
  whatsapp:
    '<path d="M4.2 19.8 5.3 16A8 8 0 1 1 8.4 19l-4.2.8Z"/><path d="M9.2 8.6c.2-.4.6-.5.9-.4l.6 1.4c.1.3 0 .5-.2.7l-.4.4a5.4 5.4 0 0 0 2.9 2.9l.4-.4c.2-.2.5-.3.7-.2l1.4.6c.3.1.4.5.3.8-.3.9-1.1 1.4-2 1.3-2.6-.4-4.6-2.4-5-5 0-.6.2-1.2.4-1.5Z"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>',
}

export type IconName = keyof typeof paths
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.25"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="paths[name]"
  />
</template>
