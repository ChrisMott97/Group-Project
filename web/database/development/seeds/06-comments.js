/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comments").del();
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");

  const comments_count = 10;

  let results = [];
  await knex("anomalies")
    .select()
    .orderByRaw("random()")
    .limit(comments_count)
    .then((rows) => {
      rows.forEach((row) => {
        res = {};
        res.anomaly_id = row.id;
        res.body = faker.lorem.paragraph(3);
        res.sensor_id = row.sensor_id;
        results.push(res);
      });
    });
  await knex("users")
    .select()
    .then((users) => {
      results.forEach((res) => {
        res.user_id = users[Math.floor(Math.random() * users.length)].id;
      });
    });
  await knex("comments").insert(results);
};
