"use strict";
// Stripe Handler Methods - 150 handlers
// These methods will be added to the UnifiedToolkit class
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeCustomerCreate = stripeCustomerCreate;
exports.stripeCustomerRetrieve = stripeCustomerRetrieve;
exports.stripeCustomerUpdate = stripeCustomerUpdate;
exports.stripeCustomerDelete = stripeCustomerDelete;
exports.stripeCustomerList = stripeCustomerList;
exports.stripeCustomerSearch = stripeCustomerSearch;
exports.stripePaymentIntentCreate = stripePaymentIntentCreate;
exports.stripePaymentIntentRetrieve = stripePaymentIntentRetrieve;
exports.stripePaymentIntentUpdate = stripePaymentIntentUpdate;
exports.stripePaymentIntentConfirm = stripePaymentIntentConfirm;
exports.stripePaymentIntentCancel = stripePaymentIntentCancel;
exports.stripePaymentIntentList = stripePaymentIntentList;
exports.stripeChargeCreate = stripeChargeCreate;
exports.stripeChargeRetrieve = stripeChargeRetrieve;
exports.stripeChargeUpdate = stripeChargeUpdate;
exports.stripeChargeCapture = stripeChargeCapture;
exports.stripeChargeList = stripeChargeList;
exports.stripeRefundCreate = stripeRefundCreate;
exports.stripeRefundRetrieve = stripeRefundRetrieve;
exports.stripeRefundUpdate = stripeRefundUpdate;
exports.stripeRefundCancel = stripeRefundCancel;
exports.stripeRefundList = stripeRefundList;
exports.stripePayoutCreate = stripePayoutCreate;
exports.stripePayoutRetrieve = stripePayoutRetrieve;
exports.stripePayoutUpdate = stripePayoutUpdate;
exports.stripePayoutCancel = stripePayoutCancel;
exports.stripePayoutList = stripePayoutList;
exports.stripeBalanceTransactionRetrieve = stripeBalanceTransactionRetrieve;
exports.stripeBalanceTransactionList = stripeBalanceTransactionList;
exports.stripeBalanceRetrieve = stripeBalanceRetrieve;
exports.stripeSubscriptionCreate = stripeSubscriptionCreate;
exports.stripeSubscriptionRetrieve = stripeSubscriptionRetrieve;
exports.stripeSubscriptionUpdate = stripeSubscriptionUpdate;
exports.stripeSubscriptionCancel = stripeSubscriptionCancel;
exports.stripeSubscriptionResume = stripeSubscriptionResume;
exports.stripeSubscriptionList = stripeSubscriptionList;
exports.stripeSubscriptionSearch = stripeSubscriptionSearch;
exports.stripeSubscriptionItemCreate = stripeSubscriptionItemCreate;
exports.stripeSubscriptionItemRetrieve = stripeSubscriptionItemRetrieve;
exports.stripeSubscriptionItemUpdate = stripeSubscriptionItemUpdate;
exports.stripeSubscriptionItemDelete = stripeSubscriptionItemDelete;
exports.stripeSubscriptionItemList = stripeSubscriptionItemList;
exports.stripeInvoiceCreate = stripeInvoiceCreate;
exports.stripeInvoiceRetrieve = stripeInvoiceRetrieve;
exports.stripeInvoiceUpdate = stripeInvoiceUpdate;
exports.stripeInvoiceDelete = stripeInvoiceDelete;
exports.stripeInvoiceFinalize = stripeInvoiceFinalize;
exports.stripeInvoicePay = stripeInvoicePay;
exports.stripeInvoiceSend = stripeInvoiceSend;
exports.stripeInvoiceVoid = stripeInvoiceVoid;
exports.stripeInvoiceList = stripeInvoiceList;
exports.stripeInvoiceItemCreate = stripeInvoiceItemCreate;
exports.stripeInvoiceItemRetrieve = stripeInvoiceItemRetrieve;
exports.stripeInvoiceItemUpdate = stripeInvoiceItemUpdate;
exports.stripeInvoiceItemDelete = stripeInvoiceItemDelete;
exports.stripeInvoiceItemList = stripeInvoiceItemList;
exports.stripePlanCreate = stripePlanCreate;
exports.stripePlanRetrieve = stripePlanRetrieve;
exports.stripePlanUpdate = stripePlanUpdate;
exports.stripePlanDelete = stripePlanDelete;
exports.stripePlanList = stripePlanList;
exports.stripePriceCreate = stripePriceCreate;
exports.stripePriceRetrieve = stripePriceRetrieve;
exports.stripePriceUpdate = stripePriceUpdate;
exports.stripePriceSearch = stripePriceSearch;
exports.stripePriceList = stripePriceList;
exports.stripeCreditNoteCreate = stripeCreditNoteCreate;
exports.stripeCreditNoteRetrieve = stripeCreditNoteRetrieve;
exports.stripeCreditNoteVoid = stripeCreditNoteVoid;
exports.stripeCreditNoteList = stripeCreditNoteList;
// Helper function to format Stripe responses
function formatStripeResponse(result) {
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
// ============================================================
// CORE RESOURCES HANDLERS (30 handlers)
// ============================================================
// CUSTOMERS (6 handlers)
async function stripeCustomerCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const customer = await this.stripeClient.customers.create(args);
        return formatStripeResponse(customer);
    }
    catch (error) {
        throw new Error(`Failed to create customer: ${error.message}`);
    }
}
async function stripeCustomerRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const customer = await this.stripeClient.customers.retrieve(args.customer_id);
        return formatStripeResponse(customer);
    }
    catch (error) {
        throw new Error(`Failed to retrieve customer: ${error.message}`);
    }
}
async function stripeCustomerUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { customer_id, ...updateData } = args;
        const customer = await this.stripeClient.customers.update(customer_id, updateData);
        return formatStripeResponse(customer);
    }
    catch (error) {
        throw new Error(`Failed to update customer: ${error.message}`);
    }
}
async function stripeCustomerDelete(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const result = await this.stripeClient.customers.del(args.customer_id);
        return formatStripeResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to delete customer: ${error.message}`);
    }
}
async function stripeCustomerList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const customers = await this.stripeClient.customers.list(args);
        return formatStripeResponse(customers);
    }
    catch (error) {
        throw new Error(`Failed to list customers: ${error.message}`);
    }
}
async function stripeCustomerSearch(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const customers = await this.stripeClient.customers.search(args);
        return formatStripeResponse(customers);
    }
    catch (error) {
        throw new Error(`Failed to search customers: ${error.message}`);
    }
}
// PAYMENT INTENTS (6 handlers)
async function stripePaymentIntentCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const paymentIntent = await this.stripeClient.paymentIntents.create(args);
        return formatStripeResponse(paymentIntent);
    }
    catch (error) {
        throw new Error(`Failed to create payment intent: ${error.message}`);
    }
}
async function stripePaymentIntentRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const paymentIntent = await this.stripeClient.paymentIntents.retrieve(args.payment_intent_id);
        return formatStripeResponse(paymentIntent);
    }
    catch (error) {
        throw new Error(`Failed to retrieve payment intent: ${error.message}`);
    }
}
async function stripePaymentIntentUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { payment_intent_id, ...updateData } = args;
        const paymentIntent = await this.stripeClient.paymentIntents.update(payment_intent_id, updateData);
        return formatStripeResponse(paymentIntent);
    }
    catch (error) {
        throw new Error(`Failed to update payment intent: ${error.message}`);
    }
}
async function stripePaymentIntentConfirm(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { payment_intent_id, ...confirmData } = args;
        const paymentIntent = await this.stripeClient.paymentIntents.confirm(payment_intent_id, confirmData);
        return formatStripeResponse(paymentIntent);
    }
    catch (error) {
        throw new Error(`Failed to confirm payment intent: ${error.message}`);
    }
}
async function stripePaymentIntentCancel(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { payment_intent_id, ...cancelData } = args;
        const paymentIntent = await this.stripeClient.paymentIntents.cancel(payment_intent_id, cancelData);
        return formatStripeResponse(paymentIntent);
    }
    catch (error) {
        throw new Error(`Failed to cancel payment intent: ${error.message}`);
    }
}
async function stripePaymentIntentList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const paymentIntents = await this.stripeClient.paymentIntents.list(args);
        return formatStripeResponse(paymentIntents);
    }
    catch (error) {
        throw new Error(`Failed to list payment intents: ${error.message}`);
    }
}
// CHARGES (5 handlers)
async function stripeChargeCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const charge = await this.stripeClient.charges.create(args);
        return formatStripeResponse(charge);
    }
    catch (error) {
        throw new Error(`Failed to create charge: ${error.message}`);
    }
}
async function stripeChargeRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const charge = await this.stripeClient.charges.retrieve(args.charge_id);
        return formatStripeResponse(charge);
    }
    catch (error) {
        throw new Error(`Failed to retrieve charge: ${error.message}`);
    }
}
async function stripeChargeUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { charge_id, ...updateData } = args;
        const charge = await this.stripeClient.charges.update(charge_id, updateData);
        return formatStripeResponse(charge);
    }
    catch (error) {
        throw new Error(`Failed to update charge: ${error.message}`);
    }
}
async function stripeChargeCapture(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { charge_id, ...captureData } = args;
        const charge = await this.stripeClient.charges.capture(charge_id, captureData);
        return formatStripeResponse(charge);
    }
    catch (error) {
        throw new Error(`Failed to capture charge: ${error.message}`);
    }
}
async function stripeChargeList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const charges = await this.stripeClient.charges.list(args);
        return formatStripeResponse(charges);
    }
    catch (error) {
        throw new Error(`Failed to list charges: ${error.message}`);
    }
}
// REFUNDS (5 handlers)
async function stripeRefundCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const refund = await this.stripeClient.refunds.create(args);
        return formatStripeResponse(refund);
    }
    catch (error) {
        throw new Error(`Failed to create refund: ${error.message}`);
    }
}
async function stripeRefundRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const refund = await this.stripeClient.refunds.retrieve(args.refund_id);
        return formatStripeResponse(refund);
    }
    catch (error) {
        throw new Error(`Failed to retrieve refund: ${error.message}`);
    }
}
async function stripeRefundUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { refund_id, ...updateData } = args;
        const refund = await this.stripeClient.refunds.update(refund_id, updateData);
        return formatStripeResponse(refund);
    }
    catch (error) {
        throw new Error(`Failed to update refund: ${error.message}`);
    }
}
async function stripeRefundCancel(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const refund = await this.stripeClient.refunds.cancel(args.refund_id);
        return formatStripeResponse(refund);
    }
    catch (error) {
        throw new Error(`Failed to cancel refund: ${error.message}`);
    }
}
async function stripeRefundList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const refunds = await this.stripeClient.refunds.list(args);
        return formatStripeResponse(refunds);
    }
    catch (error) {
        throw new Error(`Failed to list refunds: ${error.message}`);
    }
}
// PAYOUTS (5 handlers)
async function stripePayoutCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const payout = await this.stripeClient.payouts.create(args);
        return formatStripeResponse(payout);
    }
    catch (error) {
        throw new Error(`Failed to create payout: ${error.message}`);
    }
}
async function stripePayoutRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const payout = await this.stripeClient.payouts.retrieve(args.payout_id);
        return formatStripeResponse(payout);
    }
    catch (error) {
        throw new Error(`Failed to retrieve payout: ${error.message}`);
    }
}
async function stripePayoutUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { payout_id, ...updateData } = args;
        const payout = await this.stripeClient.payouts.update(payout_id, updateData);
        return formatStripeResponse(payout);
    }
    catch (error) {
        throw new Error(`Failed to update payout: ${error.message}`);
    }
}
async function stripePayoutCancel(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const payout = await this.stripeClient.payouts.cancel(args.payout_id);
        return formatStripeResponse(payout);
    }
    catch (error) {
        throw new Error(`Failed to cancel payout: ${error.message}`);
    }
}
async function stripePayoutList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const payouts = await this.stripeClient.payouts.list(args);
        return formatStripeResponse(payouts);
    }
    catch (error) {
        throw new Error(`Failed to list payouts: ${error.message}`);
    }
}
// BALANCE TRANSACTIONS (3 handlers)
async function stripeBalanceTransactionRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const transaction = await this.stripeClient.balanceTransactions.retrieve(args.transaction_id);
        return formatStripeResponse(transaction);
    }
    catch (error) {
        throw new Error(`Failed to retrieve balance transaction: ${error.message}`);
    }
}
async function stripeBalanceTransactionList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const transactions = await this.stripeClient.balanceTransactions.list(args);
        return formatStripeResponse(transactions);
    }
    catch (error) {
        throw new Error(`Failed to list balance transactions: ${error.message}`);
    }
}
async function stripeBalanceRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const balance = await this.stripeClient.balance.retrieve();
        return formatStripeResponse(balance);
    }
    catch (error) {
        throw new Error(`Failed to retrieve balance: ${error.message}`);
    }
}
// ============================================================
// BILLING HANDLERS (40 handlers)
// ============================================================
// SUBSCRIPTIONS (7 handlers)
async function stripeSubscriptionCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const subscription = await this.stripeClient.subscriptions.create(args);
        return formatStripeResponse(subscription);
    }
    catch (error) {
        throw new Error(`Failed to create subscription: ${error.message}`);
    }
}
async function stripeSubscriptionRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const subscription = await this.stripeClient.subscriptions.retrieve(args.subscription_id);
        return formatStripeResponse(subscription);
    }
    catch (error) {
        throw new Error(`Failed to retrieve subscription: ${error.message}`);
    }
}
async function stripeSubscriptionUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { subscription_id, ...updateData } = args;
        const subscription = await this.stripeClient.subscriptions.update(subscription_id, updateData);
        return formatStripeResponse(subscription);
    }
    catch (error) {
        throw new Error(`Failed to update subscription: ${error.message}`);
    }
}
async function stripeSubscriptionCancel(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { subscription_id, ...cancelData } = args;
        const subscription = await this.stripeClient.subscriptions.cancel(subscription_id, cancelData);
        return formatStripeResponse(subscription);
    }
    catch (error) {
        throw new Error(`Failed to cancel subscription: ${error.message}`);
    }
}
async function stripeSubscriptionResume(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const subscription = await this.stripeClient.subscriptions.resume(args.subscription_id);
        return formatStripeResponse(subscription);
    }
    catch (error) {
        throw new Error(`Failed to resume subscription: ${error.message}`);
    }
}
async function stripeSubscriptionList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const subscriptions = await this.stripeClient.subscriptions.list(args);
        return formatStripeResponse(subscriptions);
    }
    catch (error) {
        throw new Error(`Failed to list subscriptions: ${error.message}`);
    }
}
async function stripeSubscriptionSearch(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const subscriptions = await this.stripeClient.subscriptions.search(args);
        return formatStripeResponse(subscriptions);
    }
    catch (error) {
        throw new Error(`Failed to search subscriptions: ${error.message}`);
    }
}
// SUBSCRIPTION ITEMS (5 handlers)
async function stripeSubscriptionItemCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const item = await this.stripeClient.subscriptionItems.create(args);
        return formatStripeResponse(item);
    }
    catch (error) {
        throw new Error(`Failed to create subscription item: ${error.message}`);
    }
}
async function stripeSubscriptionItemRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const item = await this.stripeClient.subscriptionItems.retrieve(args.item_id);
        return formatStripeResponse(item);
    }
    catch (error) {
        throw new Error(`Failed to retrieve subscription item: ${error.message}`);
    }
}
async function stripeSubscriptionItemUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { item_id, ...updateData } = args;
        const item = await this.stripeClient.subscriptionItems.update(item_id, updateData);
        return formatStripeResponse(item);
    }
    catch (error) {
        throw new Error(`Failed to update subscription item: ${error.message}`);
    }
}
async function stripeSubscriptionItemDelete(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const result = await this.stripeClient.subscriptionItems.del(args.item_id);
        return formatStripeResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to delete subscription item: ${error.message}`);
    }
}
async function stripeSubscriptionItemList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const items = await this.stripeClient.subscriptionItems.list(args);
        return formatStripeResponse(items);
    }
    catch (error) {
        throw new Error(`Failed to list subscription items: ${error.message}`);
    }
}
// INVOICES (9 handlers)
async function stripeInvoiceCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const invoice = await this.stripeClient.invoices.create(args);
        return formatStripeResponse(invoice);
    }
    catch (error) {
        throw new Error(`Failed to create invoice: ${error.message}`);
    }
}
async function stripeInvoiceRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const invoice = await this.stripeClient.invoices.retrieve(args.invoice_id);
        return formatStripeResponse(invoice);
    }
    catch (error) {
        throw new Error(`Failed to retrieve invoice: ${error.message}`);
    }
}
async function stripeInvoiceUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { invoice_id, ...updateData } = args;
        const invoice = await this.stripeClient.invoices.update(invoice_id, updateData);
        return formatStripeResponse(invoice);
    }
    catch (error) {
        throw new Error(`Failed to update invoice: ${error.message}`);
    }
}
async function stripeInvoiceDelete(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const result = await this.stripeClient.invoices.del(args.invoice_id);
        return formatStripeResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to delete invoice: ${error.message}`);
    }
}
async function stripeInvoiceFinalize(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { invoice_id, ...finalizeData } = args;
        const invoice = await this.stripeClient.invoices.finalizeInvoice(invoice_id, finalizeData);
        return formatStripeResponse(invoice);
    }
    catch (error) {
        throw new Error(`Failed to finalize invoice: ${error.message}`);
    }
}
async function stripeInvoicePay(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { invoice_id, ...payData } = args;
        const invoice = await this.stripeClient.invoices.pay(invoice_id, payData);
        return formatStripeResponse(invoice);
    }
    catch (error) {
        throw new Error(`Failed to pay invoice: ${error.message}`);
    }
}
async function stripeInvoiceSend(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const invoice = await this.stripeClient.invoices.sendInvoice(args.invoice_id);
        return formatStripeResponse(invoice);
    }
    catch (error) {
        throw new Error(`Failed to send invoice: ${error.message}`);
    }
}
async function stripeInvoiceVoid(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const invoice = await this.stripeClient.invoices.voidInvoice(args.invoice_id);
        return formatStripeResponse(invoice);
    }
    catch (error) {
        throw new Error(`Failed to void invoice: ${error.message}`);
    }
}
async function stripeInvoiceList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const invoices = await this.stripeClient.invoices.list(args);
        return formatStripeResponse(invoices);
    }
    catch (error) {
        throw new Error(`Failed to list invoices: ${error.message}`);
    }
}
// INVOICE ITEMS (5 handlers)
async function stripeInvoiceItemCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const item = await this.stripeClient.invoiceItems.create(args);
        return formatStripeResponse(item);
    }
    catch (error) {
        throw new Error(`Failed to create invoice item: ${error.message}`);
    }
}
async function stripeInvoiceItemRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const item = await this.stripeClient.invoiceItems.retrieve(args.item_id);
        return formatStripeResponse(item);
    }
    catch (error) {
        throw new Error(`Failed to retrieve invoice item: ${error.message}`);
    }
}
async function stripeInvoiceItemUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { item_id, ...updateData } = args;
        const item = await this.stripeClient.invoiceItems.update(item_id, updateData);
        return formatStripeResponse(item);
    }
    catch (error) {
        throw new Error(`Failed to update invoice item: ${error.message}`);
    }
}
async function stripeInvoiceItemDelete(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const result = await this.stripeClient.invoiceItems.del(args.item_id);
        return formatStripeResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to delete invoice item: ${error.message}`);
    }
}
async function stripeInvoiceItemList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const items = await this.stripeClient.invoiceItems.list(args);
        return formatStripeResponse(items);
    }
    catch (error) {
        throw new Error(`Failed to list invoice items: ${error.message}`);
    }
}
// PLANS (5 handlers)
async function stripePlanCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const plan = await this.stripeClient.plans.create(args);
        return formatStripeResponse(plan);
    }
    catch (error) {
        throw new Error(`Failed to create plan: ${error.message}`);
    }
}
async function stripePlanRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const plan = await this.stripeClient.plans.retrieve(args.plan_id);
        return formatStripeResponse(plan);
    }
    catch (error) {
        throw new Error(`Failed to retrieve plan: ${error.message}`);
    }
}
async function stripePlanUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { plan_id, ...updateData } = args;
        const plan = await this.stripeClient.plans.update(plan_id, updateData);
        return formatStripeResponse(plan);
    }
    catch (error) {
        throw new Error(`Failed to update plan: ${error.message}`);
    }
}
async function stripePlanDelete(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const result = await this.stripeClient.plans.del(args.plan_id);
        return formatStripeResponse(result);
    }
    catch (error) {
        throw new Error(`Failed to delete plan: ${error.message}`);
    }
}
async function stripePlanList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const plans = await this.stripeClient.plans.list(args);
        return formatStripeResponse(plans);
    }
    catch (error) {
        throw new Error(`Failed to list plans: ${error.message}`);
    }
}
// PRICES (5 handlers)
async function stripePriceCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const price = await this.stripeClient.prices.create(args);
        return formatStripeResponse(price);
    }
    catch (error) {
        throw new Error(`Failed to create price: ${error.message}`);
    }
}
async function stripePriceRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const price = await this.stripeClient.prices.retrieve(args.price_id);
        return formatStripeResponse(price);
    }
    catch (error) {
        throw new Error(`Failed to retrieve price: ${error.message}`);
    }
}
async function stripePriceUpdate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const { price_id, ...updateData } = args;
        const price = await this.stripeClient.prices.update(price_id, updateData);
        return formatStripeResponse(price);
    }
    catch (error) {
        throw new Error(`Failed to update price: ${error.message}`);
    }
}
async function stripePriceSearch(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const prices = await this.stripeClient.prices.search(args);
        return formatStripeResponse(prices);
    }
    catch (error) {
        throw new Error(`Failed to search prices: ${error.message}`);
    }
}
async function stripePriceList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const prices = await this.stripeClient.prices.list(args);
        return formatStripeResponse(prices);
    }
    catch (error) {
        throw new Error(`Failed to list prices: ${error.message}`);
    }
}
// CREDIT NOTES (4 handlers)
async function stripeCreditNoteCreate(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const creditNote = await this.stripeClient.creditNotes.create(args);
        return formatStripeResponse(creditNote);
    }
    catch (error) {
        throw new Error(`Failed to create credit note: ${error.message}`);
    }
}
async function stripeCreditNoteRetrieve(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const creditNote = await this.stripeClient.creditNotes.retrieve(args.credit_note_id);
        return formatStripeResponse(creditNote);
    }
    catch (error) {
        throw new Error(`Failed to retrieve credit note: ${error.message}`);
    }
}
async function stripeCreditNoteVoid(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const creditNote = await this.stripeClient.creditNotes.voidCreditNote(args.credit_note_id);
        return formatStripeResponse(creditNote);
    }
    catch (error) {
        throw new Error(`Failed to void credit note: ${error.message}`);
    }
}
async function stripeCreditNoteList(args) {
    if (!this.stripeClient)
        throw new Error('Stripe client not initialized');
    try {
        const creditNotes = await this.stripeClient.creditNotes.list(args);
        return formatStripeResponse(creditNotes);
    }
    catch (error) {
        throw new Error(`Failed to list credit notes: ${error.message}`);
    }
}
