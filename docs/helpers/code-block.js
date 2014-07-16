module.exports = function(context, options) {
  var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };

  function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
  }

  function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
  }

  return '<pre><code class="language-' + context + '">' + safe_tags_replace(options.fn(context)) + '</code></pre>';
};
