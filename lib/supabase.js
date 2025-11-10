/** SUPABASE Integration - Pure JavaScript */

async function supabaseFetch(credentials, path, options = {}) {
  const url = path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function dbSelect(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*' } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to select from ${args.table}: ${error.message}`);
  }
}

async function dbSelectEq(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, value } = args;
    const { data, error} = await this.supabaseClient.from(table).select(columns).eq(column, value);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to select from ${args.table}: ${error.message}`);
  }
}

async function dbSelectNeq(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, value } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).neq(column, value);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to select from ${args.table}: ${error.message}`);
  }
}

async function dbSelectGt(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, value } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).gt(column, value);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to select from ${args.table}: ${error.message}`);
  }
}

async function dbSelectGte(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, value } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).gte(column, value);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to select from ${args.table}: ${error.message}`);
  }
}

async function dbSelectLt(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, value } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).lt(column, value);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to select from ${args.table}: ${error.message}`);
  }
}

async function dbSelectLte(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, value } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).lte(column, value);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to select from ${args.table}: ${error.message}`);
  }
}

async function dbSelectLike(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, pattern } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).like(column, pattern);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to select from ${args.table}: ${error.message}`);
  }
}

async function dbSelectIlike(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, pattern } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).ilike(column, pattern);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to select from ${args.table}: ${error.message}`);
  }
}

async function dbSelectIn(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, values } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).in(column, values);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to select from ${args.table}: ${error.message}`);
  }
}

async function dbOrder(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, ascending = true } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).order(column, { ascending });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to order ${args.table}: ${error.message}`);
  }
}

async function dbLimit(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', count } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).limit(count);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to limit ${args.table}: ${error.message}`);
  }
}

async function dbRange(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', from, to } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).range(from, to);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to range ${args.table}: ${error.message}`);
  }
}

async function dbSingle(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, value } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).eq(column, value).single();
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to get single from ${args.table}: ${error.message}`);
  }
}

async function dbMaybeSingle(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, columns = '*', column, value } = args;
    const { data, error } = await this.supabaseClient.from(table).select(columns).eq(column, value).maybeSingle();
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to get maybe single from ${args.table}: ${error.message}`);
  }
}

async function dbInsert(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, data } = args;
    const { data: result, error } = await this.supabaseClient.from(table).insert(data).select();
    if (error) throw error;
    return formatSupabaseResponse(result);
  } catch (error) {
    throw new Error(`Failed to insert into ${args.table}: ${error.message}`);
  }
}

async function dbInsertMany(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, data } = args;
    const { data: result, error } = await this.supabaseClient.from(table).insert(data).select();
    if (error) throw error;
    return formatSupabaseResponse(result);
  } catch (error) {
    throw new Error(`Failed to insert many into ${args.table}: ${error.message}`);
  }
}

async function dbUpsert(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, data, onConflict } = args;
    const query = this.supabaseClient.from(table).upsert(data);
    if (onConflict) query.onConflict(onConflict);
    const { data: result, error } = await query.select();
    if (error) throw error;
    return formatSupabaseResponse(result);
  } catch (error) {
    throw new Error(`Failed to upsert into ${args.table}: ${error.message}`);
  }
}

async function dbUpdate(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, data, column, value } = args;
    const { data: result, error } = await this.supabaseClient.from(table).update(data).eq(column, value).select();
    if (error) throw error;
    return formatSupabaseResponse(result);
  } catch (error) {
    throw new Error(`Failed to update ${args.table}: ${error.message}`);
  }
}

async function dbDelete(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { table, column, value } = args;
    const { data, error } = await this.supabaseClient.from(table).delete().eq(column, value).select();
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to delete from ${args.table}: ${error.message}`);
  }
}

async function dbRpc(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { functionName, params = {} } = args;
    const { data, error } = await this.supabaseClient.rpc(functionName, params);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to call RPC ${args.functionName}: ${error.message}`);
  }
}

async function authSignUp(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { email, password, options } = args;
    const { data, error } = await this.supabaseClient.auth.signUp({ email, password, options });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to sign up: ${error.message}`);
  }
}

async function authSignUpPhone(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { phone, password, options } = args;
    const { data, error } = await this.supabaseClient.auth.signUp({ phone, password, options });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to sign up with phone: ${error.message}`);
  }
}

async function authSignUpOauth(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { provider, options } = args;
    const { data, error } = await this.supabaseClient.auth.signInWithOAuth({ provider, options });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to sign up with OAuth: ${error.message}`);
  }
}

async function authSignInPassword(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { email, password } = args;
    const { data, error } = await this.supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to sign in: ${error.message}`);
  }
}

async function authSignInPhone(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { phone, password } = args;
    const { data, error } = await this.supabaseClient.auth.signInWithPassword({ phone, password });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to sign in with phone: ${error.message}`);
  }
}

async function authSignInOauth(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { provider, options } = args;
    const { data, error } = await this.supabaseClient.auth.signInWithOAuth({ provider, options });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to sign in with OAuth: ${error.message}`);
  }
}

async function authSignInOtp(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { email, phone, options } = args;
    const { data, error } = await this.supabaseClient.auth.signInWithOtp({ email, phone, options });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to sign in with OTP: ${error.message}`);
  }
}

async function authVerifyOtp(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { email, phone, token, type } = args;
    const { data, error } = await this.supabaseClient.auth.verifyOtp({ email, phone, token, type });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to verify OTP: ${error.message}`);
  }
}

async function authSignOut(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { error } = await this.supabaseClient.auth.signOut();
    if (error) throw error;
    return formatSupabaseResponse({ success: true });
  } catch (error) {
    throw new Error(`Failed to sign out: ${error.message}`);
  }
}

async function authGetSession(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { data, error } = await this.supabaseClient.auth.getSession();
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to get session: ${error.message}`);
  }
}

async function authRefreshSession(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { refreshToken } = args;
    const { data, error } = await this.supabaseClient.auth.refreshSession({ refresh_token: refreshToken });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to refresh session: ${error.message}`);
  }
}

async function authSetSession(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { accessToken, refreshToken } = args;
    const { data, error } = await this.supabaseClient.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to set session: ${error.message}`);
  }
}

async function authGetUser(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { data, error } = await this.supabaseClient.auth.getUser();
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
}

async function authUpdateUser(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { attributes } = args;
    const { data, error } = await this.supabaseClient.auth.updateUser(attributes);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

async function authDeleteUser(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { data, error } = await this.supabaseClient.auth.admin.deleteUser((await this.supabaseClient.auth.getUser()).data.user.id);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

async function authResetPassword(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { email, options } = args;
    const { data, error } = await this.supabaseClient.auth.resetPasswordForEmail(email, options);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to reset password: ${error.message}`);
  }
}

async function authAdminListUsers(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { page, perPage } = args;
    const { data, error } = await this.supabaseClient.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to list users: ${error.message}`);
  }
}

async function authAdminGetUser(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { userId } = args;
    const { data, error } = await this.supabaseClient.auth.admin.getUserById(userId);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
}

async function authAdminCreateUser(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { email, password, emailConfirm, userMetadata } = args;
    const { data, error } = await this.supabaseClient.auth.admin.createUser({
      email,
      password,
      email_confirm: emailConfirm,
      user_metadata: userMetadata,
    });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

async function authAdminUpdateUser(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { userId, attributes } = args;
    const { data, error } = await this.supabaseClient.auth.admin.updateUserById(userId, attributes);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

async function authAdminDeleteUser(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { userId } = args;
    const { data, error } = await this.supabaseClient.auth.admin.deleteUser(userId);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

async function authAdminInviteUser(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { email, options } = args;
    const { data, error } = await this.supabaseClient.auth.admin.inviteUserByEmail(email, options);
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to invite user: ${error.message}`);
  }
}

async function authAdminGenerateLink(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { type, email, options } = args;
    const { data, error } = await this.supabaseClient.auth.admin.generateLink({ type, email, options });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to generate link: ${error.message}`);
  }
}

async function authAdminUpdateUserMetadata(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { userId, userMetadata } = args;
    const { data, error } = await this.supabaseClient.auth.admin.updateUserById(userId, { user_metadata: userMetadata });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to update user metadata: ${error.message}`);
  }
}

async function authAdminListFactors(credentials, args) {
  if (!this.supabaseClient) throw new Error('Supabase client not initialized');
  try {
    const { userId } = args;
    const { data, error } = await this.supabaseClient.auth.admin.listFactors({ userId });
    if (error) throw error;
    return formatSupabaseResponse(data);
  } catch (error) {
    throw new Error(`Failed to list factors: ${error.message}`);
  }
}

async function executeSupabaseTool(toolName, args, credentials) {
  const tools = {
    'supabase_dbSelect': dbSelect,
    'supabase_dbSelectEq': dbSelectEq,
    'supabase_dbSelectNeq': dbSelectNeq,
    'supabase_dbSelectGt': dbSelectGt,
    'supabase_dbSelectGte': dbSelectGte,
    'supabase_dbSelectLt': dbSelectLt,
    'supabase_dbSelectLte': dbSelectLte,
    'supabase_dbSelectLike': dbSelectLike,
    'supabase_dbSelectIlike': dbSelectIlike,
    'supabase_dbSelectIn': dbSelectIn,
    'supabase_dbOrder': dbOrder,
    'supabase_dbLimit': dbLimit,
    'supabase_dbRange': dbRange,
    'supabase_dbSingle': dbSingle,
    'supabase_dbMaybeSingle': dbMaybeSingle,
    'supabase_dbInsert': dbInsert,
    'supabase_dbInsertMany': dbInsertMany,
    'supabase_dbUpsert': dbUpsert,
    'supabase_dbUpdate': dbUpdate,
    'supabase_dbDelete': dbDelete,
    'supabase_dbRpc': dbRpc,
    'supabase_authSignUp': authSignUp,
    'supabase_authSignUpPhone': authSignUpPhone,
    'supabase_authSignUpOauth': authSignUpOauth,
    'supabase_authSignInPassword': authSignInPassword,
    'supabase_authSignInPhone': authSignInPhone,
    'supabase_authSignInOauth': authSignInOauth,
    'supabase_authSignInOtp': authSignInOtp,
    'supabase_authVerifyOtp': authVerifyOtp,
    'supabase_authSignOut': authSignOut,
    'supabase_authGetSession': authGetSession,
    'supabase_authRefreshSession': authRefreshSession,
    'supabase_authSetSession': authSetSession,
    'supabase_authGetUser': authGetUser,
    'supabase_authUpdateUser': authUpdateUser,
    'supabase_authDeleteUser': authDeleteUser,
    'supabase_authResetPassword': authResetPassword,
    'supabase_authAdminListUsers': authAdminListUsers,
    'supabase_authAdminGetUser': authAdminGetUser,
    'supabase_authAdminCreateUser': authAdminCreateUser,
    'supabase_authAdminUpdateUser': authAdminUpdateUser,
    'supabase_authAdminDeleteUser': authAdminDeleteUser,
    'supabase_authAdminInviteUser': authAdminInviteUser,
    'supabase_authAdminGenerateLink': authAdminGenerateLink,
    'supabase_authAdminUpdateUserMetadata': authAdminUpdateUserMetadata,
    'supabase_authAdminListFactors': authAdminListFactors,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeSupabaseTool };