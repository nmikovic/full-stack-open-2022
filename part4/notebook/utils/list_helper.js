const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((sum, item) => {return sum + item.likes}, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0
        ? {}
        : blogs.reduce((maxBlog, blog) => {
        return blog.likes > maxBlog.likes ? blog : maxBlog
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    const grouped = _(blogs)
        .countBy('author')
        .map((counter, author) => ({author, blogs: counter}))
        .maxBy('blogs')

    return grouped ? grouped : {}
}

const mostLikes = (blogs) => {
    const grouped = _(blogs)
        .groupBy('author')
        .map((blogs, author) => ({
            author,
            likes: _.sumBy(blogs, 'likes')}))
        .maxBy('likes')
    return grouped ? grouped : {}
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}