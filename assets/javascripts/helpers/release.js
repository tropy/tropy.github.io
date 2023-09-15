---
---
export const getLatestRelease = () =>
  fetch('https://tropy.org/releases/latest?limit=1')
    .then(res => res.json())
    .then(res => res[0])
