const sqliteConnection = require('../../sqlite');

const createUsers = require('./createUsers');

async function migrationsRun() {
  const schemas = [
    createUsers
  ].join('');

  sqliteConnection()
    .then(db => db.exec(schemas))
    .then(() => console.log('Migrations run successfully!'))
    .catch(err => console.error(err))
}

module.exports = migrationsRun;
