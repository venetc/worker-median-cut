/// <reference lib="webworker" />

import { bufferToPixels, medianCut } from "./medianCut";

addEventListener('message', (e: MessageEvent<{ buffer: ArrayBuffer }>) => {
    const pixels = bufferToPixels(e.data.buffer)
    const colors = medianCut(pixels)

    postMessage({ colors })
})