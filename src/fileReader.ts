export function setupFileReader({ onImageRead }: { onImageRead: (event: ProgressEvent<FileReader>) => void }) {
    const readerInstance = new FileReader()
  
    readerInstance.addEventListener('load', onImageRead)
  
    return readerInstance
  }
  
  export function setupImageFileUpload({ readerInstance }: { readerInstance: FileReader }) {
    return (event: Event) => {
      const target = event.target as HTMLInputElement
      if (!target.files) return
  
      const file = target.files[0]

      if (!file) return
  
      readerInstance.readAsDataURL(file)
    }
  }
  
  export function setupParseReaderResult({ onParseComplete: onParseCompleteCallback }: { onParseComplete: (imgData: string) => void }) {
    return (readerResult: ProgressEvent<FileReader>) => {
      const imgData = readerResult.target?.result
      if (!imgData || typeof imgData !== 'string') return
  
      onParseCompleteCallback(imgData)
    }
  }