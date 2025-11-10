/** STRIPE Integration - Pure JavaScript */

async function stripeFetch(credentials, path, options = {}) {
  const url = path.startsWith('http') ? path : 'https://api.stripe.com/v1' + path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function customerCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const customer = await this.stripeClient.customers.create(args);
  } catch (error) {
    throw new Error(`Failed to create customer: ${error.message}`);
  }
}

async function customerRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const customer = await this.stripeClient.customers.retrieve(args.customer_id);
  } catch (error) {
    throw new Error(`Failed to retrieve customer: ${error.message}`);
  }
}

async function customerUpdate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { customer_id, ...updateData } = args;
    const customer = await this.stripeClient.customers.update(customer_id, updateData);
  } catch (error) {
    throw new Error(`Failed to update customer: ${error.message}`);
  }
}

async function customerDelete(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const result = await this.stripeClient.customers.del(args.customer_id);
  } catch (error) {
    throw new Error(`Failed to delete customer: ${error.message}`);
  }
}

async function customerList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const customers = await this.stripeClient.customers.list(args);
  } catch (error) {
    throw new Error(`Failed to list customers: ${error.message}`);
  }
}

async function customerSearch(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const customers = await this.stripeClient.customers.search(args);
  } catch (error) {
    throw new Error(`Failed to search customers: ${error.message}`);
  }
}

async function paymentIntentCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const paymentIntent = await this.stripeClient.paymentIntents.create(args);
  } catch (error) {
    throw new Error(`Failed to create payment intent: ${error.message}`);
  }
}

async function paymentIntentRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const paymentIntent = await this.stripeClient.paymentIntents.retrieve(args.payment_intent_id);
  } catch (error) {
    throw new Error(`Failed to retrieve payment intent: ${error.message}`);
  }
}

async function paymentIntentUpdate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { payment_intent_id, ...updateData } = args;
    const paymentIntent = await this.stripeClient.paymentIntents.update(payment_intent_id, updateData);
  } catch (error) {
    throw new Error(`Failed to update payment intent: ${error.message}`);
  }
}

async function paymentIntentConfirm(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { payment_intent_id, ...confirmData } = args;
    const paymentIntent = await this.stripeClient.paymentIntents.confirm(payment_intent_id, confirmData);
  } catch (error) {
    throw new Error(`Failed to confirm payment intent: ${error.message}`);
  }
}

async function paymentIntentCancel(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { payment_intent_id, ...cancelData } = args;
    const paymentIntent = await this.stripeClient.paymentIntents.cancel(payment_intent_id, cancelData);
  } catch (error) {
    throw new Error(`Failed to cancel payment intent: ${error.message}`);
  }
}

async function paymentIntentList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const paymentIntents = await this.stripeClient.paymentIntents.list(args);
  } catch (error) {
    throw new Error(`Failed to list payment intents: ${error.message}`);
  }
}

async function chargeCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const charge = await this.stripeClient.charges.create(args);
  } catch (error) {
    throw new Error(`Failed to create charge: ${error.message}`);
  }
}

async function chargeRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const charge = await this.stripeClient.charges.retrieve(args.charge_id);
  } catch (error) {
    throw new Error(`Failed to retrieve charge: ${error.message}`);
  }
}

async function chargeUpdate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { charge_id, ...updateData } = args;
    const charge = await this.stripeClient.charges.update(charge_id, updateData);
  } catch (error) {
    throw new Error(`Failed to update charge: ${error.message}`);
  }
}

async function chargeCapture(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { charge_id, ...captureData } = args;
    const charge = await this.stripeClient.charges.capture(charge_id, captureData);
  } catch (error) {
    throw new Error(`Failed to capture charge: ${error.message}`);
  }
}

async function chargeList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const charges = await this.stripeClient.charges.list(args);
  } catch (error) {
    throw new Error(`Failed to list charges: ${error.message}`);
  }
}

async function refundCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const refund = await this.stripeClient.refunds.create(args);
  } catch (error) {
    throw new Error(`Failed to create refund: ${error.message}`);
  }
}

async function refundRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const refund = await this.stripeClient.refunds.retrieve(args.refund_id);
  } catch (error) {
    throw new Error(`Failed to retrieve refund: ${error.message}`);
  }
}

async function refundUpdate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { refund_id, ...updateData } = args;
    const refund = await this.stripeClient.refunds.update(refund_id, updateData);
  } catch (error) {
    throw new Error(`Failed to update refund: ${error.message}`);
  }
}

async function refundCancel(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const refund = await this.stripeClient.refunds.cancel(args.refund_id);
  } catch (error) {
    throw new Error(`Failed to cancel refund: ${error.message}`);
  }
}

async function refundList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const refunds = await this.stripeClient.refunds.list(args);
  } catch (error) {
    throw new Error(`Failed to list refunds: ${error.message}`);
  }
}

async function payoutCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const payout = await this.stripeClient.payouts.create(args);
  } catch (error) {
    throw new Error(`Failed to create payout: ${error.message}`);
  }
}

async function payoutRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const payout = await this.stripeClient.payouts.retrieve(args.payout_id);
  } catch (error) {
    throw new Error(`Failed to retrieve payout: ${error.message}`);
  }
}

async function payoutUpdate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { payout_id, ...updateData } = args;
    const payout = await this.stripeClient.payouts.update(payout_id, updateData);
  } catch (error) {
    throw new Error(`Failed to update payout: ${error.message}`);
  }
}

async function payoutCancel(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const payout = await this.stripeClient.payouts.cancel(args.payout_id);
  } catch (error) {
    throw new Error(`Failed to cancel payout: ${error.message}`);
  }
}

async function payoutList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const payouts = await this.stripeClient.payouts.list(args);
  } catch (error) {
    throw new Error(`Failed to list payouts: ${error.message}`);
  }
}

async function balanceTransactionRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const transaction = await this.stripeClient.balanceTransactions.retrieve(args.transaction_id);
  } catch (error) {
    throw new Error(`Failed to retrieve balance transaction: ${error.message}`);
  }
}

async function balanceTransactionList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const transactions = await this.stripeClient.balanceTransactions.list(args);
  } catch (error) {
    throw new Error(`Failed to list balance transactions: ${error.message}`);
  }
}

async function balanceRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const balance = await this.stripeClient.balance.retrieve();
  } catch (error) {
    throw new Error(`Failed to retrieve balance: ${error.message}`);
  }
}

async function subscriptionCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const subscription = await this.stripeClient.subscriptions.create(args);
  } catch (error) {
    throw new Error(`Failed to create subscription: ${error.message}`);
  }
}

async function subscriptionRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const subscription = await this.stripeClient.subscriptions.retrieve(args.subscription_id);
  } catch (error) {
    throw new Error(`Failed to retrieve subscription: ${error.message}`);
  }
}

async function subscriptionUpdate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { subscription_id, ...updateData } = args;
    const subscription = await this.stripeClient.subscriptions.update(subscription_id, updateData);
  } catch (error) {
    throw new Error(`Failed to update subscription: ${error.message}`);
  }
}

async function subscriptionCancel(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { subscription_id, ...cancelData } = args;
    const subscription = await this.stripeClient.subscriptions.cancel(subscription_id, cancelData);
  } catch (error) {
    throw new Error(`Failed to cancel subscription: ${error.message}`);
  }
}

async function subscriptionResume(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const subscription = await this.stripeClient.subscriptions.resume(args.subscription_id);
  } catch (error) {
    throw new Error(`Failed to resume subscription: ${error.message}`);
  }
}

async function subscriptionList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const subscriptions = await this.stripeClient.subscriptions.list(args);
  } catch (error) {
    throw new Error(`Failed to list subscriptions: ${error.message}`);
  }
}

async function subscriptionSearch(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const subscriptions = await this.stripeClient.subscriptions.search(args);
  } catch (error) {
    throw new Error(`Failed to search subscriptions: ${error.message}`);
  }
}

async function subscriptionItemCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const item = await this.stripeClient.subscriptionItems.create(args);
  } catch (error) {
    throw new Error(`Failed to create subscription item: ${error.message}`);
  }
}

async function subscriptionItemRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const item = await this.stripeClient.subscriptionItems.retrieve(args.item_id);
  } catch (error) {
    throw new Error(`Failed to retrieve subscription item: ${error.message}`);
  }
}

async function subscriptionItemUpdate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { item_id, ...updateData } = args;
    const item = await this.stripeClient.subscriptionItems.update(item_id, updateData);
  } catch (error) {
    throw new Error(`Failed to update subscription item: ${error.message}`);
  }
}

async function subscriptionItemDelete(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const result = await this.stripeClient.subscriptionItems.del(args.item_id);
  } catch (error) {
    throw new Error(`Failed to delete subscription item: ${error.message}`);
  }
}

async function subscriptionItemList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const items = await this.stripeClient.subscriptionItems.list(args);
  } catch (error) {
    throw new Error(`Failed to list subscription items: ${error.message}`);
  }
}

async function invoiceCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const invoice = await this.stripeClient.invoices.create(args);
  } catch (error) {
    throw new Error(`Failed to create invoice: ${error.message}`);
  }
}

async function invoiceRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const invoice = await this.stripeClient.invoices.retrieve(args.invoice_id);
  } catch (error) {
    throw new Error(`Failed to retrieve invoice: ${error.message}`);
  }
}

async function invoiceUpdate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { invoice_id, ...updateData } = args;
    const invoice = await this.stripeClient.invoices.update(invoice_id, updateData);
  } catch (error) {
    throw new Error(`Failed to update invoice: ${error.message}`);
  }
}

async function invoiceDelete(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const result = await this.stripeClient.invoices.del(args.invoice_id);
  } catch (error) {
    throw new Error(`Failed to delete invoice: ${error.message}`);
  }
}

async function invoiceFinalize(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { invoice_id, ...finalizeData } = args;
    const invoice = await this.stripeClient.invoices.finalizeInvoice(invoice_id, finalizeData);
  } catch (error) {
    throw new Error(`Failed to finalize invoice: ${error.message}`);
  }
}

async function invoicePay(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { invoice_id, ...payData } = args;
    const invoice = await this.stripeClient.invoices.pay(invoice_id, payData);
  } catch (error) {
    throw new Error(`Failed to pay invoice: ${error.message}`);
  }
}

async function invoiceSend(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const invoice = await this.stripeClient.invoices.sendInvoice(args.invoice_id);
  } catch (error) {
    throw new Error(`Failed to send invoice: ${error.message}`);
  }
}

async function invoiceVoid(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const invoice = await this.stripeClient.invoices.voidInvoice(args.invoice_id);
  } catch (error) {
    throw new Error(`Failed to void invoice: ${error.message}`);
  }
}

async function invoiceList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const invoices = await this.stripeClient.invoices.list(args);
  } catch (error) {
    throw new Error(`Failed to list invoices: ${error.message}`);
  }
}

async function invoiceItemCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const item = await this.stripeClient.invoiceItems.create(args);
  } catch (error) {
    throw new Error(`Failed to create invoice item: ${error.message}`);
  }
}

async function invoiceItemRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const item = await this.stripeClient.invoiceItems.retrieve(args.item_id);
  } catch (error) {
    throw new Error(`Failed to retrieve invoice item: ${error.message}`);
  }
}

async function invoiceItemUpdate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { item_id, ...updateData } = args;
    const item = await this.stripeClient.invoiceItems.update(item_id, updateData);
  } catch (error) {
    throw new Error(`Failed to update invoice item: ${error.message}`);
  }
}

async function invoiceItemDelete(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const result = await this.stripeClient.invoiceItems.del(args.item_id);
  } catch (error) {
    throw new Error(`Failed to delete invoice item: ${error.message}`);
  }
}

async function invoiceItemList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const items = await this.stripeClient.invoiceItems.list(args);
  } catch (error) {
    throw new Error(`Failed to list invoice items: ${error.message}`);
  }
}

async function planCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const plan = await this.stripeClient.plans.create(args);
  } catch (error) {
    throw new Error(`Failed to create plan: ${error.message}`);
  }
}

async function planRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const plan = await this.stripeClient.plans.retrieve(args.plan_id);
  } catch (error) {
    throw new Error(`Failed to retrieve plan: ${error.message}`);
  }
}

async function planUpdate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { plan_id, ...updateData } = args;
    const plan = await this.stripeClient.plans.update(plan_id, updateData);
  } catch (error) {
    throw new Error(`Failed to update plan: ${error.message}`);
  }
}

async function planDelete(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const result = await this.stripeClient.plans.del(args.plan_id);
  } catch (error) {
    throw new Error(`Failed to delete plan: ${error.message}`);
  }
}

async function planList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const plans = await this.stripeClient.plans.list(args);
  } catch (error) {
    throw new Error(`Failed to list plans: ${error.message}`);
  }
}

async function priceCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const price = await this.stripeClient.prices.create(args);
  } catch (error) {
    throw new Error(`Failed to create price: ${error.message}`);
  }
}

async function priceRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const price = await this.stripeClient.prices.retrieve(args.price_id);
  } catch (error) {
    throw new Error(`Failed to retrieve price: ${error.message}`);
  }
}

async function priceUpdate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const { price_id, ...updateData } = args;
    const price = await this.stripeClient.prices.update(price_id, updateData);
  } catch (error) {
    throw new Error(`Failed to update price: ${error.message}`);
  }
}

async function priceSearch(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const prices = await this.stripeClient.prices.search(args);
  } catch (error) {
    throw new Error(`Failed to search prices: ${error.message}`);
  }
}

async function priceList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const prices = await this.stripeClient.prices.list(args);
  } catch (error) {
    throw new Error(`Failed to list prices: ${error.message}`);
  }
}

async function creditNoteCreate(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const creditNote = await this.stripeClient.creditNotes.create(args);
  } catch (error) {
    throw new Error(`Failed to create credit note: ${error.message}`);
  }
}

async function creditNoteRetrieve(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const creditNote = await this.stripeClient.creditNotes.retrieve(args.credit_note_id);
  } catch (error) {
    throw new Error(`Failed to retrieve credit note: ${error.message}`);
  }
}

async function creditNoteVoid(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const creditNote = await this.stripeClient.creditNotes.voidCreditNote(args.credit_note_id);
  } catch (error) {
    throw new Error(`Failed to void credit note: ${error.message}`);
  }
}

async function creditNoteList(credentials, args) {
  if (!this.stripeClient) throw new Error('Stripe client not initialized');
  try {
    const creditNotes = await this.stripeClient.creditNotes.list(args);
  } catch (error) {
    throw new Error(`Failed to list credit notes: ${error.message}`);
  }
}

async function executeStripeTool(toolName, args, credentials) {
  const tools = {
    'stripe_customerCreate': customerCreate,
    'stripe_customerRetrieve': customerRetrieve,
    'stripe_customerUpdate': customerUpdate,
    'stripe_customerDelete': customerDelete,
    'stripe_customerList': customerList,
    'stripe_customerSearch': customerSearch,
    'stripe_paymentIntentCreate': paymentIntentCreate,
    'stripe_paymentIntentRetrieve': paymentIntentRetrieve,
    'stripe_paymentIntentUpdate': paymentIntentUpdate,
    'stripe_paymentIntentConfirm': paymentIntentConfirm,
    'stripe_paymentIntentCancel': paymentIntentCancel,
    'stripe_paymentIntentList': paymentIntentList,
    'stripe_chargeCreate': chargeCreate,
    'stripe_chargeRetrieve': chargeRetrieve,
    'stripe_chargeUpdate': chargeUpdate,
    'stripe_chargeCapture': chargeCapture,
    'stripe_chargeList': chargeList,
    'stripe_refundCreate': refundCreate,
    'stripe_refundRetrieve': refundRetrieve,
    'stripe_refundUpdate': refundUpdate,
    'stripe_refundCancel': refundCancel,
    'stripe_refundList': refundList,
    'stripe_payoutCreate': payoutCreate,
    'stripe_payoutRetrieve': payoutRetrieve,
    'stripe_payoutUpdate': payoutUpdate,
    'stripe_payoutCancel': payoutCancel,
    'stripe_payoutList': payoutList,
    'stripe_balanceTransactionRetrieve': balanceTransactionRetrieve,
    'stripe_balanceTransactionList': balanceTransactionList,
    'stripe_balanceRetrieve': balanceRetrieve,
    'stripe_subscriptionCreate': subscriptionCreate,
    'stripe_subscriptionRetrieve': subscriptionRetrieve,
    'stripe_subscriptionUpdate': subscriptionUpdate,
    'stripe_subscriptionCancel': subscriptionCancel,
    'stripe_subscriptionResume': subscriptionResume,
    'stripe_subscriptionList': subscriptionList,
    'stripe_subscriptionSearch': subscriptionSearch,
    'stripe_subscriptionItemCreate': subscriptionItemCreate,
    'stripe_subscriptionItemRetrieve': subscriptionItemRetrieve,
    'stripe_subscriptionItemUpdate': subscriptionItemUpdate,
    'stripe_subscriptionItemDelete': subscriptionItemDelete,
    'stripe_subscriptionItemList': subscriptionItemList,
    'stripe_invoiceCreate': invoiceCreate,
    'stripe_invoiceRetrieve': invoiceRetrieve,
    'stripe_invoiceUpdate': invoiceUpdate,
    'stripe_invoiceDelete': invoiceDelete,
    'stripe_invoiceFinalize': invoiceFinalize,
    'stripe_invoicePay': invoicePay,
    'stripe_invoiceSend': invoiceSend,
    'stripe_invoiceVoid': invoiceVoid,
    'stripe_invoiceList': invoiceList,
    'stripe_invoiceItemCreate': invoiceItemCreate,
    'stripe_invoiceItemRetrieve': invoiceItemRetrieve,
    'stripe_invoiceItemUpdate': invoiceItemUpdate,
    'stripe_invoiceItemDelete': invoiceItemDelete,
    'stripe_invoiceItemList': invoiceItemList,
    'stripe_planCreate': planCreate,
    'stripe_planRetrieve': planRetrieve,
    'stripe_planUpdate': planUpdate,
    'stripe_planDelete': planDelete,
    'stripe_planList': planList,
    'stripe_priceCreate': priceCreate,
    'stripe_priceRetrieve': priceRetrieve,
    'stripe_priceUpdate': priceUpdate,
    'stripe_priceSearch': priceSearch,
    'stripe_priceList': priceList,
    'stripe_creditNoteCreate': creditNoteCreate,
    'stripe_creditNoteRetrieve': creditNoteRetrieve,
    'stripe_creditNoteVoid': creditNoteVoid,
    'stripe_creditNoteList': creditNoteList,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeStripeTool };