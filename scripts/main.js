// Global variables
let mobileMenuOpen = false

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  initializeSecretShortcut()
  initializeDropdowns()
})

// Secret keyboard shortcut to access the game site
function initializeSecretShortcut() {
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.altKey && event.key === "u") {
      event.preventDefault()
      window.location.href = "read.html"
    }
  })
}

// Initialize dropdown menus
function initializeDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown")

  dropdowns.forEach((dropdown) => {
    const menu = dropdown.querySelector(".dropdown-menu")

    dropdown.addEventListener("mouseenter", () => {
      menu.style.opacity = "1"
      menu.style.visibility = "visible"
    })

    dropdown.addEventListener("mouseleave", () => {
      menu.style.opacity = "0"
      menu.style.visibility = "hidden"
    })
  })
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const hamburger = document.querySelector(".hamburger")

  mobileMenuOpen = !mobileMenuOpen

  if (mobileMenuOpen) {
    mobileNav.classList.add("active")
    mobileNav.style.display = "block"
    hamburger.classList.add("active")
  } else {
    mobileNav.classList.remove("active")
    mobileNav.style.display = "none"
    hamburger.classList.remove("active")
  }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
}

// Utility functions
function showElement(element) {
  element.classList.remove("hidden")
}

function hideElement(element) {
  element.classList.add("hidden")
}

function createElement(tag, className, textContent) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (textContent) element.textContent = textContent
  return element
}

// Animation utilities
function fadeIn(element, duration = 300) {
  element.style.opacity = "0"
  element.style.display = "block"

  let start = null

  function animate(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start

    element.style.opacity = Math.min(progress / duration, 1)

    if (progress < duration) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

function fadeOut(element, duration = 300) {
  let start = null

  function animate(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start

    element.style.opacity = Math.max(1 - progress / duration, 0)

    if (progress < duration) {
      requestAnimationFrame(animate)
    } else {
      element.style.display = "none"
    }
  }

  requestAnimationFrame(animate)
}

// Local storage utilities
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return null
  }
}

// Form validation utilities
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateRequired(value) {
  return value && value.trim().length > 0
}

// Debounce utility for search
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Initialize page-specific functionality
function initializePage() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  switch (currentPage) {
    case "index.html":
    case "":
      initializeHomePage()
      break
    case "quiz.html":
      initializeQuizPage()
      break
    case "spanish-dictionary.html":
    case "french-dictionary.html":
    case "german-dictionary.html":
      initializeDictionaryPage()
      break
  }
}

function initializeHomePage() {
  // Add any home page specific functionality here
  console.log("Home page initialized")
}

function initializeQuizPage() {
  // Quiz functionality will be handled in quiz.js
  console.log("Quiz page initialized")
}

function initializeDictionaryPage() {
  // Dictionary functionality will be handled in dictionary.js
  console.log("Dictionary page initialized")
}

// Call page initialization
document.addEventListener("DOMContentLoaded", initializePage)
