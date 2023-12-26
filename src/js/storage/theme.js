const keyTheme = 'alarms-theme' //nombre del key que se usara en el local-storage

export function getTheme() { //obtener estilo de la pagina
  const themeStorage  = window.localStorage.getItem(keyTheme) //busca en el local storage la key
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches //ve cual es el estilo de la pagina
  
  let theme = isDark ? 'dark' : 'light' //ve cual tema es, si es true = dark / false = light

  if (themeStorage !== null) { //si no es null devuelve el tema
    theme = themeStorage
  }

  return theme //devuelve nada si no hay key
}

export function setTheme(theme) { //cambia el key existente con el nuevo valor del tema)
  window.localStorage.setItem(keyTheme, theme)
}