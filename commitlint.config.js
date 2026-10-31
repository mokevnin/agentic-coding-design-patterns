module.exports = {
  extends: ['@commitlint/config-conventional'],
  // Dependabot writes its own messages (long release-note lines in the body);
  // they are merged automatically and must not fail the commit check.
  ignores: [(message) => message.includes('Signed-off-by: dependabot[bot]')],
}
