var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onmousedown = resetTimer;
    document.onkeydown = resetTimer;

    function logout() {
        // try {
        //     const response = await fetch('/logout', {
        //         method: 'GET'
        //     });
    
        //     if (response.ok) {
        //         console.log('Logged out due to idle.');
        //         document.location.replace('/home');
        //         alert('You have been logged out.');
        //     }
        // } catch (err) {
        //     console.error(err);
        // }
        alert('You have been logged out.');

        
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 5000);
    }
};

window.onload = function () {
    inactivityTime();
}