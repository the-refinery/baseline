# D-I Baseline

**D-I Baseline** is a starting point for setting up styles on SCSS based project.

## Usage

To use baseline, download the repo and move the files from `source` to the stylesheets directory in your project.

Some of the modules in Baseline take advantage of flexbox, so if you require backward compatability, be sure to include a build of Modernizr that checks for flexbox browser support like [baseline-modernizr](https://github.com/the-refinery/baseline-modernizr).

## To Contribute

In the `docs` directory run the following command to load up the docs.

```sh
npm install && gulp
```

When adding a new feature to the project create a feature branch and follow the code guide. Add your new feature to the docs and test that it works in the latest versions of Safari, Chrome, Firefox and IE 10+ and then issue a pull request for review.
