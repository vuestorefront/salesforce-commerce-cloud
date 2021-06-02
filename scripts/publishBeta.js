const path = require('path');
const { exec } = require('child_process');

const packagesBaseDir = path.join(process.cwd(), 'packages');
const publishPackages = ['api-client', 'composables'];

publishPackages.forEach((repo) => {
  const repoPath = path.join(packagesBaseDir, repo);

  exec(`npm publish ${repoPath} --access public --tag beta`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});
