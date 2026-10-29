import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/types-BdKBULy9.js
var types_exports = /* @__PURE__ */ __exportAll({
	CONNECTOR_TOKEN_HEADER: () => CONNECTOR_TOKEN_HEADER,
	CONNECTOR_TOKEN_PENDING_CODE: () => CONNECTOR_TOKEN_PENDING_CODE,
	CONNECTOR_TOKEN_READY_EVENT: () => CONNECTOR_TOKEN_READY_EVENT,
	ConnectorType: () => ConnectorType,
	GoogleCalendarTools: () => GoogleCalendarTools,
	GoogleDriveTools: () => GoogleDriveTools
});
var CONNECTOR_TOKEN_HEADER = "x-connector-access-token";
var CONNECTOR_TOKEN_PENDING_CODE = "connector_token_pending";
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
var ConnectorType = {
	GoogleDrive: "GoogleDrive",
	Gmail: "Gmail",
	GoogleCalendar: "GoogleCalendar",
	Outlook: "Outlook",
	OutlookCalendar: "OutlookCalendar",
	MicrosoftTeams: "MicrosoftTeams",
	Mcp: "Mcp"
};
var GoogleDriveTools = {
	search: "google_drive_search",
	readFile: "google_drive_read_file",
	listFolder: "google_drive_list_folder",
	createFolder: "google_drive_create_folder",
	trashFile: "google_drive_trash_file"
};
var GoogleCalendarTools = {
	listCalendars: "google_calendar_list_calendars",
	search: "google_calendar_search",
	getEvent: "google_calendar_get_event",
	availability: "google_calendar_availability"
};
//#endregion
export { ConnectorType as i, CONNECTOR_TOKEN_PENDING_CODE as n, CONNECTOR_TOKEN_READY_EVENT as r, types_exports as s };
