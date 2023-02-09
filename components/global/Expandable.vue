<template>
  <div
    class="
      relative
      inline-flex
      flex-col
      items-start
      justify-center
      max-w-[100vw]
    "
    :class="state.open && 'is-open'"
    id="expandable"
    ref="root"
    v-click-outside="onClickOutside"
  >
    <button
      @click="
        () => {
          state.active && onClick()
        }
      "
      aria-has-popup
      class="
        flex flex-grow-0
        font-bold
        items-center
        relative
        self-start
        text-left
        w-auto
        z-10
      "
      :class="state.active && 'cursor-pointer'"
    >
      <!-- TOGGLE SLOT -->
      <div class="pr-[24px]">
        <slot name="toggle" />
      </div>
      <SvgChevron
        v-show="state.active"
        class="
          ml-[4px]
          transition-transform
          duration-200
          rotate-180
          translate-y-[2px]
          min-w-[17px]
          absolute
          right-0
        "
        :class="state.open && 'rotate-0'"
      />
    </button>
    <div
      class="body duration-200 transition-height w-auto z-20 max-w-[100vw]"
      :aria-expanded="state.open"
      :style="drawerStyles"
    >
      <div ref="drawer" class="flex flex-col bg-white relative z-20">
        <!-- CONTENT SLOT -->
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// REFS
const root = ref(null)
const drawer = ref(null)

// VUE LIFECYCLE
const props = defineProps({
  active: { type: [String, Boolean], default: true },
})

const state = reactive({
  open: false,
  active: false,
  minWidth: 0,
})

// STYLE DECLARATIONS
const drawerStyles = computed(() => {
  const activeStyles = {
    height: state.open ? state.drawerHeight : '0px',
    overflow: 'hidden',
    position: 'absolute',
    minWidth: `${state.minWidth + 25}px`,
    top: 'calc(100% + 2px)',
  }

  return state.active ? activeStyles : inactiveStyles
})

const inactiveStyles = {
  height: 'auto',
  overflowY: 'visible',
  position: 'relative',
  minWidth: 'unset',
  top: 'unset',
}

// LIFECYCLE METHODS
onMounted(() => {
  state.active = props.active
  findWidestNode(drawer.value)
})

onUpdated(() => {
  // State was changed externally
  if (state.active != props.active) {
    state.active = props.active
    closeMyChildren()
  }
})

// HELPER METHODS
function getHeight() {
  const { height } = drawer.value.getBoundingClientRect()
  return `${height}px`
}

function findWidestNode(root) {
  Object.values(root.children).forEach((node) => {
    const { width } = node.getBoundingClientRect()
    if (width > state.minWidth) {
      state.minWidth = width
    }
  })
}

function closeMyChildren() {
  Object.values(drawer.value.children).forEach((node) => {
    if (node.id === 'expandable' && node.classList.contains('is-open')) {
      node.firstChild.click()
    }
  })
}

// EVENT RESPONDERS
function onClick() {
  if (state.active) {
    state.drawerHeight = getHeight()
    state.open = !state.open

    // Opening the Expandable
    if (state.open) {
      setTimeout(() => {
        drawer.value.parentElement.style.overflow = 'visible'
      }, 200)
      // Closing the Expandable
    } else {
      closeMyChildren()
    }
  }
}

function onClickOutside() {
  state.open = false
}
</script>
