export const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatis(401);
};
