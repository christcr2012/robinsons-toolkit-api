"use strict";
/**
 * Twilio Handler Functions Part 1 (Messaging - 20 handlers)
 * Communications platform
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.twilioSendSms = twilioSendSms;
exports.twilioSendMms = twilioSendMms;
exports.twilioSendWhatsapp = twilioSendWhatsapp;
exports.twilioGetMessage = twilioGetMessage;
exports.twilioListMessages = twilioListMessages;
exports.twilioDeleteMessage = twilioDeleteMessage;
exports.twilioUpdateMessage = twilioUpdateMessage;
exports.twilioCreateMessagingService = twilioCreateMessagingService;
exports.twilioGetMessagingService = twilioGetMessagingService;
exports.twilioListMessagingServices = twilioListMessagingServices;
exports.twilioUpdateMessagingService = twilioUpdateMessagingService;
exports.twilioDeleteMessagingService = twilioDeleteMessagingService;
exports.twilioAddPhoneToService = twilioAddPhoneToService;
exports.twilioRemovePhoneFromService = twilioRemovePhoneFromService;
exports.twilioListServicePhoneNumbers = twilioListServicePhoneNumbers;
exports.twilioScheduleMessage = twilioScheduleMessage;
exports.twilioCancelScheduledMessage = twilioCancelScheduledMessage;
exports.twilioGetMessageMedia = twilioGetMessageMedia;
exports.twilioListMessageMedia = twilioListMessageMedia;
exports.twilioDeleteMessageMedia = twilioDeleteMessageMedia;
// Helper function to format Twilio responses
function formatTwilioResponse(result) {
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
// ============================================================
// MESSAGING HANDLERS (20 handlers)
// ============================================================
async function twilioSendSms(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { to, from, body } = args;
        const message = await this.twilioClient.messages.create({ to, from, body });
        return formatTwilioResponse(message);
    }
    catch (error) {
        throw new Error(`Failed to send SMS: ${error.message}`);
    }
}
async function twilioSendMms(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { to, from, body, mediaUrl } = args;
        const message = await this.twilioClient.messages.create({ to, from, body, mediaUrl });
        return formatTwilioResponse(message);
    }
    catch (error) {
        throw new Error(`Failed to send MMS: ${error.message}`);
    }
}
async function twilioSendWhatsapp(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { to, from, body } = args;
        const message = await this.twilioClient.messages.create({ to, from, body });
        return formatTwilioResponse(message);
    }
    catch (error) {
        throw new Error(`Failed to send WhatsApp message: ${error.message}`);
    }
}
async function twilioGetMessage(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { messageSid } = args;
        const message = await this.twilioClient.messages(messageSid).fetch();
        return formatTwilioResponse(message);
    }
    catch (error) {
        throw new Error(`Failed to get message: ${error.message}`);
    }
}
async function twilioListMessages(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { to, from, dateSent, limit } = args;
        const messages = await this.twilioClient.messages.list({ to, from, dateSent, limit });
        return formatTwilioResponse(messages);
    }
    catch (error) {
        throw new Error(`Failed to list messages: ${error.message}`);
    }
}
async function twilioDeleteMessage(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { messageSid } = args;
        await this.twilioClient.messages(messageSid).remove();
        return formatTwilioResponse({ messageSid, status: 'deleted' });
    }
    catch (error) {
        throw new Error(`Failed to delete message: ${error.message}`);
    }
}
async function twilioUpdateMessage(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { messageSid, body } = args;
        const message = await this.twilioClient.messages(messageSid).update({ body });
        return formatTwilioResponse(message);
    }
    catch (error) {
        throw new Error(`Failed to update message: ${error.message}`);
    }
}
async function twilioCreateMessagingService(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { friendlyName, inboundRequestUrl, statusCallback } = args;
        const service = await this.twilioClient.messaging.v1.services.create({
            friendlyName,
            inboundRequestUrl,
            statusCallback,
        });
        return formatTwilioResponse(service);
    }
    catch (error) {
        throw new Error(`Failed to create messaging service: ${error.message}`);
    }
}
async function twilioGetMessagingService(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid } = args;
        const service = await this.twilioClient.messaging.v1.services(serviceSid).fetch();
        return formatTwilioResponse(service);
    }
    catch (error) {
        throw new Error(`Failed to get messaging service: ${error.message}`);
    }
}
async function twilioListMessagingServices(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { limit } = args;
        const services = await this.twilioClient.messaging.v1.services.list({ limit });
        return formatTwilioResponse(services);
    }
    catch (error) {
        throw new Error(`Failed to list messaging services: ${error.message}`);
    }
}
async function twilioUpdateMessagingService(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid, friendlyName, inboundRequestUrl } = args;
        const service = await this.twilioClient.messaging.v1.services(serviceSid).update({
            friendlyName,
            inboundRequestUrl,
        });
        return formatTwilioResponse(service);
    }
    catch (error) {
        throw new Error(`Failed to update messaging service: ${error.message}`);
    }
}
async function twilioDeleteMessagingService(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid } = args;
        await this.twilioClient.messaging.v1.services(serviceSid).remove();
        return formatTwilioResponse({ serviceSid, status: 'deleted' });
    }
    catch (error) {
        throw new Error(`Failed to delete messaging service: ${error.message}`);
    }
}
async function twilioAddPhoneToService(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid, phoneNumberSid } = args;
        const phoneNumber = await this.twilioClient.messaging.v1.services(serviceSid)
            .phoneNumbers.create({ phoneNumberSid });
        return formatTwilioResponse(phoneNumber);
    }
    catch (error) {
        throw new Error(`Failed to add phone to service: ${error.message}`);
    }
}
async function twilioRemovePhoneFromService(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid, phoneNumberSid } = args;
        await this.twilioClient.messaging.v1.services(serviceSid).phoneNumbers(phoneNumberSid).remove();
        return formatTwilioResponse({ serviceSid, phoneNumberSid, status: 'removed' });
    }
    catch (error) {
        throw new Error(`Failed to remove phone from service: ${error.message}`);
    }
}
async function twilioListServicePhoneNumbers(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid } = args;
        const phoneNumbers = await this.twilioClient.messaging.v1.services(serviceSid).phoneNumbers.list();
        return formatTwilioResponse(phoneNumbers);
    }
    catch (error) {
        throw new Error(`Failed to list service phone numbers: ${error.message}`);
    }
}
async function twilioScheduleMessage(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
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
    }
    catch (error) {
        throw new Error(`Failed to schedule message: ${error.message}`);
    }
}
async function twilioCancelScheduledMessage(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { messageSid } = args;
        const message = await this.twilioClient.messages(messageSid).update({ status: 'canceled' });
        return formatTwilioResponse(message);
    }
    catch (error) {
        throw new Error(`Failed to cancel scheduled message: ${error.message}`);
    }
}
async function twilioGetMessageMedia(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { messageSid, mediaSid } = args;
        if (mediaSid) {
            const media = await this.twilioClient.messages(messageSid).media(mediaSid).fetch();
            return formatTwilioResponse(media);
        }
        else {
            const mediaList = await this.twilioClient.messages(messageSid).media.list();
            return formatTwilioResponse(mediaList);
        }
    }
    catch (error) {
        throw new Error(`Failed to get message media: ${error.message}`);
    }
}
async function twilioListMessageMedia(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { messageSid } = args;
        const mediaList = await this.twilioClient.messages(messageSid).media.list();
        return formatTwilioResponse(mediaList);
    }
    catch (error) {
        throw new Error(`Failed to list message media: ${error.message}`);
    }
}
async function twilioDeleteMessageMedia(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { messageSid, mediaSid } = args;
        await this.twilioClient.messages(messageSid).media(mediaSid).remove();
        return formatTwilioResponse({ messageSid, mediaSid, status: 'deleted' });
    }
    catch (error) {
        throw new Error(`Failed to delete message media: ${error.message}`);
    }
}
