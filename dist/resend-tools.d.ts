/**
 * Resend Tool Definitions
 * Email API for developers
 *
 * Categories:
 * - Emails: 10 tools
 * - Domains: 10 tools
 * - API Keys: 5 tools
 * - Contacts: 10 tools
 * - Audiences: 5 tools
 *
 * Total: 40 tools
 */
export declare const RESEND_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            from: {
                type: string;
                description: string;
            };
            to: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            subject: {
                type: string;
                description: string;
            };
            html: {
                type: string;
                description: string;
            };
            text: {
                type: string;
                description: string;
            };
            cc: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            bcc: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            replyTo: {
                type: string;
                description: string;
            };
            attachments: {
                type: string;
                description: string;
            };
            tags: {
                type: string;
                description: string;
            };
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            emailId: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            limit: {
                type: string;
                description: string;
            };
            offset: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            emails: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            from: {
                type: string;
                description: string;
            };
            to: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            subject: {
                type: string;
                description: string;
            };
            html: {
                type: string;
                description: string;
            };
            scheduledAt: {
                type: string;
                description: string;
            };
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            emailId: {
                type: string;
                description: string;
            };
            to: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            from?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            startDate: {
                type: string;
                description: string;
            };
            endDate: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            email: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            domainId: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            region: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            domainId: {
                type: string;
                description: string;
            };
            trackOpens: {
                type: string;
                description: string;
            };
            trackClicks: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            name?: undefined;
            region?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            domainId: {
                type: string;
                description: string;
            };
            startDate: {
                type: string;
                description: string;
            };
            endDate: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            email?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            domainId: {
                type: string;
                description: string;
            };
            to: {
                type: string;
                description: string;
                items?: undefined;
            };
            from?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            permission: {
                type: string;
                description: string;
            };
            domainId: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            apiKeyId: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            apiKeyId: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            audienceId: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            contactId: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            email: {
                type: string;
                description: string;
            };
            firstName: {
                type: string;
                description: string;
            };
            lastName: {
                type: string;
                description: string;
            };
            audienceId: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            contactId?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            contactId: {
                type: string;
                description: string;
            };
            firstName: {
                type: string;
                description: string;
            };
            lastName: {
                type: string;
                description: string;
            };
            unsubscribed: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            audienceId: {
                type: string;
                description: string;
            };
            contacts: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            audienceId: {
                type: string;
                description: string;
            };
            format: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            query: {
                type: string;
                description: string;
            };
            audienceId: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            audienceId: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            name?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            subject?: undefined;
            html?: undefined;
            text?: undefined;
            cc?: undefined;
            bcc?: undefined;
            replyTo?: undefined;
            attachments?: undefined;
            tags?: undefined;
            emailId?: undefined;
            limit?: undefined;
            offset?: undefined;
            emails?: undefined;
            scheduledAt?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            email?: undefined;
            domainId?: undefined;
            region?: undefined;
            trackOpens?: undefined;
            trackClicks?: undefined;
            permission?: undefined;
            apiKeyId?: undefined;
            audienceId?: undefined;
            contactId?: undefined;
            firstName?: undefined;
            lastName?: undefined;
            unsubscribed?: undefined;
            contacts?: undefined;
            format?: undefined;
            query?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=resend-tools.d.ts.map