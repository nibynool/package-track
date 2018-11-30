'use strict';

import { withDB } from '../database';

module.exports.handler = async (event, context) => {
    return  {
        statusCode: 200,
        body: JSON.stringify(
            {
                client: process.env.DATABASE_TYPE,
                connection: {
                    user: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    host: process.env.DATABASE_HOST,
                    port: parseInt(process.env.DATABASE_PORT),
                    database: process.env.DATABASE_NAME,
                },
                input: event,
            }
        ),
    };
};
