/**
 * @fileOverview This module acts as a middleman between all the other query modules,
 * to resolve circular dependencies that may arise. All modules are added by their respective
 * files to the queries object below, enabling them to be accessed from each other.
 */
const queries = {};

module.exports = queries;