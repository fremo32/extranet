export type LocoType = {
	id: number;
	name: string;
};

export type LocoClass = {
	id: number;
	name: string;
  locoTypeId: number;
  locoTypeName: number;
};