let converter = {
    init: function () {
        let ajfspTextarea = document.querySelector('.ajfsp textarea');
        let ajlTextarea = document.querySelector('.ajl textarea');

        let ajfspDownload = document.querySelector('.ajfsp .download');
        let ajlDownload = document.querySelector('.ajl .download');

        let ajfspUpload = document.querySelector('.ajfsp .upload');
        let ajlUpload = document.querySelector('.ajl .upload');

        let reloadButton = document.querySelector('h2.reload');

        ajfspTextarea.addEventListener('dblclick', ajfspTextarea.select);
        ajlTextarea.addEventListener('dblclick', ajlTextarea.select);

        ajfspTextarea.addEventListener('input', converter.ajfsp2ajl);
        ajlTextarea.addEventListener('input', converter.ajl2ajfsp);

        ajfspDownload.addEventListener('click', function () {
            converter.download('ajfsp.txt', ajfspTextarea.value);
        });

        ajfspUpload.addEventListener('change', function (el) {
            converter.upload(el, ajfspTextarea);
        });

        ajlDownload.addEventListener('click', function () {
            converter.download('files.ajl', ajlTextarea.value);
        });

        ajlUpload.addEventListener('change', function (el) {
            converter.upload(el, ajlTextarea);
        });

        reloadButton.addEventListener('click', function () {
            ajfspTextarea.value = '';
            ajlTextarea.value = '';
        });
    },

    ajfsp2ajl: function (el) {
        let content = '';

        if (el.target.value.indexOf('ajfsp://')) {
            content += "-----\n100\n";
        }

        let lines = el.target.value.split("\n");

        for (let i = 0; i < lines.length; i++) {
            if (-1 !== lines[i].indexOf('ajfsp://')) {
                let ajfsp = lines[i].slice(0, -1).split('|');
                content += ajfsp[1] + "\n" + ajfsp[2] + "\n" + ajfsp[3] + "\n"
            }
        }

        document.querySelector('.ajl textarea').value = content;
    },

    ajl2ajfsp: function (el) {
        let content = '';
        let lines = el.target.value.split(/\s+/);

        let run = false;
        let count = 0;
        let ajfsp = '';
        for (let i = 0; i < lines.length; i++) {
            if (true === run) {
                count++;
                switch (count) {

                    case 1:
                        ajfsp = 'ajfsp://file|' + lines[i];
                        break;
                    case 2:
                        ajfsp += '|' + lines[i];
                        break;
                    case 3:
                        ajfsp += '|' + lines[i] + "/\n";
                        break;
                }
            }

            if (3 === count) {
                content += ajfsp;
                count = 0;
            }

            if (-1 !== lines[i].indexOf('100')) {
                run = true;
            }
        }

        document.querySelector('.ajfsp textarea').value = content;
    },

    upload: function (el, target) {
        let files = el.target.files;

        for (let i = 0, f; f = files[i]; i++) {
            let reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    target.value = e.target.result;
                    target.dispatchEvent(new Event('input'));
                }
            })(f);
            reader.readAsText(f);
        }
    },

    download: function (filename, text) {

        if (!text.length) {
            alert('kein Inhalt vorhanden?!');
            return;
        }

        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
};

window.addEventListener('load', converter.init, false);
