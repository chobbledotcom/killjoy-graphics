const path = require("path");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const fg = require("fast-glob");
const { configureScss } = require("./_lib/scss");

const images = fg.sync(["src/images/*.jpg"]);

module.exports = function (eleventyConfig) {
	eleventyConfig.addWatchTarget("./src/**/*");

	// Configure SCSS compilation
	configureScss(eleventyConfig);

	// Ignore SCSS partials (files starting with underscore)
	eleventyConfig.ignores.add("src/**/_*.scss");

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		formats: ["webp", "jpeg"],
		widths: [200, 400],
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {},
		},
	});

	eleventyConfig.addPassthroughCopy("src/assets");
	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPassthroughCopy({
		"src/assets/favicon/*": "/",
	});

	eleventyConfig.addCollection("images", (collection) => {
		return images.map((i) => i.split("/")[2]).reverse();
	});

	// Base configuration
	return {
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
			layouts: "_layouts",
			data: "_data",
		},
		templateFormats: ["liquid", "md"],
		htmlTemplateEngine: "liquid",
		markdownTemplateEngine: "liquid",
	};
};
