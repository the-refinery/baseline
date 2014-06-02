var pickFiles = require('broccoli-static-compiler'),
    findBowerTrees = require('broccoli-bower'),
    compileSass = require('broccoli-ruby-sass'),
    mergeTrees = require('broccoli-merge-trees'),

    source = 'source',
    test = 'test',
    docs = 'docs',
    bourbon = 'bower_components/bourbon/dist',
    normalize = 'bower_components/normalize-scss',

    html = pickFiles(test, {
      srcDir: '/',
      files: ['**/*.html'],
      destDir: test
    }),

    docsHtml = pickFiles(docs, {
      srcDir: '/',
      files: ['**/*.html'],
      destDir: docs
    }),

    trees = [bourbon, normalize, source].concat(findBowerTrees()),
    sassAndLib = mergeTrees(trees, { overwrite: true }),

    css = compileSass([sassAndLib, test], 'test.scss', test + '/styles.css', {
      bundleExec: true
    });

module.exports = mergeTrees([css, html, docsHtml]);
