const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");

//to turn off logging, add 'logging: false' condition to new Sequelize instance

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle;
    }
  }
}, {
  hooks: {
    beforeValidate: (page, urlTitle) => {
      page.urlTitle = createUrl(this.title);
    }
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  }
})


module.exports = {
  Page: Page,
  User: User,
  db: db
};


function createUrl(title){
      if (title) {
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        return Math.random().toString(36).substring(2, 7);
      }
}

// db.sync()
//   .then(() => User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   }))
//   .then(jane => {
//     console.log(jane.get({
//       plain: true
//     }));
//   });
