'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const postcssScss = require('@csstools/postcss-sass');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
// Many thanks for help https://www.jurecuhalev.com/blog/2018/09/07/using-purgecss-with-ember-js/
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        extension: 'scss',
        enabled: true,
        parser: require('postcss-scss'),
        plugins: [
          {
            module: postcssScss,
            options: {
              includePaths: [
              ],
            },
          },
          {
            module: tailwindcss,
          }
        ],
      },
      filter: {
        enabled: true,
        plugins: [
          {
            module: autoprefixer,
            options: {
              browsers: ['last 2 versions', 'ie 11'] // this will override the config, but just for this plugin
            }
          },
          {
            module: purgecss,
            options: {
              content: ['./app/**/*.hbs', './app/**/.js'],
              defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
            }
          }
        ]
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
