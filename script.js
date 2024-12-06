window.onload = function() {
    const dolphinContainer = document.getElementById('dolphin-container');
    const dolphinEmoji = document.getElementById('dolphin-emoji');
    const animatedText = document.getElementById('animated-text');
    
    dolphinEmoji.style.animation = "dolphinMove 2s ease-out forwards"; 
    setTimeout(() => {
        dolphinContainer.classList.add('active');
    }, 1000); 
};

const emojiElements = document.querySelectorAll('.emoji');
emojiElements.forEach(emoji => {
    emoji.addEventListener('click', () => {
        const quote = emoji.getAttribute('data-quote');
        showModal(quote);
    });
});

function showModal(quote) {
    const modal = document.getElementById('quote-modal');
    const quoteText = document.getElementById('quote-text');
    quoteText.textContent = quote;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('quote-modal');
    modal.style.display = 'none';
}

window.addEventListener('scroll', () => {
    const section = document.querySelector('.text-image-section');
    const sectionPosition = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionPosition < windowHeight) {
        section.classList.add('visible');
    }
});




// Dictionnaire d'émojis liés à l'océan
const emojiDictionary = {
    "mer": "🌊",
    "poisson": "🐠",
    "plage": "🏖️",
    "océan": "🌊",
    "soleil": "🌞",
    "ciel": "🌌",
    "île": "🏝️",
    "vagues": "🌊",
    "coucher de soleil": "🌅",
    "plongée": "🤿"
};

// Citations inspirantes
const quotes = {
    "mer": "La mer est un miroir du ciel, un lieu de calme et de beauté.",
    "poisson": "Les poissons dansent dans les eaux, un ballet naturel sous l'eau.",
    "plage": "La plage est là pour nous rappeler la beauté simple de la nature.",
    "océan": "L'océan ne fait pas de bruit, il parle au cœur des rêveurs.",
    "soleil": "Le soleil sur la mer, c'est la lumière de la vie.",
    "île": "Les îles sont des refuges de paix et de tranquillité.",
    "vagues": "Les vagues portent avec elles des secrets anciens et des rêves futurs.",
    "coucher de soleil": "Chaque coucher de soleil est une promesse d'un nouveau jour."
};




document.getElementById('sentence-input').addEventListener('input', function() {
    let inputText = this.value.toLowerCase();
    let suggestions = Object.keys(emojiDictionary).filter(word => word.startsWith(inputText));
    let hintText = suggestions.length > 0 ? suggestions.join(", ") : "";
    document.getElementById('examples').textContent = "Exemples de mots : " + hintText;
});

document.getElementById('convert-button').addEventListener('click', function() {
    let sentence = document.getElementById('sentence-input').value;
    let words = sentence.split(" ");
    let emojiResult = words.map(word => emojiDictionary[word] || word).join(" ");
    document.getElementById('emoji-output').textContent = emojiResult;
    
    // Show the corresponding quote
    let matchingQuote = words.map(word => quotes[word]).find(quote => quote);
    if (matchingQuote) {
        document.getElementById('quote').textContent = `"${matchingQuote}"`;
    } else {
        document.getElementById('quote').textContent = "";
    }
});





let score = 0;
const scoreElement = document.getElementById('score');
const gameArea = document.getElementById('gameArea');
const startButton = document.getElementById('start-game');

const emojis = ['🗑️', '🥤', '🛢️', '⚡', '💀'];

function generateEmoji() {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const randomLeft = Math.floor(Math.random() * (gameArea.clientWidth - 40)); 
    const randomTop = Math.floor(Math.random() * (gameArea.clientHeight - 40)); 

    const emojiElement = document.createElement('div');
    emojiElement.classList.add('game-item');
    emojiElement.style.left = randomLeft + 'px';
    emojiElement.style.top = randomTop + 'px';
    emojiElement.innerText = emoji;

    gameArea.appendChild(emojiElement);

    setTimeout(() => {
        emojiElement.style.opacity = 0; 
        setTimeout(() => {
            emojiElement.remove(); 
        }, 500); 
    }, 1000); 

    emojiElement.addEventListener('click', () => {
        score++;
        scoreElement.innerText = score;
        emojiElement.style.opacity = 0; 
        setTimeout(() => {
            emojiElement.remove(); 
        }, 500); 
    });
}

// Fonction pour démarrer le jeu
function startGame() {
    score = 0;
    scoreElement.innerText = score;
    gameArea.innerHTML = ''; // Réinitialiser la zone de jeu

    const interval = setInterval(generateEmoji, 1000); // Générer un emoji chaque seconde

    setTimeout(() => {
        clearInterval(interval); // Arrêter de générer des emojis après 30 secondes
        alert('Le jeu est terminé ! Votre score : ' + score);
        
        // Afficher les confettis à la fin du temps
        showConfetti();
    }, 30000); // Le jeu se termine après 30 secondes
}




function closeModal() {
    document.getElementById('quote-modal').style.display = 'none';
}




function splitTextIntoLines(text, maxWordsPerLine) {
    const words = text.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += maxWordsPerLine) {
        lines.push(words.slice(i, i + maxWordsPerLine).join(' '));
    }
    return lines.join('\n');  
}

function updateQuoteText(quote) {
    const quoteTextElement = document.getElementById('quote-text');
    quoteTextElement.textContent = splitTextIntoLines(quote, 10);
}

document.getElementById('emoji-button').addEventListener('click', function() {
    const quote = "L'amour est la force qui construit le monde et c'est quelque chose qui nous relie tous.";
    updateQuoteText(quote);
    document.getElementById('quote-modal').style.display = 'block';
});

// Example of usage for each quote
for (let key in quotes) {
    const quote = quotes[key];
    
    // Display in the HTML element by setting innerHTML to allow the <br> to work
    document.getElementById('emoji-output').innerHTML += `<p>${quote}</p>`;
}