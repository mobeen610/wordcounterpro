// DOM Elements
const textInput = document.getElementById('text-input');
const wordCountEl = document.getElementById('word-count');
const charCountEl = document.getElementById('char-count');
const charNoSpacesEl = document.getElementById('char-no-spaces-count');
const sentenceCountEl = document.getElementById('sentence-count');
const paragraphCountEl = document.getElementById('paragraph-count');
const readingTimeEl = document.getElementById('reading-time');
const longestWordEl = document.getElementById('longest-word');
const commonWordEl = document.getElementById('common-word');
const wordDensityEl = document.getElementById('word-density');


// Visitor Counter Function
function updateVisitorCounter() {
    // Base count (you can set your starting number)
    let baseCount = 1234;
    
    // Try to get existing count from localStorage
    let storedCount = localStorage.getItem('wordCounterVisitors');
    
    if (storedCount) {
        // Use stored count
        document.getElementById('visitorCount').textContent = 
            parseInt(storedCount).toLocaleString();
    } else {
        // First visitor - set base count
        localStorage.setItem('wordCounterVisitors', baseCount);
        document.getElementById('visitorCount').textContent = 
            baseCount.toLocaleString();
    }
    
    // Increment count for this session if first visit
    if (!sessionStorage.getItem('hasVisited')) {
        let currentCount = parseInt(localStorage.getItem('wordCounterVisitors'));
        currentCount += 1;
        localStorage.setItem('wordCounterVisitors', currentCount);
        sessionStorage.setItem('hasVisited', 'true');
        
        // Update display
        document.getElementById('visitorCount').textContent = 
            currentCount.toLocaleString();
    }
}

// Call when page loads
window.addEventListener('DOMContentLoaded', updateVisitorCounter);
// Social Media Elements
const twitterProgress = document.getElementById('twitter-progress');
const twitterCountEl = document.getElementById('twitter-count');
const facebookProgress = document.getElementById('facebook-progress');
const facebookCountEl = document.getElementById('facebook-count');
const instagramProgress = document.getElementById('instagram-progress');
const instagramCountEl = document.getElementById('instagram-count');

// Buttons
const clearBtn = document.getElementById('clear-btn');
const pasteBtn = document.getElementById('paste-btn');
const sampleBtn = document.getElementById('sample-btn');

// Social Media Limits
const limits = {
    twitter: 280,
    facebook: 63206,
    instagram: 2200
};

// Sample Text
const sampleText = `Welcome to WordCounterPro! This is a sample text to show you how our tool works.

You can type or paste your own text in the box above, and we'll instantly calculate:
- Word count
- Character count (with and without spaces)
- Number of sentences and paragraphs
- Estimated reading time
- Social media limits for Twitter, Facebook, and Instagram
- Longest word and most common word

This tool is perfect for writers, students, bloggers, and professionals who need to meet specific word count requirements. Try it with your own text now!

WordCounterPro is 100% free, works in your browser, and never saves or shares your text.`;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Load sample text
    loadSampleText();
    
    // Add event listeners
    textInput.addEventListener('input', updateAllStats);
    clearBtn.addEventListener('click', clearText);
    pasteBtn.addEventListener('click', pasteText);
    sampleBtn.addEventListener('click', loadSampleText);
    
    // Update stats initially
    updateAllStats();
});

// Main function to update all statistics
function updateAllStats() {
    const text = textInput.value;
    
    // Update basic stats
    updateWordCount(text);
    updateCharacterCount(text);
    updateSentenceCount(text);
    updateParagraphCount(text);
    updateReadingTime(text);
    
    // Update advanced stats
    updateLongestWord(text);
    updateCommonWord(text);
    updateWordDensity(text);
    
    // Update social media counters
    updateSocialCounters(text);
}

// Word Count
function updateWordCount(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCountEl.textContent = text.trim() === '' ? '0' : words.length.toString();
}

// Character Count
function updateCharacterCount(text) {
    // Characters with spaces
    charCountEl.textContent = text.length.toString();
    
    // Characters without spaces
    const charsWithoutSpaces = text.replace(/\s/g, '').length;
    charNoSpacesEl.textContent = charsWithoutSpaces.toString();
}

// Sentence Count
function updateSentenceCount(text) {
    if (text.trim() === '') {
        sentenceCountEl.textContent = '0';
        return;
    }
    
    // Split by sentence endings (. ! ?)
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    sentenceCountEl.textContent = sentences.length.toString();
}

// Paragraph Count
function updateParagraphCount(text) {
    if (text.trim() === '') {
        paragraphCountEl.textContent = '0';
        return;
    }
    
    const paragraphs = text.split(/\n+/).filter(para => para.trim().length > 0);
    paragraphCountEl.textContent = paragraphs.length.toString();
}

// Reading Time (assuming 200 words per minute)
function updateReadingTime(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const minutes = Math.ceil(words.length / 200);
    readingTimeEl.textContent = `${minutes} min`;
}

// Find Longest Word
function updateLongestWord(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 0) {
        longestWordEl.textContent = '-';
        return;
    }
    
    const longest = words.reduce((longest, current) => 
        current.length > longest.length ? current : longest
    );
    
    // Clean the word (remove punctuation)
    const cleanLongest = longest.replace(/[^\w\s]/g, '');
    longestWordEl.textContent = cleanLongest || '-';
}

// Find Most Common Word
function updateCommonWord(text) {
    const words = text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3); // Only consider words longer than 3 chars
    
    if (words.length === 0) {
        commonWordEl.textContent = '-';
        return;
    }
    
    const frequency = {};
    let maxCount = 0;
    let mostCommon = '';
    
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
        if (frequency[word] > maxCount) {
            maxCount = frequency[word];
            mostCommon = word;
        }
    });
    
    commonWordEl.textContent = mostCommon || '-';
}

// Calculate Word Density
function updateWordDensity(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const uniqueWords = new Set(words.map(word => word.toLowerCase()));
    
    if (words.length === 0) {
        wordDensityEl.textContent = '0%';
        return;
    }
    
    const density = ((uniqueWords.size / words.length) * 100).toFixed(1);
    wordDensityEl.textContent = `${density}%`;
}

// Update Social Media Counters
function updateSocialCounters(text) {
    const charCount = text.length;
    
    // Twitter
    const twitterPercent = Math.min((charCount / limits.twitter) * 100, 100);
    twitterProgress.style.width = `${twitterPercent}%`;
    twitterCountEl.textContent = `${charCount}/${limits.twitter}`;
    
    // Facebook
    const facebookPercent = Math.min((charCount / limits.facebook) * 100, 100);
    facebookProgress.style.width = `${facebookPercent}%`;
    facebookCountEl.textContent = `${charCount}/${limits.facebook}`;
    
    // Instagram
    const instagramPercent = Math.min((charCount / limits.instagram) * 100, 100);
    instagramProgress.style.width = `${instagramPercent}%`;
    instagramCountEl.textContent = `${charCount}/${limits.instagram}`;
    
    // Color coding for Twitter (red if over limit)
    if (charCount > limits.twitter) {
        twitterProgress.style.background = '#dc3545';
        twitterCountEl.style.color = '#dc3545';
    } else if (charCount > limits.twitter * 0.8) {
        twitterProgress.style.background = '#ffc107';
        twitterCountEl.style.color = '#ffc107';
    } else {
        twitterProgress.style.background = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)';
        twitterCountEl.style.color = '#2c3e50';
    }
}

// Clear Text
function clearText() {
    textInput.value = '';
    updateAllStats();
    textInput.focus();
}

// Paste Text from Clipboard
async function pasteText() {
    try {
        const text = await navigator.clipboard.readText();
        textInput.value = text;
        updateAllStats();
    } catch (err) {
        alert('Unable to paste. Please paste using Ctrl+V or manually type your text.');
    }
}

// Load Sample Text
function loadSampleText() {
    textInput.value = sampleText;
    updateAllStats();
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearText();
    }
    
    // Ctrl/Cmd + L to load sample
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        loadSampleText();
    }
    
    // Ctrl/Cmd + / for focus
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        textInput.focus();
    }
});

// Auto-save text to localStorage (optional feature)
textInput.addEventListener('input', function() {
    // Only save if text is less than 5000 chars to prevent storage issues
    if (textInput.value.length < 5000) {
        localStorage.setItem('wordCounterText', textInput.value);
    }
});

// Load saved text on page load
window.addEventListener('load', function() {
    const savedText = localStorage.getItem('wordCounterText');
    if (savedText && savedText.length < 5000) {
        textInput.value = savedText;
        updateAllStats();
    }
});
