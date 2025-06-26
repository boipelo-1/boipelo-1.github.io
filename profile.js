function getUsers() {
  return JSON.parse(localStorage.getItem('loopsta_users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('loopsta_users', JSON.stringify(users));
}

function loadProfile() {
  const user = sessionStorage.getItem('loopsta_loggedInUser');
  const users = getUsers();
  const current = users.find(u => u.username === user);

  if (!current.profile) {
    current.profile = { bio: '', photo: '' };
    saveUsers(users);
  }

  // Load profile
  document.getElementById('profileBio').value = current.profile.bio || '';
  if (current.profile.photo) {
    document.getElementById('profileImg').src = current.profile.photo;
  }

  // Load posts
  const posts = JSON.parse(localStorage.getItem('loopsta_posts')) || [];
  const myPosts = posts.filter(p => p.username === user);
  const postContainer = document.getElementById('myPostsContainer');
  postContainer.innerHTML = myPosts.map(p => `
    <div class="post">
      <p>${p.text}</p>
      ${p.fileData ? (p.fileType.startsWith('image') ? 
        `<img src="${p.fileData}" width="100%">` : 
        `<video src="${p.fileData}" controls width="100%"></video>`) : ''}
    </div>
  `).join('');
}

// Save profile info
function saveProfile() {
  const users = getUsers();
  const user = sessionStorage.getItem('loopsta_loggedInUser');
  const current = users.find(u => u.username === user);

  current.profile.bio = document.getElementById('profileBio').value;

  const file = document.getElementById('profilePhoto').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = function () {
      current.profile.photo = reader.result;
      saveUsers(users);
      alert('Profile updated!');
      loadProfile();
    };
    reader.readAsDataURL(file);
  } else {
    saveUsers(users);
    alert('Profile updated!');
  }
}

// Logout
function logout() {
  sessionStorage.removeItem('loopsta_loggedInUser');
  window.location.href = 'index.html';
}
