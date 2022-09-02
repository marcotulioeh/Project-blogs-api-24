module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
  },
  {
    timestamps: false,
    tableName: 'PostCategories',
  });

  PostCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategories,
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategories,
      as: 'blogPost',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategories;
};