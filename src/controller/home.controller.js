import homeService from '../service/home.service';


let homePage = async (req, res) => {
  try {
     let data = await homeService.homePage();
     return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

module.exports = {
  homePage: homePage,
};
