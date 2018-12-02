"use strict";

const table = 'packages';

export const up = async (knex, Promise) => {
    return Promise.all(
        [
            knex.schema.createTable(
                table,
                t => {
                    t.increments();
                    t.string('tracking_id');
                }
            ),
        ]
    );
};

export const down = async (knex, Promise) => {
    return Promise.all(
        [
            knex.schema.dropTable(table),
        ]
    );
};
