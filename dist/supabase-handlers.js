/**
 * Supabase Handler Functions - Part 1
 * Database/PostgREST (30 tools) + Auth (25 tools) = 55 handlers
 */
// Helper function to format Supabase responses
function formatSupabaseResponse(result) {
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
// ============================================================
// DATABASE/POSTGREST HANDLERS (30 handlers)
// ============================================================
export async function supabaseDbSelect(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*' } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to select from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbSelectEq(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, value } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).eq(column, value);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to select from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbSelectNeq(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, value } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).neq(column, value);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to select from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbSelectGt(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, value } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).gt(column, value);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to select from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbSelectGte(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, value } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).gte(column, value);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to select from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbSelectLt(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, value } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).lt(column, value);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to select from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbSelectLte(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, value } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).lte(column, value);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to select from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbSelectLike(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, pattern } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).like(column, pattern);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to select from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbSelectIlike(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, pattern } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).ilike(column, pattern);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to select from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbSelectIn(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, values } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).in(column, values);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to select from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbOrder(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, ascending = true } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).order(column, { ascending });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to order ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbLimit(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', count } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).limit(count);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to limit ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbRange(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', from, to } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).range(from, to);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to range ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbSingle(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, value } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).eq(column, value).single();
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to get single from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbMaybeSingle(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, columns = '*', column, value } = args;
        const { data, error } = await this.supabaseClient.from(table).select(columns).eq(column, value).maybeSingle();
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to get maybe single from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbInsert(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, data } = args;
        const { data: result, error } = await this.supabaseClient.from(table).insert(data).select();
        if (error)
            throw error;
        return formatSupabaseResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to insert into ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbInsertMany(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, data } = args;
        const { data: result, error } = await this.supabaseClient.from(table).insert(data).select();
        if (error)
            throw error;
        return formatSupabaseResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to insert many into ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbUpsert(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, data, onConflict } = args;
        const query = this.supabaseClient.from(table).upsert(data);
        if (onConflict)
            query.onConflict(onConflict);
        const { data: result, error } = await query.select();
        if (error)
            throw error;
        return formatSupabaseResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to upsert into ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbUpdate(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, data, column, value } = args;
        const { data: result, error } = await this.supabaseClient.from(table).update(data).eq(column, value).select();
        if (error)
            throw error;
        return formatSupabaseResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to update ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbDelete(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { table, column, value } = args;
        const { data, error } = await this.supabaseClient.from(table).delete().eq(column, value).select();
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to delete from ${args.table}: ${error.message}`);
    }
}
export async function supabaseDbRpc(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { functionName, params = {} } = args;
        const { data, error } = await this.supabaseClient.rpc(functionName, params);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to call RPC ${args.functionName}: ${error.message}`);
    }
}
// ============================================================
// AUTH HANDLERS (25 handlers)
// ============================================================
export async function supabaseAuthSignUp(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { email, password, options } = args;
        const { data, error } = await this.supabaseClient.auth.signUp({ email, password, options });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to sign up: ${error.message}`);
    }
}
export async function supabaseAuthSignUpPhone(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { phone, password, options } = args;
        const { data, error } = await this.supabaseClient.auth.signUp({ phone, password, options });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to sign up with phone: ${error.message}`);
    }
}
export async function supabaseAuthSignUpOauth(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { provider, options } = args;
        const { data, error } = await this.supabaseClient.auth.signInWithOAuth({ provider, options });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to sign up with OAuth: ${error.message}`);
    }
}
export async function supabaseAuthSignInPassword(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { email, password } = args;
        const { data, error } = await this.supabaseClient.auth.signInWithPassword({ email, password });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to sign in: ${error.message}`);
    }
}
export async function supabaseAuthSignInPhone(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { phone, password } = args;
        const { data, error } = await this.supabaseClient.auth.signInWithPassword({ phone, password });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to sign in with phone: ${error.message}`);
    }
}
export async function supabaseAuthSignInOauth(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { provider, options } = args;
        const { data, error } = await this.supabaseClient.auth.signInWithOAuth({ provider, options });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to sign in with OAuth: ${error.message}`);
    }
}
export async function supabaseAuthSignInOtp(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { email, phone, options } = args;
        const { data, error } = await this.supabaseClient.auth.signInWithOtp({ email, phone, options });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to sign in with OTP: ${error.message}`);
    }
}
export async function supabaseAuthVerifyOtp(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { email, phone, token, type } = args;
        const { data, error } = await this.supabaseClient.auth.verifyOtp({ email, phone, token, type });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to verify OTP: ${error.message}`);
    }
}
export async function supabaseAuthSignOut(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { error } = await this.supabaseClient.auth.signOut();
        if (error)
            throw error;
        return formatSupabaseResponse({ success: true });
    }
    catch (error) {
        throw new Error(`Failed to sign out: ${error.message}`);
    }
}
export async function supabaseAuthGetSession(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { data, error } = await this.supabaseClient.auth.getSession();
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to get session: ${error.message}`);
    }
}
export async function supabaseAuthRefreshSession(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { refreshToken } = args;
        const { data, error } = await this.supabaseClient.auth.refreshSession({ refresh_token: refreshToken });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to refresh session: ${error.message}`);
    }
}
export async function supabaseAuthSetSession(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { accessToken, refreshToken } = args;
        const { data, error } = await this.supabaseClient.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to set session: ${error.message}`);
    }
}
export async function supabaseAuthGetUser(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { data, error } = await this.supabaseClient.auth.getUser();
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to get user: ${error.message}`);
    }
}
export async function supabaseAuthUpdateUser(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { attributes } = args;
        const { data, error } = await this.supabaseClient.auth.updateUser(attributes);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
}
export async function supabaseAuthDeleteUser(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { data, error } = await this.supabaseClient.auth.admin.deleteUser((await this.supabaseClient.auth.getUser()).data.user.id);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
}
export async function supabaseAuthResetPassword(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { email, options } = args;
        const { data, error } = await this.supabaseClient.auth.resetPasswordForEmail(email, options);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to reset password: ${error.message}`);
    }
}
export async function supabaseAuthAdminListUsers(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { page, perPage } = args;
        const { data, error } = await this.supabaseClient.auth.admin.listUsers({ page, perPage });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to list users: ${error.message}`);
    }
}
export async function supabaseAuthAdminGetUser(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { userId } = args;
        const { data, error } = await this.supabaseClient.auth.admin.getUserById(userId);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to get user: ${error.message}`);
    }
}
export async function supabaseAuthAdminCreateUser(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { email, password, emailConfirm, userMetadata } = args;
        const { data, error } = await this.supabaseClient.auth.admin.createUser({
            email,
            password,
            email_confirm: emailConfirm,
            user_metadata: userMetadata,
        });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
}
export async function supabaseAuthAdminUpdateUser(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { userId, attributes } = args;
        const { data, error } = await this.supabaseClient.auth.admin.updateUserById(userId, attributes);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
}
export async function supabaseAuthAdminDeleteUser(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { userId } = args;
        const { data, error } = await this.supabaseClient.auth.admin.deleteUser(userId);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
}
export async function supabaseAuthAdminInviteUser(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { email, options } = args;
        const { data, error } = await this.supabaseClient.auth.admin.inviteUserByEmail(email, options);
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to invite user: ${error.message}`);
    }
}
export async function supabaseAuthAdminGenerateLink(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { type, email, options } = args;
        const { data, error } = await this.supabaseClient.auth.admin.generateLink({ type, email, options });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to generate link: ${error.message}`);
    }
}
export async function supabaseAuthAdminUpdateUserMetadata(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { userId, userMetadata } = args;
        const { data, error } = await this.supabaseClient.auth.admin.updateUserById(userId, { user_metadata: userMetadata });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to update user metadata: ${error.message}`);
    }
}
export async function supabaseAuthAdminListFactors(args) {
    if (!this.supabaseClient)
        throw new Error('Supabase client not initialized');
    try {
        const { userId } = args;
        const { data, error } = await this.supabaseClient.auth.admin.listFactors({ userId });
        if (error)
            throw error;
        return formatSupabaseResponse(data);
    }
    catch (error) {
        throw new Error(`Failed to list factors: ${error.message}`);
    }
}
