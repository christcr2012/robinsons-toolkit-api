/** TWILIO Integration - Pure JavaScript */

async function twilioFetch(credentials, path, options = {}) {
  const url = path.startsWith('http') ? path : 'https://api.twilio.com' + path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function sendSms(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { to, from, body } = args;
    const message = await this.twilioClient.messages.create({ to, from, body });
    return formatTwilioResponse(message);
  } catch (error) {
    throw new Error(`Failed to send SMS: ${error.message}`);
  }
}

async function sendMms(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { to, from, body, mediaUrl } = args;
    const message = await this.twilioClient.messages.create({ to, from, body, mediaUrl });
    return formatTwilioResponse(message);
  } catch (error) {
    throw new Error(`Failed to send MMS: ${error.message}`);
  }
}

async function sendWhatsapp(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { to, from, body } = args;
    const message = await this.twilioClient.messages.create({ to, from, body });
    return formatTwilioResponse(message);
  } catch (error) {
    throw new Error(`Failed to send WhatsApp message: ${error.message}`);
  }
}

async function getMessage(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { messageSid } = args;
    const message = await this.twilioClient.messages(messageSid).fetch();
    return formatTwilioResponse(message);
  } catch (error) {
    throw new Error(`Failed to get message: ${error.message}`);
  }
}

async function listMessages(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { to, from, dateSent, limit } = args;
    const messages = await this.twilioClient.messages.list({ to, from, dateSent, limit });
    return formatTwilioResponse(messages);
  } catch (error) {
    throw new Error(`Failed to list messages: ${error.message}`);
  }
}

async function deleteMessage(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { messageSid } = args;
    await this.twilioClient.messages(messageSid).remove();
    return formatTwilioResponse({ messageSid, status: 'deleted' });
  } catch (error) {
    throw new Error(`Failed to delete message: ${error.message}`);
  }
}

async function updateMessage(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { messageSid, body } = args;
    const message = await this.twilioClient.messages(messageSid).update({ body });
    return formatTwilioResponse(message);
  } catch (error) {
    throw new Error(`Failed to update message: ${error.message}`);
  }
}

async function createMessagingService(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { friendlyName, inboundRequestUrl, statusCallback } = args;
    const service = await this.twilioClient.messaging.v1.services.create({
      friendlyName,
      inboundRequestUrl,
      statusCallback,
    });
    return formatTwilioResponse(service);
  } catch (error) {
    throw new Error(`Failed to create messaging service: ${error.message}`);
  }
}

async function getMessagingService(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { serviceSid } = args;
    const service = await this.twilioClient.messaging.v1.services(serviceSid).fetch();
    return formatTwilioResponse(service);
  } catch (error) {
    throw new Error(`Failed to get messaging service: ${error.message}`);
  }
}

async function listMessagingServices(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { limit } = args;
    const services = await this.twilioClient.messaging.v1.services.list({ limit });
    return formatTwilioResponse(services);
  } catch (error) {
    throw new Error(`Failed to list messaging services: ${error.message}`);
  }
}

async function updateMessagingService(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { serviceSid, friendlyName, inboundRequestUrl } = args;
    const service = await this.twilioClient.messaging.v1.services(serviceSid).update({
      friendlyName,
      inboundRequestUrl,
    });
    return formatTwilioResponse(service);
  } catch (error) {
    throw new Error(`Failed to update messaging service: ${error.message}`);
  }
}

async function deleteMessagingService(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { serviceSid } = args;
    await this.twilioClient.messaging.v1.services(serviceSid).remove();
    return formatTwilioResponse({ serviceSid, status: 'deleted' });
  } catch (error) {
    throw new Error(`Failed to delete messaging service: ${error.message}`);
  }
}

async function addPhoneToService(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { serviceSid, phoneNumberSid } = args;
    const phoneNumber = await this.twilioClient.messaging.v1.services(serviceSid)
      .phoneNumbers.create({ phoneNumberSid });
    return formatTwilioResponse(phoneNumber);
  } catch (error) {
    throw new Error(`Failed to add phone to service: ${error.message}`);
  }
}

async function removePhoneFromService(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { serviceSid, phoneNumberSid } = args;
    await this.twilioClient.messaging.v1.services(serviceSid).phoneNumbers(phoneNumberSid).remove();
    return formatTwilioResponse({ serviceSid, phoneNumberSid, status: 'removed' });
  } catch (error) {
    throw new Error(`Failed to remove phone from service: ${error.message}`);
  }
}

async function listServicePhoneNumbers(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { serviceSid } = args;
    const phoneNumbers = await this.twilioClient.messaging.v1.services(serviceSid).phoneNumbers.list();
    return formatTwilioResponse(phoneNumbers);
  } catch (error) {
    throw new Error(`Failed to list service phone numbers: ${error.message}`);
  }
}

async function scheduleMessage(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { to, from, body, sendAt } = args;
    const message = await this.twilioClient.messages.create({
      to,
      from,
      body,
      scheduleType: 'fixed',
      sendAt: new Date(sendAt),
    });
    return formatTwilioResponse(message);
  } catch (error) {
    throw new Error(`Failed to schedule message: ${error.message}`);
  }
}

async function cancelScheduledMessage(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { messageSid } = args;
    const message = await this.twilioClient.messages(messageSid).update({ status: 'canceled' });
    return formatTwilioResponse(message);
  } catch (error) {
    throw new Error(`Failed to cancel scheduled message: ${error.message}`);
  }
}

async function getMessageMedia(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { messageSid, mediaSid } = args;
    if (mediaSid) {
      const media = await this.twilioClient.messages(messageSid).media(mediaSid).fetch();
      return formatTwilioResponse(media);
    } else {
      const mediaList = await this.twilioClient.messages(messageSid).media.list();
      return formatTwilioResponse(mediaList);
    }
  } catch (error) {
    throw new Error(`Failed to get message media: ${error.message}`);
  }
}

async function listMessageMedia(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { messageSid } = args;
    const mediaList = await this.twilioClient.messages(messageSid).media.list();
    return formatTwilioResponse(mediaList);
  } catch (error) {
    throw new Error(`Failed to list message media: ${error.message}`);
  }
}

async function deleteMessageMedia(credentials, args) {
  if (!this.twilioClient) throw new Error('Twilio client not initialized');
  try {
    const { messageSid, mediaSid } = args;
    await this.twilioClient.messages(messageSid).media(mediaSid).remove();
    return formatTwilioResponse({ messageSid, mediaSid, status: 'deleted' });
  } catch (error) {
    throw new Error(`Failed to delete message media: ${error.message}`);
  }
}

async function executeTwilioTool(toolName, args, credentials) {
  const tools = {
    'twilio_sendSms': sendSms,
    'twilio_sendMms': sendMms,
    'twilio_sendWhatsapp': sendWhatsapp,
    'twilio_getMessage': getMessage,
    'twilio_listMessages': listMessages,
    'twilio_deleteMessage': deleteMessage,
    'twilio_updateMessage': updateMessage,
    'twilio_createMessagingService': createMessagingService,
    'twilio_getMessagingService': getMessagingService,
    'twilio_listMessagingServices': listMessagingServices,
    'twilio_updateMessagingService': updateMessagingService,
    'twilio_deleteMessagingService': deleteMessagingService,
    'twilio_addPhoneToService': addPhoneToService,
    'twilio_removePhoneFromService': removePhoneFromService,
    'twilio_listServicePhoneNumbers': listServicePhoneNumbers,
    'twilio_scheduleMessage': scheduleMessage,
    'twilio_cancelScheduledMessage': cancelScheduledMessage,
    'twilio_getMessageMedia': getMessageMedia,
    'twilio_listMessageMedia': listMessageMedia,
    'twilio_deleteMessageMedia': deleteMessageMedia,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeTwilioTool };