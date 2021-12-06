const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Blog = sequelize.define("Expblog", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    snippet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    thumbnailName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  return Blog;
};
