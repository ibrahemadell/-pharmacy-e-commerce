// Handles file uploads to the backend /api/upload endpoint
export const useUpload = () => {
  const authStore  = useAuthStore()
  const config     = useRuntimeConfig()
  const uploading  = ref(false)
  const uploadProgress = ref(0)

  const uploadImage = async (file: File, folder = 'products'): Promise<string | null> => {
    uploading.value  = true
    uploadProgress.value = 0

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(
        `${config.public.apiBase}/upload/image?folder=${folder}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: formData,
        }
      )

      const data = await res.json()
      uploadProgress.value = 100
      return data?.data?.url ?? null
    } catch (err) {
      console.error('Upload failed:', err)
      return null
    } finally {
      uploading.value = false
    }
  }

  const uploadMultiple = async (files: File[], folder = 'products'): Promise<string[]> => {
    uploading.value = true
    const formData  = new FormData()
    files.forEach(f => formData.append('files', f))

    try {
      const res = await fetch(
        `${config.public.apiBase}/upload/images?folder=${folder}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: formData,
        }
      )
      const data = await res.json()
      return data?.data ?? []
    } catch {
      return []
    } finally {
      uploading.value = false
    }
  }

  return { uploading, uploadProgress, uploadImage, uploadMultiple }
}
