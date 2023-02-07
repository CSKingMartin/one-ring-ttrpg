<template>
  <div
    class="relative inline-flex flex-col items-start justify-center"
    ref="htmlRoot"
  >
    <button
      @click="toggleDrawer()"
      aria-has-popup
      class="
        flex
        w-auto
        flex-grow-0
        cursor-pointer
        items-center
        self-start
        rounded-[60px]
        text-left
        font-bold
      "
    >
      <slot name="toggle" />
    </button>
    <div
      class="
        body
        transition-height
        absolute
        top-[40px]
        right-[-25px]
        col-span-12 col-start-2
        overflow-hidden
        duration-200
      "
      ref="drawer"
      :style="`height: ${state.open ? state.drawerHeight : '0px'}`"
    >
      <div
        ref="drawerInnerWrap"
        class="flex flex-col rounded-[25px] bg-white py-[15px] px-[25px]"
      >
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import throttle from 'lodash-es/throttle'
const props = defineProps({
  breakpoint: { type: String },
})

const state = reactive({
  drawerHeight: '0px',
  open: false,
  active: false,
})

// for measuring the drawer / expand
const htmlRoot = ref(null)
const drawerInnerWrap = ref(null)

function toggleDrawer() {
  if (state.open) {
    state.drawerHeight = '0px'
  } else {
    state.drawerHeight = calcDrawerHeight()
  }
  htmlRoot.value.classList.toggle('is-open')
  state.open = !state.open
}

const calcDrawerHeight = throttle((e) => {
  if (drawerInnerWrap.value) {
    const { height } = drawerInnerWrap.value.getBoundingClientRect()
    return `${height}px`
  } else {
    return state.drawerHeight
  }
}, 33)
</script>
<style scoped>
.is-open {
  button {
    /* background: theme(colors.white); */

    svg {
      transform: rotate(0deg) translateY(-2px);
    }
  }
}
</style>
