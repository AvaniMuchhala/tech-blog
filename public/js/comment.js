// Handle submit comment form behavior 
const commentFormHandler = async (event) => {
    event.preventDefault();

    console.log('Submit button pressed');

    const comment = document.getElementById('comment').value.trim();
    const postID = document.getElementById('post-id').value.trim();

    if (comment) {
        const response = await fetch(`/api/posts/${postID}/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If user not logged in, withAuth sends res.redirect('/login'), so force browser to go to /login
            if (response.redirected) {
                document.location.replace('/login');
            // If user logged in, new comment was added successfully
            } else {
                console.log('Commented succesfully!');
                document.location.reload();
            }
        } else {
            alert('Failed to submit comment.');
        }
    }
}

document.querySelector('form').addEventListener('submit', commentFormHandler);