const User = require('../model/User');

const handleLogout = async (req, res) => {
  // on clientside also delete access token

  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(204).json({ message: 'No cookies found' }); //no content

  const refreshToken = cookies.jwt;

  //is refreshtoken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    return res.status(204).json({ message: 'cookie cleared' });
  }

  // delere refreshToken in db
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  }); //secure: true on https
  res.status(204).json({ message: 'You are logged out.' });
};

module.exports = { handleLogout };
