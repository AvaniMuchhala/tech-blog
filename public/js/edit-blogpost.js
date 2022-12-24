const delPostHandler = async (event) => {
    event.preventDefault();
    console.log('Delete button clicked.');

    const id = document.getElementById('post-id').value;
    console.log(id);

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        console.log('Deleted post successfully!');
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post.');
    }
};

const updatePostHandler = async (event) => {
    event.preventDefault();
    console.log('Update post button clicked.');

    const id = document.getElementById('post-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    console.log(id);

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        console.log('Updated post successfully!');
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update post.');
    }
}

document.querySelector('#delete-post').addEventListener('click', delPostHandler);
document.querySelector('#update-post').addEventListener('click', updatePostHandler);