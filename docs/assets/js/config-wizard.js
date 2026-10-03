let wizard = {
    init: async function () {
        const presetsResponse = await window.fetch('/assets/data/config-wizard.json');
        const presets = await presetsResponse.json();

        document.getElementById('preset').addEventListener('change', wizard.change, false);
        document.getElementById('download').addEventListener('input', wizard.calculate, false);
        document.getElementById('upload').addEventListener('input', wizard.calculate, false);

        for (let group = 0; group < presets.length; group++) {
            let optgroup = document.createElement('optgroup');
            optgroup.setAttribute('label', presets[group].group);
            for (let item = 0; item < presets[group].items.length; item++) {
                let preset = document.createElement('option');
                preset.setAttribute('data-download', presets[group].items[item].download);
                preset.setAttribute('data-upload', presets[group].items[item].upload);
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
            wizard.calculate();
        }
    },

    convert: function (kbit) {
        if (!kbit) {
            return '';
        }
        return Math.round(kbit * 1000 / 8 / 1024);
    },

    calculate: function () {
        document.getElementById('download_calculated').value = wizard.convert(document.getElementById('download').value);
        document.getElementById('upload_calculated').value = wizard.convert(document.getElementById('upload').value);
    },
};

window.addEventListener('load', wizard.init, false);
