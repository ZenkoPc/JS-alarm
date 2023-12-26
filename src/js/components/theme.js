import { getTheme, setTheme } from "../storage/theme";

export function Theme() {//funcion tema

  const theme = getTheme() //obtiene el estilo del sitio dark/light
  const button = document.querySelector('#Theme-button') //selecciona al elemento con el id

  button.setAttribute('data-theme', theme) //le da un atributo al elemento

  if (theme === 'dark') { //si el identificador es dark cambia a light (solo texto no css)
    //button.innerText = ''
  } else {
    //button.innerText = ''
  }

  document.body.classList.add(`is-theme-${theme}`) //agrega una clase al body css

  button.addEventListener('click', () => { //evento de click
    const currentTheme = button.getAttribute('data-theme') //obtiene el atributo del estilo actual

    if (currentTheme === 'dark') { //si el tema es oscuro configura las clases a light
      button.setAttribute('data-theme', 'light')

      document.body.classList.add('is-theme-light')
      document.body.classList.remove('is-theme-dark')

      setTheme('light')
    } else { // si el tema es claro configura las clases a dark
      button.setAttribute('data-theme', 'dark')

      document.body.classList.add('is-theme-dark')
      document.body.classList.remove('is-theme-light')

      setTheme('dark')
    }
  })
}