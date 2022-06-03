let homePage = () => {
  return new Promise(async (resolve, reject) => {
    try {
       resolve({
          data: 'Hello world'
        });
    } catch (error) {
       reject(error);
    }
});
}

module.exports = {
  homePage: homePage,
};
