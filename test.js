const tape = require('tape')
const fs = require('fs')
const yaml = require('js-yaml')
const AJV = require('ajv')

const ajv = new AJV({ allErrors: true })

let schema

tape('schema', test => {
  test.doesNotThrow(() => {
    schema = require('./schema')
  }, 'valid JSON')
  test.assert(ajv.validateSchema(schema), 'valid JSON schema')
  test.end()
})

let wizard

tape('wizard', test => {
  const wizardYAML = fs.readFileSync('./wizard.yml')
  test.doesNotThrow(() => {
    wizard = yaml.load(wizardYAML)
  }, 'valid YAML')

  const validate = ajv.compile(schema)
  validate(wizard)
  test.same(validate.errors, null, 'conforms to schema')

  test.end()
})
