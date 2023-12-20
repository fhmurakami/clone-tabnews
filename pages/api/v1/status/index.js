import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const postgresVersion = await database.getVersion();
  const maxConnections = await database.getMaxConnections();
  const openedConnections = await database.getOpenedConnections(process.env.POSTGRES_DB);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersion,
        max_connections: maxConnections,
        opened_connections: openedConnections,
      },
    },
  });
}

export default status;
