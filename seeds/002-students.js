
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Matt', cohort_id: 1},
        { name: 'CJ',  cohort_id: 2},
        { name: 'Joe', cohort_id: 3}
      ]);
    });
};
