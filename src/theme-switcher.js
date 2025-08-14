const toggleLink = document.getElementById('theme-toggle'); // the css links in html head

const Themes = ['cyberpunkred', 'cyberpunkyellow']; // all the available themes to switch trough

// check the current selected theme
function getCurrentTheme() {
  return localStorage.getItem('theme') || 'cyberpunkred'; // check if there is a theme saved in localstorage else return the default "cyberpunkred"
}

// apply the selected theme
function applyTheme(theme) {
  Themes.forEach(t => { // loop through all themes
    const link = document.getElementById(t); // find the corresponding <link> element for each theme
    if (link) { // make sure the <link> actually exist before continuing 
      link.disabled = t !== theme; // enable only the selected theme
    }
  });
}

// switch the theme 
function switchTheme() {
  const currentTheme = getCurrentTheme(); // get the current theme
  const nextTheme = currentTheme === 'cyberpunkyellow' ? 'cyberpunkred' : 'cyberpunkyellow'; // if currentTheme is cyberpunkyellow the select cyberpunkred else select cyberpunkyellow and set nextTheme to this value
  applyTheme(nextTheme); // apply the right theme
  localStorage.setItem('theme', nextTheme); // save the selected theme in localstorage 
}

// on page load, apply the theme by giving the value of getCurrentTheme to applyTheme
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getCurrentTheme());
  document.body.style.visibility = 'visible'; // show page only after theme is applied
});

// check if the <a> component has been clicked
toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  switchTheme(); // switch the theme
});
