var inactivityTime = function () {
    console.log('inactivityTime()');
    var time;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;  // catches touchscreen presses as well      
    window.ontouchstart = resetTimer; // catches touchscreen swipes as well      
    window.ontouchmove = resetTimer;  // required by some devices 
    window.onclick = resetTimer;      // catches touchpad clicks as well
    window.onkeydown = resetTimer;   
    //window.addEventListener('scroll', resetTimer, true); // improved; see comments

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
        console.log('You have been logged out.');
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 1000);
    }
};

window.onload = function () {
    console.log('idle-checker script');
    inactivityTime();
}