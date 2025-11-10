/**
 * GOOGLE Integration - Pure JavaScript
 * NO MCP dependencies
 */

async function googleFetch(credentials, path, options = {}) {
  const url = path.startsWith('http') ? path : 'https://www.googleapis.com' + path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function gmailSend(credentials, args) {
    const msg = `To: ${args.to}
Subject: ${args.subject}

${args.body}`;
    const encoded = Buffer.from(msg).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const result = await this.gmail.users.messages.send({ userId: 'me', requestBody: { raw: encoded } });
}

async function gmailList(credentials, args) {
    const result = await this.gmail.users.messages.list({ userId: 'me', maxResults: args.maxResults || 10, q: args.query });
}

async function gmailGet(credentials, args) {
    const result = await this.gmail.users.messages.get({ userId: 'me', id: args.messageId });
}

async function gmailDelete(credentials, args) {
    await this.gmail.users.messages.delete({ userId: 'me', id: args.messageId });
}

async function gmailListLabels(credentials, args) {
    const result = await this.gmail.users.labels.list({ userId: 'me' });
}

async function gmailCreateLabel(credentials, args) {
    const result = await this.gmail.users.labels.create({ userId: 'me', requestBody: { name: args.name } });
}

async function gmailDeleteLabel(credentials, args) {
    await this.gmail.users.labels.delete({ userId: 'me', id: args.labelId });
}

async function gmailListDrafts(credentials, args) {
    const result = await this.gmail.users.drafts.list({ userId: 'me', maxResults: args.maxResults || 10 });
}

async function gmailCreateDraft(credentials, args) {
    const msg = `To: ${args.to}
Subject: ${args.subject}

${args.body}`;
    const encoded = Buffer.from(msg).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const result = await this.gmail.users.drafts.create({ userId: 'me', requestBody: { message: { raw: encoded } } });
}

async function gmailGetProfile(credentials, args) {
    const result = await this.gmail.users.getProfile({ userId: 'me' });
}

async function driveList(credentials, args) {
    const result = await this.drive.files.list({ pageSize: args.maxResults || 10, q: args.query, fields: 'files(id, name, mimeType)' });
}

async function driveGet(credentials, args) {
    const result = await this.drive.files.get({ fileId: args.fileId, fields: '*' });
}

async function driveCreateFolder(credentials, args) {
    const metadata = { name: args.name, mimeType: 'application/vnd.google-apps.folder' };
    if (args.parentId) metadata.parents = [args.parentId];
    const result = await this.drive.files.create({ requestBody: metadata, fields: 'id' });
}

async function driveDelete(credentials, args) {
    await this.drive.files.delete({ fileId: args.fileId });
}

async function driveCopy(credentials, args) {
    const result = await this.drive.files.copy({ fileId: args.fileId, requestBody: { name: args.name }, fields: 'id' });
}

async function driveShare(credentials, args) {
    await this.drive.permissions.create({ fileId: args.fileId, requestBody: { type: 'user', role: args.role, emailAddress: args.email } });
}

async function driveListPerms(credentials, args) {
    const result = await this.drive.permissions.list({ fileId: args.fileId, fields: '*' });
}

async function driveSearch(credentials, args) {
    const result = await this.drive.files.list({ q: args.query, fields: 'files(id, name, mimeType)' });
}

async function driveExport(credentials, args) {
    const result = await this.drive.files.export({ fileId: args.fileId, mimeType: args.mimeType });
}

async function driveGetContent(credentials, args) {
    const result = await this.drive.files.get({ fileId: args.fileId, alt: 'media' });
}

async function calList(credentials, args) {
    const result = await this.calendar.events.list({ calendarId: args.calendarId || 'primary', maxResults: args.maxResults || 10 });
}

async function calGet(credentials, args) {
    const result = await this.calendar.events.get({ calendarId: args.calendarId || 'primary', eventId: args.eventId });
}

async function calCreate(credentials, args) {
    const event = { summary: args.summary, start: { dateTime: args.start }, end: { dateTime: args.end } };
    const result = await this.calendar.events.insert({ calendarId: 'primary', requestBody: event });
}

async function calUpdate(credentials, args) {
    await this.calendar.events.patch({ calendarId: 'primary', eventId: args.eventId, requestBody: args.updates });
}

async function calDelete(credentials, args) {
    await this.calendar.events.delete({ calendarId: 'primary', eventId: args.eventId });
}

async function sheetsGet(credentials, args) {
    const result = await this.sheets.spreadsheets.values.get({ spreadsheetId: args.spreadsheetId, range: args.range });
}

async function sheetsUpdate(credentials, args) {
    const result = await this.sheets.spreadsheets.values.update({ spreadsheetId: args.spreadsheetId, range: args.range, valueInputOption: 'RAW', requestBody: { values: args.values } });
}

async function sheetsAppend(credentials, args) {
    const result = await this.sheets.spreadsheets.values.append({ spreadsheetId: args.spreadsheetId, range: args.range, valueInputOption: 'RAW', requestBody: { values: args.values } });
}

async function sheetsCreate(credentials, args) {
    const result = await this.sheets.spreadsheets.create({ requestBody: { properties: { title: args.title } } });
}

async function sheetsGetMeta(credentials, args) {
    const result = await this.sheets.spreadsheets.get({ spreadsheetId: args.spreadsheetId });
}

async function sheetsBatch(credentials, args) {
    const result = await this.sheets.spreadsheets.batchUpdate({ spreadsheetId: args.spreadsheetId, requestBody: { requests: args.requests } });
}

async function sheetsClear(credentials, args) {
    await this.sheets.spreadsheets.values.clear({ spreadsheetId: args.spreadsheetId, range: args.range });
}

async function sheetsAddSheet(credentials, args) {
    await this.sheets.spreadsheets.batchUpdate({ spreadsheetId: args.spreadsheetId, requestBody: { requests: [{ addSheet: { properties: { title: args.title } } }] } });
}

async function sheetsDeleteSheet(credentials, args) {
    await this.sheets.spreadsheets.batchUpdate({ spreadsheetId: args.spreadsheetId, requestBody: { requests: [{ deleteSheet: { sheetId: args.sheetId } }] } });
}

async function sheetsCopySheet(credentials, args) {
    await this.sheets.spreadsheets.sheets.copyTo({ spreadsheetId: args.spreadsheetId, sheetId: args.sheetId, requestBody: { destinationSpreadsheetId: args.destinationSpreadsheetId } });
}

async function docsGet(credentials, args) {
    const result = await this.docs.documents.get({ documentId: args.documentId });
}

async function docsCreate(credentials, args) {
    const result = await this.docs.documents.create({ requestBody: { title: args.title } });
}

async function docsInsert(credentials, args) {
    await this.docs.documents.batchUpdate({ documentId: args.documentId, requestBody: { requests: [{ insertText: { text: args.text, location: { index: args.index || 1 } } }] } });
}

async function docsDelete(credentials, args) {
    await this.docs.documents.batchUpdate({ documentId: args.documentId, requestBody: { requests: [{ deleteContentRange: { range: { startIndex: args.startIndex, endIndex: args.endIndex } } }] } });
}

async function docsReplace(credentials, args) {
    await this.docs.documents.batchUpdate({ documentId: args.documentId, requestBody: { requests: [{ replaceAllText: { containsText: { text: args.find, matchCase: false }, replaceText: args.replace } }] } });
}

async function adminListUsers(credentials, args) {
    const result = await this.admin.users.list({ customer: 'my_customer', maxResults: args.maxResults || 100, query: args.query });
}

async function adminGetUser(credentials, args) {
    const result = await this.admin.users.get({ userKey: args.userKey });
}

async function adminCreateUser(credentials, args) {
    const user = { primaryEmail: args.email, name: { givenName: args.firstName, familyName: args.lastName }, password: args.password };
    const result = await this.admin.users.insert({ requestBody: user });
}

async function adminUpdateUser(credentials, args) {
    await this.admin.users.update({ userKey: args.userKey, requestBody: args.updates });
}

async function adminDeleteUser(credentials, args) {
    await this.admin.users.delete({ userKey: args.userKey });
}

async function adminListAliases(credentials, args) {
    const result = await this.admin.users.aliases.list({ userKey: args.userKey });
}

async function adminAddAlias(credentials, args) {
    await this.admin.users.aliases.insert({ userKey: args.userKey, requestBody: { alias: args.alias } });
}

async function adminDeleteAlias(credentials, args) {
    await this.admin.users.aliases.delete({ userKey: args.userKey, alias: args.alias });
}

async function adminSuspend(credentials, args) {
    await this.admin.users.update({ userKey: args.userKey, requestBody: { suspended: true } });
}

async function adminUnsuspend(credentials, args) {
    await this.admin.users.update({ userKey: args.userKey, requestBody: { suspended: false } });
}

async function adminListGroups(credentials, args) {
    const result = await this.admin.groups.list({ customer: 'my_customer', maxResults: args.maxResults || 100, query: args.query });
}

async function adminGetGroup(credentials, args) {
    const result = await this.admin.groups.get({ groupKey: args.groupKey });
}

async function adminCreateGroup(credentials, args) {
    const group = { email: args.email, name: args.name, description: args.description };
    const result = await this.admin.groups.insert({ requestBody: group });
}

async function adminUpdateGroup(credentials, args) {
    await this.admin.groups.update({ groupKey: args.groupKey, requestBody: args.updates });
}

async function adminDeleteGroup(credentials, args) {
    await this.admin.groups.delete({ groupKey: args.groupKey });
}

async function adminListGroupMembers(credentials, args) {
    const result = await this.admin.members.list({ groupKey: args.groupKey, maxResults: args.maxResults || 100 });
}

async function adminAddGroupMember(credentials, args) {
    await this.admin.members.insert({ groupKey: args.groupKey, requestBody: { email: args.email, role: args.role || 'MEMBER' } });
}

async function adminRemoveGroupMember(credentials, args) {
    await this.admin.members.delete({ groupKey: args.groupKey, memberKey: args.memberKey });
}

async function adminListGroupAliases(credentials, args) {
    const result = await this.admin.groups.aliases.list({ groupKey: args.groupKey });
}

async function adminAddGroupAlias(credentials, args) {
    await this.admin.groups.aliases.insert({ groupKey: args.groupKey, requestBody: { alias: args.alias } });
}

async function adminDeleteGroupAlias(credentials, args) {
    await this.admin.groups.aliases.delete({ groupKey: args.groupKey, alias: args.alias });
}

async function adminListOrgUnits(credentials, args) {
    const result = await this.admin.orgunits.list({ customerId: args.customerId || 'my_customer', orgUnitPath: args.orgUnitPath });
}

async function adminGetOrgUnit(credentials, args) {
    const result = await this.admin.orgunits.get({ customerId: args.customerId, orgUnitPath: args.orgUnitPath });
}

async function adminCreateOrgUnit(credentials, args) {
    const orgUnit = { name: args.name, parentOrgUnitPath: args.parentOrgUnitPath || '/' };
    const result = await this.admin.orgunits.insert({ customerId: args.customerId, requestBody: orgUnit });
}

async function adminUpdateOrgUnit(credentials, args) {
    await this.admin.orgunits.update({ customerId: args.customerId, orgUnitPath: args.orgUnitPath, requestBody: args.updates });
}

async function adminDeleteOrgUnit(credentials, args) {
    await this.admin.orgunits.delete({ customerId: args.customerId, orgUnitPath: args.orgUnitPath });
}

async function adminListDomains(credentials, args) {
    const result = await this.admin.domains.list({ customer: args.customerId });
}

async function adminGetDomain(credentials, args) {
    const result = await this.admin.domains.get({ customer: args.customerId, domainName: args.domainName });
}

async function adminCreateDomain(credentials, args) {
    await this.admin.domains.insert({ customer: args.customerId, requestBody: { domainName: args.domainName } });
}

async function adminDeleteDomain(credentials, args) {
    await this.admin.domains.delete({ customer: args.customerId, domainName: args.domainName });
}

async function adminListDomainAliases(credentials, args) {
    const result = await this.admin.domainAliases.list({ customer: args.customerId });
}

async function adminListRoles(credentials, args) {
    const result = await this.admin.roles.list({ customer: args.customerId, maxResults: args.maxResults || 100 });
}

async function adminGetRole(credentials, args) {
    const result = await this.admin.roles.get({ customer: args.customerId, roleId: args.roleId });
}

async function adminCreateRole(credentials, args) {
    const role = { roleName: args.roleName, rolePrivileges: args.rolePrivileges || [] };
    const result = await this.admin.roles.insert({ customer: args.customerId, requestBody: role });
}

async function adminUpdateRole(credentials, args) {
    await this.admin.roles.update({ customer: args.customerId, roleId: args.roleId, requestBody: args.updates });
}

async function adminDeleteRole(credentials, args) {
    await this.admin.roles.delete({ customer: args.customerId, roleId: args.roleId });
}

async function slidesGet(credentials, args) {
    const result = await this.slides.presentations.get({ presentationId: args.presentationId });
}

async function slidesCreate(credentials, args) {
    const result = await this.slides.presentations.create({ requestBody: { title: args.title } });
}

async function slidesBatch(credentials, args) {
    const result = await this.slides.presentations.batchUpdate({ presentationId: args.presentationId, requestBody: { requests: args.requests } });
}

async function slidesCreateSlide(credentials, args) {
    const requests = [{ createSlide: { insertionIndex: args.insertionIndex || 0 } }];
    await this.slides.presentations.batchUpdate({ presentationId: args.presentationId, requestBody: { requests } });
}

async function slidesDeleteSlide(credentials, args) {
    const requests = [{ deleteObject: { objectId: args.objectId } }];
    await this.slides.presentations.batchUpdate({ presentationId: args.presentationId, requestBody: { requests } });
}

async function slidesCreateShape(credentials, args) {
    const requests = [{ createShape: { shapeType: args.shapeType, elementProperties: { pageObjectId: args.pageId } } }];
    await this.slides.presentations.batchUpdate({ presentationId: args.presentationId, requestBody: { requests } });
}

async function slidesCreateTextbox(credentials, args) {
    const objectId = 'textbox_' + Date.now();
    const requests = [
      { createShape: { objectId, shapeType: 'TEXT_BOX', elementProperties: { pageObjectId: args.pageId } } },
      { insertText: { objectId, text: args.text } }
    ];
    await this.slides.presentations.batchUpdate({ presentationId: args.presentationId, requestBody: { requests } });
}

async function slidesInsertText(credentials, args) {
    const requests = [{ insertText: { objectId: args.objectId, text: args.text } }];
    await this.slides.presentations.batchUpdate({ presentationId: args.presentationId, requestBody: { requests } });
}

async function slidesDeleteText(credentials, args) {
    const requests = [{ deleteText: { objectId: args.objectId, textRange: { startIndex: args.startIndex, endIndex: args.endIndex } } }];
    await this.slides.presentations.batchUpdate({ presentationId: args.presentationId, requestBody: { requests } });
}

async function slidesCreateImage(credentials, args) {
    const requests = [{ createImage: { url: args.url, elementProperties: { pageObjectId: args.pageId } } }];
    await this.slides.presentations.batchUpdate({ presentationId: args.presentationId, requestBody: { requests } });
}

async function tasksListTasklists(credentials, args) {
    const result = await this.tasks.tasklists.list({ maxResults: args.maxResults || 10 });
}

async function tasksGetTasklist(credentials, args) {
    const result = await this.tasks.tasklists.get({ tasklist: args.tasklistId });
}

async function tasksCreateTasklist(credentials, args) {
    const result = await this.tasks.tasklists.insert({ requestBody: { title: args.title } });
}

async function tasksUpdateTasklist(credentials, args) {
    await this.tasks.tasklists.update({ tasklist: args.tasklistId, requestBody: { title: args.title } });
}

async function tasksDeleteTasklist(credentials, args) {
    await this.tasks.tasklists.delete({ tasklist: args.tasklistId });
}

async function tasksListTasks(credentials, args) {
    const result = await this.tasks.tasks.list({ tasklist: args.tasklistId, maxResults: args.maxResults || 100 });
}

async function tasksGetTask(credentials, args) {
    const result = await this.tasks.tasks.get({ tasklist: args.tasklistId, task: args.taskId });
}

async function tasksCreateTask(credentials, args) {
    const task = { title: args.title };
    if (args.notes) task.notes = args.notes;
    if (args.due) task.due = args.due;
    const result = await this.tasks.tasks.insert({ tasklist: args.tasklistId, requestBody: task });
}

async function tasksUpdateTask(credentials, args) {
    await this.tasks.tasks.update({ tasklist: args.tasklistId, task: args.taskId, requestBody: args.updates });
}

async function tasksDeleteTask(credentials, args) {
    await this.tasks.tasks.delete({ tasklist: args.tasklistId, task: args.taskId });
}

async function tasksClearCompleted(credentials, args) {
    await this.tasks.tasks.clear({ tasklist: args.tasklistId });
}

async function peopleGetPerson(credentials, args) {
    const result = await this.people.people.get({ resourceName: args.resourceName, personFields: 'names,emailAddresses,phoneNumbers' });
}

async function peopleListConnections(credentials, args) {
    const result = await this.people.people.connections.list({ resourceName: 'people/me', pageSize: args.pageSize || 100, personFields: 'names,emailAddresses' });
}

async function peopleCreateContact(credentials, args) {
    const contact = {};
    if (args.names) contact.names = args.names;
    if (args.emailAddresses) contact.emailAddresses = args.emailAddresses;
    if (args.phoneNumbers) contact.phoneNumbers = args.phoneNumbers;
    const result = await this.people.people.createContact({ requestBody: contact });
}

async function peopleUpdateContact(credentials, args) {
    await this.people.people.updateContact({ resourceName: args.resourceName, updatePersonFields: 'names,emailAddresses,phoneNumbers', requestBody: args.updates });
}

async function peopleDeleteContact(credentials, args) {
    await this.people.people.deleteContact({ resourceName: args.resourceName });
}

async function formsGet(credentials, args) {
    const result = await this.forms.forms.get({ formId: args.formId });
}

async function formsCreate(credentials, args) {
    const result = await this.forms.forms.create({ requestBody: { info: { title: args.title } } });
}

async function formsBatch(credentials, args) {
    const result = await this.forms.forms.batchUpdate({ formId: args.formId, requestBody: { requests: args.requests } });
}

async function formsListResponses(credentials, args) {
    const result = await this.forms.forms.responses.list({ formId: args.formId });
}

async function formsGetResponse(credentials, args) {
    const result = await this.forms.forms.responses.get({ formId: args.formId, responseId: args.responseId });
}

async function classroomListCourses(credentials, args) {
    const result = await this.classroom.courses.list({ pageSize: args.pageSize || 100 });
}

async function classroomGetCourse(credentials, args) {
    const result = await this.classroom.courses.get({ id: args.courseId });
}

async function classroomCreateCourse(credentials, args) {
    const course = { name: args.name };
    if (args.section) course.section = args.section;
    if (args.ownerId) course.ownerId = args.ownerId;
    const result = await this.classroom.courses.create({ requestBody: course });
}

async function classroomUpdateCourse(credentials, args) {
    await this.classroom.courses.update({ id: args.courseId, requestBody: args.updates });
}

async function classroomDeleteCourse(credentials, args) {
    await this.classroom.courses.delete({ id: args.courseId });
}

async function classroomListStudents(credentials, args) {
    const result = await this.classroom.courses.students.list({ courseId: args.courseId });
}

async function classroomAddStudent(credentials, args) {
    await this.classroom.courses.students.create({ courseId: args.courseId, requestBody: { userId: args.userId } });
}

async function classroomRemoveStudent(credentials, args) {
    await this.classroom.courses.students.delete({ courseId: args.courseId, userId: args.userId });
}

async function classroomListTeachers(credentials, args) {
    const result = await this.classroom.courses.teachers.list({ courseId: args.courseId });
}

async function classroomAddTeacher(credentials, args) {
    await this.classroom.courses.teachers.create({ courseId: args.courseId, requestBody: { userId: args.userId } });
}

async function classroomListCoursework(credentials, args) {
    const result = await this.classroom.courses.courseWork.list({ courseId: args.courseId });
}

async function classroomCreateCoursework(credentials, args) {
    const coursework = { title: args.title, workType: 'ASSIGNMENT' };
    if (args.description) coursework.description = args.description;
    const result = await this.classroom.courses.courseWork.create({ courseId: args.courseId, requestBody: coursework });
}

async function classroomListSubmissions(credentials, args) {
    const result = await this.classroom.courses.courseWork.studentSubmissions.list({ courseId: args.courseId, courseWorkId: args.courseWorkId });
}

async function chatListSpaces(credentials, args) {
    const result = await this.chat.spaces.list({ pageSize: args.pageSize || 100 });
}

async function chatGetSpace(credentials, args) {
    const result = await this.chat.spaces.get({ name: args.spaceName });
}

async function chatCreateSpace(credentials, args) {
    const result = await this.chat.spaces.create({ requestBody: { displayName: args.displayName, spaceType: 'SPACE' } });
}

async function chatListMessages(credentials, args) {
    const result = await this.chat.spaces.messages.list({ parent: args.spaceName });
}

async function chatCreateMessage(credentials, args) {
    const result = await this.chat.spaces.messages.create({ parent: args.spaceName, requestBody: { text: args.text } });
}

async function chatDeleteMessage(credentials, args) {
    await this.chat.spaces.messages.delete({ name: args.messageName });
}

async function chatListMembers(credentials, args) {
    const result = await this.chat.spaces.members.list({ parent: args.spaceName });
}

async function adminListMobileDevices(credentials, args) {
    const result = await this.admin.mobiledevices.list({ customerId: args.customerId || 'my_customer', maxResults: args.maxResults || 100 });
}

async function adminGetMobileDevice(credentials, args) {
    const result = await this.admin.mobiledevices.get({ customerId: args.customerId, resourceId: args.resourceId });
}

async function adminDeleteMobileDevice(credentials, args) {
    await this.admin.mobiledevices.delete({ customerId: args.customerId, resourceId: args.resourceId });
}

async function adminActionMobileDevice(credentials, args) {
    await this.admin.mobiledevices.action({ customerId: args.customerId, resourceId: args.resourceId, requestBody: { action: args.action } });
}

async function adminListChromeDevices(credentials, args) {
    const result = await this.admin.chromeosdevices.list({ customerId: args.customerId || 'my_customer', maxResults: args.maxResults || 100 });
}

async function adminGetChromeDevice(credentials, args) {
    const result = await this.admin.chromeosdevices.get({ customerId: args.customerId, deviceId: args.deviceId });
}

async function adminUpdateChromeDevice(credentials, args) {
    await this.admin.chromeosdevices.update({ customerId: args.customerId, deviceId: args.deviceId, requestBody: args.updates });
}

async function adminActionChromeDevice(credentials, args) {
    await this.admin.chromeosdevices.action({ customerId: args.customerId, resourceId: args.deviceId, requestBody: { action: args.action } });
}

async function adminListCalendarResources(credentials, args) {
    const result = await this.admin.resources.calendars.list({ customer: args.customer });
}

async function adminGetCalendarResource(credentials, args) {
    const result = await this.admin.resources.calendars.get({ customer: args.customer, calendarResourceId: args.calendarResourceId });
}

async function adminCreateCalendarResource(credentials, args) {
    const resource = { resourceId: args.resourceId, resourceName: args.resourceName };
    const result = await this.admin.resources.calendars.insert({ customer: args.customer, requestBody: resource });
}

async function adminUpdateCalendarResource(credentials, args) {
    await this.admin.resources.calendars.update({ customer: args.customer, calendarResourceId: args.calendarResourceId, requestBody: args.updates });
}

async function adminDeleteCalendarResource(credentials, args) {
    await this.admin.resources.calendars.delete({ customer: args.customer, calendarResourceId: args.calendarResourceId });
}

async function adminListBuildings(credentials, args) {
    const result = await this.admin.resources.buildings.list({ customer: args.customer });
}

async function adminGetBuilding(credentials, args) {
    const result = await this.admin.resources.buildings.get({ customer: args.customer, buildingId: args.buildingId });
}

async function adminCreateBuilding(credentials, args) {
    const building = { buildingId: args.buildingId, buildingName: args.buildingName };
    const result = await this.admin.resources.buildings.insert({ customer: args.customer, requestBody: building });
}

async function adminUpdateBuilding(credentials, args) {
    await this.admin.resources.buildings.update({ customer: args.customer, buildingId: args.buildingId, requestBody: args.updates });
}

async function adminDeleteBuilding(credentials, args) {
    await this.admin.resources.buildings.delete({ customer: args.customer, buildingId: args.buildingId });
}

async function adminListFeatures(credentials, args) {
    const result = await this.admin.resources.features.list({ customer: args.customer });
}

async function adminCreateFeature(credentials, args) {
    const result = await this.admin.resources.features.insert({ customer: args.customer, requestBody: { name: args.name } });
}

async function adminDeleteFeature(credentials, args) {
    await this.admin.resources.features.delete({ customer: args.customer, featureKey: args.featureKey });
}

async function adminListSchemas(credentials, args) {
    const result = await this.admin.schemas.list({ customerId: args.customerId });
}

async function adminGetSchema(credentials, args) {
    const result = await this.admin.schemas.get({ customerId: args.customerId, schemaKey: args.schemaKey });
}

async function adminCreateSchema(credentials, args) {
    const schema = { schemaName: args.schemaName, fields: args.fields };
    const result = await this.admin.schemas.insert({ customerId: args.customerId, requestBody: schema });
}

async function adminUpdateSchema(credentials, args) {
    await this.admin.schemas.update({ customerId: args.customerId, schemaKey: args.schemaKey, requestBody: args.updates });
}

async function adminDeleteSchema(credentials, args) {
    await this.admin.schemas.delete({ customerId: args.customerId, schemaKey: args.schemaKey });
}

async function adminListTokens(credentials, args) {
    const result = await this.admin.tokens.list({ userKey: args.userKey });
}

async function adminGetToken(credentials, args) {
    const result = await this.admin.tokens.get({ userKey: args.userKey, clientId: args.clientId });
}

async function adminDeleteToken(credentials, args) {
    await this.admin.tokens.delete({ userKey: args.userKey, clientId: args.clientId });
}

async function adminListAsp(credentials, args) {
    const result = await this.admin.asps.list({ userKey: args.userKey });
}

async function adminGetAsp(credentials, args) {
    const result = await this.admin.asps.get({ userKey: args.userKey, codeId: args.codeId });
}

async function adminDeleteAsp(credentials, args) {
    await this.admin.asps.delete({ userKey: args.userKey, codeId: args.codeId });
}

async function adminListRoleAssignments(credentials, args) {
    const result = await this.admin.roleAssignments.list({ customer: args.customer });
}

async function adminGetRoleAssignment(credentials, args) {
    const result = await this.admin.roleAssignments.get({ customer: args.customer, roleAssignmentId: args.roleAssignmentId });
}

async function adminCreateRoleAssignment(credentials, args) {
    const assignment = { roleId: args.roleId, assignedTo: args.assignedTo };
    const result = await this.admin.roleAssignments.insert({ customer: args.customer, requestBody: assignment });
}

async function adminDeleteRoleAssignment(credentials, args) {
    await this.admin.roleAssignments.delete({ customer: args.customer, roleAssignmentId: args.roleAssignmentId });
}

async function reportsUsageUser(credentials, args) {
    const result = await this.reports.userUsageReport.get({ userKey: args.userKey, date: args.date });
}

async function reportsUsageCustomer(credentials, args) {
    const result = await this.reports.customerUsageReports.get({ date: args.date, parameters: args.parameters });
}

async function reportsActivityUser(credentials, args) {
    const result = await this.reports.activities.list({ userKey: args.userKey, applicationName: args.applicationName });
}

async function reportsActivityEntity(credentials, args) {
    const result = await this.reports.activities.list({ applicationName: args.applicationName, customerId: args.entityType === 'customer' ? args.entityKey : undefined, userKey: args.entityType === 'user' ? args.entityKey : undefined });
}

async function licensingListAssignments(credentials, args) {
    const result = await this.licensing.licenseAssignments.listForProductAndSku({ productId: args.productId, skuId: args.skuId, customerId: 'my_customer' });
}

async function licensingGetAssignment(credentials, args) {
    const result = await this.licensing.licenseAssignments.get({ productId: args.productId, skuId: args.skuId, userId: args.userId });
}

async function licensingAssignLicense(credentials, args) {
    const result = await this.licensing.licenseAssignments.insert({ productId: args.productId, skuId: args.skuId, requestBody: { userId: args.userId } });
}

async function licensingUpdateAssignment(credentials, args) {
    await this.licensing.licenseAssignments.update({ productId: args.productId, skuId: args.skuId, userId: args.userId, requestBody: args.updates });
}

async function licensingDeleteAssignment(credentials, args) {
    await this.licensing.licenseAssignments.delete({ productId: args.productId, skuId: args.skuId, userId: args.userId });
}

async function adminGetSecuritySettings(credentials, args) {
    const result = await this.admin.customers.get({ customerKey: args.customer });
}

async function adminUpdateSecuritySettings(credentials, args) {
    const result = await this.admin.customers.patch({ customerKey: args.customer, requestBody: args.settings });
}

async function adminListAlerts(credentials, args) {
    // Note: Requires Alert Center API
}

async function adminGetAlert(credentials, args) {
}

async function adminDeleteAlert(credentials, args) {
}

async function adminRevokeToken(credentials, args) {
    await this.admin.tokens.delete({ userKey: args.userKey, clientId: args.clientId });
}

async function adminGetCustomerInfo(credentials, args) {
    const result = await this.admin.customers.get({ customerKey: args.customer });
}

async function gmailBatchModify(credentials, args) {
    const result = await this.gmail.users.messages.batchModify({
      userId: args.userId || 'me',
      requestBody: {
        ids: args.ids,
        addLabelIds: args.addLabelIds,
        removeLabelIds: args.removeLabelIds
      }
    });
}

async function gmailImportMessage(credentials, args) {
    const result = await this.gmail.users.messages.import({
      userId: args.userId || 'me',
      requestBody: args.message,
      internalDateSource: args.internalDateSource
    });
}

async function gmailInsertMessage(credentials, args) {
    const result = await this.gmail.users.messages.insert({
      userId: args.userId || 'me',
      requestBody: args.message
    });
}

async function gmailStopWatch(credentials, args) {
    await this.gmail.users.stop({ userId: args.userId || 'me' });
}

async function gmailWatch(credentials, args) {
    const result = await this.gmail.users.watch({
      userId: args.userId || 'me',
      requestBody: {
        labelIds: args.labelIds,
        topicName: args.topicName
      }
    });
}

async function driveExportFile(credentials, args) {
    const result = await this.drive.files.export({
      fileId: args.fileId,
      mimeType: args.mimeType
    });
}

async function driveEmptyTrash(credentials, args) {
    await this.drive.files.emptyTrash({});
}

async function driveGetAbout(credentials, args) {
    const result = await this.drive.about.get({
      fields: args.fields || 'storageQuota,user'
    });
}

async function driveListChanges(credentials, args) {
    const result = await this.drive.changes.list({
      pageToken: args.pageToken,
      includeRemoved: args.includeRemoved
    });
}

async function driveGetStartPageToken(credentials, args) {
    const result = await this.drive.changes.getStartPageToken({});
}

async function driveWatchChanges(credentials, args) {
    const result = await this.drive.changes.watch({
      pageToken: args.pageToken,
      requestBody: {
        id: Date.now().toString(),
        type: args.type || 'web_hook',
        address: args.address
      }
    });
}

async function calendarImportEvent(credentials, args) {
    const result = await this.calendar.events.import({
      calendarId: args.calendarId,
      requestBody: args.event
    });
}

async function calendarQuickAdd(credentials, args) {
    const result = await this.calendar.events.quickAdd({
      calendarId: args.calendarId,
      text: args.text
    });
}

async function calendarWatchEvents(credentials, args) {
    const result = await this.calendar.events.watch({
      calendarId: args.calendarId,
      requestBody: {
        id: Date.now().toString(),
        type: args.type || 'web_hook',
        address: args.address
      }
    });
}

async function sheetsBatchUpdate(credentials, args) {
    const result = await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId: args.spreadsheetId,
      requestBody: { requests: args.requests }
    });
}

async function sheetsAppendValues(credentials, args) {
    const result = await this.sheets.spreadsheets.values.append({
      spreadsheetId: args.spreadsheetId,
      range: args.range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: args.values }
    });
}

async function sheetsBatchClear(credentials, args) {
    const result = await this.sheets.spreadsheets.values.batchClear({
      spreadsheetId: args.spreadsheetId,
      requestBody: { ranges: args.ranges }
    });
}

async function executeGoogleTool(toolName, args, credentials) {
  const tools = {
    'google_gmailSend': gmailSend,
    'google_gmailList': gmailList,
    'google_gmailGet': gmailGet,
    'google_gmailDelete': gmailDelete,
    'google_gmailListLabels': gmailListLabels,
    'google_gmailCreateLabel': gmailCreateLabel,
    'google_gmailDeleteLabel': gmailDeleteLabel,
    'google_gmailListDrafts': gmailListDrafts,
    'google_gmailCreateDraft': gmailCreateDraft,
    'google_gmailGetProfile': gmailGetProfile,
    'google_driveList': driveList,
    'google_driveGet': driveGet,
    'google_driveCreateFolder': driveCreateFolder,
    'google_driveDelete': driveDelete,
    'google_driveCopy': driveCopy,
    'google_driveShare': driveShare,
    'google_driveListPerms': driveListPerms,
    'google_driveSearch': driveSearch,
    'google_driveExport': driveExport,
    'google_driveGetContent': driveGetContent,
    'google_calList': calList,
    'google_calGet': calGet,
    'google_calCreate': calCreate,
    'google_calUpdate': calUpdate,
    'google_calDelete': calDelete,
    'google_sheetsGet': sheetsGet,
    'google_sheetsUpdate': sheetsUpdate,
    'google_sheetsAppend': sheetsAppend,
    'google_sheetsCreate': sheetsCreate,
    'google_sheetsGetMeta': sheetsGetMeta,
    'google_sheetsBatch': sheetsBatch,
    'google_sheetsClear': sheetsClear,
    'google_sheetsAddSheet': sheetsAddSheet,
    'google_sheetsDeleteSheet': sheetsDeleteSheet,
    'google_sheetsCopySheet': sheetsCopySheet,
    'google_docsGet': docsGet,
    'google_docsCreate': docsCreate,
    'google_docsInsert': docsInsert,
    'google_docsDelete': docsDelete,
    'google_docsReplace': docsReplace,
    'google_adminListUsers': adminListUsers,
    'google_adminGetUser': adminGetUser,
    'google_adminCreateUser': adminCreateUser,
    'google_adminUpdateUser': adminUpdateUser,
    'google_adminDeleteUser': adminDeleteUser,
    'google_adminListAliases': adminListAliases,
    'google_adminAddAlias': adminAddAlias,
    'google_adminDeleteAlias': adminDeleteAlias,
    'google_adminSuspend': adminSuspend,
    'google_adminUnsuspend': adminUnsuspend,
    'google_adminListGroups': adminListGroups,
    'google_adminGetGroup': adminGetGroup,
    'google_adminCreateGroup': adminCreateGroup,
    'google_adminUpdateGroup': adminUpdateGroup,
    'google_adminDeleteGroup': adminDeleteGroup,
    'google_adminListGroupMembers': adminListGroupMembers,
    'google_adminAddGroupMember': adminAddGroupMember,
    'google_adminRemoveGroupMember': adminRemoveGroupMember,
    'google_adminListGroupAliases': adminListGroupAliases,
    'google_adminAddGroupAlias': adminAddGroupAlias,
    'google_adminDeleteGroupAlias': adminDeleteGroupAlias,
    'google_adminListOrgUnits': adminListOrgUnits,
    'google_adminGetOrgUnit': adminGetOrgUnit,
    'google_adminCreateOrgUnit': adminCreateOrgUnit,
    'google_adminUpdateOrgUnit': adminUpdateOrgUnit,
    'google_adminDeleteOrgUnit': adminDeleteOrgUnit,
    'google_adminListDomains': adminListDomains,
    'google_adminGetDomain': adminGetDomain,
    'google_adminCreateDomain': adminCreateDomain,
    'google_adminDeleteDomain': adminDeleteDomain,
    'google_adminListDomainAliases': adminListDomainAliases,
    'google_adminListRoles': adminListRoles,
    'google_adminGetRole': adminGetRole,
    'google_adminCreateRole': adminCreateRole,
    'google_adminUpdateRole': adminUpdateRole,
    'google_adminDeleteRole': adminDeleteRole,
    'google_slidesGet': slidesGet,
    'google_slidesCreate': slidesCreate,
    'google_slidesBatch': slidesBatch,
    'google_slidesCreateSlide': slidesCreateSlide,
    'google_slidesDeleteSlide': slidesDeleteSlide,
    'google_slidesCreateShape': slidesCreateShape,
    'google_slidesCreateTextbox': slidesCreateTextbox,
    'google_slidesInsertText': slidesInsertText,
    'google_slidesDeleteText': slidesDeleteText,
    'google_slidesCreateImage': slidesCreateImage,
    'google_tasksListTasklists': tasksListTasklists,
    'google_tasksGetTasklist': tasksGetTasklist,
    'google_tasksCreateTasklist': tasksCreateTasklist,
    'google_tasksUpdateTasklist': tasksUpdateTasklist,
    'google_tasksDeleteTasklist': tasksDeleteTasklist,
    'google_tasksListTasks': tasksListTasks,
    'google_tasksGetTask': tasksGetTask,
    'google_tasksCreateTask': tasksCreateTask,
    'google_tasksUpdateTask': tasksUpdateTask,
    'google_tasksDeleteTask': tasksDeleteTask,
    'google_tasksClearCompleted': tasksClearCompleted,
    'google_peopleGetPerson': peopleGetPerson,
    'google_peopleListConnections': peopleListConnections,
    'google_peopleCreateContact': peopleCreateContact,
    'google_peopleUpdateContact': peopleUpdateContact,
    'google_peopleDeleteContact': peopleDeleteContact,
    'google_formsGet': formsGet,
    'google_formsCreate': formsCreate,
    'google_formsBatch': formsBatch,
    'google_formsListResponses': formsListResponses,
    'google_formsGetResponse': formsGetResponse,
    'google_classroomListCourses': classroomListCourses,
    'google_classroomGetCourse': classroomGetCourse,
    'google_classroomCreateCourse': classroomCreateCourse,
    'google_classroomUpdateCourse': classroomUpdateCourse,
    'google_classroomDeleteCourse': classroomDeleteCourse,
    'google_classroomListStudents': classroomListStudents,
    'google_classroomAddStudent': classroomAddStudent,
    'google_classroomRemoveStudent': classroomRemoveStudent,
    'google_classroomListTeachers': classroomListTeachers,
    'google_classroomAddTeacher': classroomAddTeacher,
    'google_classroomListCoursework': classroomListCoursework,
    'google_classroomCreateCoursework': classroomCreateCoursework,
    'google_classroomListSubmissions': classroomListSubmissions,
    'google_chatListSpaces': chatListSpaces,
    'google_chatGetSpace': chatGetSpace,
    'google_chatCreateSpace': chatCreateSpace,
    'google_chatListMessages': chatListMessages,
    'google_chatCreateMessage': chatCreateMessage,
    'google_chatDeleteMessage': chatDeleteMessage,
    'google_chatListMembers': chatListMembers,
    'google_adminListMobileDevices': adminListMobileDevices,
    'google_adminGetMobileDevice': adminGetMobileDevice,
    'google_adminDeleteMobileDevice': adminDeleteMobileDevice,
    'google_adminActionMobileDevice': adminActionMobileDevice,
    'google_adminListChromeDevices': adminListChromeDevices,
    'google_adminGetChromeDevice': adminGetChromeDevice,
    'google_adminUpdateChromeDevice': adminUpdateChromeDevice,
    'google_adminActionChromeDevice': adminActionChromeDevice,
    'google_adminListCalendarResources': adminListCalendarResources,
    'google_adminGetCalendarResource': adminGetCalendarResource,
    'google_adminCreateCalendarResource': adminCreateCalendarResource,
    'google_adminUpdateCalendarResource': adminUpdateCalendarResource,
    'google_adminDeleteCalendarResource': adminDeleteCalendarResource,
    'google_adminListBuildings': adminListBuildings,
    'google_adminGetBuilding': adminGetBuilding,
    'google_adminCreateBuilding': adminCreateBuilding,
    'google_adminUpdateBuilding': adminUpdateBuilding,
    'google_adminDeleteBuilding': adminDeleteBuilding,
    'google_adminListFeatures': adminListFeatures,
    'google_adminCreateFeature': adminCreateFeature,
    'google_adminDeleteFeature': adminDeleteFeature,
    'google_adminListSchemas': adminListSchemas,
    'google_adminGetSchema': adminGetSchema,
    'google_adminCreateSchema': adminCreateSchema,
    'google_adminUpdateSchema': adminUpdateSchema,
    'google_adminDeleteSchema': adminDeleteSchema,
    'google_adminListTokens': adminListTokens,
    'google_adminGetToken': adminGetToken,
    'google_adminDeleteToken': adminDeleteToken,
    'google_adminListAsp': adminListAsp,
    'google_adminGetAsp': adminGetAsp,
    'google_adminDeleteAsp': adminDeleteAsp,
    'google_adminListRoleAssignments': adminListRoleAssignments,
    'google_adminGetRoleAssignment': adminGetRoleAssignment,
    'google_adminCreateRoleAssignment': adminCreateRoleAssignment,
    'google_adminDeleteRoleAssignment': adminDeleteRoleAssignment,
    'google_reportsUsageUser': reportsUsageUser,
    'google_reportsUsageCustomer': reportsUsageCustomer,
    'google_reportsActivityUser': reportsActivityUser,
    'google_reportsActivityEntity': reportsActivityEntity,
    'google_licensingListAssignments': licensingListAssignments,
    'google_licensingGetAssignment': licensingGetAssignment,
    'google_licensingAssignLicense': licensingAssignLicense,
    'google_licensingUpdateAssignment': licensingUpdateAssignment,
    'google_licensingDeleteAssignment': licensingDeleteAssignment,
    'google_adminGetSecuritySettings': adminGetSecuritySettings,
    'google_adminUpdateSecuritySettings': adminUpdateSecuritySettings,
    'google_adminListAlerts': adminListAlerts,
    'google_adminGetAlert': adminGetAlert,
    'google_adminDeleteAlert': adminDeleteAlert,
    'google_adminRevokeToken': adminRevokeToken,
    'google_adminGetCustomerInfo': adminGetCustomerInfo,
    'google_gmailBatchModify': gmailBatchModify,
    'google_gmailImportMessage': gmailImportMessage,
    'google_gmailInsertMessage': gmailInsertMessage,
    'google_gmailStopWatch': gmailStopWatch,
    'google_gmailWatch': gmailWatch,
    'google_driveExportFile': driveExportFile,
    'google_driveEmptyTrash': driveEmptyTrash,
    'google_driveGetAbout': driveGetAbout,
    'google_driveListChanges': driveListChanges,
    'google_driveGetStartPageToken': driveGetStartPageToken,
    'google_driveWatchChanges': driveWatchChanges,
    'google_calendarImportEvent': calendarImportEvent,
    'google_calendarQuickAdd': calendarQuickAdd,
    'google_calendarWatchEvents': calendarWatchEvents,
    'google_sheetsBatchUpdate': sheetsBatchUpdate,
    'google_sheetsAppendValues': sheetsAppendValues,
    'google_sheetsBatchClear': sheetsBatchClear,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeGoogleTool };