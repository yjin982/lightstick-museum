<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import { storeToRefs } from 'pinia'
import { GDialog } from 'gitart-vue-dialog'

const store = useDialogStore()
const { isOpen, selectedItem } = storeToRefs(store)
</script>

<template>
  <div>
    <GDialog v-model="isOpen" width="1200">
      <Carousel :autoplay="0">
        <Slide v-for="item of 10" :key="item">
          <div>{{ item }}</div>
        </Slide>
      </Carousel>
    </GDialog>
  </div>
</template>

<style lang="scss" scoped></style>
