
// TODO move to modules to decide what datastore they should use.
module.exports= {
  module: 'raincatcher-mongo-connector',
  datasetIDs: {
    WORKORDERS: 'workorders',
    WORKFLOW: 'workflows',
    FILE: 'file',
    GPS: 'gps',
    MESSAGES: 'messages',
    RESULT: 'result',
    GROUP: 'group',
    MEMBERSHIP: 'membership'
  },
  modelLabels: {
    WORKORDERS: 'Workorder',
    WORKFLOW: 'Workflow',
    FILE: 'File',
    GPS: 'gps',
    MESSAGES: 'Message',
    RESULT: 'result',
    GROUP: 'Group',
    MEMBERSHIP: 'Membership'
  },
  test: {
    mongoUri: 'mongodb://localhost:27017/raincatcher-mongo-connector'
  }
};