const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').
  value.trim();
  const password = document.querySelector('#password').
  value.trim();

  console.log(username, password)

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username, 
      password: password
    }),
    headers: {'Content-Type': 'application/json'}
  });
  console.log(response);

  if (response.ok) {
    // change below endpoint to '/dashboard' once dashboard finished.
    document.location.replace('/')
  } else {
    const message = await response.json()
    alert(message);
  }
};

document.querySelector('form').addEventListener('submit', loginFormHandler);