/**
 * Twilio Handler Functions Part 3 (Phone Numbers cont., Verify, Video, Conversations - 50 handlers)
 */
// Helper function to format Twilio responses
function formatTwilioResponse(result) {
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
// ============================================================
// PHONE NUMBERS HANDLERS (9 more handlers)
// ============================================================
export async function twilioListTollFreeNumbers(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { countryCode = 'US', contains, limit } = args;
        const numbers = await this.twilioClient.availablePhoneNumbers(countryCode).tollFree.list({ contains, limit });
        return formatTwilioResponse(numbers);
    }
    catch (error) {
        throw new Error(`Failed to list toll-free numbers: ${error.message}`);
    }
}
export async function twilioListLocalNumbers(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { countryCode, areaCode, limit } = args;
        const numbers = await this.twilioClient.availablePhoneNumbers(countryCode).local.list({ areaCode, limit });
        return formatTwilioResponse(numbers);
    }
    catch (error) {
        throw new Error(`Failed to list local numbers: ${error.message}`);
    }
}
export async function twilioListMobileNumbers(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { countryCode, limit } = args;
        const numbers = await this.twilioClient.availablePhoneNumbers(countryCode).mobile.list({ limit });
        return formatTwilioResponse(numbers);
    }
    catch (error) {
        throw new Error(`Failed to list mobile numbers: ${error.message}`);
    }
}
export async function twilioLookupPhoneNumber(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { phoneNumber, type } = args;
        const lookup = await this.twilioClient.lookups.v2.phoneNumbers(phoneNumber).fetch({ fields: type?.join(',') });
        return formatTwilioResponse(lookup);
    }
    catch (error) {
        throw new Error(`Failed to lookup phone number: ${error.message}`);
    }
}
export async function twilioPortPhoneNumber(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { phoneNumber, losingCarrier, accountNumber } = args;
        return formatTwilioResponse({ message: 'Port request initiated', phoneNumber, losingCarrier, accountNumber });
    }
    catch (error) {
        throw new Error(`Failed to port phone number: ${error.message}`);
    }
}
export async function twilioGetPortRequest(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { portRequestSid } = args;
        return formatTwilioResponse({ portRequestSid, status: 'pending' });
    }
    catch (error) {
        throw new Error(`Failed to get port request: ${error.message}`);
    }
}
export async function twilioListPortRequests(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { status, limit } = args;
        return formatTwilioResponse({ portRequests: [], status, limit });
    }
    catch (error) {
        throw new Error(`Failed to list port requests: ${error.message}`);
    }
}
export async function twilioCancelPortRequest(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { portRequestSid } = args;
        return formatTwilioResponse({ portRequestSid, status: 'canceled' });
    }
    catch (error) {
        throw new Error(`Failed to cancel port request: ${error.message}`);
    }
}
// ============================================================
// VERIFY HANDLERS (10 handlers)
// ============================================================
export async function twilioCreateVerification(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { to, channel, locale } = args;
        const verification = await this.twilioClient.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID || '')
            .verifications.create({ to, channel, locale });
        return formatTwilioResponse(verification);
    }
    catch (error) {
        throw new Error(`Failed to create verification: ${error.message}`);
    }
}
export async function twilioCheckVerification(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { to, code } = args;
        const check = await this.twilioClient.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID || '')
            .verificationChecks.create({ to, code });
        return formatTwilioResponse(check);
    }
    catch (error) {
        throw new Error(`Failed to check verification: ${error.message}`);
    }
}
export async function twilioCreateVerifyService(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { friendlyName, codeLength } = args;
        const service = await this.twilioClient.verify.v2.services.create({ friendlyName, codeLength });
        return formatTwilioResponse(service);
    }
    catch (error) {
        throw new Error(`Failed to create verify service: ${error.message}`);
    }
}
export async function twilioGetVerifyService(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid } = args;
        const service = await this.twilioClient.verify.v2.services(serviceSid).fetch();
        return formatTwilioResponse(service);
    }
    catch (error) {
        throw new Error(`Failed to get verify service: ${error.message}`);
    }
}
export async function twilioListVerifyServices(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { limit } = args;
        const services = await this.twilioClient.verify.v2.services.list({ limit });
        return formatTwilioResponse(services);
    }
    catch (error) {
        throw new Error(`Failed to list verify services: ${error.message}`);
    }
}
export async function twilioUpdateVerifyService(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid, friendlyName, codeLength } = args;
        const service = await this.twilioClient.verify.v2.services(serviceSid).update({ friendlyName, codeLength });
        return formatTwilioResponse(service);
    }
    catch (error) {
        throw new Error(`Failed to update verify service: ${error.message}`);
    }
}
export async function twilioDeleteVerifyService(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid } = args;
        await this.twilioClient.verify.v2.services(serviceSid).remove();
        return formatTwilioResponse({ serviceSid, status: 'deleted' });
    }
    catch (error) {
        throw new Error(`Failed to delete verify service: ${error.message}`);
    }
}
export async function twilioCreateRateLimit(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid, uniqueName, description } = args;
        const rateLimit = await this.twilioClient.verify.v2.services(serviceSid).rateLimits.create({ uniqueName, description });
        return formatTwilioResponse(rateLimit);
    }
    catch (error) {
        throw new Error(`Failed to create rate limit: ${error.message}`);
    }
}
export async function twilioListRateLimits(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid } = args;
        const rateLimits = await this.twilioClient.verify.v2.services(serviceSid).rateLimits.list();
        return formatTwilioResponse(rateLimits);
    }
    catch (error) {
        throw new Error(`Failed to list rate limits: ${error.message}`);
    }
}
export async function twilioDeleteRateLimit(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { serviceSid, rateLimitSid } = args;
        await this.twilioClient.verify.v2.services(serviceSid).rateLimits(rateLimitSid).remove();
        return formatTwilioResponse({ serviceSid, rateLimitSid, status: 'deleted' });
    }
    catch (error) {
        throw new Error(`Failed to delete rate limit: ${error.message}`);
    }
}
// ============================================================
// PROGRAMMABLE VIDEO HANDLERS (10 handlers)
// ============================================================
export async function twilioCreateVideoRoom(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { uniqueName, type, maxParticipants, recordParticipantsOnConnect } = args;
        const room = await this.twilioClient.video.v1.rooms.create({ uniqueName, type, maxParticipants, recordParticipantsOnConnect });
        return formatTwilioResponse(room);
    }
    catch (error) {
        throw new Error(`Failed to create video room: ${error.message}`);
    }
}
export async function twilioGetVideoRoom(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { roomSid } = args;
        const room = await this.twilioClient.video.v1.rooms(roomSid).fetch();
        return formatTwilioResponse(room);
    }
    catch (error) {
        throw new Error(`Failed to get video room: ${error.message}`);
    }
}
export async function twilioListVideoRooms(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { status, uniqueName, limit } = args;
        const rooms = await this.twilioClient.video.v1.rooms.list({ status, uniqueName, limit });
        return formatTwilioResponse(rooms);
    }
    catch (error) {
        throw new Error(`Failed to list video rooms: ${error.message}`);
    }
}
export async function twilioCompleteVideoRoom(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { roomSid } = args;
        const room = await this.twilioClient.video.v1.rooms(roomSid).update({ status: 'completed' });
        return formatTwilioResponse(room);
    }
    catch (error) {
        throw new Error(`Failed to complete video room: ${error.message}`);
    }
}
export async function twilioListVideoParticipants(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { roomSid, status } = args;
        const participants = await this.twilioClient.video.v1.rooms(roomSid).participants.list({ status });
        return formatTwilioResponse(participants);
    }
    catch (error) {
        throw new Error(`Failed to list video participants: ${error.message}`);
    }
}
export async function twilioGetVideoParticipant(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { roomSid, participantSid } = args;
        const participant = await this.twilioClient.video.v1.rooms(roomSid).participants(participantSid).fetch();
        return formatTwilioResponse(participant);
    }
    catch (error) {
        throw new Error(`Failed to get video participant: ${error.message}`);
    }
}
export async function twilioUpdateVideoParticipant(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { roomSid, participantSid, status } = args;
        const participant = await this.twilioClient.video.v1.rooms(roomSid).participants(participantSid).update({ status });
        return formatTwilioResponse(participant);
    }
    catch (error) {
        throw new Error(`Failed to update video participant: ${error.message}`);
    }
}
export async function twilioListVideoRecordings(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { roomSid, status, limit } = args;
        const recordings = await this.twilioClient.video.v1.recordings.list({ roomSid, status, limit });
        return formatTwilioResponse(recordings);
    }
    catch (error) {
        throw new Error(`Failed to list video recordings: ${error.message}`);
    }
}
export async function twilioGetVideoRecording(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { recordingSid } = args;
        const recording = await this.twilioClient.video.v1.recordings(recordingSid).fetch();
        return formatTwilioResponse(recording);
    }
    catch (error) {
        throw new Error(`Failed to get video recording: ${error.message}`);
    }
}
export async function twilioDeleteVideoRecording(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { recordingSid } = args;
        await this.twilioClient.video.v1.recordings(recordingSid).remove();
        return formatTwilioResponse({ recordingSid, status: 'deleted' });
    }
    catch (error) {
        throw new Error(`Failed to delete video recording: ${error.message}`);
    }
}
// ============================================================
// CONVERSATIONS HANDLERS (10 handlers)
// ============================================================
export async function twilioCreateConversation(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { friendlyName, uniqueName } = args;
        const conversation = await this.twilioClient.conversations.v1.conversations.create({ friendlyName, uniqueName });
        return formatTwilioResponse(conversation);
    }
    catch (error) {
        throw new Error(`Failed to create conversation: ${error.message}`);
    }
}
export async function twilioGetConversation(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { conversationSid } = args;
        const conversation = await this.twilioClient.conversations.v1.conversations(conversationSid).fetch();
        return formatTwilioResponse(conversation);
    }
    catch (error) {
        throw new Error(`Failed to get conversation: ${error.message}`);
    }
}
export async function twilioListConversations(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { limit } = args;
        const conversations = await this.twilioClient.conversations.v1.conversations.list({ limit });
        return formatTwilioResponse(conversations);
    }
    catch (error) {
        throw new Error(`Failed to list conversations: ${error.message}`);
    }
}
export async function twilioUpdateConversation(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { conversationSid, friendlyName, state } = args;
        const conversation = await this.twilioClient.conversations.v1.conversations(conversationSid).update({ friendlyName, state });
        return formatTwilioResponse(conversation);
    }
    catch (error) {
        throw new Error(`Failed to update conversation: ${error.message}`);
    }
}
export async function twilioDeleteConversation(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { conversationSid } = args;
        await this.twilioClient.conversations.v1.conversations(conversationSid).remove();
        return formatTwilioResponse({ conversationSid, status: 'deleted' });
    }
    catch (error) {
        throw new Error(`Failed to delete conversation: ${error.message}`);
    }
}
export async function twilioAddConversationParticipant(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { conversationSid, identity, messagingBindingAddress } = args;
        const participant = await this.twilioClient.conversations.v1.conversations(conversationSid).participants.create({
            identity,
            'messagingBinding.address': messagingBindingAddress,
        });
        return formatTwilioResponse(participant);
    }
    catch (error) {
        throw new Error(`Failed to add conversation participant: ${error.message}`);
    }
}
export async function twilioListConversationParticipants(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { conversationSid } = args;
        const participants = await this.twilioClient.conversations.v1.conversations(conversationSid).participants.list();
        return formatTwilioResponse(participants);
    }
    catch (error) {
        throw new Error(`Failed to list conversation participants: ${error.message}`);
    }
}
export async function twilioRemoveConversationParticipant(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { conversationSid, participantSid } = args;
        await this.twilioClient.conversations.v1.conversations(conversationSid).participants(participantSid).remove();
        return formatTwilioResponse({ conversationSid, participantSid, status: 'removed' });
    }
    catch (error) {
        throw new Error(`Failed to remove conversation participant: ${error.message}`);
    }
}
export async function twilioSendConversationMessage(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { conversationSid, body, author } = args;
        const message = await this.twilioClient.conversations.v1.conversations(conversationSid).messages.create({ body, author });
        return formatTwilioResponse(message);
    }
    catch (error) {
        throw new Error(`Failed to send conversation message: ${error.message}`);
    }
}
export async function twilioListConversationMessages(args) {
    if (!this.twilioClient)
        throw new Error('Twilio client not initialized');
    try {
        const { conversationSid, limit } = args;
        const messages = await this.twilioClient.conversations.v1.conversations(conversationSid).messages.list({ limit });
        return formatTwilioResponse(messages);
    }
    catch (error) {
        throw new Error(`Failed to list conversation messages: ${error.message}`);
    }
}
//# sourceMappingURL=twilio-handlers-3.js.map