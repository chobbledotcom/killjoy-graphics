const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const fg = require("fast-glob");
const { configureScss } = require("./_lib/scss");

const images = fg.sync(["images/*.jpg"]);

module.exports = function (eleventyConfig) {
	eleventyConfig.addWatchTarget("./src/**/*");

	configureScss(eleventyConfig);

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
	eleventyConfig.addPassthroughCopy({ "images": "images" });
	eleventyConfig.addPassthroughCopy({
		"src/assets/favicon/*": "/",
	});

	eleventyConfig.addCollection("images", (collection) => {
		return images.map((i) => i.split("/")[1]).reverse();
	});

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
