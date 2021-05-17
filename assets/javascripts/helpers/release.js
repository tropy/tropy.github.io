import { platform, arch } from './os.js'

const getLatestRelease = () =>
  fetch('/releases?limit=1')
    .then(res => res.json())
    .catch(_ => ({
      assets: [
        { platform: 'darwin', arch: 'x64', url: '/download/mac/x64' },
        { platform: 'darwin', arch: 'arm64', url: '/download/mac/arm64' },
        { platform: 'win32', arch: 'x64', url: '/download/windows/x64' },
        { platform: 'win32', arch: 'arm64', url: '/download/windows/arm64' },
        { platform: 'win32', arch: 'ia32', url: '/download/windows/ia32' },
        { platform: 'linux', arch: 'x64', url: '/download/linux/x64' }
      ]
    }))
    .then(release => (
      release.assets.sort(byPlatform),
      release
    ))


const byPlatform = (a, b) => {
  if (a.platform !== platform)
    return (b.platform === platform) ? 1 : 0

  if (b.platform !== platform) {
    return -1

  if (a.arch !== arch)
    return (b.arch === arch) ? 1 : 0

  if (b.arch !== arch)
    return -1

  return 0
}
