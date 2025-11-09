"use strict";
/**
 * Qdrant Handlers for Chris's Infrastructure
 *
 * Handler functions for all 15 Qdrant tools
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleQdrantCollectionCreate = handleQdrantCollectionCreate;
exports.handleQdrantCollectionList = handleQdrantCollectionList;
exports.handleQdrantCollectionGet = handleQdrantCollectionGet;
exports.handleQdrantCollectionDelete = handleQdrantCollectionDelete;
exports.handleQdrantCollectionUpdate = handleQdrantCollectionUpdate;
exports.handleQdrantSearchSemantic = handleQdrantSearchSemantic;
exports.handleQdrantSearchBatch = handleQdrantSearchBatch;
exports.handleQdrantPointUpsert = handleQdrantPointUpsert;
exports.handleQdrantPointGet = handleQdrantPointGet;
exports.handleQdrantPointDelete = handleQdrantPointDelete;
exports.handleQdrantPointSearch = handleQdrantPointSearch;
exports.handleQdrantPointsBatchUpsert = handleQdrantPointsBatchUpsert;
exports.handleQdrantSnapshotCreate = handleQdrantSnapshotCreate;
exports.handleQdrantSnapshotList = handleQdrantSnapshotList;
exports.handleQdrantConnectionTest = handleQdrantConnectionTest;
const fastapi_client_js_1 = require("./fastapi-client.js");
// ============================================================================
// Collection Management
// ============================================================================
async function handleQdrantCollectionCreate(args) {
    const { collection_name, vector_size, distance = 'Cosine' } = args;
    return await fastapi_client_js_1.fastAPIClient.qdrantCreateCollection(collection_name, vector_size, distance);
}
async function handleQdrantCollectionList(args) {
    return await fastapi_client_js_1.fastAPIClient.qdrantListCollections();
}
async function handleQdrantCollectionGet(args) {
    const { collection_name } = args;
    return await fastapi_client_js_1.fastAPIClient.qdrantGetCollection(collection_name);
}
async function handleQdrantCollectionDelete(args) {
    const { collection_name } = args;
    return await fastapi_client_js_1.fastAPIClient.qdrantDeleteCollection(collection_name);
}
async function handleQdrantCollectionUpdate(args) {
    const { collection_name, optimizers_config } = args;
    return await fastapi_client_js_1.fastAPIClient.request(`/qdrant/collections/${collection_name}`, {
        method: 'PATCH',
        body: JSON.stringify({
            optimizers_config,
        }),
    });
}
// ============================================================================
// Search Operations
// ============================================================================
async function handleQdrantSearchSemantic(args) {
    const { collection_name, query_vector, limit = 5, score_threshold, filter } = args;
    return await fastapi_client_js_1.fastAPIClient.qdrantSearch(collection_name, query_vector, limit, score_threshold);
}
async function handleQdrantSearchBatch(args) {
    const { collection_name, query_vectors, limit = 5 } = args;
    const searches = query_vectors.map((vector) => ({
        vector,
        limit,
    }));
    return await fastapi_client_js_1.fastAPIClient.request(`/qdrant/collections/${collection_name}/points/search/batch`, {
        method: 'POST',
        body: JSON.stringify({ searches }),
    });
}
// ============================================================================
// Point Operations
// ============================================================================
async function handleQdrantPointUpsert(args) {
    const { collection_name, point_id, vector, payload = {} } = args;
    const point = {
        id: point_id,
        vector,
        payload,
    };
    return await fastapi_client_js_1.fastAPIClient.qdrantUpsertPoints(collection_name, [point]);
}
async function handleQdrantPointGet(args) {
    const { collection_name, point_id } = args;
    return await fastapi_client_js_1.fastAPIClient.request(`/qdrant/collections/${collection_name}/points/${point_id}`, {
        method: 'GET',
    });
}
async function handleQdrantPointDelete(args) {
    const { collection_name, point_id } = args;
    return await fastapi_client_js_1.fastAPIClient.request(`/qdrant/collections/${collection_name}/points/delete`, {
        method: 'POST',
        body: JSON.stringify({
            points: [point_id],
        }),
    });
}
async function handleQdrantPointSearch(args) {
    const { collection_name, filter, limit = 10 } = args;
    return await fastapi_client_js_1.fastAPIClient.request(`/qdrant/collections/${collection_name}/points/scroll`, {
        method: 'POST',
        body: JSON.stringify({
            filter,
            limit,
        }),
    });
}
async function handleQdrantPointsBatchUpsert(args) {
    const { collection_name, points } = args;
    return await fastapi_client_js_1.fastAPIClient.qdrantUpsertPoints(collection_name, points);
}
// ============================================================================
// Snapshot & Admin
// ============================================================================
async function handleQdrantSnapshotCreate(args) {
    const { collection_name } = args;
    return await fastapi_client_js_1.fastAPIClient.request(`/qdrant/collections/${collection_name}/snapshots`, {
        method: 'POST',
    });
}
async function handleQdrantSnapshotList(args) {
    const { collection_name } = args;
    return await fastapi_client_js_1.fastAPIClient.request(`/qdrant/collections/${collection_name}/snapshots`, {
        method: 'GET',
    });
}
async function handleQdrantConnectionTest(args) {
    try {
        const result = await fastapi_client_js_1.fastAPIClient.qdrantListCollections();
        return {
            success: true,
            message: 'Connection successful',
            collections: result,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Connection failed',
        };
    }
}
