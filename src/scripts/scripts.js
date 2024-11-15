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

const getScrollPercent = () => {
  const htmlElement = document.documentElement;
  const body = document.body;
  const scrollTop = htmlElement.scrollTop || body.scrollTop;
  const scrollHeight = htmlElement.scrollHeight || body.scrollHeight;
  const clientHeight = htmlElement.clientHeight;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
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

  // Reading progress bar

  const progressBar = document.querySelector('.reading-progress-bar');

  if (progressBar) {
    const setProgress = () => {
      const width = getScrollPercent();
      progressBar.style.width = width + '%';
    };

    window.addEventListener('scroll', setProgress);

    setProgress();
  }

  // TODO: Expand / collapse post archives

  const yearHeadingSelector = '.year-heading';
  const postLists = document.querySelectorAll('.archive .list');

  const archiveYearHeadings = document.querySelectorAll(
    `.archive ${yearHeadingSelector}`,
  );

  const handleArchiveToggle = (e) => {
    const clickedHeading = e.target.closest(yearHeadingSelector);
    const year = clickedHeading.getAttribute('id').split('-')[1];
    clickedHeading.classList.toggle('hidden');
    document
      .getElementsByClassName(`posts-${year}`)[0]
      .classList.toggle('hidden');
  };

  const handleArchiveToggleFromKeyboard = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      handleArchiveToggle(e);
    }
  };

  if (postLists && postLists.length > 0) {
    for (const listItem of postLists) {
      listItem.classList.add('hidden');
    }

    for (const heading of archiveYearHeadings) {
      heading.classList.add('clickable', 'hidden');
      heading.addEventListener('click', handleArchiveToggle);
      heading.addEventListener('keyup', handleArchiveToggleFromKeyboard);
    }

    postLists[0].classList.remove('hidden');
    archiveYearHeadings[0].classList.remove('hidden');
  }

  // TODO: Mastodon share button

  const mastodonShareForm = htmlElement.querySelector(
    '.share-buttons .mastodon-share-form',
  );

  const mastodonShareButton = htmlElement.querySelector(
    '.share-buttons .mastodon',
  );
  const mastodonShareDialog = htmlElement.querySelector(
    '.share-buttons .mastodon-share-dialog',
  );

  const mastodonDialogCloseLink = htmlElement.querySelector(
    '.mastodon-share-dialog .close-link',
  );

  const instanceUrlInput = htmlElement.querySelector(
    '.mastodon-share-dialog .instance-url-input',
  );

  const shareSubmitButton = htmlElement.querySelector(
    '.mastodon-share-dialog .share-form-submit',
  );

  const isMastodonInstanceValid = (value) => {
    const urlRegex = /^[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    if (urlRegex.test(value)) {
      return true;
    }
    return false;
  };

  if (mastodonShareDialog) {
    const openMastodonPopup = () => {
      document.querySelector('body').classList.add('no-scrollbar');
      mastodonShareDialog.classList.add('visible');
      instanceUrlInput.focus();

      if (window.innerWidth >= 768) {
        document.querySelector('body').classList.remove('no-scrollbar');
      }
    };

    const closeMastodonPopup = () => {
      document.querySelector('body').classList.remove('no-scrollbar');
      mastodonShareDialog.classList.remove('visible');
      instanceUrlInput.blur();
    };

    instanceUrlInput.addEventListener('input', (event) => {
      const typedValue = event.currentTarget.value;
      const validInstance = isMastodonInstanceValid(typedValue);

      if (validInstance) {
        shareSubmitButton.removeAttribute('disabled');
      } else {
        shareSubmitButton.setAttribute('disabled', '');
      }
    });

    mastodonShareForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const href = window.location.href;
      const title = htmlElement.querySelector('article h1').innerHTML;
      const instance = instanceUrlInput.value;

      window.open(
        'https://' +
          instance +
          '/share?text=' +
          encodeURIComponent(title) +
          ' ' +
          encodeURIComponent(href),
        '_blank',
      );
    });

    mastodonDialogCloseLink.addEventListener('click', closeMastodonPopup);

    if (mastodonShareButton) {
      mastodonShareButton.addEventListener('click', openMastodonPopup);

      mastodonShareButton.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          openMastodonPopup();
        }
      });
    }
  }

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
