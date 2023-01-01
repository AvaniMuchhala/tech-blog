// Logs user out if idle/inactive
let idleTime = function () {
    let time;
    // Events that indicate user is still active and will reset timer
    window.onload = resetTimer;
    document.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onmousedown = resetTimer;
    document.ontouchstart = resetTimer;
    document.onclick = resetTimer;
    document.onkeypress = resetTimer;
    document.addEventListener('scroll', resetTimer, true);

    function logout() {
        alert("You have been logged out due to inactivity.");
        document.location.replace('/logout');
    }

    // After 5 min of inactivity, log user out,
    // Unless timer has been reset due to one of the listed events
    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 5*60*1000);
    }
};

window.onload = function () {
    idleTime();
}