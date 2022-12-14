// const { json } = require("sequelize");

const delButtonHandler = async (event) => {
  event.preventDefault()

    const id = event.target.getAttribute('data-id');
    alert(id)
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete post');
    }

};

const updateHandler = async (event) => {
  event.preventDefault()

    const title = document.querySelector ("#post-title").value
    const content = document.querySelector ("#post-content").value
    const id = event.target.getAttribute('data-id');
    alert(id)
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({title, content}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
// views/edit-post.handlebars
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to update post');
    }

};

document
  .querySelector('.post-list')
  .addEventListener('submit', delButtonHandler);

  document.querySelector ("#update-button")
  .addEventListener('click', updateHandler);
