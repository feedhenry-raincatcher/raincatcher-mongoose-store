// TODO move to the modules

// We need to import mongoose here to be able to reexport its types
import * as mongoose from 'mongoose';

import messages from './messages'
import gps from './gps'
import group from './group'
import workflows from './workflows'
import file from './file'
import membership from './membership'
import workorders from './workorders'
import result from './result'

export interface SchemaMap { [index: string] : SchemaBuilder };
const models: SchemaMap = {
  messages,
  gps,
  group,
  workflows,
  file,
  membership,
  workorders,
  result
};

export default models;

import SchemaBuilder from './SchemaBuilder';
export { SchemaBuilder };