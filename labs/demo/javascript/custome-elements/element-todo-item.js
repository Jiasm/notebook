export default class TodoItem extends HTMLElement {
  static get observedAttributes() {
    return ['state']
  }
  constructor() {
    super()

    this.$shadow = this.attachShadow({ mode: 'open' })
    this.$wrap = document.createElement('div')
    this.$msg = document.createElement('p')
    let $check = (this.$check = document.createElement('input'))
    this.$delete = document.createElement('span')
    this.$style = document.createElement('style')

    $check.addEventListener('change', _ => {
      this.dispatchEvent(
        new Event($check.checked ? 'finish' : 'undo', { bubbles: true })
      )
    })

    this.$delete.addEventListener('click', _ => {
      this.dispatchEvent(new Event('delete', { bubbles: true }))
    })
  }
  connectedCallback() {
    let msg = this.getAttribute('msg')
    let state = this.getAttribute('state') === 'true'

    let { $shadow, $wrap, $msg, $check, $delete, $style } = this

    $style.textContent = `
      .todo-item { display: flex; align-items: center; }
      .todo-item input { margin-right: 2em; cursor: pointer; } 
      .todo-item p { display: flex; align-items: center; font-size: 16px; }
      .todo-item p.finish { text-decoration: line-through; }
      .todo-item span { flex: 1; cursor: pointer; text-align: right; padding-right: 2em; }
    `

    $msg.innerHTML = msg

    $check.type = 'checkbox'
    $check.checked = state
    $delete.innerHTML = 'X'

    $wrap.className = 'todo-item'
    $wrap.appendChild($check)
    $wrap.appendChild($msg)
    $wrap.appendChild($delete)
    $shadow.appendChild($style)
    $shadow.appendChild($wrap)
  }

  attributeChangedCallback() {
    let state = this.getAttribute('state') === 'true'

    if (state) {
      this.$msg.classList.add('finish')
    } else {
      this.$msg.classList.remove('finish')
    }
  }
}

customElements.define('todo-item', TodoItem)
