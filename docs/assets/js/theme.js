(() => {
    const storageKey = 'applejuice-theme';
    const modes = ['system', 'light', 'dark'];
    const root = document.documentElement;

    const getStoredMode = () => {
        try {
            const mode = window.localStorage.getItem(storageKey);
            return modes.includes(mode) ? mode : 'system';
        } catch (_) {
            return 'system';
        }
    };

    const storeMode = mode => {
        try {
            if (mode === 'system') {
                window.localStorage.removeItem(storageKey);
            } else {
                window.localStorage.setItem(storageKey, mode);
            }
        } catch (_) {
            // The selected theme still applies when storage is unavailable.
        }
    };

    const updateButton = mode => {
        const button = document.getElementById('theme-toggle');
        if (!button) {
            return;
        }

        const labels = {
            system: 'System',
            light: 'Hell',
            dark: 'Dunkel'
        };
        const icons = {
            system: 'fa-desktop',
            light: 'fa-sun',
            dark: 'fa-moon'
        };
        const label = `Darstellung: ${labels[mode]}`;
        const icon = button.querySelector('.fas');

        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
        icon.className = `fas ${icons[mode]}`;

        document.querySelectorAll('[data-theme-mode]').forEach(option => {
            const isActive = option.dataset.themeMode === mode;
            option.classList.toggle('is-active', isActive);
            option.setAttribute('aria-checked', String(isActive));
        });
    };

    const applyMode = (mode, persist = false) => {
        root.classList.remove('theme-light', 'theme-dark');
        if (mode !== 'system') {
            root.classList.add(`theme-${mode}`);
        }
        if (persist) {
            storeMode(mode);
        }
        updateButton(mode);
    };

    let currentMode = getStoredMode();
    applyMode(currentMode);

    document.addEventListener('DOMContentLoaded', () => {
        const picker = document.getElementById('theme-picker');
        const button = document.getElementById('theme-toggle');

        updateButton(currentMode);
        button?.addEventListener('click', event => {
            event.stopPropagation();
            const isOpen = picker.classList.toggle('is-active');
            button.setAttribute('aria-expanded', String(isOpen));
        });

        document.querySelectorAll('[data-theme-mode]').forEach(option => {
            option.addEventListener('click', () => {
                currentMode = option.dataset.themeMode;
                applyMode(currentMode, true);
                picker.classList.remove('is-active');
                button.setAttribute('aria-expanded', 'false');
                button.focus();
            });
        });

        document.addEventListener('click', () => {
            picker?.classList.remove('is-active');
            button?.setAttribute('aria-expanded', 'false');
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && picker?.classList.contains('is-active')) {
                picker.classList.remove('is-active');
                button.setAttribute('aria-expanded', 'false');
                button.focus();
            }
        });
    });
})();
