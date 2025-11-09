/**
 * Neo4j Tools for Chris's Infrastructure
 *
 * 20 tools for Neo4j graph database operations via FastAPI Gateway
 */
export declare const neo4jTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            cypher: {
                type: string;
                description: string;
            };
            params: {
                type: string;
                description: string;
            };
            label?: undefined;
            properties?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            limit?: undefined;
            node_id?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            label: {
                type: string;
                description: string;
            };
            properties: {
                type: string;
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            limit?: undefined;
            node_id?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            from_node: {
                type: string;
                description: string;
            };
            to_node: {
                type: string;
                description: string;
            };
            relationship_type: {
                type: string;
                description: string;
            };
            properties: {
                type: string;
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            label?: undefined;
            pattern?: undefined;
            where?: undefined;
            limit?: undefined;
            node_id?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            pattern: {
                type: string;
                description: string;
            };
            where: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                default: number;
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            label?: undefined;
            properties?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            node_id?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            node_id: {
                type: string;
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            label?: undefined;
            properties?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            limit?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            node_id: {
                type: string;
                description: string;
            };
            properties: {
                type: string;
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            label?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            limit?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            node_id: {
                type: string;
                description: string;
            };
            detach: {
                type: string;
                default: boolean;
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            label?: undefined;
            properties?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            limit?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            label: {
                type: string;
                description: string;
            };
            properties: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                default: number;
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            node_id?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            from_node_id: {
                type: string;
                description: string;
            };
            to_node_id: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
                enum?: undefined;
            };
            properties: {
                type: string;
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            label?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            limit?: undefined;
            node_id?: undefined;
            detach?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            relationship_id: {
                type: string;
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            label?: undefined;
            properties?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            limit?: undefined;
            node_id?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            type: {
                type: string;
                description: string;
                enum?: undefined;
            };
            limit: {
                type: string;
                default: number;
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            label?: undefined;
            properties?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            node_id?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            pattern: {
                type: string;
                description: string;
            };
            where: {
                type: string;
                description: string;
            };
            return_clause: {
                type: string;
                default: string;
                description: string;
            };
            limit: {
                type: string;
                default: number;
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            label?: undefined;
            properties?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            node_id?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            relationship_id?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            from_node: {
                type: string;
                description: string;
            };
            to_node: {
                type: string;
                description: string;
            };
            max_depth: {
                type: string;
                default: number;
                description: string;
            };
            relationship_types: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            label?: undefined;
            properties?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            limit?: undefined;
            node_id?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            cypher?: undefined;
            params?: undefined;
            label?: undefined;
            properties?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            limit?: undefined;
            node_id?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            type?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
            constraint_name?: undefined;
            property?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            constraint_name: {
                type: string;
                description: string;
            };
            label: {
                type: string;
                description: string;
            };
            property: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                enum: string[];
                description: string;
            };
            cypher?: undefined;
            params?: undefined;
            properties?: undefined;
            from_node?: undefined;
            to_node?: undefined;
            relationship_type?: undefined;
            pattern?: undefined;
            where?: undefined;
            limit?: undefined;
            node_id?: undefined;
            detach?: undefined;
            from_node_id?: undefined;
            to_node_id?: undefined;
            relationship_id?: undefined;
            return_clause?: undefined;
            max_depth?: undefined;
            relationship_types?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=neo4j-tools.d.ts.map