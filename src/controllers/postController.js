const rescue = require('express-rescue');
const { postService } = require('../services');

module.exports = {
  create: rescue(async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    const { userId } = req.user;
    const { data, code, message } = await postService.create(userId, {
      title, content, categoryIds,
    });

    if (message) return next({ code, message });

    return res.status(code).json(data);
  }),

  getAll: rescue(async (_req, res, next) => {
    const { data, code, message } = await postService.getAll();

    if (message) return next({ code, message });

    return res.status(code).json(data);
  }),
};