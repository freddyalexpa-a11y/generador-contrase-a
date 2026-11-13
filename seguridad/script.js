const passwordInput = document.getElementById('passwordInput');
const lengthRange = document.getElementById('lengthRange');
const lengthVal = document.getElementById('lengthVal');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

const CHARS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};


lengthRange.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
    generatePassword();
});


function generatePassword() {
    let validChars = '';
    let guaranteedChars = [];

    if (uppercaseCheck.checked) {
        validChars += CHARS.uppercase;
        guaranteedChars.push(getRandomChar(CHARS.uppercase));
    }
    if (lowercaseCheck.checked) {
        validChars += CHARS.lowercase;
        guaranteedChars.push(getRandomChar(CHARS.lowercase));
    }
    if (numbersCheck.checked) {
        validChars += CHARS.numbers;
        guaranteedChars.push(getRandomChar(CHARS.numbers));
    }
    if (symbolsCheck.checked) {
        validChars += CHARS.symbols;
        guaranteedChars.push(getRandomChar(CHARS.symbols));
    }

    if (validChars === '') {
        passwordInput.value = '';
        evaluateStrength('');
        return;
    }

    const length = parseInt(lengthRange.value);
    let passwordArray = [...guaranteedChars];

    
    for (let i = passwordArray.length; i < length; i++) {
        passwordArray.push(getRandomChar(validChars));
    }

    
    passwordArray = shuffleArray(passwordArray);

    const finalPassword = passwordArray.join('');
    passwordInput.value = finalPassword;
    evaluateStrength(finalPassword);
}

function getRandomChar(str) {
    const randomIndex = Math.floor(Math.random() * str.length);
    return str[randomIndex];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function evaluateStrength(password) {
    if (!password) {
        strengthBar.style.width = '0%';
        strengthBar.className = 'h-full transition-all duration-300 bg-transparent';
        strengthText.textContent = 'Vacío';
        strengthText.className = 'font-semibold text-slate-500';
        return;
    }

    let score = 0;
    const length = password.length;

    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let width = '20%';
    let colorClass = 'bg-red-500';
    let label = 'Muy Débil';
    let labelClass = 'text-red-400 font-semibold';

    if (score >= 3 && score < 5) {
        width = '50%';
        colorClass = 'bg-amber-500';
        label = 'Moderada';
        labelClass = 'text-amber-400 font-semibold';
    } else if (score >= 5 && score < 7) {
        width = '80%';
        colorClass = 'bg-emerald-500';
        label = 'Fuerte';
        labelClass = 'text-emerald-400 font-semibold';
    } else if (score >= 7) {
        width = '100%';
        colorClass = 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]';
        label = 'Muy Fuerte';
        labelClass = 'text-cyan-400 font-semibold';
    } else {
        width = '25%';
        colorClass = 'bg-red-500';
        label = 'Muy Débil';
        labelClass = 'text-red-400 font-semibold';
    }

    strengthBar.style.width = width;
    strengthBar.className = `h-full transition-all duration-300 ${colorClass}`;
    strengthText.textContent = label;
    strengthText.className = labelClass;
}


generateBtn.addEventListener('click', generatePassword);

passwordInput.addEventListener('input', (e) => {
    evaluateStrength(e.target.value);
});

copyBtn.addEventListener('click', () => {
    if (!passwordInput.value) return;
    navigator.clipboard.writeText(passwordInput.value);
    copyBtn.textContent = '¡Copiado!';
    copyBtn.classList.add('copied-feedback');
    setTimeout(() => {
        copyBtn.textContent = 'Copiar';
        copyBtn.classList.remove('copied-feedback');
    }, 1500);
});


window.addEventListener('DOMContentLoaded', generatePassword);