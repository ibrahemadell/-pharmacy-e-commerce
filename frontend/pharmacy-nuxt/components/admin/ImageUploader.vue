<template>
  <div>
    <!-- Drop zone -->
    <div
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="handleDrop"
      class="border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer"
      :class="dragging
        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
        : 'border-gray-200 dark:border-slate-600 hover:border-emerald-400 hover:bg-gray-50 dark:hover:bg-slate-700/30'"
      @click="$refs.fileInput.click()">
      <input ref="fileInput" type="file" accept="image/*" multiple class="hidden"
        @change="handleFileSelect" />

      <div v-if="!uploading">
        <Icon name="heroicons:arrow-up-tray" class="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Drop images here or <span class="text-emerald-600">browse</span>
        </p>
        <p class="text-xs text-gray-400 mt-1">PNG, JPG, WebP — max 5MB each</p>
      </div>

      <div v-else class="flex flex-col items-center gap-2">
        <Icon name="svg-spinners:ring-resize" class="w-8 h-8 text-emerald-600" />
        <p class="text-sm text-gray-500">Uploading…</p>
      </div>
    </div>

    <!-- OR paste URL -->
    <div class="flex gap-2 mt-3">
      <input v-model="urlInput" type="url" placeholder="Or paste image URL…"
        class="input-field text-sm py-2 flex-1" @keyup.enter="addUrl" />
      <button type="button" @click="addUrl" class="btn-secondary text-sm px-3 py-2">Add</button>
    </div>

    <!-- Preview Grid -->
    <div v-if="modelValue.length" class="grid grid-cols-4 gap-2 mt-4">
      <div v-for="(url, i) in modelValue" :key="url + i"
        class="relative group aspect-square">
        <NuxtImg :src="url" class="w-full h-full object-contain rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700" />

        <!-- Remove button -->
        <button type="button" @click="removeImage(i)"
          class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full
                 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Icon name="heroicons:x-mark" class="w-3 h-3" />
        </button>

        <!-- Primary badge -->
        <button type="button" @click="$emit('set-primary', i)"
          class="absolute bottom-1 inset-x-1 text-xs py-0.5 rounded-lg text-center transition-all opacity-0 group-hover:opacity-100"
          :class="primaryIndex === i
            ? 'bg-emerald-600 text-white opacity-100'
            : 'bg-white/90 dark:bg-slate-800/90 text-gray-600 dark:text-gray-300'">
          {{ primaryIndex === i ? '★ Primary' : 'Set Primary' }}
        </button>
      </div>
    </div>

    <p v-if="error" class="text-xs text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
  primaryIndex: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  'set-primary': [index: number]
}>()

const { uploading, uploadMultiple } = useUpload()
const dragging  = ref(false)
const urlInput  = ref('')
const error     = ref('')

const handleDrop = async (e: DragEvent) => {
  dragging.value = false
  const files = Array.from(e.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'))
  if (files.length) await processFiles(files)
}

const handleFileSelect = async (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])
  if (files.length) await processFiles(files)
}

const processFiles = async (files: File[]) => {
  error.value = ''
  const oversized = files.filter(f => f.size > 5 * 1024 * 1024)
  if (oversized.length) { error.value = `${oversized.length} file(s) exceed 5MB limit`; return }

  const urls = await uploadMultiple(files)
  if (urls.length) {
    emit('update:modelValue', [...props.modelValue, ...urls])
  } else {
    error.value = 'Upload failed — please try again'
  }
}

const addUrl = () => {
  const url = urlInput.value.trim()
  if (!url) return
  if (!url.startsWith('http')) { error.value = 'Please enter a valid URL'; return }
  emit('update:modelValue', [...props.modelValue, url])
  urlInput.value = ''
  error.value    = ''
}

const removeImage = (i: number) => {
  const updated = [...props.modelValue]
  updated.splice(i, 1)
  emit('update:modelValue', updated)
}
</script>
