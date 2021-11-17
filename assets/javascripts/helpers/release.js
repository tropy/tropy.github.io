---
---
export const getLatestRelease = () =>
  fetch('/releases/latest?limit=1')
    .then(res => res.json())
    .then(res => res[0])
    {%- if jekyll.environment == "development" %}
    .catch(() => ({
      url: 'https://github.com/tropy/tropy/releases/latest',
      assets: [
        { platform: 'darwin', arch: 'x64', url: 'https://tropy.org/download/mac/x64' },
        { platform: 'darwin', arch: 'arm64', url: 'https://tropy.org/download/mac/arm64' },
        { platform: 'win32', arch: 'x64', url: 'https://tropy.org/download/windows/x64' },
        { platform: 'linux', arch: 'x64', url: 'https://tropy.org/download/linux/x64' }
      ]
    }))
    {%- endif %}
