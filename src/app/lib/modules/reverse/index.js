
module.exports = function reverse(content, config, take) {
    if (typeof content === 'string') {
        take(content.split("").reverse().join(""))
    } else {
        take('NOT A STRING !!!')
    }
};