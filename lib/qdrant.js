/** QDRANT Integration - Pure JavaScript */

async function qdrantFetch(credentials, path, options = {}) {
  const url = path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function handleQdrantCollectionCreate(credentials, args) {
  const { collection_name, vector_size, distance = 'Cosine' } = args;
  return await fastAPIClient.qdrantCreateCollection(collection_name, vector_size, distance);
}

async function handleQdrantCollectionList(credentials, args) {
  return await fastAPIClient.qdrantListCollections();
}

async function handleQdrantCollectionGet(credentials, args) {
  const { collection_name } = args;
  return await fastAPIClient.qdrantGetCollection(collection_name);
}

async function handleQdrantCollectionDelete(credentials, args) {
  const { collection_name } = args;
  return await fastAPIClient.qdrantDeleteCollection(collection_name);
}

async function handleQdrantCollectionUpdate(credentials, args) {
  const { collection_name, optimizers_config } = args;
  
  return await fastAPIClient.request(`/qdrant/collections/${collection_name}`, {
    method: 'PATCH',
    body: JSON.stringify({
      optimizers_config,
    }),
  });
}

async function handleQdrantSearchSemantic(credentials, args) {
  const { collection_name, query_vector, limit = 5, score_threshold, filter } = args;
  
  return await fastAPIClient.qdrantSearch(
    collection_name,
    query_vector,
    limit,
    score_threshold
  );
}

async function handleQdrantSearchBatch(credentials, args) {
  const { collection_name, query_vectors, limit = 5 } = args;
  
  const searches = query_vectors.map((vector[]) => ({
    vector,
    limit,
  }));
  
  return await fastAPIClient.request(`/qdrant/collections/${collection_name}/points/search/batch`, {
    method: 'POST',
    body: JSON.stringify({ searches }),
  });
}

async function handleQdrantPointUpsert(credentials, args) {
  const { collection_name, point_id, vector, payload = {} } = args;
  
  const point = {
    id: point_id,
    vector,
    payload,
  };
  
  return await fastAPIClient.qdrantUpsertPoints(collection_name, [point]);
}

async function handleQdrantPointGet(credentials, args) {
  const { collection_name, point_id } = args;
  
  return await fastAPIClient.request(`/qdrant/collections/${collection_name}/points/${point_id}`, {
    method: 'GET',
  });
}

async function handleQdrantPointDelete(credentials, args) {
  const { collection_name, point_id } = args;
  
  return await fastAPIClient.request(`/qdrant/collections/${collection_name}/points/delete`, {
    method: 'POST',
    body: JSON.stringify({
      points: [point_id],
    }),
  });
}

async function handleQdrantPointSearch(credentials, args) {
  const { collection_name, filter, limit = 10 } = args;
  
  return await fastAPIClient.request(`/qdrant/collections/${collection_name}/points/scroll`, {
    method: 'POST',
    body: JSON.stringify({
      filter,
      limit,
    }),
  });
}

async function handleQdrantPointsBatchUpsert(credentials, args) {
  const { collection_name, points } = args;
  return await fastAPIClient.qdrantUpsertPoints(collection_name, points);
}

async function handleQdrantSnapshotCreate(credentials, args) {
  const { collection_name } = args;
  
  return await fastAPIClient.request(`/qdrant/collections/${collection_name}/snapshots`, {
    method: 'POST',
  });
}

async function handleQdrantSnapshotList(credentials, args) {
  const { collection_name } = args;
  
  return await fastAPIClient.request(`/qdrant/collections/${collection_name}/snapshots`, {
    method: 'GET',
  });
}

async function handleQdrantConnectionTest(credentials, args) {
  try {
    const result = await fastAPIClient.qdrantListCollections();
    return {
      success: true,
      message: 'Connection successful',
      collections: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Connection failed',
    };
  }
}

async function executeQdrantTool(toolName, args, credentials) {
  const tools = {
    'qdrant_handleQdrantCollectionCreate': handleQdrantCollectionCreate,
    'qdrant_handleQdrantCollectionList': handleQdrantCollectionList,
    'qdrant_handleQdrantCollectionGet': handleQdrantCollectionGet,
    'qdrant_handleQdrantCollectionDelete': handleQdrantCollectionDelete,
    'qdrant_handleQdrantCollectionUpdate': handleQdrantCollectionUpdate,
    'qdrant_handleQdrantSearchSemantic': handleQdrantSearchSemantic,
    'qdrant_handleQdrantSearchBatch': handleQdrantSearchBatch,
    'qdrant_handleQdrantPointUpsert': handleQdrantPointUpsert,
    'qdrant_handleQdrantPointGet': handleQdrantPointGet,
    'qdrant_handleQdrantPointDelete': handleQdrantPointDelete,
    'qdrant_handleQdrantPointSearch': handleQdrantPointSearch,
    'qdrant_handleQdrantPointsBatchUpsert': handleQdrantPointsBatchUpsert,
    'qdrant_handleQdrantSnapshotCreate': handleQdrantSnapshotCreate,
    'qdrant_handleQdrantSnapshotList': handleQdrantSnapshotList,
    'qdrant_handleQdrantConnectionTest': handleQdrantConnectionTest,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeQdrantTool };