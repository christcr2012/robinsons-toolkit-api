/**
 * Qdrant Tools for Chris's Infrastructure
 *
 * 15 tools for Qdrant vector search operations via FastAPI Gateway
 */
export declare const qdrantTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            collection_name: {
                type: string;
                description: string;
            };
            vector_size: {
                type: string;
                description: string;
            };
            distance: {
                type: string;
                enum: string[];
                default: string;
                description: string;
            };
            optimizers_config?: undefined;
            query_vector?: undefined;
            limit?: undefined;
            score_threshold?: undefined;
            filter?: undefined;
            query_vectors?: undefined;
            point_id?: undefined;
            vector?: undefined;
            payload?: undefined;
            points?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            collection_name?: undefined;
            vector_size?: undefined;
            distance?: undefined;
            optimizers_config?: undefined;
            query_vector?: undefined;
            limit?: undefined;
            score_threshold?: undefined;
            filter?: undefined;
            query_vectors?: undefined;
            point_id?: undefined;
            vector?: undefined;
            payload?: undefined;
            points?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            collection_name: {
                type: string;
                description: string;
            };
            vector_size?: undefined;
            distance?: undefined;
            optimizers_config?: undefined;
            query_vector?: undefined;
            limit?: undefined;
            score_threshold?: undefined;
            filter?: undefined;
            query_vectors?: undefined;
            point_id?: undefined;
            vector?: undefined;
            payload?: undefined;
            points?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            collection_name: {
                type: string;
                description: string;
            };
            optimizers_config: {
                type: string;
                description: string;
            };
            vector_size?: undefined;
            distance?: undefined;
            query_vector?: undefined;
            limit?: undefined;
            score_threshold?: undefined;
            filter?: undefined;
            query_vectors?: undefined;
            point_id?: undefined;
            vector?: undefined;
            payload?: undefined;
            points?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            collection_name: {
                type: string;
                description: string;
            };
            query_vector: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            limit: {
                type: string;
                default: number;
                description: string;
            };
            score_threshold: {
                type: string;
                description: string;
            };
            filter: {
                type: string;
                description: string;
            };
            vector_size?: undefined;
            distance?: undefined;
            optimizers_config?: undefined;
            query_vectors?: undefined;
            point_id?: undefined;
            vector?: undefined;
            payload?: undefined;
            points?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            collection_name: {
                type: string;
                description: string;
            };
            query_vectors: {
                type: string;
                items: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                description: string;
            };
            limit: {
                type: string;
                default: number;
                description: string;
            };
            vector_size?: undefined;
            distance?: undefined;
            optimizers_config?: undefined;
            query_vector?: undefined;
            score_threshold?: undefined;
            filter?: undefined;
            point_id?: undefined;
            vector?: undefined;
            payload?: undefined;
            points?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            collection_name: {
                type: string;
                description: string;
            };
            point_id: {
                type: string;
                description: string;
            };
            vector: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            payload: {
                type: string;
                description: string;
            };
            vector_size?: undefined;
            distance?: undefined;
            optimizers_config?: undefined;
            query_vector?: undefined;
            limit?: undefined;
            score_threshold?: undefined;
            filter?: undefined;
            query_vectors?: undefined;
            points?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            collection_name: {
                type: string;
                description: string;
            };
            point_id: {
                type: string;
                description: string;
            };
            vector_size?: undefined;
            distance?: undefined;
            optimizers_config?: undefined;
            query_vector?: undefined;
            limit?: undefined;
            score_threshold?: undefined;
            filter?: undefined;
            query_vectors?: undefined;
            vector?: undefined;
            payload?: undefined;
            points?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            collection_name: {
                type: string;
                description: string;
            };
            filter: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                default: number;
                description: string;
            };
            vector_size?: undefined;
            distance?: undefined;
            optimizers_config?: undefined;
            query_vector?: undefined;
            score_threshold?: undefined;
            query_vectors?: undefined;
            point_id?: undefined;
            vector?: undefined;
            payload?: undefined;
            points?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            collection_name: {
                type: string;
                description: string;
            };
            points: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                        };
                        vector: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        payload: {
                            type: string;
                        };
                    };
                };
                description: string;
            };
            vector_size?: undefined;
            distance?: undefined;
            optimizers_config?: undefined;
            query_vector?: undefined;
            limit?: undefined;
            score_threshold?: undefined;
            filter?: undefined;
            query_vectors?: undefined;
            point_id?: undefined;
            vector?: undefined;
            payload?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=qdrant-tools.d.ts.map