export default class InfoCard extends HTMLElement {
  connectedCallback() {
    let avatar = this.getAttribute('avatar')
    let name = this.getAttribute('name')
    initShadow(this, { avatar, name })
  }
}

function initShadow($host, { avatar, name, isOpen }) {
  let $shadow = $host.attachShadow({ mode: isOpen ? 'open' : 'closed' })

  let $style = document.createElement('style')
  let $wrap = document.createElement('div')
  let $avatar = document.createElement('img')
  let $name = document.createElement('p')

  $style.textContent = `
    .info { display: flex; }
    .info-avatar { width: 100px; height: 100px; border-radius: 50%; }
    .info-name { display: flex; align-items: center; font-size: 16px; }
  `

  $wrap.className = 'info'
  $avatar.className = 'info-avatar'
  $name.className = 'info-name'

  $avatar.src = avatar
  $name.innerHTML = name

  $wrap.appendChild($avatar)
  $wrap.appendChild($name)

  $shadow.appendChild($style)
  $shadow.appendChild($wrap)
}

customElements.define('info-card', InfoCard)
