// Toggle Forms
function showLogin() {
  document.getElementById('loginForm').style.display = 'flex';
  document.getElementById('registerForm').style.display = 'none';
}

function showRegister() {
  document.getElementById('registerForm').style.display = 'flex';
  document.getElementById('loginForm').style.display = 'none';
}

// Get all users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('loopsta_users')) || [];
}

// Save all users to localStorage
function saveUsers(users) {
  localStorage.setItem('loopsta_users', JSON.stringify(users));
}

// Register logic
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value;

  if (!username || !password) {
    return alert("Please fill in all fields.");
  }

  const users = getUsers();
  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    return alert("Username already exists. Choose another.");
  }

  users.push({ username, password });
  saveUsers(users);

  alert('Registration successful! Please log in.');
  showLogin();
});

// Login logic
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const remember = document.getElementById('rememberMe').checked;

  const users = getUsers();
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return alert('Invalid credentials!');
  }

  // Save session and remember info
  sessionStorage.setItem('loopsta_loggedInUser', username);
  if (remember) {
    localStorage.setItem('loopsta_remembered', username);
  } else {
    localStorage.removeItem('loopsta_remembered');
  }

  alert(`Welcome back, ${username}!`);
  window.location.href = 'home.html';
});

// Auto-fill remembered user
window.onload = () => {
  const remembered = localStorage.getItem('loopsta_remembered');
  if (remembered) {
    document.getElementById('loginUsername').value = remembered;
    document.getElementById('rememberMe').checked = true;
  }
};
