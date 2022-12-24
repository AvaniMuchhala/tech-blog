const postHandler = async (event) => {
    event.preventDefault();

    console.log('Post clicked on');
    console.log(event.target.closest('.card'));

    const id = event.target.closest('.card').id.split('-')[1];
    console.log(id);
    document.location.replace(`/posts/${id}`);
}

document.querySelectorAll('.card').forEach(card => card.addEventListener('click', postHandler));
