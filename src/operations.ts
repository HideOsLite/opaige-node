// Generated from the Opaige API description, https://opaige.com/api/company/v1/openapi.json (version 2026-11-01). Do not edit by hand.

import type { Requester } from './request.js';

export type Json = Record<string, any>;

export class Operations {
  constructor(protected readonly http: Requester) {}

  /** A day’s appointments with the file state and the counter stage. `GET /appointments` */
  listAppointments(params: { date?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/appointments`, { query: { "date": params.date } });
  }

  /** Appointments, from a visa centre’s booking system. `POST /appointments` */
  sendAppointments(params: { body: Json }): Promise<any> {
    return this.http.request("POST", `/appointments`, { query: undefined, body: params.body });
  }

  /** Your bookings with every nudge sent or due. `GET /bookings` */
  listBookings(params: { updatedSince?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/bookings`, { query: { "updated_since": params.updatedSince } });
  }

  /** Bookings, from an airline’s or travel platform’s reservation system: who needs a visa or travel permission, and when each passenger is nudged. `POST /bookings` */
  sendBookings(params: { body: Json }): Promise<any> {
    return this.http.request("POST", `/bookings`, { query: undefined, body: params.body });
  }

  /** One booking by your reference. `GET /bookings/{ref}` */
  getBooking(params: { ref: string }): Promise<any> {
    return this.http.request("GET", `/bookings/${encodeURIComponent(params.ref)}`, { query: undefined });
  }

  /** A case’s finished file, with fresh links. `GET /cases/{id}/file` */
  getCaseFile(params: { id: string }): Promise<any> {
    return this.http.request("GET", `/cases/${encodeURIComponent(params.id)}/file`, { query: undefined });
  }

  /** Send file.ready again. `POST /cases/{id}/file` */
  resendCaseFile(params: { id: string }): Promise<any> {
    return this.http.request("POST", `/cases/${encodeURIComponent(params.id)}/file`, { query: undefined });
  }

  /** An itinerary, cover letter, submission brief or third-party letter. `POST /documents` */
  makeDocument(params: { format?: string | number; body: Json }): Promise<any> {
    return this.http.request("POST", `/documents`, { query: { "format": params.format }, body: params.body });
  }

  /** Every inconsistency in a whole visa file. `POST /file-review` */
  reviewFile(params: { body?: Json; file?: Blob | Uint8Array; filename?: string; fields?: Record<string, string>; idempotencyKey?: string } = {}): Promise<any> {
    return this.http.request("POST", `/file-review`, { query: undefined, body: params.body, file: params.file, filename: params.filename, fields: params.fields, idempotencyKey: params.idempotencyKey });
  }

  /** A review made earlier. `GET /file-review/{id}` */
  getFileReview(params: { id: string }): Promise<any> {
    return this.http.request("GET", `/file-review/${encodeURIComponent(params.id)}`, { query: undefined });
  }

  /** A place to PUT a large PDF before reviewing it. `POST /file-review/uploads` */
  createUpload(): Promise<any> {
    return this.http.request("POST", `/file-review/uploads`, { query: undefined });
  }

  /** Every file that became ready since a moment: the daily batch. `GET /files` */
  listReadyFiles(params: { since?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/files`, { query: { "since": params.since } });
  }

  /** The official visa form, filled from answers. `POST /forms` */
  fillForm(params: { format?: string | number; body: Json }): Promise<any> {
    return this.http.request("POST", `/forms`, { query: { "format": params.format }, body: params.body });
  }

  /** Every case billed, due or paid. `GET /invoices` */
  listInvoices(params: { status?: string | number; from?: string | number; to?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/invoices`, { query: { "status": params.status, "from": params.from, "to": params.to } });
  }

  /** Your lodgements, newest first. `GET /lodgements` */
  listLodgements(): Promise<any> {
    return this.http.request("GET", `/lodgements`, { query: undefined });
  }

  /** Fill a visa application on the government portal, parked before the declarations (au-600) or the photo and signature (us-ds160). `POST /lodgements` */
  createLodgement(params: { body: Json; idempotencyKey?: string }): Promise<any> {
    return this.http.request("POST", `/lodgements`, { query: undefined, body: params.body, idempotencyKey: params.idempotencyKey });
  }

  /** Where a lodgement stands, with the government reference once there is one. `GET /lodgements/{id}` */
  getLodgement(params: { id: string }): Promise<any> {
    return this.http.request("GET", `/lodgements/${encodeURIComponent(params.id)}`, { query: undefined });
  }

  /** Attach supporting documents. `POST /lodgements/{id}/documents` */
  attachLodgementDocuments(params: { id: string; body: Json }): Promise<any> {
    return this.http.request("POST", `/lodgements/${encodeURIComponent(params.id)}/documents`, { query: undefined, body: params.body });
  }

  /** Lodge and pay the government fee (requires authorize: true). `POST /lodgements/{id}/submit` */
  submitLodgement(params: { id: string; body: Json; idempotencyKey?: string }): Promise<any> {
    return this.http.request("POST", `/lodgements/${encodeURIComponent(params.id)}/submit`, { query: undefined, body: params.body, idempotencyKey: params.idempotencyKey });
  }

  /** The questions a DS-160 lodgement answers, as a case asks them. `GET /lodgements/questions` */
  lodgementQuestions(params: { visa?: string | number; purpose?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/lodgements/questions`, { query: { "visa": params.visa, "purpose": params.purpose } });
  }

  /** Who on a flight needs a visa, and by when to file. `POST /passengers/check` */
  checkPassengers(params: { body: Json }): Promise<any> {
    return this.http.request("POST", `/passengers/check`, { query: undefined, body: params.body });
  }

  /** Give a passenger their visa file (billed per file). `POST /passengers/file` */
  givePassengerFile(params: { body: Json; idempotencyKey?: string }): Promise<any> {
    return this.http.request("POST", `/passengers/file`, { query: undefined, body: params.body, idempotencyKey: params.idempotencyKey });
  }

  /** Your page for buying the file, and where passengers get help. `GET /passengers/settings` */
  getPassengerSettings(): Promise<any> {
    return this.http.request("GET", `/passengers/settings`, { query: undefined });
  }

  /** Change them (null clears). `PATCH /passengers/settings` */
  updatePassengerSettings(params: { body: Json }): Promise<any> {
    return this.http.request("PATCH", `/passengers/settings`, { query: undefined, body: params.body });
  }

  /** Stages of passengers who chose to share. `GET /passengers/status` */
  passengerStatus(params: { ref?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/passengers/status`, { query: { "ref": params.ref } });
  }

  /** What a passport needs for a destination. `GET /requirements` */
  checkRequirements(params: { passport?: string | number; destination?: string | number; residence?: string | number; stayDays?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/requirements`, { query: { "passport": params.passport, "destination": params.destination, "residence": params.residence, "stay_days": params.stayDays } });
  }

  /** Who takes the application, where, and who decides it. `GET /routes` */
  whereToApply(params: { residence?: string | number; destination?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/routes`, { query: { "residence": params.residence, "destination": params.destination } });
  }

  /** Every destination the rules cover, with versions. `GET /rules` */
  listRules(): Promise<any> {
    return this.http.request("GET", `/rules`, { query: undefined });
  }

  /** One destination: every passport grouped by what it needs, with sources. `GET /rules/{destination}` */
  getRules(params: { destination: string }): Promise<any> {
    return this.http.request("GET", `/rules/${encodeURIComponent(params.destination)}`, { query: undefined });
  }

  /** Rule changes announced, in force or coming up. `GET /rules/notices` */
  listRuleNotices(params: { since?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/rules/notices`, { query: { "since": params.since } });
  }

  /** Admitted students, with the visa stage where each agreed to share it. `GET /students` */
  listStudents(): Promise<any> {
    return this.http.request("GET", `/students`, { query: undefined });
  }

  /** Admitted students, from a school’s admissions system; each gets a visa link. `POST /students` */
  sendStudents(params: { body: Json }): Promise<any> {
    return this.http.request("POST", `/students`, { query: undefined, body: params.body });
  }

  /** A UK sponsor’s refusal, enrolment and completion rates as the Basic Compliance Assessment works them. `GET /students/compliance` */
  sponsorCompliance(params: { asOf?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/students/compliance`, { query: { "as_of": params.asOf } });
  }

  /** Pre-CAS: a UK Student’s money against the Immigration Rules, each finding with its paragraph. `POST /students/funds-check` */
  studentFundsCheck(params: { body: Json }): Promise<any> {
    return this.http.request("POST", `/students/funds-check`, { query: undefined, body: params.body });
  }

  /** Trips and where each case stands. `GET /trips` */
  listTrips(params: { status?: string | number; updatedSince?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/trips`, { query: { "status": params.status, "updated_since": params.updatedSince } });
  }

  /** Plan a trip; it follows your approval rules. `POST /trips` */
  createTrip(params: { body: Json }): Promise<any> {
    return this.http.request("POST", `/trips`, { query: undefined, body: params.body });
  }

  /** One trip, with its case. `GET /trips/{id}` */
  getTrip(params: { id: string }): Promise<any> {
    return this.http.request("GET", `/trips/${encodeURIComponent(params.id)}`, { query: undefined });
  }

  /** A month’s measured uptime against the 99.9% commitment. `GET /uptime` */
  getUptime(params: { month?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/uptime`, { query: { "month": params.month } });
  }

  /** This month’s paid API use and what it comes to. `GET /usage` */
  getUsage(params: { month?: string | number } = {}): Promise<any> {
    return this.http.request("GET", `/usage`, { query: { "month": params.month } });
  }

}
