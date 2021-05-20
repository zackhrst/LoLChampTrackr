module.exports = (sequelize, Sequelize) => {
  const Champion = sequelize.define("champion", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    owned: {
      type: Sequelize.BOOLEAN
    }
  });

  return Champion;
};