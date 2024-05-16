const forumContainer = document.getElementById('forum')
forumContainer.innerHTML = `
  <div class="container py-5">
    <h2 class="text-success mb-4">Forum Diskusi</h2>
    <div class="discussion-forum">
      <div class="mb-4">
        <textarea class="form-control" rows="3" placeholder="Tulis komentar atau pertanyaan Anda..."></textarea>
        <button class="btn btn-success mt-2">Kirim</button>
      </div>
      <div class="comments">
        <!-- Komentar akan ditambahkan di sini -->
      </div>
    </div>
  </div>
`

// Fungsi untuk mengirimkan komentar dan menampilkannya di forum
const commentTextarea = document.querySelector('.discussion-forum textarea')
const sendButton = document.querySelector('.discussion-forum button')
const commentsContainer = document.querySelector('.discussion-forum .comments')

sendButton.addEventListener('click', () => {
  const commentText = commentTextarea.value.trim()
  if (commentText) {
    const commentElement = document.createElement('div')
    commentElement.classList.add('card', 'mb-3')
    commentElement.innerHTML = `
      <div class="card-body">
        <p class="card-text">${commentText}</p>
      </div>
    `
    commentsContainer.appendChild(commentElement)
    commentTextarea.value = ''
  }
})
