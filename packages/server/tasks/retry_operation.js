import operationService from '../src/services/operationService'
import lastTxHashService from '../src/services/lastTxHashService'
import connectDB from '../config/db'
import logger from '../src/utils/logger'
import { ethers } from 'ethers'

const getOperationId = () => {
  const args = process.argv.slice(2)
  if (args.length < 1) throw new Error('Please provide operation id')
  return args[0]
}

const getGasPrice = () => {
  const args = process.argv.slice(2)
  let gasPrice = args[1]
  if (args.length < 2) {
    gasPrice = '10'
  }
  return ethers.utils.parseUnits(gasPrice, 'gwei')
}

export const retryTransactionByOperationId = async (operationId, gasPrice) => {
  await connectDB()
  const operation = await operationService.findById(operationId)
  logger.json(operation)
  const lastTxHash = await lastTxHashService.getLastTxHashById(operationId)
  operationService.retryTransaction(operationId, lastTxHash, gasPrice)
}

export const sendTxForOperationId = async operationId => {
  const operation = await this.findById(operationId)

  if (!operation) {
    logger.warn(`No such operation found: ${operationId}`)
    throw new Error(`No such operation found: ${operationId}`)
  }

  const params = operation.data

  // Make sure all arguments are passed
  this._checkClaimParams(params)

  // blockhain check that params are valid
  await this._checkParamsWithBlockchainCall(params)
  logger.debug('Blockchain params check passed. Submitting claim tx...')

  // send claim transaction to blockchain
  const tx = await this._sendClaimTx(params)
  logger.info('Submitted claim tx: ' + tx.hash)

  // add transaction details to database
  await operationService.addTransaction(operationId, tx)

  return tx.hash
}

retryTransactionByOperationId(getOperationId(), getGasPrice())
