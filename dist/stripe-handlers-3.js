// Stripe Handler Methods Part 3 - Connect and Other
// These methods will be added to the UnifiedToolkit class
// Helper function to format Stripe responses
function formatStripeResponse(result) {
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
// ============================================================
// CONNECT HANDLERS (20 handlers)
// ============================================================
// ACCOUNTS (5 handlers)
export async function stripeAccountCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const account = await this.stripeClient.accounts.create(args);
        return formatStripeResponse(account);
    }
    catch (error) {
        throw new Error(`Failed to create account: ${error.message}`);
    }
}
export async function stripeAccountRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const account = args.account_id
            ? await this.stripeClient.accounts.retrieve(args.account_id)
            : await this.stripeClient.accounts.retrieve();
        return formatStripeResponse(account);
    }
    catch (error) {
        throw new Error(`Failed to retrieve account: ${error.message}`);
    }
}
export async function stripeAccountUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { account_id, ...updateData } = args;
        const account = account_id
            ? await this.stripeClient.accounts.update(account_id, updateData)
            : await this.stripeClient.accounts.update(updateData);
        return formatStripeResponse(account);
    }
    catch (error) {
        throw new Error(`Failed to update account: ${error.message}`);
    }
}
export async function stripeAccountDelete(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const result = await this.stripeClient.accounts.del(args.account_id);
        return formatStripeResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to delete account: ${error.message}`);
    }
}
export async function stripeAccountList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const accounts = await this.stripeClient.accounts.list(args);
        return formatStripeResponse(accounts);
    }
    catch (error) {
        throw new Error(`Failed to list accounts: ${error.message}`);
    }
}
// TRANSFERS (5 handlers)
export async function stripeTransferCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const transfer = await this.stripeClient.transfers.create(args);
        return formatStripeResponse(transfer);
    }
    catch (error) {
        throw new Error(`Failed to create transfer: ${error.message}`);
    }
}
export async function stripeTransferRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const transfer = await this.stripeClient.transfers.retrieve(args.transfer_id);
        return formatStripeResponse(transfer);
    }
    catch (error) {
        throw new Error(`Failed to retrieve transfer: ${error.message}`);
    }
}
export async function stripeTransferUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { transfer_id, ...updateData } = args;
        const transfer = await this.stripeClient.transfers.update(transfer_id, updateData);
        return formatStripeResponse(transfer);
    }
    catch (error) {
        throw new Error(`Failed to update transfer: ${error.message}`);
    }
}
export async function stripeTransferReverse(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { transfer_id, ...reverseData } = args;
        const reversal = await this.stripeClient.transfers.createReversal(transfer_id, reverseData);
        return formatStripeResponse(reversal);
    }
    catch (error) {
        throw new Error(`Failed to reverse transfer: ${error.message}`);
    }
}
export async function stripeTransferList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const transfers = await this.stripeClient.transfers.list(args);
        return formatStripeResponse(transfers);
    }
    catch (error) {
        throw new Error(`Failed to list transfers: ${error.message}`);
    }
}
// APPLICATION FEES (3 handlers)
export async function stripeApplicationFeeRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const fee = await this.stripeClient.applicationFees.retrieve(args.fee_id);
        return formatStripeResponse(fee);
    }
    catch (error) {
        throw new Error(`Failed to retrieve application fee: ${error.message}`);
    }
}
export async function stripeApplicationFeeRefund(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { fee_id, ...refundData } = args;
        const refund = await this.stripeClient.applicationFees.createRefund(fee_id, refundData);
        return formatStripeResponse(refund);
    }
    catch (error) {
        throw new Error(`Failed to refund application fee: ${error.message}`);
    }
}
export async function stripeApplicationFeeList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const fees = await this.stripeClient.applicationFees.list(args);
        return formatStripeResponse(fees);
    }
    catch (error) {
        throw new Error(`Failed to list application fees: ${error.message}`);
    }
}
// CAPABILITIES (3 handlers)
export async function stripeCapabilityRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { account_id, capability_id } = args;
        const capability = await this.stripeClient.accounts.retrieveCapability(account_id, capability_id);
        return formatStripeResponse(capability);
    }
    catch (error) {
        throw new Error(`Failed to retrieve capability: ${error.message}`);
    }
}
export async function stripeCapabilityUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { account_id, capability_id, ...updateData } = args;
        const capability = await this.stripeClient.accounts.updateCapability(account_id, capability_id, updateData);
        return formatStripeResponse(capability);
    }
    catch (error) {
        throw new Error(`Failed to update capability: ${error.message}`);
    }
}
export async function stripeCapabilityList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const capabilities = await this.stripeClient.accounts.listCapabilities(args.account_id);
        return formatStripeResponse(capabilities);
    }
    catch (error) {
        throw new Error(`Failed to list capabilities: ${error.message}`);
    }
}
// ACCOUNT LINKS (2 handlers)
export async function stripeAccountLinkCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const accountLink = await this.stripeClient.accountLinks.create(args);
        return formatStripeResponse(accountLink);
    }
    catch (error) {
        throw new Error(`Failed to create account link: ${error.message}`);
    }
}
export async function stripeAccountSessionCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const session = await this.stripeClient.accountSessions.create(args);
        return formatStripeResponse(session);
    }
    catch (error) {
        throw new Error(`Failed to create account session: ${error.message}`);
    }
}
// EXTERNAL ACCOUNTS (2 handlers)
export async function stripeExternalAccountCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { account_id, ...accountData } = args;
        const externalAccount = await this.stripeClient.accounts.createExternalAccount(account_id, accountData);
        return formatStripeResponse(externalAccount);
    }
    catch (error) {
        throw new Error(`Failed to create external account: ${error.message}`);
    }
}
export async function stripeExternalAccountDelete(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { account_id, external_account_id } = args;
        const result = await this.stripeClient.accounts.deleteExternalAccount(account_id, external_account_id);
        return formatStripeResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to delete external account: ${error.message}`);
    }
}
// ============================================================
// OTHER HANDLERS (20 handlers)
// ============================================================
// EVENTS (2 handlers)
export async function stripeEventRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const event = await this.stripeClient.events.retrieve(args.event_id);
        return formatStripeResponse(event);
    }
    catch (error) {
        throw new Error(`Failed to retrieve event: ${error.message}`);
    }
}
export async function stripeEventList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const events = await this.stripeClient.events.list(args);
        return formatStripeResponse(events);
    }
    catch (error) {
        throw new Error(`Failed to list events: ${error.message}`);
    }
}
// FILES (3 handlers)
export async function stripeFileCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const file = await this.stripeClient.files.create(args);
        return formatStripeResponse(file);
    }
    catch (error) {
        throw new Error(`Failed to create file: ${error.message}`);
    }
}
export async function stripeFileRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const file = await this.stripeClient.files.retrieve(args.file_id);
        return formatStripeResponse(file);
    }
    catch (error) {
        throw new Error(`Failed to retrieve file: ${error.message}`);
    }
}
export async function stripeFileList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const files = await this.stripeClient.files.list(args);
        return formatStripeResponse(files);
    }
    catch (error) {
        throw new Error(`Failed to list files: ${error.message}`);
    }
}
// DISPUTES (4 handlers)
export async function stripeDisputeRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const dispute = await this.stripeClient.disputes.retrieve(args.dispute_id);
        return formatStripeResponse(dispute);
    }
    catch (error) {
        throw new Error(`Failed to retrieve dispute: ${error.message}`);
    }
}
export async function stripeDisputeUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { dispute_id, ...updateData } = args;
        const dispute = await this.stripeClient.disputes.update(dispute_id, updateData);
        return formatStripeResponse(dispute);
    }
    catch (error) {
        throw new Error(`Failed to update dispute: ${error.message}`);
    }
}
export async function stripeDisputeClose(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const dispute = await this.stripeClient.disputes.close(args.dispute_id);
        return formatStripeResponse(dispute);
    }
    catch (error) {
        throw new Error(`Failed to close dispute: ${error.message}`);
    }
}
export async function stripeDisputeList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const disputes = await this.stripeClient.disputes.list(args);
        return formatStripeResponse(disputes);
    }
    catch (error) {
        throw new Error(`Failed to list disputes: ${error.message}`);
    }
}
// WEBHOOKS (2 handlers)
export async function stripeWebhookConstructEvent(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { payload, signature, secret } = args;
        const event = this.stripeClient.webhooks.constructEvent(payload, signature, secret);
        return formatStripeResponse(event);
    }
    catch (error) {
        throw new Error(`Failed to construct webhook event: ${error.message}`);
    }
}
export async function stripeWebhookVerifySignature(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { payload, signature, secret } = args;
        const isValid = this.stripeClient.webhooks.signature.verifyHeader(payload, signature, secret);
        return formatStripeResponse({ valid: isValid });
    }
    catch (error) {
        throw new Error(`Failed to verify webhook signature: ${error.message}`);
    }
}
// SETUP INTENTS (5 handlers)
export async function stripeSetupIntentCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const setupIntent = await this.stripeClient.setupIntents.create(args);
        return formatStripeResponse(setupIntent);
    }
    catch (error) {
        throw new Error(`Failed to create setup intent: ${error.message}`);
    }
}
export async function stripeSetupIntentRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const setupIntent = await this.stripeClient.setupIntents.retrieve(args.setup_intent_id);
        return formatStripeResponse(setupIntent);
    }
    catch (error) {
        throw new Error(`Failed to retrieve setup intent: ${error.message}`);
    }
}
export async function stripeSetupIntentUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { setup_intent_id, ...updateData } = args;
        const setupIntent = await this.stripeClient.setupIntents.update(setup_intent_id, updateData);
        return formatStripeResponse(setupIntent);
    }
    catch (error) {
        throw new Error(`Failed to update setup intent: ${error.message}`);
    }
}
export async function stripeSetupIntentConfirm(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { setup_intent_id, ...confirmData } = args;
        const setupIntent = await this.stripeClient.setupIntents.confirm(setup_intent_id, confirmData);
        return formatStripeResponse(setupIntent);
    }
    catch (error) {
        throw new Error(`Failed to confirm setup intent: ${error.message}`);
    }
}
export async function stripeSetupIntentCancel(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { setup_intent_id, ...cancelData } = args;
        const setupIntent = await this.stripeClient.setupIntents.cancel(setup_intent_id, cancelData);
        return formatStripeResponse(setupIntent);
    }
    catch (error) {
        throw new Error(`Failed to cancel setup intent: ${error.message}`);
    }
}
// CHECKOUT SESSIONS (4 handlers)
export async function stripeCheckoutSessionCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const session = await this.stripeClient.checkout.sessions.create(args);
        return formatStripeResponse(session);
    }
    catch (error) {
        throw new Error(`Failed to create checkout session: ${error.message}`);
    }
}
export async function stripeCheckoutSessionRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const session = await this.stripeClient.checkout.sessions.retrieve(args.session_id);
        return formatStripeResponse(session);
    }
    catch (error) {
        throw new Error(`Failed to retrieve checkout session: ${error.message}`);
    }
}
export async function stripeCheckoutSessionExpire(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const session = await this.stripeClient.checkout.sessions.expire(args.session_id);
        return formatStripeResponse(session);
    }
    catch (error) {
        throw new Error(`Failed to expire checkout session: ${error.message}`);
    }
}
export async function stripeCheckoutSessionList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const sessions = await this.stripeClient.checkout.sessions.list(args);
        return formatStripeResponse(sessions);
    }
    catch (error) {
        throw new Error(`Failed to list checkout sessions: ${error.message}`);
    }
}
//# sourceMappingURL=stripe-handlers-3.js.map