"use strict";

import { withDB } from "../lib/database";

export const handler = async (event, context) => {
    try
    {
       return withDB((event, context) =>
        {
            return {
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
        });
    } catch (err) { console.log(err); console.error(err)}
};
