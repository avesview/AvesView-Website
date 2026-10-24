<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-1 pb-16 md:pb-0">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
