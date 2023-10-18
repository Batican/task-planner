module.exports = {
  customSyntax: "postcss-html",
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-vue",
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "property-no-vendor-prefix": false,
    "selector-pseudo-element-colon-notation": false,
    "selector-class-pattern": false,
    "rule-empty-line-before": false,
    "font-family-name-quotes": false,
  },
};
