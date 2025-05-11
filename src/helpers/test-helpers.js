const core = require('@actions/core')

const getMaxScoreForTest = (runnerResult) => runnerResult.max_score || 0

const getTotalMaxScore = (runnerResults) => {
  return runnerResults.reduce((acc, {results}) => acc + results.max_score, 0)
}

const totalPercentageReducer = (acc, {score, weight, maxScore}) => {
  return acc + ((score || 0) / (maxScore || 1)) * weight
}

const getTestScore = (runnerResult) => {
  core.info(runnerResult.tests)
  return runnerResult.tests.reduce((acc, {score}) => acc + (score || 0), 0)
}

const getTestWeight = (maxScore, allMaxScores) => {
  if (maxScore === 0) {
    return (0).toFixed(1)
  }
  const weight = allMaxScores !== 0 ? (maxScore / allMaxScores) * 100 : 0

  return Math.round(weight).toFixed(2)
}

exports.getMaxScoreForTest = getMaxScoreForTest
exports.getTotalMaxScore = getTotalMaxScore
exports.totalPercentageReducer = totalPercentageReducer
exports.getTestScore = getTestScore
exports.getTestWeight = getTestWeight
