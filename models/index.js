const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING
  },
  urlTitle: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
})

model.exports = {
  Page: Page,
  User: User
};

