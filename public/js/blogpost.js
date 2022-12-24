const blogpostHandler = (event) => {
    event.preventDefault();

    console.log('Blogpost clicked on');
    console.log(event.target.closest('.card'));

    // Grab ID of the blogpost that was clicked on
    const id = event.target.closest('.card').id.split('-')[1];
    console.log(id);

    console.log(`\n ${window.location.href} \n`);
    let page = window.location.href.split('/');
    page = page[page.length-1]; 
    console.log(page);

    if (page === 'home') {
        // Bring user to /posts/id# (leave/view comments)
        document.location.replace(`/posts/${id}`);
    } else if (page === 'dashboard') {
        // Bring user to /dashboard/posts/id# (update/delete blogpost)
        document.location.replace(`/dashboard/posts/${id}`);
    }
}

document.querySelectorAll('.card').forEach(card => card.addEventListener('click', blogpostHandler));
