function getUsers() {
  return JSON.parse(localStorage.getItem('loopsta_users')) || [];
}

function getUserProfile(username) {
  const users = getUsers();
  const user = users.find(u => u.username === username);
  return user && user.profile ? user.profile : { photo: 'default-avatar.png', bio: '' };
}

// Inside loadPosts(), update post display to add profile photo
function loadPosts() {
  const feed = document.getElementById('feedContainer');
  feed.innerHTML = '';
  const posts = JSON.parse(localStorage.getItem('loopsta_posts')) || [];

  posts.forEach(post => {
    const profile = getUserProfile(post.username);
    const reactionCounts = countReactions(post.reactions);
    const userReaction = post.reactions[currentUser] || null;

    const media = post.fileData
      ? post.fileType.startsWith("image")
        ? `<img src="${post.fileData}" width="100%" />`
        : `<video src="${post.fileData}" controls width="100%"></video>`
      : '';

    const commentsHTML = post.comments.map(c => {
      const cProfile = getUserProfile(c.user);
      return `<p><img src="${cProfile.photo || 'default-avatar.png'}" class="comment-profile-pic" alt="profile" /> <b>${c.user}:</b> ${c.text}</p>`;
    }).join('');

    feed.innerHTML += `
      <div class="post">
        <div class="post-header">
          <img src="${profile.photo || 'default-avatar.png'}" class="profile-pic" alt="profile" />
          <h4>@${post.username}</h4>
        </div>
        <p>${post.text}</p>
        ${media}
        <div class="reactions">
          ${renderReactions(post.id, userReaction)}
          <small>${Object.entries(reactionCounts).map(([emo, count]) => `${emo} ${count}`).join(' ')}</small>
        </div>
        <div class="comments">
          ${commentsHTML}
          <input type="text" placeholder="Add a comment..." onkeydown="addComment(event, ${post.id})" />
        </div>
      </div>
    `;
  });
}
