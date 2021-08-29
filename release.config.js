module.exports = {
  branches: [
    'master',
    {
      name: 'next',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    ['@semantic-release/release-notes-generator', {
      preset: 'conventionalcommits',
    }],
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
    }],
    [
      '@semantic-release/git', {
        assets: [
          'CHANGELOG.md',
          'package.json',
        ],
       message: "chore(release): ${nextRelease.version} \n\n${nextRelease.notes}"
      },
    ],
  ],
};
