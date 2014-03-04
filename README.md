# D-I Baseline

**D-I Baseline** is a starting point for setting up styles on SCSS based project. This set of styles relies on using [Thoughtbot's Bourbon mixin library](http://bourbon.io).

## Modular CSS

The style sheets have been structured with modularity in mind to make it easy to add new features and components while ensuring the code base is easy to maintain over time. The structure has borrowed a lot from [Jonathan Snook's SMACSS](http://smacss.com) (Scalable and Modular CSS) approach and so the stylesheets are broken down into four main sections:

### Base

**Base** styles are the foundation of the site. In this directory you will find the following:

- `_base.scss` - This style sheet contains the styles are applied directly to elements using an element selector
- `_settings.scss` - This style sheet includes site-wide settings such as colors, fonts, widths, etc.
- `_helpers.scss` - This is where you would place any Sass mixins, functions or extends (that are also not present in Bourbon)
- `_content.scss` - This is where universal text and content styles reside

### Layout

**Layout** styles are just that, they determine how the main sections of page are structured. Within this directory are:

- `_layout.scss` - This stylesheet is where the main container styles are stored, such as `.l-container`, `.l-section`, etc. Anything in this file are prefixed with `l-` to establish context.
- `_grid.scss` - A basic grid to be used as a starting point. All columns share a single breakpoint.

### Modules

**Modules** are discrete components of the page, such as navigation, alert dialogs, buttons, etc. This section of the CSS is where you will most likely spend most of your time. Any new features or components will be added to this section.

### States

**States**, as defined by SMACSS, augment and override all other styles. At the moment, this group contains only styles that control the display state of an element, whether or not is is hidden `.is-hidden` or is visible `.is-visible`. These can be expanded to also contain states such as whether an element is expanded or collapsed, or if the element is in an error state.

## Coding Styles

**Baseline** follows a coding style, which when adhered to will help keep things consistent with multiple people contributing to the code base.

- Use two spaces to indent
- One selector per line
- Each property and value pair gets its own line
- Put spaces after `:` in property declarations
- Put spaces before `{` in rule declarations
- End all declarations with a semicolon
- Use hex color codes `#000` unless using rgba
- Lowercase all hex values, e.g., `#fff` instead of `#FFF`
- Use shorthand hex values where available, e.g., `#fff` instead of `#ffffff`
- Quote attribute values in selectors, e.g., `input[type="text"]`
- Avoid specifying units for zero values, e.g., `margin: 0;` instead of `margin: 0px;`

Here's a good example:

```css
.selector,
.another-selector {
  border: 1px solid #0f0;
  color: #000;
  background: rgba(0, 0, 0, 0.5);
}
```

### SCSS Style

- Any `$variable` or `@mixin` that is used in more than one file should be put in the `_settings.scss` or `_helpers.scss` depending on their function. This will prevent the need to use `@import` in any file except the main import stylesheet
- Limit nesting as much as possible. Nesting too deep will lead to overly-specific selectors and make overriding them in the future quite a chore. Try to limit nesting to no more than two levels deep if possible (exceptions made for nesting pseudo classes and elements)
- Always place `@extend` and `@include` statements on the first lines of a declaration block.

Here's good example:

```scss
.widget {
  @include clearfix;
  @extend %component;
  border: 1px solid $border-color;
  background: $background-color;

  a {
    color: $widget-link-color;

    &:hover {
      color: darken($widget-link-color, 10%):
    }
  }
}
```

## BEM

When creating new styles it is best to employ the BEM methodology.

> BEM – meaning block, element, modifier – is a front-end naming methodology thought up by the guys at Yandex. It is a smart way of naming your CSS classes to give them more transparency and meaning to other developers. [Harry Roberts of CSS Wizardry](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

As stated by Harry Roberts in his article [MindBEMding](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/):

- `.block` represents the higher level of an abstraction or component.
- `.block__element` represents a descendent of .block that helps form .block as a whole.
- `.block--modifier` represents a different state or version of .block.

Styles should be broken down in this pattern. Here is an example of a module we'll call 'widget':

The main styles that control the widget will be attached to the root: `widget`.

If the widget module contains any custom element styles such as headings they can be scoped to the widget like this: `widget__title` or `widget__heading`.

If there are any modifications to the original widget such as a lighter background color, you can add a modifier to the root class which uses two dashes to signify its relationship: `widget--light`.

The resulting code would look like this:

```html
<div class="widget">
  <p class="widget__title">…</p>
  <p class="widget__body">…</p>
</div>
```
And with the modifier:

```html
<div class="widget widget--light">
  <p class="widget__title">…</p>
  <p class="widget__body">…</p>
</div>
```
