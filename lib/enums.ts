// export const ACTION = {
//   CREATE: 'CREATE',
//   UPDATE: 'UPDATE',
//   DELETE: 'DELETE',
// } as const;

// export const ENTITY_TYPE = {
//   BOARD: 'BOARD',
//   LIST: 'LIST',
//   CARD: 'CARD',
// } as const;
export enum ACTION {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum ENTITY_TYPE {
  BOARD = 'BOARD',
  LIST = 'LIST',
  CARD = 'CARD',
}