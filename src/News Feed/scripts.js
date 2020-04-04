// External apis
const postsApi = "https://jsonplaceholder.typicode.com/posts";

// DOM elements
const postsContainer = document.getElementById("post-container");
const filter = document.getElementById("filter");
const loading = document.querySelector(".loader");

let limit = 5;
let page = 1;

// Get posts
async function getPosts() {
  const res = await fetch(`${postsApi}?_limit=${limit}&_page=${page}`);
  const data = await res.json();
  return data;
}

// Show posts in DOM
async function showposts() {
  const posts = await getPosts();

  let postEl = posts
    .map(post => {
      return `<div class="post">
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">
          ${post.body}
        </p>
      </div>
    </div>`;
    })
    .join("");

  let div = document.createElement("div");
  div.innerHTML = postEl;

  postsContainer.appendChild(div);
}

//Scroll posts
function scrollPosts() {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  //console.log(scrollHeight);
  //console.log(scrollTop);
  //console.log(clientHeight);

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showloading();
  }
}

function showloading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showposts();
    }, 300);
  }, 1000);
}

function filterPosts(event) {
  const term = event.target.value.toUpperCase();
  const posts = document.querySelectorAll("div.post");

  posts.forEach(post => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}
//Event listeners
window.addEventListener("scroll", scrollPosts);
filter.addEventListener("input", filterPosts);

showposts();
