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

  try {
    const result = await client.query(queryObject);

    return result;
  } catch (error) {
    console.error(error)
  } finally {
    await client.end();
  }

}

async function getVersion() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();

  try {
    const result = await client.query("SHOW server_version;");
    const server_version = result.rows[0].server_version;

    return server_version;
  } catch (error) {
    console.error(error)
  } finally{
    await client.end();
  }
}

async function getMaxConnections() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();

  try {
    const result = await client.query("SHOW max_connections;");
    const maxConnections = parseInt(result.rows[0].max_connections);

    return maxConnections;
  } catch (error) {
    console.error(error)
  } finally {
    await client.end();
  }
}

async function getOpenedConnections(databaseName) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  
  try {
  const result = await client.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });
  const openedConnections = result.rows[0].count;

  return openedConnections;
    
  } catch (error) {
    console.error(error)
  } finally {
  await client.end();
  }
}

export default {
  query: query,
  getVersion: getVersion,
  getMaxConnections: getMaxConnections,
  getOpenedConnections: getOpenedConnections,
};
