'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * search bar toggle
 */

const searchBar = document.querySelector("[data-search-bar]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleSearchBar = function () {
  searchBar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(searchTogglers, "click", toggleSearchBar);
document.addEventListener('DOMContentLoaded', function () {
  const commentForm = document.getElementById('commentForm');
  const commentInput = document.getElementById('commentInput');
  const commentList = document.getElementById('commentList');

  commentForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const commentText = commentInput.value.trim();
    if (commentText) {
      // Create a new list item for the comment
      const li = document.createElement('li');
      li.textContent = commentText;
      
      // Append the new comment to the comment list
      commentList.appendChild(li);
      
      // Clear the input field
      commentInput.value = '';
    }
  });
});
