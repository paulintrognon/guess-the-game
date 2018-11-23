const userManager = require('../managers/userManager');
const cloudinaryService = require('../services/cloudinaryService');

module.exports = {
  getScores,
  getUser,
  getSolvedScreenshots,
  getAddedScreenshots,
};

async function getScores() {
  const userScores = await userManager.getScores();
  return userScores.map(userScore => ({
    id: userScore.id,
    username: userScore.username,
    nbSolvedScreenshots: userScore.solvedScreenshots,
    nbAddedScreenshots: userScore.addedScreenshots,
    completeness: userScore.completeness,
  }));
}

async function getUser(req) {
  const { username } = req.user;
  const user = await userManager.get(username);
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    nbSolvedScreenshots: user.solvedScreenshots,
    nbAddedScreenshots: user.addedScreenshots,
  };
}

async function getSolvedScreenshots(req) {
  const { id } = req.user;
  const screenshots = await userManager.getSolvedScreenshots(id);
  return screenshots.map(screenshot => ({
    ...screenshot,
    imageUrl: cloudinaryService.pathToUrl(screenshot.imagePath),
  }));
}

async function getAddedScreenshots(req) {
  const { id } = req.user;
  const screenshots = await userManager.getAddedScreenshots(id);
  return screenshots.map(screenshot => ({
    ...screenshot,
    imageUrl: cloudinaryService.pathToUrl(screenshot.imagePath),
  }));
}
