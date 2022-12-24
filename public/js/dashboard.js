// Create new blogpost
const newPostHandler = async (event) => {
    event.preventDefault();

    console.log('New Post button clicked on.');
    const creatingPost = true;

    document.location.replace('/dashboard?creatingPost=true');
}


document.querySelector('button').addEventListener('click', newPostHandler);