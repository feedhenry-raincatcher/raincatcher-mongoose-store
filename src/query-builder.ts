// TODO: finish adding types to this
import * as _ from 'lodash';

function buildQuery(expression: any, query: any, fields: any) {
  var field;
  if (null !== fields) {
    for (field in  fields) {
      if (fields.hasOwnProperty(field)) {
        var queryField: any = {};
        if ('undefined' !== typeof query[field]) {
          queryField = query[field];
        }
        queryField[expression] = fields[field];
        query[field] = queryField;
      }
    }
  }
}

const crit_ops: { [index: string]: (query: any, fields: any) => void } = {
  eq: function(query, fields) {
    var field;
    if (null !== fields) {
      for (field in  fields) {
        if (fields.hasOwnProperty(field)) {
          query[field] = fields[field];
        }
      }
    }
  },
  ne: _.partial(buildQuery, '$ne'),
  lt: _.partial(buildQuery, '$lt'),
  le: _.partial(buildQuery, '$le'),
  gt: _.partial(buildQuery, '$gt'),
  ge: _.partial(buildQuery, '$ge'),
  like: _.partial(buildQuery, '$like'),
  'in': _.partial(buildQuery, '$in'),
  geo: function(query, fields) {
    if (null !== fields) {
      var field;
      var earthRadius = 6378; //km
      for (field in  fields) {
        if (fields.hasOwnProperty(field)) {
          var queryField: any = {};
          if ('undefined' !== typeof query[field]) {
            queryField = query[field];
          }
          queryField["$within"] = {
            "$centerSphere": [  // supported by mongodb V1.8 & above
              fields[field].center,
              fields[field].radius / earthRadius
            ]
          };
          query[field] = queryField;
        }
      }
    }
  }
};

/**
 *
 * Creating a mongo query from $fh.db query params
 *
 * See https://access.redhat.com/documentation/en-us/red_hat_mobile_application_platform_hosted/3/html/cloud_api/fh-db for more details
 *
 * @param filterParams
 */
export default function createQuery(filterParams: any) {
  var query = {};

  if (filterParams && filterParams.key && filterParams.value) {
    filterParams.eq = {};
    filterParams.eq[String(filterParams.key)] = String(filterParams.value);
  }

  _.each(crit_ops, function(critOpFunction, op) {
    var fields_values = filterParams[op];
    if (fields_values) {
      crit_ops[op](query, fields_values);
    }
  });

  return query;
};