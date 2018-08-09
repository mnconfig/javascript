import test from 'tape';
import { CLIEngine } from 'eslint';
import eslintrc from '..';
import reactRules from '../rules/react';
import reactA11yRules from '../rules/react-a11y';

const cli = new CLIEngine({
  useEslintrc: false,
  baseConfig: eslintrc,

  rules: {
    // It is okay to import devDependencies in tests.
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
});

function lint(text) {
  // @see http://eslint.org/docs/developer-guide/nodejs-api.html#executeonfiles
  // @see http://eslint.org/docs/developer-guide/nodejs-api.html#executeontext
  const linter = cli.executeOnText(text);
  return linter.results[0];
}

// eslint-disable-next-line no-unused-vars
function logError(res) {
  // eslint-disable-next-line no-console
  console.log('-'.repeat(40));
  Object.keys(res).forEach((key) => {
    // eslint-disable-next-line no-console
    console.log(key, ' => ', JSON.stringify(res[key]));
  });
  // eslint-disable-next-line no-console
  console.log('-'.repeat(40));
}

function wrapComponent(body, props = '{}', defaultProps = '{}') {
  const compClass = `
import React from 'react';
${props === '{}' ? '' : 'import PropTypes from \'prop-types\';'}

class MyComponent extends React.Component {
/* eslint no-empty-function: 0, class-methods-use-this: 0 */
${body}
}
${props === '{}' ? '' : `MyComponent.propTypes = ${props};`}
${defaultProps === '{}' ? '' : `MyComponent.defaultProps = ${defaultProps};`}
export default MyComponent;
`;
  return compClass;
}

test('validate react prop order', (t) => {
  t.test('make sure our eslintrc has React and JSX linting dependencies', (t) => {
    t.plan(2);
    t.deepEqual(reactRules.plugins, ['react']);
    t.deepEqual(reactA11yRules.plugins, ['jsx-a11y', 'react']);
  });

  t.test('passes a good component', (t) => {
    t.plan(3);
    const component = wrapComponent(`
  componentWillMount() {}

  componentDidMount() {}

  setFoo() {}

  getFoo() {}

  setBar() {}

  someMethod() {}

  renderDogs() {}

  render() {
    return (
      <div>
        <input type="text" />
        <button disabled={this.props.isEnabled}>Button</button>
      </div>
    );
  }`,
    '{ isEnabled: PropTypes.bool }',
    '{ isEnabled: false }');
    const result = lint(component);

    t.notOk(result.warningCount, 'no warnings');
    t.notOk(result.errorCount, 'no errors');
    t.deepEquals(result.messages, [], 'no messages in results');
  });

  t.test('order: when random method is first', (t) => {
    t.plan(2);
    const result = lint(wrapComponent(`
  someMethod() {}
  componentWillMount() {}
  componentDidMount() {}
  setFoo() {}
  getFoo() {}
  setBar() {}
  renderDogs() {}
  render() { return <div />; }
`));

    t.ok(result.errorCount, 'fails');
    t.equal(result.messages[0].ruleId, 'react/sort-comp', 'fails due to sort');
  });

  t.test('order: when random method after lifecycle methods', (t) => {
    t.plan(2);
    const component = wrapComponent(`
  componentWillMount() {}

  componentDidMount() {}

  someMethod() {}

  setFoo() {}

  getFoo() {}

  setBar() {}

  renderDogs() {}

  render() { return <div />; }
`);
    const result = lint(component);

    t.ok(result.errorCount, 'fails');
    t.equal(result.messages[0].ruleId, 'react/sort-comp', 'fails due to sort');
  });
});
