
export function setupCanvas({ canvas, ctx, onRedraw }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, onRedraw: (imgData: ImageData) => void }) {
  const img = new Image()

  const redraw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const dims = contain(canvas.width, canvas.height, img.width, img.height)

    const width = Math.trunc(dims.width)
    const height = Math.trunc(dims.height)
    const offsetX = Math.trunc(dims.offsetX)
    const offsetY = Math.trunc(dims.offsetY)

    ctx.drawImage(img, offsetX, offsetY, width, height)

    onRedraw(ctx.getImageData(offsetX, offsetY, width, height))
  }

  img.addEventListener('load', redraw)

  return (src: string) => {
    img.src = src
  }
}

const contain = fit(true);

function fit(contains: boolean) {
  return (parentWidth: number, parentHeight: number, childWidth: number, childHeight: number, scale = 1, offsetX = 0.5, offsetY = 0.5) => {
    const childRatio = childWidth / childHeight;
    const parentRatio = parentWidth / parentHeight;

    let width = parentWidth * scale;
    let height = parentHeight * scale;

    if (contains ? (childRatio > parentRatio) : (childRatio < parentRatio)) {
      height = width / childRatio;
    } else {
      width = height * childRatio;
    }

    return {
      width,
      height,
      offsetX: (parentWidth - width) * offsetX,
      offsetY: (parentHeight - height) * offsetY,
    };
  };
}