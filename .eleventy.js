
const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {

    // Adding cssmin filter to minify stylesheets
    eleventyConfig.addFilter("cssmin", function(css) {
        return new CleanCSS({}).minify(css).styles;
    });

    markdownTemplateEngine: "njk";

    eleventyConfig.setTemplateFormats([
        "md",
        "njk"
    ]);

    // filter for genre hrefs
    eleventyConfig.addFilter("lower", function(str) {
        return str.toLowerCase();
    });

    // filter to fix genre with underscore
    eleventyConfig.addFilter("cleanup", function(str) {
        return str.replace("_", " ");
    })

    // Create custom collection for shows
    eleventyConfig.addCollection("shows", function(collection) {
        return collection.getFilteredByGlob("src/shows/*.md");
    });

    // Use Passthrough File Copy to include static assets in site output _site
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/images/");

    return {
        dir: {
            input: "src",
            output: "_site",
        },
        includes: "_includes",
        layouts: "_includes/layouts"
    };
};