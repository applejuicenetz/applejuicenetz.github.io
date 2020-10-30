let wizard = {
    init: async function () {
        const presetsResponse = await window.fetch('/assets/data/config-wizard.json');
        const presets = await presetsResponse.json();

        document.getElementById('preset').addEventListener('change', wizard.change, false);
        document.getElementById('download').addEventListener('change', wizard.calculate, false);
        document.getElementById('upload').addEventListener('change', wizard.calculate, false);
        document.getElementById('ram').addEventListener('click', function () {
            this.select()
        }, false);

        for (let group = 0; group < presets.length; group++) {
            let optgroup = document.createElement('optgroup');
            optgroup.setAttribute('label', presets[group].group);
            for (let item = 0; item < presets[group].items.length; item++) {
                let preset = document.createElement('option');
                preset.setAttribute('data-download', presets[group].items[item].download);
                preset.setAttribute('data-upload', presets[group].items[item].upload);
                preset.setAttribute('data-ram', presets[group].items[item].ram);
                preset.innerText = presets[group].items[item].name + ' (' + presets[group].items[item].download + '/' + presets[group].items[item].upload + ')';
                optgroup.appendChild(preset);
            }
            document.getElementById('preset').appendChild(optgroup);
        }
    },

    change: function () {
        if ('custom' !== this.value) {
            document.getElementById('download').value = this.options[this.selectedIndex].dataset.download;
            document.getElementById('upload').value = this.options[this.selectedIndex].dataset.upload;
            document.getElementById('ram').value = '-Xmx' + this.options[this.selectedIndex].dataset.ram + 'm';
            wizard.calculate();
        }
    },

    convert: function (value) {
        return (value / 8) * (1000 / 1024).toFixed(0);
    },

    calculate: function () {
        document.getElementById('upload_calculated').value = wizard.convert(document.getElementById('upload').value);
        document.getElementById('download_calculated').value = wizard.convert(document.getElementById('download').value);
    },
};

window.addEventListener('load', wizard.init, false);
