import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

function getGitCommitHash() {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch (error) {
    console.error('Failed to get Git commit hash:', error);
    return 'unknown';
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [

        ],
      },
      env: {
        APP_VERSION: packageJson.version,
        GIT_COMMIT: getGitCommitHash(),
      },
};

export default nextConfig;
