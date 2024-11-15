'use strict';


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


function submitPost() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const author = document.getElementById("author").value;
  const description = document.getElementById("description").value;
  const imageInput = document.getElementById("image");
  let imageUrl = "";

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imageUrl = e.target.result;
      savePostToLocalStorage(title, date, author, description, imageUrl);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    savePostToLocalStorage(title, date, author, description, "");
  }
}

function savePostToLocalStorage(title, date, author, description, imageUrl) {
  const post = {
    title,
    date,
    author,
    description,
    imageUrl
  };
  localStorage.setItem("post", JSON.stringify(post));
  window.location.href = "index.html"; // Redirect to home page
}

window.onload = function() {
  const post = JSON.parse(localStorage.getItem("post"));
  const postContainer = document.querySelector('.has-scrollbar');

  if (post) {
    postContainer.innerHTML = `
      <li class="scrollbar-item created-post"> <!-- Add specific class here -->
        <div class="blog-card">
          <figure class="card-banner img-holder" style="--width: 150; --height: 175;">
            ${post.imageUrl ? 
              `<img src="${post.imageUrl}" width="150" height="175" loading="lazy" alt="Post image" class="img-cover">` : 
              `<img src="./assets/images/default-image.jpg" width="150" height="175" loading="lazy" alt="Default image" class="img-cover">`}
          </figure>
          <div class="card-content">
            <h3 class="h4">
              <a href="#" class="card-title hover:underline">${post.title}</a>
            </h3>
            <p class="card-meta">
              <strong class="author">${post.author}</strong> | ${post.date}
            </p>
            <p class="card-text">
              ${post.description}
            </p>
          </div>
        </div>
      </li>
    `;
    
    localStorage.removeItem("post");
  }
};
