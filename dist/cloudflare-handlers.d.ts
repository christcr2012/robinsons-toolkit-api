/**
 * Cloudflare Handler Functions Part 1
 * Zones (DNS & Domain Management) - 30 handlers
 *
 * Note: Cloudflare SDK uses a different pattern than other integrations.
 * The 'cloudflare' package exports a Cloudflare class that needs to be instantiated.
 * Handlers use this.cloudflareClient which is initialized in index.ts constructor.
 */
export declare function cloudflareListZones(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetZone(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateZone(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteZone(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflarePurgeCache(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListDnsRecords(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetDnsRecord(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateDnsRecord(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareUpdateDnsRecord(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteDnsRecord(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetZoneSettings(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareUpdateZoneSetting(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareGetSslSetting(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareUpdateSslSetting(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListFirewallRules(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreateFirewallRule(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareUpdateFirewallRule(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeleteFirewallRule(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareListPageRules(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareCreatePageRule(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareUpdatePageRule(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function cloudflareDeletePageRule(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=cloudflare-handlers.d.ts.map