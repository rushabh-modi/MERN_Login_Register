const User = require('../model/User');
const jwt = require('jsonwebtoken');

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403).json({ message: 'forbidden' }); //forbidden
  // evaluate jwt

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.status(403).json({ message: 'Forbidden' });

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { username: decoded.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    );

    res.json({ roles, accessToken });
  });
};

module.exports = { handleRefreshToken };
