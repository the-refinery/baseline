var pickFiles = require('broccoli-static-compiler'),
    compileSass = require('broccoli-ruby-sass'),
    mergeTrees = require('broccoli-merge-trees'),

    source = 'source',
    test = 'test',
    docs = 'docs',
    bourbon = 'bower_components/bourbon/dist',
    normalize = 'bower_components/normalize-scss',

    testHtml = pickFiles(test, {
      srcDir: '/',
      files: ['**/*.html'],
      destDir: test
    }),

    docsHtml = pickFiles(docs, {
      srcDir: '/',
      files: ['**/*.html'],
      destDir: docs
    }),

    trees = [bourbon, normalize, source],
    sassAndLib = mergeTrees(trees, { overwrite: true }),

    testCss = compileSass([sassAndLib, test], 'test.scss', test + '/styles.css', {
      bundleExec: true
    });

    docsCSS = compileSass([sassAndLib, docs], 'docs.scss', docs + '/styles.css', {
      bundleExec: true
    });

module.exports = mergeTrees([testCss, testHtml, docsCSS, docsHtml]);
