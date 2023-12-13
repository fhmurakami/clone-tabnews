import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();

  return result;
}

async function version() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  const result = await client.query(`SHOW server_version`);
  const server_version = result.rows[0].server_version;
  await client.end();

  return server_version;
}

async function max_connections() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  const result = await client.query(`SHOW max_connections`);
  const max_connections = result.rows[0].max_connections;
  await client.end();

  return max_connections;
}

async function opened_connections() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  const result = await client.query(
    `SELECT COUNT(*) FROM pg_stat_activity LIMIT 1`,
  );
  const opened_connections = result.rows[0].count;
  await client.end();

  return opened_connections;
}

export default {
  query: query,
  version: version,
  max_connections: max_connections,
  opened_connections: opened_connections,
};
