const themeKey = 'theme';
const darkSetting = 'dark';
const lightSetting = 'light';

const setTheme = (theme) => {
  const themeSettings = [lightSetting, darkSetting];
  const toggleClass = 'theme-toggle--toggled';
  const button = document.querySelector('[data-bs-theme-toggle]');

  if (themeSettings.includes(theme)) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    if (theme === darkSetting) {
      button.classList.remove(toggleClass);
    } else {
      button.classList.add(toggleClass);
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const htmlElement = document.querySelector('html');

  // If that doesn't happen JS-based features won't work

  htmlElement.classList.remove('no-js');

  // Dark theme (base switch logic)

  const handleThemeSwitch = () => {
    const isDarkActive =
      document.documentElement.getAttribute('data-bs-theme') === darkSetting;
    const desiredSetting = isDarkActive ? lightSetting : darkSetting;
    setTheme(desiredSetting);

    try {
      localStorage.setItem(themeKey, desiredSetting);
    } catch {
      return false;
    }
  };

  const handleThemeSwitchFromKeyboard = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      handleThemeSwitch();
    }
  };

  // Dark theme - honor browser preference

  const systemWideDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

  if (systemWideDarkMode.matches) {
    setTheme(darkSetting);
  }

  systemWideDarkMode.addEventListener('change', (e) => {
    const colorSchemePreference = e.matches ? darkSetting : lightSetting;
    setTheme(colorSchemePreference);
  });

  // Dark theme - honor local storage setting if present

  const currentSavedTheme = localStorage.getItem(themeKey) || null;

  if (currentSavedTheme) {
    setTheme(currentSavedTheme);
  }

  // Theme switcher button

  const themeSwitcherBtn = document.querySelector('[data-bs-theme-toggle]');

  themeSwitcherBtn.addEventListener('click', handleThemeSwitch);
  themeSwitcherBtn.addEventListener('keyup', handleThemeSwitchFromKeyboard);

  // Copy to clipboard button

  const copyToClipboardButton = htmlElement.querySelector(
    '.share-buttons .clipboard',
  );

  if (copyToClipboardButton) {
    const copyUrlToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        copyToClipboardButton.dataset.tooltip = 'Copied!';
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    };

    copyToClipboardButton.addEventListener('click', copyUrlToClipboard);

    copyToClipboardButton.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        copyUrlToClipboard();
      }
    });
  }
});
