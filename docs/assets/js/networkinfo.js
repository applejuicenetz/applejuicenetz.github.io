document.addEventListener('DOMContentLoaded', async () => {
    try {
        let result = await window.fetch('http://www.applejuicenet.cc/serverlist/networkinfo.php');
        window.applejuice = await result.json();

        document.getElementById('nw-server').innerHTML = window.applejuice.server.toLocaleString();
        document.getElementById('nw-user').innerHTML = window.applejuice.user.toLocaleString();
        document.getElementById('nw-files').innerHTML = window.applejuice.files.toLocaleString();
    } catch (e) {
        console.error(e);
    }
});
