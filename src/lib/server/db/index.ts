import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';
import type { LocoType, LocoClass } from './types';

const db = new Database(DB_PATH, { verbose: console.log });

export function fetchLocoTypes(): LocoType[] {
  const sqlStmt = "SELECT id, name FROM loco_types";

  const stmt = db.prepare(sqlStmt);
  const rows = stmt.all();
  return rows as LocoType[];
}

export function fetchLocoClasses(): LocoClass[] {
  const sqlStmt = `
  SELECT c.id, c.name, c.loco_type_id as locoTypeId, t.name as locoTypeName
  FROM loco_classes c
  JOIN loco_types t
    on c.loco_type_id = t.id`;
  
  const stmt = db.prepare(sqlStmt);
  const rows = stmt.all();
  return rows as LocoClass[];
}

export function createLocoClass(name:string, locoTypeId: number):void {
  const sqlStmt = `
  INSERT INTO loco_classes(name, loco_type_id)
    VALUES($name, $locoTypeId)
  `;
	
  const stmt = db.prepare(sqlStmt);
  stmt.run({ name, locoTypeId });
}