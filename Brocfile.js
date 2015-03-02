var pickFiles = require('broccoli-static-compiler'),
    compileSass = require('broccoli-sass'),
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
    docs = 'docs',
    bourbon = 'bower_components/bourbon/app/assets/stylesheets',
    normalize = 'bower_components/normalize-scss',

    testHtml = pickFiles(test, {
      srcDir: '/',
      files: ['**/*.html'],
      destDir: test
    }),

    docsContent = pickFiles('docs/content', {
      srcDir: '/',
      files: ['**/*.*'],
      destDir: '/'
    });

    var docsHtml = HTMLPages(docsContent, pagesOptions);
    docsHtml = MarkdownPages(docsHtml, pagesOptions);
    docsHtml = HBSPages(docsHtml, pagesOptions);

    var prism = 'bower_components/prism';
    prism = pickFiles(prism, {
      srcDir: '/',
      files: ['prism.js', 'themes/*.css', 'components/prism-scss.js'],
      destDir: '/prism'
    });

    var trees = [bourbon, normalize, source],
        sassAndLib = mergeTrees(trees, { overwrite: true }),
        testCss = compileSass([sassAndLib, test], 'test.scss', test + '/styles.css'),
        docsCSS = compileSass([sassAndLib, docs + '/doc-styles'], 'docs.scss', '/styles.css');

module.exports = mergeTrees([testCss, testHtml, docsCSS, docsHtml, prism]);
