type Comparator<T> = (a: T, b: T) => number;

export function quickSort<T>(array: T[], comparator: Comparator<T>): T[] {
    step(array, 0, array.length - 1, comparator);

    return array
}

function step<T>(array: T[], leftPointerIndex = 0, rightPointerIndex = array.length - 1, comparator: Comparator<T>): void {
    if (leftPointerIndex < rightPointerIndex) {
        const pivotIndex = rearrangeAndGetPivotIndex(array, leftPointerIndex, rightPointerIndex, comparator);

        step(array, leftPointerIndex, pivotIndex - 1, comparator);
        step(array, pivotIndex + 1, rightPointerIndex, comparator);
    }
}

function rearrangeAndGetPivotIndex<T>(array: T[], firstIndex = 0, lastIndex = array.length - 1, comparator: Comparator<T>): number {
    let pointerIndex = firstIndex;
    const itemToCompare: T = array[firstIndex];

    for (
        let currentIndex = firstIndex + 1;
        currentIndex <= lastIndex;
        currentIndex++
    ) {
        if (comparator(array[currentIndex], itemToCompare) <= 0) {
            pointerIndex++;
            swapByIndex(array, currentIndex, pointerIndex);
        }
    }

    swapByIndex(array, firstIndex, pointerIndex);

    return pointerIndex;
}

function swapByIndex<T>(array: T[], indexA: number, indexB: number) {
    [array[indexA], array[indexB]] = [array[indexB], array[indexA]];
}