const fs = require('fs');
const path = require('path');
const semver = require('semver');

const packagesBaseDir = path.join(process.cwd(), 'packages');
const updatePackages = ['api-client', 'composables', 'theme'];

updatePackages.forEach((repo) => {
  const repoPath = path.join(packagesBaseDir, repo);
  const pkgPath = path.join(repoPath, 'package.json');
  const pkg = fs.readFileSync(pkgPath).toString();

  const { version } = pkg.match(/"version": "(?<version>[^"]+)"/m).groups;
  const newVersion = semver.inc(version, 'prerelease', 'beta');
  const updatedPkg = pkg.replace(new RegExp(version, 'g'), newVersion);

  fs.writeFileSync(pkgPath, updatedPkg);
  fs.writeFileSync(process.env.GITHUB_ENV, `\nBETA_VERSION=${newVersion}`, { flag: 'a' });
});
