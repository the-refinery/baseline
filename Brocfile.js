var pickFiles = require('broccoli-static-compiler'),
    findBowerTrees = require('broccoli-bower'),
    compileSass = require('broccoli-ruby-sass'),
    mergeTrees = require('broccoli-merge-trees'),

    source = 'source',
    test = 'test',
    bourbon = 'bower_components/bourbon/dist',

    html = pickFiles(test, {
      srcDir: '/',
      files: ['**/*.html'],
      destDir: test
    }),

    trees = [bourbon, source].concat(findBowerTrees()),
    sassAndLib = mergeTrees(trees, { overwrite: true }),

    css = compileSass([sassAndLib], 'styles.scss', test + '/styles.css', {
      bundleExec: true
    });

    testCss = compileSass([test], 'test.scss', test + '/test.css');

module.exports = mergeTrees([css, testCss, html]);
