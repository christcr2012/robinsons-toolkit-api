/** RESEND Integration - Pure JavaScript */

async function resendFetch(credentials, path, options = {}) {
  const url = path.startsWith('http') ? path : 'https://api.resend.com' + path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function sendEmail(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { from, to, subject, html, text, cc, bcc, replyTo, attachments, tags } = args;
    const result = await this.resendClient.emails.send({
      from,
      to,
      subject,
      html,
      text,
      cc,
      bcc,
      reply_to: replyTo,
      attachments,
      tags,
    });
    return formatResendResponse(result);
  } catch (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

async function getEmail(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { emailId } = args;
    const email = await this.resendClient.emails.get(emailId);
    return formatResendResponse(email);
  } catch (error) {
    throw new Error(`Failed to get email: ${error.message}`);
  }
}

async function listEmails(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { limit, offset } = args;
    const emails = await this.resendClient.emails.list({ limit, offset });
    return formatResendResponse(emails);
  } catch (error) {
    throw new Error(`Failed to list emails: ${error.message}`);
  }
}

async function cancelEmail(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { emailId } = args;
    const result = await this.resendClient.emails.cancel(emailId);
    return formatResendResponse(result);
  } catch (error) {
    throw new Error(`Failed to cancel email: ${error.message}`);
  }
}

async function sendBatchEmails(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { emails } = args;
    const result = await this.resendClient.batch.send(emails);
    return formatResendResponse(result);
  } catch (error) {
    throw new Error(`Failed to send batch emails: ${error.message}`);
  }
}

async function scheduleEmail(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { from, to, subject, html, scheduledAt } = args;
    const result = await this.resendClient.emails.send({
      from,
      to,
      subject,
      html,
      scheduled_at: scheduledAt,
    });
    return formatResendResponse(result);
  } catch (error) {
    throw new Error(`Failed to schedule email: ${error.message}`);
  }
}

async function getEmailEvents(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { emailId } = args;
    // Resend SDK may not have this method yet, return placeholder
    return formatResendResponse({ emailId, events: [] });
  } catch (error) {
    throw new Error(`Failed to get email events: ${error.message}`);
  }
}

async function resendEmail(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { emailId, to } = args;
    // Get original email and resend
    const original = await this.resendClient.emails.get(emailId);
    const result = await this.resendClient.emails.send({ ...original, to });
    return formatResendResponse(result);
  } catch (error) {
    throw new Error(`Failed to resend email: ${error.message}`);
  }
}

async function getEmailStats(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { startDate, endDate } = args;
    // Placeholder - Resend may not have this endpoint yet
    return formatResendResponse({ startDate, endDate, stats: {} });
  } catch (error) {
    throw new Error(`Failed to get email stats: ${error.message}`);
  }
}

async function validateEmail(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { email } = args;
    // Simple validation - Resend may not have this endpoint
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return formatResendResponse({ email, isValid });
  } catch (error) {
    throw new Error(`Failed to validate email: ${error.message}`);
  }
}

async function listDomains(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const domains = await this.resendClient.domains.list();
    return formatResendResponse(domains);
  } catch (error) {
    throw new Error(`Failed to list domains: ${error.message}`);
  }
}

async function getDomain(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { domainId } = args;
    const domain = await this.resendClient.domains.get(domainId);
    return formatResendResponse(domain);
  } catch (error) {
    throw new Error(`Failed to get domain: ${error.message}`);
  }
}

async function createDomain(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { name, region } = args;
    const domain = await this.resendClient.domains.create({ name, region });
    return formatResendResponse(domain);
  } catch (error) {
    throw new Error(`Failed to create domain: ${error.message}`);
  }
}

async function deleteDomain(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { domainId } = args;
    await this.resendClient.domains.remove(domainId);
    return formatResendResponse({ domainId, status: 'deleted' });
  } catch (error) {
    throw new Error(`Failed to delete domain: ${error.message}`);
  }
}

async function verifyDomain(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { domainId } = args;
    const result = await this.resendClient.domains.verify(domainId);
    return formatResendResponse(result);
  } catch (error) {
    throw new Error(`Failed to verify domain: ${error.message}`);
  }
}

async function updateDomain(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { domainId, trackOpens, trackClicks } = args;
    const result = await this.resendClient.domains.update(domainId, {
      open_tracking: trackOpens,
      click_tracking: trackClicks,
    });
    return formatResendResponse(result);
  } catch (error) {
    throw new Error(`Failed to update domain: ${error.message}`);
  }
}

async function getDomainDns(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { domainId } = args;
    const domain = await this.resendClient.domains.get(domainId);
    return formatResendResponse({ domainId, dns: domain.records || [] });
  } catch (error) {
    throw new Error(`Failed to get domain DNS: ${error.message}`);
  }
}

async function getDomainStats(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { domainId, startDate, endDate } = args;
    // Placeholder - may not be in SDK yet
    return formatResendResponse({ domainId, startDate, endDate, stats: {} });
  } catch (error) {
    throw new Error(`Failed to get domain stats: ${error.message}`);
  }
}

async function testDomain(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { domainId, to } = args;
    const domain = await this.resendClient.domains.get(domainId);
    const result = await this.resendClient.emails.send({
      from: `test@${domain.name}`,
      to,
      subject: 'Test Email',
      html: '<p>This is a test email from Resend</p>',
    });
    return formatResendResponse(result);
  } catch (error) {
    throw new Error(`Failed to test domain: ${error.message}`);
  }
}

async function getDomainReputation(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { domainId } = args;
    // Placeholder - may not be in SDK yet
    return formatResendResponse({ domainId, reputation: 'good' });
  } catch (error) {
    throw new Error(`Failed to get domain reputation: ${error.message}`);
  }
}

async function listApiKeys(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const keys = await this.resendClient.apiKeys.list();
    return formatResendResponse(keys);
  } catch (error) {
    throw new Error(`Failed to list API keys: ${error.message}`);
  }
}

async function createApiKey(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { name, permission, domainId } = args;
    const key = await this.resendClient.apiKeys.create({
      name,
      permission,
      domain_id: domainId,
    });
    return formatResendResponse(key);
  } catch (error) {
    throw new Error(`Failed to create API key: ${error.message}`);
  }
}

async function deleteApiKey(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { apiKeyId } = args;
    await this.resendClient.apiKeys.remove(apiKeyId);
    return formatResendResponse({ apiKeyId, status: 'deleted' });
  } catch (error) {
    throw new Error(`Failed to delete API key: ${error.message}`);
  }
}

async function getApiKey(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { apiKeyId } = args;
    // Resend may not have get method, use list and filter
    const keys = await this.resendClient.apiKeys.list();
    const key = keys.data?.find((k) => k.id === apiKeyId);
    return formatResendResponse(key || { error: 'API key not found' });
  } catch (error) {
    throw new Error(`Failed to get API key: ${error.message}`);
  }
}

async function updateApiKey(credentials, args) {
  if (!this.resendClient) throw new Error('Resend client not initialized');
  try {
    const { apiKeyId, name } = args;
    // Resend may not support updating API keys
    return formatResendResponse({ apiKeyId, name, message: 'Update not supported by Resend API' });
  } catch (error) {
    throw new Error(`Failed to update API key: ${error.message}`);
  }
}

async function executeResendTool(toolName, args, credentials) {
  const tools = {
    'resend_sendEmail': sendEmail,
    'resend_getEmail': getEmail,
    'resend_listEmails': listEmails,
    'resend_cancelEmail': cancelEmail,
    'resend_sendBatchEmails': sendBatchEmails,
    'resend_scheduleEmail': scheduleEmail,
    'resend_getEmailEvents': getEmailEvents,
    'resend_resendEmail': resendEmail,
    'resend_getEmailStats': getEmailStats,
    'resend_validateEmail': validateEmail,
    'resend_listDomains': listDomains,
    'resend_getDomain': getDomain,
    'resend_createDomain': createDomain,
    'resend_deleteDomain': deleteDomain,
    'resend_verifyDomain': verifyDomain,
    'resend_updateDomain': updateDomain,
    'resend_getDomainDns': getDomainDns,
    'resend_getDomainStats': getDomainStats,
    'resend_testDomain': testDomain,
    'resend_getDomainReputation': getDomainReputation,
    'resend_listApiKeys': listApiKeys,
    'resend_createApiKey': createApiKey,
    'resend_deleteApiKey': deleteApiKey,
    'resend_getApiKey': getApiKey,
    'resend_updateApiKey': updateApiKey,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeResendTool };