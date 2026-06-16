// Dark mode toggle — persists preference in localStorage
const html = document.documentElement
const btn = document.getElementById('theme-toggle')

const stored = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

if (stored === 'dark' || (!stored && prefersDark)) {
  html.classList.add('dark')
}

btn.addEventListener('click', () => {
  html.classList.toggle('dark')
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light')
})
