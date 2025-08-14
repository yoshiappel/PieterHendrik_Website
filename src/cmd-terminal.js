const openButton = document.getElementById('open-terminal');
const terminalIcon = document.getElementById('terminal-icon');
const terminal = document.getElementById('terminal');
const form = document.getElementById('terminal-form');
const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

const Themes = ['cyberpunkred', 'cyberpunkyellow'];

// list of all available commands
const commands = {
    name: "Pieter Hendrik",
    age: "17",
    location: "The Netherlands",
    funfact: "I like C#",
    favgame: "Terraria",
    favsong: "Money for nothing.",
    favanimal: "Cat",
    yoshi: "meow",
    bestgame: "Colacrash",
    help: "Available commands: name, age, location, rain on/off, theme red/yellow, funfact, github, clear, help.\nFor more commands visit the repository or type 'repo'",
    github: "Opening GitHub... https://github.com/yoshiappel",
    repo: "Opening repository... https://github.com/yoshiappel/PieterHendrik_Website"
};

function applyTheme(themeName) {
    Themes.forEach(t => {
        const link = document.getElementById(t);
        if (link) {
        link.disabled = t !== themeName;
        }
    });
    localStorage.setItem('theme', themeName);
}

// open the terminal if someone click the button or hide it again
openButton.addEventListener('click', () => {
    terminal.classList.toggle('hidden'); // turn of this class to show the terminal, press it again to hide it again
    // change the icon on open and close
    if (terminal.classList.contains('hidden')) {
        terminalIcon.classList.remove('fa-xmark');
        terminalIcon.classList.add('fa-terminal');
    } else {
        terminalIcon.classList.remove('fa-terminal');
        terminalIcon.classList.add('fa-xmark');
    }
    input.focus(); // set keyboard focus on the terminal so the user doesnt have to click on it to use it
});

// add a eventlistener to the terminal input and listen for when the user presses enter
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const command = input.value.trim().toLowerCase(); // get the input value remove whitespaces and convert it to lowercase so even if the user types in cases the commands will work and store this value in command
    output.innerHTML += `> ${command}\n`; // print command to the terminal (so the user can see what command they used)

    // do extra things if the command is a specific one:
    if (command === 'clear') { // if the command is clear then clear the entire terminal
        output.innerHTML = ''; 
    } else if (command === 'theme red') {
        const selectedTheme = 'cyberpunkred'
        applyTheme(selectedTheme);
        output.innerHTML += `Theme changed to: ${selectedTheme}\n`;
    } else if (command === 'theme yellow') {
        const selectedTheme = 'cyberpunkyellow'
        applyTheme(selectedTheme);
        output.innerHTML += `Theme changed to: ${selectedTheme}\n`;
    } else if (command === 'rain on') { // toggle the rain on 
        window.startRain();
        output.innerHTML += `Rain enabled\n`;
    } else if (command === 'rain off') { // toggle the rain off
        window.stopRain();
        output.innerHTML += `Rain disabled\n`;
    } else if (commands[command]) { // if the command is one of the defined commands, then print that to the terminal
        output.innerHTML += commands[command] + '\n'; 
        if (command === 'github') { // then if the command is github open a new window to the github
            window.open('https://github.com/yoshiappel', '_blank');
        } else if (command === 'repo') {
            window.open('https://github.com/yoshiappel/PieterHendrik_Website', '_blank');
        }
    } else { // if the command is none of the above let the user know they can type help for a list
        output.innerHTML += `Unknown command: "${command}"\nType 'help' for a list of commands.\n`;
    }
    // scroll the terminal to the bottom so new messages are always visible
    terminal.scrollTop = terminal.scrollHeight;
    input.value = ''; // clear the inputfield so the user can use it again
});

