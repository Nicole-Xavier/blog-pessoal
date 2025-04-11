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
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error('Erro ao carregar posts');
    }

    const posts = await res.json();
    postsContainer.innerHTML = '';
    posts
      .filter(post => post.title.toLowerCase().includes(filter.toLowerCase()))
      .forEach(addPostToDOM);
  } catch (error) {
    console.error(error);
    postsContainer.innerHTML = '<p>Erro ao carregar posts. Tente novamente mais tarde.</p>';
  }
}

// Adicionar post ao DOM
function addPostToDOM(post) {
  const postEl = document.createElement('div');
  postEl.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.content}</p>
    <button class="edit-btn">Editar</button>
    <button onclick="deletePost(${post.id})">Excluir</button>
  `;

  const editBtn = postEl.querySelector('.edit-btn');
  editBtn.addEventListener('click', () => {
    if (post.id) {
      editPost(post.id);  // Chama a função editPost passando o id
    } else {
      console.error('ID não foi passado corretamente.');
    }
  });

  postsContainer.appendChild(postEl);
}

// Excluir post
async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  loadPosts(searchInput.value);
}

// Editar post direcionando para outra página
function editPost(id) {
  if (typeof id === 'number' && !isNaN(id)) {
    console.log(`Redirecionando para edit.html?id=${id}`);
    window.location.href = `edit.html?id=${id}`;
  } else {
    console.error('ID não foi passado corretamente.');
  }
}

// Buscar posts em tempo real
searchInput.addEventListener('input', (e) => {
  loadPosts(e.target.value);
});

// Carregar posts ao abrir
loadPosts();
