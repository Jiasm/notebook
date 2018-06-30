import InfoCard from './cus-elements-info-card.js'

export default class InfoList extends HTMLElement {
  connectedCallback() {
    // load data
    let data = [
      {
        avatar: 'https://avatars1.githubusercontent.com/u/9568094?v=4',
        name: 'Jarvis'
      },
      {
        avatar: 'https://avatars1.githubusercontent.com/u/9568094?v=4',
        name: 'Jarvis'
      },
      {
        avatar: 'https://avatars1.githubusercontent.com/u/9568094?v=4',
        name: 'Jarvis'
      }
    ]
    // laod data end

    initShadow(this, { data })
  }
}

function initShadow($host, { data, isOpen }) {
  let $shadow = $host.attachShadow({ mode: isOpen ? 'open' : 'closed' })

  let $style = document.createElement('style')
  let $wrap = document.createElement('div')

  $style.textContent = `
    .list { display: flex; flex-direction: column; }
  `

  $wrap.className = 'list'

  data.forEach(item => {
    let $item = new InfoCard()
    $item.setAttribute('avatar', item.avatar)
    $item.setAttribute('name', item.name)

    $wrap.appendChild($item)
  })

  $shadow.appendChild($style)
  $shadow.appendChild($wrap)
}

customElements.define('info-list', InfoList)
