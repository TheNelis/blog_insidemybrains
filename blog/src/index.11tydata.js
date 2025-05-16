module.exports = (data) => {
    const blogPosts = data.blogPosts || [];
  
    if (blogPosts.length === 0) {
      return {
        layout: "layouts/base.html",
        title: "Inside My Brains",
        permalink: "/",
      };
    }
  
    return {
      layout: "layouts/base.html",
      title: "Inside My Brains",
      pagination: {
        data: "blogPosts",  // let op, dit is de global data key
        size: 5,
        alias: "post",
        permalink: ({ pagination }) =>
          pagination.pageNumber === 0 ? "/" : `/page/${pagination.pageNumber}/`,
      },
    };
};
  