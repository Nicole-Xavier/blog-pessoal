const API_URL = 'http://localhost:3000/posts';
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const form = document.getElementById('edit-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');


async function loadPosts() {
    const res = await fetch(`${API_URL}/${postId}`);
    const post = await res.json();

    titleInput.value = post.title;
    contentInput.value = post.content;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/${postId}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            title: titleInput.value,
            content: contentInput.value
        })
    });

    alert('Post atualizado com sucesso!');
    window.location.href = 'index.html';
});

loadPosts();