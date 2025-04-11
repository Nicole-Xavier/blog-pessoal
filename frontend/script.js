const form = document.getElementById('post-form');
const postsContainer = document.getElementById('posts-container');
const searchInput = document.getElementById('search');
const API_URL = 'http://localhost:3000/posts';

// Criar novo post
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  const newPost = await response.json();
  addPostToDOM(newPost);
  form.reset();
});

// Carregar todos os posts
async function loadPosts(filter = '') {
  const res = await fetch(API_URL);
  const posts = await res.json();

  postsContainer.innerHTML = '';
  posts
    .filter(post => post.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach(addPostToDOM);
}

// Adicionar post ao DOM
function addPostToDOM(post) {
  const postEl = document.createElement('div');
  postEl.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.content}</p>
    <button onclick="editPost(${post.id}, '${post.title}', '${post.content}')">Editar</button>
    <button onclick="deletePost(${post.id})">Excluir</button>
  `;
  postsContainer.appendChild(postEl);
}

// Excluir post
async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  loadPosts(searchInput.value);
}

// Editar post
async function editPost(id, currentTitle, currentContent) {
  const newTitle = prompt('Novo Título:', currentTitle);
  const newContent = prompt('Novo Conteúdo:', currentContent);

  if (newTitle && newContent) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, content: newContent })
    });
    loadPosts(searchInput.value);
  }
}

// Buscar posts em tempo real
searchInput.addEventListener('input', (e) => {
  loadPosts(e.target.value);
});

// Carregar posts ao abrir
loadPosts();
