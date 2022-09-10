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

  findById: rescue(async (req, res, next) => {
    const { id } = req.params;
    const { data, code, message } = await postService.findById(id);
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }),

  update: rescue(async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.user;
    const { title, content } = req.body;
    const { data, code, message } = await postService.update(id, userId, {
      title, content,
    });
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }),

  delete: rescue(async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.user;
    const { code, message } = await postService.delete(id, userId);

    if (message) return next({ code, message });

    return res.status(code).end();
  }),
};