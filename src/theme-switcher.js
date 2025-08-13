const themeLink = document.getElementById('theme-style'); // css link
const toggleLink = document.getElementById('theme-toggle'); // <a> to switch theme

// list all the themes
const Themes = ['cyberpunkred', 'cyberpunkyellow']

// get the current loaded theme
function getCurrentTheme() {
  const href = themeLink.getAttribute('href')
  return href.includes('cyberpunkred') ? 'recyberpunkred' : 'cyberpunkyellow'; // if href includes "cyberpunkred" the return "cyberpunkred" else return "cyberpunkyellow"
}

// switch the current theme to the next
function toggleTheme() {
  const currentTheme = getCurrentTheme(); // first get the current theme to avoid loading the same theme again
  const nextTheme = currentTheme === 'cyberpunkyellow' ? 'cyberpunkred' : 'cyberpunkyellow'; // if the currenTheme is "cyberpunkyellow" switch to "cyberpunkred"
  themeLink.setAttribute('href', `CSS/themes/${nextTheme}.css`) // now set the href to the right css script
  localStorage.setItem('theme', nextTheme) // save this preference in localstorage
}

// load the saved preference if it exist on page load
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'cyberpunkred';
  themeLink.setAttribute('href', `CSS/themes/${saved}.css`);
});

// if the user click on the <a>
toggleLink.addEventListener('click', (e) => {
  e.preventDefault(); 
  toggleTheme(); // switch theme
});

