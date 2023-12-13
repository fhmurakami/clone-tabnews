import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const postgresVersion = await database.version();
  const maxConnections = await database.max_connections();
  const openedConnections = await database.opened_connections();

  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: postgresVersion,
    max_connections: maxConnections,
    opened_connections: openedConnections,
  });
}

export default status;
