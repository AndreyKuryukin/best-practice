
module.exports = function echo(content, config, take) {
    if (config.timeout) {
       setTimeout(() => {
           take(content)
       }, config.timeout)
    } else {
        take(content)
    }
};