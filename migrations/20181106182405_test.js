
exports.up = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.createTable(
                'packages',
                function (table)
                {
                    table.increments();
                    table.string('tracking_id');
                }
            ),
        ]
    );
};

exports.down = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.dropTable('packages'),
        ]
    );
};
