/**
 * PostgreSQL Tools for Chris's Infrastructure
 *
 * 25 tools for PostgreSQL database operations via FastAPI Gateway
 */
export declare const postgresTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            sql: {
                type: string;
                description: string;
            };
            params: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            table: {
                type: string;
                description: string;
            };
            embedding: {
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
            threshold: {
                type: string;
                default: number;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            role: {
                type: string;
                enum: string[];
                description: string;
            };
            content: {
                type: string;
                description: string;
            };
            embedding: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            metadata: {
                type: string;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            limit?: undefined;
            threshold?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            user_id: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                default: number;
                description: string;
            };
            offset: {
                type: string;
                default: number;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            query_embedding: {
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
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            table: {
                type: string;
                description: string;
            };
            document_id: {
                type: string;
                description: string;
            };
            content: {
                type: string;
                description: string;
            };
            embedding: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            metadata: {
                type: string;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            table: {
                type: string;
                description: string;
            };
            query_embedding: {
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
            threshold: {
                type: string;
                default: number;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            embedding?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            table_name: {
                type: string;
                description: string;
            };
            schema: {
                type: string;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            table_name: {
                type: string;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            table_name: {
                type: string;
                description: string;
            };
            cascade: {
                type: string;
                default: boolean;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            schema?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            index_name: {
                type: string;
                description: string;
            };
            table_name: {
                type: string;
                description: string;
            };
            columns: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            unique: {
                type: string;
                default: boolean;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            schema?: undefined;
            cascade?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            table_name: {
                type: string;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            index_name: {
                type: string;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            isolation_level: {
                type: string;
                enum: string[];
                default: string;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            backup_name: {
                type: string;
                description: string;
            };
            tables: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            backup_name: {
                type: string;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            stat_type: {
                type: string;
                enum: string[];
                default: string;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            schema_name?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            schema_name: {
                type: string;
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            username?: undefined;
            password?: undefined;
            privileges?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            username: {
                type: string;
                description: string;
            };
            password: {
                type: string;
                description: string;
            };
            privileges: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            sql?: undefined;
            params?: undefined;
            table?: undefined;
            embedding?: undefined;
            limit?: undefined;
            threshold?: undefined;
            role?: undefined;
            content?: undefined;
            metadata?: undefined;
            user_id?: undefined;
            offset?: undefined;
            query_embedding?: undefined;
            document_id?: undefined;
            table_name?: undefined;
            schema?: undefined;
            cascade?: undefined;
            index_name?: undefined;
            columns?: undefined;
            unique?: undefined;
            isolation_level?: undefined;
            backup_name?: undefined;
            tables?: undefined;
            stat_type?: undefined;
            schema_name?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=postgres-tools.d.ts.map