
module.exports = function uppercase(content, config, take) {
    if (typeof content === 'string') {
        take(content.toUpperCase())
    } else {
        take('not a string!!!')
    }
};