"use strict";

import * as Knex from 'knex';

const knex_config = {
    client: process.env.DATABASE_TYPE,
    connection: {
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        database: process.env.DATABASE_NAME,
    },
};

const knex = Knex(knex_config);

// This will run once when the Lambda container starts
const migrations = knex.migrate.latest()
    .then(
        function ()
        {
            console.log("Migrations complete");
        }
    ).catch(
        (err) => {
            console.log("Error running migrations: ", err);
        }
    );

const DB_OUT_OF_SYNC = "Database out of sync with Lambda function";

export const withDB = (f) => {
    // make sure migrations finished if they happened at all
    return migrations.then(() => {
        // start a transaction
        return knex.transaction((trx) => {
            // check to see if our database is in the state we expect
            return trx.migrate.status().then((status) => {
                if (status === 0) {
                    // we're good to go!
                    return f(trx);
                } else {
                    // bail out, we're likely being replaced by a newer Lambda function
                    throw DB_OUT_OF_SYNC;
                }
            });
        });
    });
};
