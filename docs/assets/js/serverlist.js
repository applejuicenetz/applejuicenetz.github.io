document.addEventListener('DOMContentLoaded', () => {
    let template = `<tr>
        <td>
            %NAME%
        </td>
        <td>
            <a href="%LINK%">
                %SERVERIP%
            </a>
        </td>
        <td align="right">
            %PORT%
        </td>
    </tr>`;

    let int = setInterval(() => {
        if (window.applejuice) {
            let tBody = document.getElementsByTagName('tbody')[0];

            window.applejuice.servers.forEach(element => {
                let row = template
                    .replace('%NAME%', element.name)
                    .replace('%LINK%', `ajfsp://server|${element.ip}|${element.port}/`)
                    .replace('%SERVERIP%', element.ip)
                    .replace('%PORT%', element.port);

                tBody.innerHTML += row;
            });
            clearInterval(int);
        }
    }, 500);
});
