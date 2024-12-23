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

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
  window.location.href = "index.html";
}

window.onload = function () {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postContainer = document.querySelector('.has-scrollbar');

  // Clear the container
  postContainer.innerHTML = '';

  // Iterate through the posts in reverse order (newest first)
  posts.reverse().forEach(post => { // Reverse posts for display
    const postElement = document.createElement('li');
    postElement.classList.add('scrollbar-item', 'created-post');
    postElement.innerHTML = `
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
    `;

    postContainer.appendChild(postElement);
  });
};




// posts.js

// Sample posts array (in a real app, this could come from localStorage or a backend)
const posts = [
    { id: 1, title: 'First Post', content: 'This is the first post' },
    { id: 2, title: 'Second Post', content: 'This is the second post' },
    { id: 3, title: 'Third Post', content: 'This is the third post' }
];

/* Render posts on page load
function renderPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Clear existing posts
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.setAttribute('data-id', post.id);
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
        `;
        
        // Add event listener for right-click (contextmenu)
        postElement.addEventListener('contextmenu', function(e) {
            e.preventDefault(); // Prevent default right-click menu
            showDeleteOption(postElement, post.id);
        });

        postsContainer.appendChild(postElement);
    });
}*/

document.addEventListener('DOMContentLoaded', function () {
  const postsContainer = document.getElementById('postsContainer');
  const storedPosts = JSON.parse(localStorage.getItem('posts')) || []; // Load stored posts
  let posts = [...storedPosts];

  // Function to render posts
  function renderPosts() {
    postsContainer.innerHTML = ''; // Clear existing posts
    posts.forEach((post, index) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.setAttribute('data-id', index);
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button class="delete-button" data-id="${index}">Delete</button>
      `;

      postsContainer.appendChild(postElement);
    });

    // Attach event listeners to all delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        const postId = parseInt(e.target.getAttribute('data-id'), 10);
        deletePost(postId);
      });
    });
  }

  // Function to delete a post
  function deletePost(index) {
    posts.splice(index, 1); // Remove post from the array
    localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
    renderPosts(); // Re-render posts
  }

  // Function to add a new post
  function addNewPost(title, content) {
    const newPost = { title, content };
    posts.unshift(newPost); // Add to the beginning of the array
    localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
    renderPosts(); // Re-render posts
  }
  

  // Example form submission for adding a post (optional)
  const addPostForm = document.getElementById('addPostForm');
  if (addPostForm) {
    addPostForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const title = document.getElementById('postTitle').value.trim();
      const content = document.getElementById('postContent').value.trim();
      if (title && content) {
        addNewPost(title, content);
        addPostForm.reset();
      }
    });
  }
  

  // Initial render
  renderPosts();
});


  