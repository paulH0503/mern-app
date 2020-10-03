import EHttpStatus from './http-status';
import errorAPI from './error';
import middlware from '../middleware';

interface ISchemaDB {
  [name: string]: string
}

// schema
const schemaDBKey: ISchemaDB = {
  USER: 'user'
}

export { 
  errorAPI,
  schemaDBKey,
  EHttpStatus,
  
  middlware
}
