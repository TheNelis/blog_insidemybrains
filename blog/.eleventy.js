const { client } = require('./lib/sanityClient');
const { toHTML } = require('@portabletext/to-html');

module.exports = function(eleventyConfig) {

    eleventyConfig.addFilter("date", function(date) {
        return new Date(date).toLocaleDateString('nl-NL', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    });

    eleventyConfig.addFilter("portableText", function(portableText) {
        return toHTML(portableText || []);
    });

    eleventyConfig.addFilter("truncateContent60", function(portableText) {
        if (!portableText) return '';

        // Verander portable text naar tekst string html tags
        const text = portableText
            .map(block => block.children.map(child => child.text).join(''))
            .join(' ');

        const words = text.split(/\s+/);
        const truncatedWords = words.slice(0, 60).join(' '); // Max. 60 woorden voor preview
        
        return truncatedWords + '.. »';
    });

    eleventyConfig.addFilter("truncateContent20", function(portableText) {
        if (!portableText) return '';

        // Verander portable text naar tekst string html tags
        const text = portableText
            .map(block => block.children.map(child => child.text).join(''))
            .join(' ');

        const words = text.split(/\s+/);
        const truncatedWords = words.slice(0, 20).join(' '); // Max. 60 woorden voor preview
        
        return truncatedWords + '.. »';
    });

    eleventyConfig.addGlobalData('blogPosts', async function() {
        try {    
            const posts = await client.fetch(`
                *[_type == "blogPost"] {
                    _id, 
                    title, 
                    category, 
                    publishedAt, 
                    "slug": slug.current,
                    content
                }
            `);

            // Sorteer posts, nieuw naar oud
            posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
            return posts;
        } catch (error) {
            console.error("Error fetching blog posts:", error);
            return [];
        }
    });

    eleventyConfig.addGlobalData('navLinks', async function() {
        try {
            const navLinks = await client.fetch(`
                *[_type == "navLink"]{
                    name,
                    url,
                    external,
                    order
                }
            `);

            // Sorteer op order
            navLinks.sort((a, b) => a.order - b.order);
    
            return navLinks;
        } catch (error) {
            console.error("Error fetching nav links:", error);
            return [];
        }
    });


    eleventyConfig.addPassthroughCopy("src/assets/");
    eleventyConfig.addPassthroughCopy("src/css/");
    
    eleventyConfig.addWatchTarget("src/css/");

    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: '_site',
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
    };
};
