/**
 * Supabase Handler Functions - Part 1
 * Database/PostgREST (30 tools) + Auth (25 tools) = 55 handlers
 */
export declare function supabaseDbSelect(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbSelectEq(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbSelectNeq(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbSelectGt(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbSelectGte(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbSelectLt(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbSelectLte(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbSelectLike(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbSelectIlike(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbSelectIn(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbOrder(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbLimit(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbRange(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbSingle(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbMaybeSingle(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbInsert(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbInsertMany(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbUpsert(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbUpdate(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbDelete(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseDbRpc(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthSignUp(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthSignUpPhone(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthSignUpOauth(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthSignInPassword(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthSignInPhone(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthSignInOauth(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthSignInOtp(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthVerifyOtp(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthSignOut(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthGetSession(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthRefreshSession(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthSetSession(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthGetUser(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthUpdateUser(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthDeleteUser(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthResetPassword(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthAdminListUsers(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthAdminGetUser(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthAdminCreateUser(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthAdminUpdateUser(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthAdminDeleteUser(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthAdminInviteUser(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthAdminGenerateLink(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthAdminUpdateUserMetadata(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function supabaseAuthAdminListFactors(this: any, args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=supabase-handlers.d.ts.map