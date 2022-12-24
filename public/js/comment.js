const commentFormHandler = async (event) => {
    event.preventDefault();

    console.log('Submitted comment form');

    const comment = document.getElementById('comment').value.trim();
    const postID = document.getElementById('post-id').value.trim();

    if (comment) {
        const response = await fetch(`/api/posts/${postID}/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log('Commented succesfully!');
            location.reload();
        } else {
            alert('Failed to submit comment.');
        }
    }
}


document.querySelector('form').addEventListener('submit', commentFormHandler);