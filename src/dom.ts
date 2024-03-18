export function setupColorsRedraw() {
    const container = document.querySelector<HTMLDivElement>('#colors')
    const gradient = document.querySelector<HTMLDivElement>('#gradient')

    return (colors: number[][] | MessageEvent<{ colors: number[][] }>) => {
        if (!container || !gradient) return
        container.innerHTML = ''

        if (!Array.isArray(colors)) colors = colors.data.colors

        colors.forEach((color) => {
            const div = document.createElement('div')
            div.style.backgroundColor = `rgb(${color.join(',')})`
            div.style.flex = '1'
            div.style.aspectRatio = '1'
            container.appendChild(div)
        })

        gradient.style.background = `linear-gradient(to right, ${colors.map((color) => `rgb(${color.join(',')})`).join(',')})`
    }
}