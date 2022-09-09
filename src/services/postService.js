const { BlogPost, Category, PostCategory, sequelize, User } = require('../database/models');
const { checkPost } = require('./validations');

module.exports = {
  create: async (userId, { title, content, categoryIds }) => {
    const validation = checkPost({ title, content, categoryIds });
    if (validation.code) return validation;

    const { data, code, message } = await sequelize.transaction(async (transaction) => {
      const { rows } = await Category.findAndCountAll({ where: { id: categoryIds } });
      if (rows.length < categoryIds.length) {
        return { code: 400, message: '"categoryIds" not found' };
      }

      const { dataValues } = await BlogPost.create(
        { title, content, userId },
        { transaction },
      );

      const postsCategories = categoryIds.map((number) => ({
        postId: dataValues.id, categoryId: number,
      }));

      await PostCategory.bulkCreate(postsCategories, { transaction });

      return { code: 201, data: dataValues };
    });

    return { data, code, message };
  },

  getAll: async () => {
    const posts = await BlogPost.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
        },
      ],
    });

    if (!posts) return { code: 404, message: 'Posts not found' };

    return { code: 200, data: posts };
  },
};