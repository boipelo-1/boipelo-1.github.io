// emojiPicker.js

const emojiCategories = {
  '😀': ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪'],
  '🐶': ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🐤','🦆','🦅'],
  '🍕': ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🥝','🍍','🥥','🥑','🍆','🥔','🥕','🌽','🌶','🥒','🥬','🍞','🥐','🥖','🥯','🥨','🥞','🧇','🧀','🍗','🍖','🥩','🍔','🍟','🍕','🌭','🥪','🌮','🌯','🥙'],
  '⚽': ['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🏓','🏸','🥅','🥊','🥋','🎣','⛳','🥌','🛹'],
  '🌍': ['🚗','🚕','🚙','🚌','🚎','🏎','🚓','🚑','🚒','🚐','🚚','🚛','🚜','🛵','🚲','🛴','🛶','⛵','🚤','🛳','✈️','🛩','🚁','🛰'],
  '💡': ['💡','🔦','🕯','🧯','🔌','💻','🖥','🖨','⌨','🖱','🖲','📷','📸','📹','🎥','📞','☎️','📟','📠','📺','📻'],
  '🔣': ['❤️','💔','💕','💖','💘','💝','💗','💓','💞','❣️','💤','💢','💬','🗯','💭','🕐','🕒','🕕','🕘','🕛','💯','🔔','🔕']
};

function createEmojiPicker(targetInput, triggerButton) {
  const existing = document.querySelector('.emoji-picker-container');
  if (existing) existing.remove();

  const picker = document.createElement('div');
  picker.className = 'emoji-picker-container';

  const tabBar = document.createElement('div');
  tabBar.className = 'emoji-tabs';

  const emojiGrid = document.createElement('div');
  emojiGrid.className = 'emoji-grid';

  for (const [catIcon, emojiList] of Object.entries(emojiCategories)) {
    const tabBtn = document.createElement('button');
    tabBtn.textContent = catIcon;
    tabBtn.className = 'emoji-tab-btn';
    tabBtn.onclick = () => {
      emojiGrid.innerHTML = '';
      emojiList.forEach(emoji => {
        const span = document.createElement('span');
        span.textContent = emoji;
        span.onclick = () => {
          targetInput.value += emoji;
          targetInput.focus();
        };
        emojiGrid.appendChild(span);
      });
    };
    tabBar.appendChild(tabBtn);
  }

  picker.appendChild(tabBar);
  picker.appendChild(emojiGrid);
  triggerButton.parentNode.appendChild(picker);

  // Open first category
  tabBar.querySelector('button').click();

  document.addEventListener('click', function outsideClick(e) {
    if (!picker.contains(e.target) && e.target !== triggerButton) {
      picker.remove();
      document.removeEventListener('click', outsideClick);
    }
  });
}
