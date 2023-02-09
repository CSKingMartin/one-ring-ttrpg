<template>
  <h2>Super Nest "nuts" example</h2>
  <Expandable :active="state.active">
    <template v-slot:toggle>
      <div>This is Toggle 5. Nuts example.</div>
    </template>
    <template v-slot:content>
      <Expandable>
        <template v-slot:toggle
          ><div>This is Toggle 6. Nuts example. varied width</div></template
        >
        <template v-slot:content>
          <Expandable>
            <template v-slot:toggle
              >This is the Toggle 7 inside Toggle 6. Gotta big a bit
              longer.</template
            >
            <template v-slot:content>
              <Expandable>
                <template v-slot:toggle>Another toggle </template>
                <template v-slot:content
                  >Another section of body content</template
                >
              </Expandable>
            </template>
          </Expandable>
        </template>
      </Expandable>
    </template>
  </Expandable>
</template>
<script setup lang="ts">
import throttle from 'lodash-es/throttle'

const state = reactive({
  active: false,
})

onMounted(() => {
  setActivity(window.innerWidth)

  window.addEventListener('resize', (e) => setActivity(e.target.innerWidth))
})

function setActivity(width) {
  if (width < 640) {
    state.active = false
  } else {
    state.active = true
  }
}
</script>
