let jaFontsPromise
let activeFontAlias = null

const loadedFonts = new Map()
const jaFontsUrl = new URL('../ja-fonts.json', import.meta.url)

function buildFontUrl (font) {
  const weights = font.weights.join(';')
  return `https://fonts.googleapis.com/css2?family=${font.family}:wght@${weights}&display=swap`
}

export function getJaFonts () {
  if (!jaFontsPromise) {
    jaFontsPromise = fetch(jaFontsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ja-fonts.json: ${response.status} ${response.statusText}`)
        }

        return response.json()
      })
  }

  return jaFontsPromise
}

export async function loadJaFont (fontAlias) {
  const fonts = await getJaFonts()
  const font = fonts[fontAlias]

  if (!font) {
    throw new Error(`Unknown Japanese font alias: ${fontAlias}`)
  }

  if (activeFontAlias && activeFontAlias !== fontAlias) {
    unloadJaFont()
  }

  if (!loadedFonts.has(fontAlias)) {
    const link = document.createElement('link')

    link.rel = 'stylesheet'
    link.href = buildFontUrl(font)
    link.dataset.fontAlias = fontAlias

    document.head.appendChild(link)
    loadedFonts.set(fontAlias, link)
  }

  activeFontAlias = fontAlias

  return font.name
}

export function unloadJaFont () {
  if (!activeFontAlias) {
    return
  }

  const link = loadedFonts.get(activeFontAlias)

  if (link) {
    link.remove()
    loadedFonts.delete(activeFontAlias)
  }

  activeFontAlias = null
}
