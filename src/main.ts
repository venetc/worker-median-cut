import { setupCanvas } from './canvas'
import { setupColorsRedraw } from './dom'
import { setupImageFileUpload, setupFileReader, setupParseReaderResult } from './fileReader'
import { setupWorker } from './workerUtils'

window.addEventListener('DOMContentLoaded', init)

function init() {
  const fileInput = document.querySelector<HTMLInputElement>('#file')
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
  if (!fileInput || !canvas) return
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return

  const redrawColors = setupColorsRedraw()
  const sendToWorker = setupWorker({ onWorkerResponse: redrawColors })
  const updateImageSource = setupCanvas({ canvas, ctx, onRedraw: sendToWorker })
  const onReaderComplete = setupParseReaderResult({ onParseComplete: updateImageSource })
  const readerInstance = setupFileReader({ onImageRead: onReaderComplete })
  const onImageUpload = setupImageFileUpload({ readerInstance })

  fileInput.addEventListener('change', onImageUpload)
}


