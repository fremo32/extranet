import { sqliteTable, text, unique, numeric,integer } from 'drizzle-orm/sqlite-core';
import { v4 as uuid } from 'uuid';

const timestamp = {
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
};

// railwayCompanies

const railwayCompanies = sqliteTable('railway_companies', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => uuid()),
	name: text('name')
    .notNull()
    .unique(),
	description: text('description'),
	badgeColor: text('badge_color'),
	isProtected: numeric('is_protected').notNull().default('0')
});

type InsertRailwayCompanyParams = typeof railwayCompanies.$inferInsert;

export { railwayCompanies, type InsertRailwayCompanyParams };

// locoTypes

const locoTypes = sqliteTable('loco_types', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => uuid()),
	name: text('name')
    .notNull()
    .unique()
});

type InsertLocoTypeParams = typeof locoTypes.$inferInsert;

export { locoTypes, type InsertLocoTypeParams };

// locoClasses

const locoClasses = sqliteTable('loco_classes', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => uuid()),
	railwayCompanyId: text("railway_company_id")
		.notNull()
		.references(() => railwayCompanies.id),
	name: text('name').notNull(),
  genre: text("genre"),
	locoTypeId: text("loco_type_id")
		.notNull()
		.references(() => locoTypes.id)
}, (t) => ({
  uniqueLocoClass: unique().on(t.railwayCompanyId, t.name, t.genre)
}));

type InsertLocoClassParams = typeof locoClasses.$inferInsert;

export { locoClasses, type InsertLocoClassParams };

// users

const users = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => uuid()),
	username: text('username')
    .notNull()
    .unique(),
	firstName: text('first_name'),
	lastName: text('last_name')
    .notNull(),
	memberId: text('member_id')
});

type InsertUserParams = typeof users.$inferInsert;

export { users, type InsertUserParams };

// railwayGauges

const railwayGauges = sqliteTable('railway_gauges', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => uuid()),
	name: text('name')
    .notNull()
    .unique(),
	badgeColor: text('badge_color').notNull()
});

export { railwayGauges };

// railwayGauges

const modelManufacturers = sqliteTable('model_manufacturers', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => uuid()),
	name: text('name')
    .notNull()
    .unique(),
});

type InsertModelManufacturerParams = typeof modelManufacturers.$inferInsert;

export { modelManufacturers , type InsertModelManufacturerParams};

// locos

const locos = sqliteTable('locos', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => uuid()),
	...timestamp,
	railwayCompanyId: text("railway_company_id")
		.notNull()
		.references(() => railwayCompanies.id),
	locoClassId: text("loco_class_id")
		.notNull()
		.references(() => locoClasses.id),
	serial: text('serial')
    .notNull(),
	epoch: text('epoch'),
	railwayGaugeId: text("railway_gauge_id")
		.notNull()
		.references(() => railwayGauges.id),
	notes: text('notes'),
	modelManufacturerId: text("model_manufacturer_id")
		.references(() => modelManufacturers.id),
	hasWeathering: numeric('has_weathering').notNull().default('0'),
	hasFredi: numeric('has_fredi').notNull().default('0'),
	hasCard: numeric('has_card').notNull().default('0'),
	userId: text("user_id")
		.references(() => users.id),
	dccAddress: text('dcc_address')
});

type InsertLocoParams = typeof locos.$inferInsert;

export { locos, type InsertLocoParams };

// meetings

const meetings = sqliteTable('meetings', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => uuid()),
	...timestamp,
	title: text('name')
    .notNull(),
	startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
	endDate: integer('endDate', { mode: 'timestamp' }).notNull(),
});

type InsertMeetingParams = typeof meetings.$inferInsert;

export { meetings, type InsertMeetingParams };

// meeting_loco_turnarounds

const meetingLocoTurnarounds = sqliteTable('meeting_loco_turnarounds', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => uuid()),
	...timestamp,
	meetingId: text("meeting_id")
		.notNull()
		.references(() => meetings.id),
	name: text('name')
    .notNull()
		.unique(),
	locoClasses: text('loco_class'),
	startPosition: text('start_position'),
	trainNumber: text('train_number')
});

type InsertMeetingLocoTurnaroundParams = typeof meetingLocoTurnarounds.$inferInsert;

export { meetingLocoTurnarounds, type InsertMeetingLocoTurnaroundParams };

// meeting_loco_registrations

const meetingLocoRegistrations = sqliteTable('meeting_loco_registrations', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => uuid()),
	...timestamp,
	meetingId: text("meeting_id")
		.notNull()
		.references(() => meetings.id),
	locoId: text("loco_id")
		.references(() => locos.id),
	locoSerial: text('loco_serial').notNull(),
	locoDccAddress: text('loco_dcc_address'),
	locoOwner: text('loco_user_full_name'), // TODO: Rename column
	notes: text('notes'),
});

type InsertMeetingLocoRegistrationParams = typeof meetingLocoRegistrations.$inferInsert;

export { meetingLocoRegistrations, type InsertMeetingLocoRegistrationParams };