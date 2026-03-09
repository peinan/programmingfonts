import { Cookies } from './cookies.js'
import { Samples } from './samples.js'

export class Language {
  el = document.getElementById('select-language')
  samples = new Samples()

  init () {
    this.addJapaneseOption()

    if (Cookies.get('language')) {
      this.el.value = Cookies.get('language')
    }
    this.el.onchange = () => {
      this.set()
    }
    this.set()
  }

  set () {
    const lang = this.el.value

    window.CMeditor.doc.setValue(this.samples.get(lang))
    window.CMeditor.setOption('mode', this.getMode(lang))
    window.CMeditor.refresh()

    Cookies.set('language', lang)
  }

  addJapaneseOption () {
    if ([...this.el.options].some((option) => option.text === 'Japanese')) {
      return
    }

    const option = document.createElement('option')
    const rubyOption = [...this.el.options].find((existing) => existing.text === 'Ruby')

    option.text = 'Japanese'

    if (rubyOption) {
      this.el.insertBefore(option, rubyOption)
      return
    }

    this.el.append(option)
  }

  getMode (lang) {
    if (lang.toLowerCase() === 'japanese') {
      return 'python'
    }

    return lang.toLowerCase()
  }
}
