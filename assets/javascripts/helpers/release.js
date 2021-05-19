export const getLatestRelease = () =>
  fetch('https://api.tropy.org/releases?limit=1')
    .then(res => res.json())
    .catch(() => ({
      version: '1.9.0',
      assets: [
        { platform: 'darwin', arch: 'x64', url: 'https://tropy.org/download/mac/x64' },
        { platform: 'darwin', arch: 'arm64', url: 'https://tropy.org/download/mac/arm64' },
        { platform: 'win32', arch: 'x64', url: 'https://tropy.org/download/windows/x64' },
        { platform: 'win32', arch: 'arm64', url: 'https://tropy.org/download/windows/arm64' },
        { platform: 'win32', arch: 'ia32', url: 'https://tropy.org/download/windows/ia32' },
        { platform: 'linux', arch: 'x64', url: 'https://tropy.org/download/linux/x64' }
      ]
    }))
