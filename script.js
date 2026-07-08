// User authentication - In production, this would use proper backend authentication
const OWNER_USERNAME = 'amitsinghh9208';
let currentUser = null;
let blogPosts = [];

// Check if user is owner (for this static site, we'll check if user confirms)
function isOwner() {
  return currentUser === OWNER_USERNAME || localStorage.getItem('isOwner') === 'true';
}

// Initialize blog
function initializeBlog() {
  loadBlogPosts();
  displayBlogPosts();
  setupOwnerControls();
}

// Load blog posts from localStorage
function loadBlogPosts() {
  const saved = localStorage.getItem('blogPosts');
  blogPosts = saved ? JSON.parse(saved) : [];
}

// Save blog posts to localStorage
function saveBlogPosts() {
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}

// Display blog posts
function displayBlogPosts() {
  const container = document.getElementById('posts-container');
  const emptyState = document.getElementById('empty-state');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  if (blogPosts.length === 0) {
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  
  blogPosts.forEach((post, index) => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <span class="category">${post.category}</span>
      <h3>${post.title}</h3>
      <p class="excerpt">${post.content.substring(0, 100)}...</p>
      <div class="meta">
        <span>${post.date}</span>
        <span>${post.author}</span>
      </div>
    `;
    card.onclick = () => openPost(index);
    
    // Add edit/delete buttons for owner
    if (isOwner()) {
      const actions = document.createElement('div');
      actions.style.marginTop = '15px';
      actions.style.display = 'flex';
      actions.style.gap = '10px';
      actions.innerHTML = `
        <button onclick="editPost(${index})" class="btn primary" style="flex: 1; margin: 5px 0; padding: 8px;">Edit</button>
        <button onclick="deletePost(${index})" class="btn secondary" style="flex: 1; margin: 5px 0; padding: 8px;">Delete</button>
      `;
      card.appendChild(actions);
    }
    
    container.appendChild(card);
  });
}

// Open full post in modal
function openPost(index) {
  const post = blogPosts[index];
  const modal = document.getElementById('postModal');
  const content = document.getElementById('modalPostContent');
  
  const editButton = isOwner() ? `<button onclick="editPost(${index})" class="btn primary" style="margin-top: 20px;">Edit Post</button>` : '';
  
  content.innerHTML = `
    <h1>${post.title}</h1>
    <span class="category">${post.category}</span>
    <div class="modal-meta">
      <p>By ${post.author} | ${post.date}</p>
    </div>
    <div class="post-body">
      ${post.content.replace(/\n/g, '<br>')}
    </div>
    ${editButton}
  `;
  
  modal.classList.add('show');
}

// Close modal
function closeModal(event) {
  if (event && event.target.id !== 'postModal') return;
  const modal = document.getElementById('postModal');
  modal.classList.remove('show');
}

// Setup owner controls
function setupOwnerControls() {
  const adminControls = document.getElementById('admin-controls');
  if (!adminControls) return;
  
  if (isOwner()) {
    adminControls.style.display = 'block';
  } else {
    // Optionally show owner login
    adminControls.innerHTML = `
      <button onclick="loginAsOwner()" class="btn primary">Owner Login</button>
    `;
    adminControls.style.display = 'block';
  }
}

// Owner login
function loginAsOwner() {
  const password = prompt('Enter owner password:');
  if (password) {
    // Simple password check (in production, use proper authentication)
    if (password === 'admin123') { // Change this to secure method
      localStorage.setItem('isOwner', 'true');
      currentUser = OWNER_USERNAME;
      setupOwnerControls();
      displayBlogPosts();
      alert('Logged in as owner!');
    } else {
      alert('Invalid password');
    }
  }
}

// Toggle editor visibility
function toggleEditor() {
  const editor = document.getElementById('blog-editor');
  if (editor.style.display === 'none') {
    editor.style.display = 'block';
    document.getElementById('postTitle').focus();
  } else {
    editor.style.display = 'none';
  }
}

// Save blog post
function saveBlogPost() {
  const title = document.getElementById('postTitle').value.trim();
  const category = document.getElementById('postCategory').value.trim();
  const content = document.getElementById('postContent').value.trim();
  const author = document.getElementById('postAuthor').value.trim();
  
  if (!title || !category || !content) {
    alert('Please fill in all fields');
    return;
  }
  
  const post = {
    title,
    category,
    content,
    author,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  };
  
  blogPosts.unshift(post); // Add to beginning
  saveBlogPosts();
  
  // Clear form
  document.getElementById('postTitle').value = '';
  document.getElementById('postCategory').value = '';
  document.getElementById('postContent').value = '';
  
  toggleEditor();
  displayBlogPosts();
  alert('Post published successfully!');
}

// Edit post
function editPost(index) {
  const post = blogPosts[index];
  
  document.getElementById('postTitle').value = post.title;
  document.getElementById('postCategory').value = post.category;
  document.getElementById('postContent').value = post.content;
  document.getElementById('postAuthor').value = post.author;
  
  closeModal();
  
  blogPosts.splice(index, 1);
  saveBlogPosts();
  
  toggleEditor();
  displayBlogPosts();
}

// Delete post
function deletePost(index) {
  if (confirm('Are you sure you want to delete this post?')) {
    blogPosts.splice(index, 1);
    saveBlogPosts();
    displayBlogPosts();
    alert('Post deleted!');
  }
}

// Cancel edit
function cancelEdit() {
  document.getElementById('postTitle').value = '';
  document.getElementById('postCategory').value = '';
  document.getElementById('postContent').value = '';
  toggleEditor();
}

// Show management
function showManagement() {
  alert(`You have ${blogPosts.length} blog posts.`);
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}

// Load saved theme
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
};

// Wait until page loads
"use strict";

/**
 * Portfolio Site Script
 * Handles theme toggle, smooth scrolling, typing animation,
 * AOS animation, contact form validation.
 */

document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  initSmoothScroll();
  initTypingAnimation();
  initAOS();
  initEmailJS();
  initContactForm();
});

/**
 * Theme Toggle
 */
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");

  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (!themeToggle) return;

  themeToggle.addEventListener("click", function () {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";

    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}

/**
 * Smooth Scroll for internal anchor links
 */
function initSmoothScroll() {
  document.addEventListener("click", function (event) {
    const link = event.target.closest('a[href^="#"]');

    if (!link) return;

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    event.preventDefault();

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    history.pushState(null, "", targetId);
  });
}

/**
 * Typing Animation
 */
function initTypingAnimation() {
  const typingElement = document.getElementById("typing");

  if (!typingElement || typeof Typed === "undefined") return;

  new Typed("#typing", {
    strings: [
      "Software Professional",
      "Lead QA Analyst",
      "Aspiring Architect"
    ],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true
  });
}

/**
 * AOS Animation
 */
function initAOS() {
  if (typeof AOS === "undefined") return;

  AOS.init({
    duration: 1000,
    once: true
  });
}

/**
 * Restrict allowed.
 */
function initEmailJS() {
  if (typeof emailjs === "undefined") return;

  emailjs.init('J2cBgjw4s8J3_DlZZ');
}

/**
 * Contact Form
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("status");

  if (!form || !status) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = form.elements["name"]?.value.trim() || "";
    const email = form.elements["email"]?.value.trim() || "";
    const message = form.elements["message"]?.value.trim() || "";

    if (!isValidName(name)) {
      setStatus(status, "Please enter a valid name.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus(status, "Please enter a valid email address.", "error");
      return;
    }

    if (!isValidMessage(message)) {
      setStatus(status, "Message must be at least 10 characters.", "error");
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      if (typeof emailjs === "undefined") {
        throw new Error("EmailJS is not loaded.");
      }

      await emailjs.sendForm('service_t92ua1s', 'template_pbtfazg', form);

      setStatus(status, "Message sent successfully ✅", "success");
      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus(status, "Failed to send message. Please try again later.", "error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
  });
}

/**
 * Validation Helpers
 */
function isValidName(name) {
  return /^[a-zA-Z\s.'-]{2,60}$/.test(name);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidMessage(message) {
  return message.length >= 10 && message.length <= 1000;
}

function setStatus(statusElement, message, type) {
  statusElement.textContent = message;
  statusElement.className = type === "success" ? "success" : "error";
}
