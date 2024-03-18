

export function setupWorker({ onWorkerResponse }: { onWorkerResponse: (event: MessageEvent<{ colors: number[][] }>) => void }) {
    const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });

    worker.addEventListener('message', onWorkerResponse)

    return (imgData: ImageData) => {
        worker.postMessage({ buffer: imgData.data.buffer }, [imgData.data.buffer])
    }
}