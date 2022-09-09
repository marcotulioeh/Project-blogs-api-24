const { BlogPost, Category, PostCategory, sequelize } = require('../database/models');
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
};