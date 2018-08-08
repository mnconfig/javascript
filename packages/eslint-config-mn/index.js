module.exports = {
  extends: [
    'eslint-config-mn-base',
    'eslint-config-mn-base/rules/strict',
    './rules/react',
    './rules/react-a11y',
  ].map(require.resolve),
  rules: {}
};
