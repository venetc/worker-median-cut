import { quickSort } from "./quickSort";
const enum RGBA {
    R = 0,
    G = 1,
    B = 2,
    A = 3
}

export function medianCut(pixels: number[][], initialDepth = 0, maxDepth = 4 /* 2^4 */): number[][] {
    if (initialDepth === maxDepth || pixels.length === 0) {
        const color = getDerivedColor(pixels);

        return [color];
    }

    const pivotIndex = sortAndGetPivotIndex(pixels);

    return [
        ...medianCut(pixels.slice(0, pivotIndex), initialDepth + 1, maxDepth),
        ...medianCut(pixels.slice(pivotIndex + 1), initialDepth + 1, maxDepth),
    ];
}

export function bufferToPixels(buffer: ArrayBuffer) {
    const viewArray = new Uint8Array(buffer);

    const pixels = [];
    const QUALITY = 10

    for (let i = 0, offset, R, G, B, A, isOpaque; i < viewArray.length / 4; i += QUALITY) {
        offset = i * 4;

        R = viewArray[offset + RGBA.R];
        G = viewArray[offset + RGBA.G];
        B = viewArray[offset + RGBA.B];
        A = viewArray[offset + RGBA.A];

        isOpaque = typeof A === 'undefined' || A >= 125

        if (isOpaque) pixels.push([R, G, B]);
    }

    return pixels
}

function getDerivedColor(pixels: number[][]) {
    const color: number[] = [0, 0, 0];

    for (const pixel of pixels) {
        color[RGBA.R] += pixel[RGBA.R];
        color[RGBA.G] += pixel[RGBA.G];
        color[RGBA.B] += pixel[RGBA.B];
    }

    color[RGBA.R] = Math.round(color[RGBA.R] / pixels.length);
    color[RGBA.G] = Math.round(color[RGBA.G] / pixels.length);
    color[RGBA.B] = Math.round(color[RGBA.B] / pixels.length);

    return color;
}

function sortAndGetPivotIndex(pixels: number[][]) {
    const componentToSortBy = getDifference(pixels);

    quickSort(pixels, (a, b) => a[componentToSortBy] - b[componentToSortBy])

    return pixels.length / 2;
}

function getDifference(RGBs: number[][]) {
    const R = { MIN: 0, MAX: 0, DIFF: 0 };
    const G = { MIN: 0, MAX: 0, DIFF: 0 };
    const B = { MIN: 0, MAX: 0, DIFF: 0 };

    for (const RGB of RGBs) {
        R.MIN = Math.min(R.MIN, RGB[RGBA.R]);
        G.MIN = Math.min(G.MIN, RGB[RGBA.G]);
        B.MIN = Math.min(B.MIN, RGB[RGBA.B]);

        R.MAX = Math.max(R.MAX, RGB[RGBA.R]);
        G.MAX = Math.max(G.MAX, RGB[RGBA.G]);
        B.MAX = Math.max(B.MAX, RGB[RGBA.B]);
    }

    R.DIFF = R.MAX - R.MIN;
    G.DIFF = G.MAX - G.MIN;
    B.DIFF = B.MAX - B.MIN;

    const biggestDiff = Math.max(R.DIFF, G.DIFF, B.DIFF);

    return biggestDiff === R.DIFF
        ? RGBA.R
        : biggestDiff === G.DIFF
            ? RGBA.G
            : RGBA.B;
};
