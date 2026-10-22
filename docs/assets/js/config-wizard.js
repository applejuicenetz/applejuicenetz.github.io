let wizard = {
    // core >= 0.35.187.7: 55 MB per TB share plus 10 MB base; older cores need twice the per-TB value
    MB_PER_TB: 55,
    MB_BASE: 10,
    fmt: new Intl.NumberFormat('de-DE', {maximumFractionDigits: 1}),

    init: async function () {
        const presetsResponse = await window.fetch('/assets/data/config-wizard.json');
        const presets = await presetsResponse.json();

        document.getElementById('preset').addEventListener('change', wizard.change, false);
        ['download', 'upload', 'share'].forEach(id => document.getElementById(id).addEventListener('input', wizard.calculate, false));
        ['share_unit', 'version'].forEach(id => document.getElementById(id).addEventListener('change', wizard.calculate, false));

        for (let group = 0; group < presets.length; group++) {
            let optgroup = document.createElement('optgroup');
            optgroup.setAttribute('label', presets[group].group);
            for (let item = 0; item < presets[group].items.length; item++) {
                let preset = document.createElement('option');
                preset.setAttribute('data-download', presets[group].items[item].download);
                preset.setAttribute('data-upload', presets[group].items[item].upload);
                preset.innerText = presets[group].items[item].name + ' (' + wizard.fmt.format(presets[group].items[item].download / 1000) + '/' + wizard.fmt.format(presets[group].items[item].upload / 1000) + ' Mbit/s)';
                optgroup.appendChild(preset);
            }
            document.getElementById('preset').appendChild(optgroup);
        }
        wizard.calculate();
    },

    change: function () {
        if ('custom' !== this.value) {
            // presets are in kbit/s, the inputs in Mbit/s
            document.getElementById('download').value = this.options[this.selectedIndex].dataset.download / 1000;
            document.getElementById('upload').value = this.options[this.selectedIndex].dataset.upload / 1000;
            wizard.calculate();
        }
    },

    convert: function (kbit) {
        if (!kbit) {
            return '';
        }
        return Math.round(kbit * 1000 / 8 / 1024);
    },

    // extra RAM in MB for uploads by upload speed in MB/s
    // measured: +0.1 GB at 1.3 MB/s, +0.6 GB at 2.5 MB/s, +4 GB at 25 MB/s
    uploadExtra: function (kbit) {
        const mbPerSecond = kbit * 1000 / 8 / 1024 / 1024;
        if (!(mbPerSecond > 0)) return 0;
        if (mbPerSecond <= 1) return 512;
        if (mbPerSecond <= 3) return 1024;
        if (mbPerSecond <= 6) return 2048;
        return 4096;
    },

    // extra RAM in MB for downloads, none without download; measured: +1.2 GB at 10-20 connections
    downloadExtra: function (kbit) {
        return kbit > 0 ? 1024 : 0;
    },

    roundUpGb: function (mb) {
        return Math.ceil(mb / 1024) * 1024;
    },

    size: function (mb) {
        return mb >= 1024 ? wizard.fmt.format(mb / 1024) + '\u00a0GB' : wizard.fmt.format(mb) + '\u00a0MB';
    },

    calculateRam: function (tb, old, uploadKbit, downloadKbit) {
        const min = wizard.MB_BASE + (old ? 2 : 1) * wizard.MB_PER_TB * tb;
        const up = wizard.uploadExtra(uploadKbit);
        const down = wizard.downloadExtra(downloadKbit);
        return {
            min: wizard.roundUpGb(min),
            rec: wizard.roundUpGb(min * 1.5 + up + down),
            up: up,
            down: down,
        };
    },

    calculate: function () {
        // inputs are in Mbit/s, calculations use kbit/s
        const download = (parseFloat(String(document.getElementById('download').value).replace(',', '.')) || 0) * 1000;
        const upload = (parseFloat(String(document.getElementById('upload').value).replace(',', '.')) || 0) * 1000;
        document.getElementById('download_calculated').textContent = wizard.convert(download) || '–';
        document.getElementById('upload_calculated').textContent = wizard.convert(upload) || '–';

        const tb = parseFloat(String(document.getElementById('share').value).replace(',', '.')) * parseFloat(document.getElementById('share_unit').value);
        if (!(tb >= 0)) {
            ['ram_min', 'ram_rec', 'ram_up_extra', 'ram_down_extra'].forEach(id => document.getElementById(id).textContent = '–');
            document.getElementById('ram_xmx').value = '';
            return;
        }
        const ram = wizard.calculateRam(tb, document.getElementById('version').value === 'old', upload, download);
        document.getElementById('ram_min').textContent = wizard.size(ram.min);
        document.getElementById('ram_rec').textContent = wizard.size(ram.rec);
        document.getElementById('ram_xmx').value = '-Xmx' + ram.rec + 'm';
        document.getElementById('ram_up_extra').textContent = wizard.size(ram.up);
        document.getElementById('ram_down_extra').textContent = wizard.size(ram.down);
    },
};

window.addEventListener('load', wizard.init, false);
