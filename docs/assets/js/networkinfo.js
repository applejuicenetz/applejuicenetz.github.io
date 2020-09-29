document.addEventListener('DOMContentLoaded', async () => {
    try {
        let result = await window.fetch('https://www.applejuicenet.de/serverlist/networkinfo.php');
        let body = await result.json();

        document.getElementById('nw-server').innerHTML = body.server.toLocaleString();
        document.getElementById('nw-user').innerHTML = body.user.toLocaleString();
        document.getElementById('nw-files').innerHTML = body.files.toLocaleString();
    } catch (e) {
        console.error(e);
    }
});
