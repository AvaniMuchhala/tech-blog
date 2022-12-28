// Submit the New Post form, create a new Blogpost
const createPostHandler = async (event) => {
    event.preventDefault();
    console.log('Createposthandler called.');

    const postTitle = document.getElementById('new-post').value.trim();
    const postBody = document.querySelector('textarea').value.trim();
    console.log(postTitle);
    console.log(postBody);

    if (postTitle && postBody) {
        const response = await fetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({ 
                postTitle,
                postBody
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If response is ok, render dashboard with updated list of user's blogposts
        if (response.ok) {
            console.log('Posted succesfully!');
            document.location.replace('/dashboard');
        } else {
            alert('Failed to submit comment.');
        }
    }
}

document.querySelector('.submit-post').addEventListener('submit', createPostHandler);