<script setup lang="ts">
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { ChevronDown } from 'lucide-vue-next'
import { useLightstickStore } from '@/stores/useLightstickStore'
import { watch } from 'vue'

const store = useLightstickStore()

const itemSize = [{ size: 5 }, { size: 10 }, { size: 30 }, { size: 50 }, { size: 100 }] as const
const itemsPerPage = ref(itemSize[0])

watch(
  () => itemsPerPage.value,
  () => {
    store.setItemPerPage(itemsPerPage.value.size)
  },
)
</script>

<template>
  <div class="w-20 min-w-15 max-w-[100px]">
    <Listbox v-model="itemsPerPage">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white border border-gray-500/30 py-2 pl-3 pr-10 text-left sm:text-sm"
        >
          <span class="block truncate">{{ itemsPerPage.size }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown class="h-5 w-5 text-gray-400" :size="18" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="(num, idx) in itemSize"
              :key="idx"
              :value="num"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-purple-100 text-purple-600' : 'text-gray-600',
                  'relative cursor-default select-none py-2 px-4',
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                  {{ num.size }}
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
