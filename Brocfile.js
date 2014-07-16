var pickFiles = require('broccoli-static-compiler'),
    compileSass = require('broccoli-ruby-sass'),
    mergeTrees = require('broccoli-merge-trees'),
    HTMLPages = require('broccoli-pages').HTMLPages,
    MarkdownPages = require('broccoli-pages').MarkdownPages,
    HTMLPages = require('broccoli-pages').HTMLPages,
    HBSPages = require('broccoli-pages').HBSPages,

    pagesOptions = {
      templates: './docs/templates',
      helpers: './docs/helpers',
      partials: './docs/templates/partials'
    },

    source = 'source',
    test = 'test',
    bourbon = 'bower_components/bourbon/dist',
    normalize = 'bower_components/normalize-scss',

    testHtml = pickFiles(test, {
      srcDir: '/',
      files: ['**/*.html'],
      destDir: test
    }),

    docs = pickFiles('docs/content', {
      srcDir: '/',
      files: ['**/*.*'],
      destDir: '/'
    });

    var docsHtml = HTMLPages(docs, pagesOptions);
    docsHtml = MarkdownPages(docsHtml, pagesOptions);
    docsHtml = HBSPages(docsHtml, pagesOptions);

    var trees = [bourbon, normalize, source],
        sassAndLib = mergeTrees(trees, { overwrite: true }),
        testCss = compileSass([sassAndLib, test], 'test.scss', test + '/styles.css', {
          bundleExec: true
        }),
        docsCSS = compileSass([sassAndLib, docs], 'docs.scss', '/styles.css', {
          bundleExec: true
        });

module.exports = mergeTrees([testCss, testHtml, docsCSS, docsHtml]);
