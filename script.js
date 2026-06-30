// HRMS Iframe fallback — show button if site blocks embedding
document.addEventListener('DOMContentLoaded', () => {
  const hrmsIframe = document.querySelector('iframe[src="https://intelhrms.com"]');
  const hrmsFallback = document.getElementById('hrms-fallback');
  if (hrmsIframe && hrmsFallback) {
    hrmsIframe.addEventListener('error', () => {
      hrmsIframe.style.display = 'none';
      hrmsFallback.style.display = 'flex';
    });
    // Also check via load timeout — some sites silently block without error
    setTimeout(() => {
      try {
        const doc = hrmsIframe.contentDocument;
        if (!doc || doc.body === null) {
          hrmsIframe.style.display = 'none';
          hrmsFallback.style.display = 'flex';
        }
      } catch (e) {
        // Cross-origin block — show fallback
        hrmsIframe.style.display = 'none';
        hrmsFallback.style.display = 'flex';
      }
    }, 3000);
  }
});

// Typewriter Effect
const roles = ["Backend Python Engineer", "AI Systems Builder", "API Architect"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function type() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before typing next
  }

  setTimeout(type, typeSpeed);
}

// Start typewriter on load
document.addEventListener('DOMContentLoaded', type);

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    navbar.style.boxShadow = 'none';
  }
});

// Chatbot Toggle
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');

chatToggle.addEventListener('click', () => {
  chatWindow.classList.add('active');
  chatToggle.style.display = 'none';
});

chatClose.addEventListener('click', () => {
  chatWindow.classList.remove('active');
  chatToggle.style.display = 'flex';
});

// Simple Chatbot Logic
function askSuggestion(question) {
  const chatMessages = document.getElementById('chat-messages');
  
  // Add User Message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.innerHTML = `<p>${question}</p>`;
  chatMessages.appendChild(userMsg);
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulate AI Response
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg bot';
    
    let answer = "I'm still learning! But Surajit is a great developer.";
    
    if (question.includes("skills")) {
      answer = "Surajit specializes in Python, FastAPI, Django, PostgreSQL, and AI integrations (LLMs, RAG).";
    } else if (question.includes("projects")) {
      answer = "He has built simplelecture.com (AI multimedia director) and intelhrms.com (Enterprise SaaS).";
    } else if (question.includes("Available")) {
      answer = "Yes! He is currently open to backend and AI engineering roles.";
    }

    botMsg.innerHTML = `<p>${answer}</p>`;
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
}

// Form Submission Simulation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btnText = document.getElementById('submit-text');
    const successMsg = document.getElementById('form-success');
    
    btnText.textContent = "Sending...";
    
    setTimeout(() => {
      btnText.textContent = "Send Message 🚀";
      successMsg.style.display = 'block';
      contactForm.reset();
      
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }, 1500);
  });
}
