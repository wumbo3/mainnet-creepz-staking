import {
  CBCStaking as Contract,
  Deposit,
  Withdraw
} from "../generated/CBCStaking/CBCStaking"
import { Transaction } from "../generated/schema"

export function handleDeposit(event: Deposit): void {
  let transaction = new Transaction(event.transaction.hash.toHex());
  
  transaction.staker = event.params.staker.toHexString();
  // contractTypes is a private variable in the smart contract, falling back to contract address
  transaction.contractAddress = event.params.contractAddress.toHexString();
  transaction.amount = event.params.tokensAmount;
  transaction.isWithdraw = false;
  transaction.isDeposit = true;
  transaction.timestamp = event.block.timestamp;
  transaction.save()
}

export function handleWithdraw(event: Withdraw): void {
  let transaction = new Transaction(event.transaction.hash.toHex());
  
  transaction.staker = event.params.staker.toHexString();
  // contractTypes is a private variable in the smart contract, falling back to contract address
  transaction.contractAddress = event.params.contractAddress.toHexString();
  transaction.amount = event.params.tokensAmount;
  transaction.isWithdraw = true;
  transaction.isDeposit = false;
  transaction.timestamp = event.block.timestamp;
  transaction.save()
}


// Note: If a handler doesn't require existing field values, it is faster
// _not_ to load the entity from the store. Instead, create it fresh with
// `new Entity(...)`, set the fields that should be updated and save the
// entity back to the store. Fields that were not set or unset remain
// unchanged, allowing for partial updates to be applied.

// It is also possible to access smart contracts from mappings. For
// example, the contract that has emitted the event can be connected to
// with:
//
// let contract = Contract.bind(event.address)
//
// The following functions can then be called on this contract to access
// state variables and other data:
//
// - contract.ACCELERATED_YIELD_DAYS(...)
// - contract.ACCELERATED_YIELD_MULTIPLIER(...)
// - contract.ARMSNft(...)
// - contract.BLACKBOXNft(...)
// - contract.CBCNft(...)
// - contract.SECONDS_IN_DAY(...)
// - contract._baseRates(...)
// - contract.acceleratedYield(...)
// - contract.authorisedLog(...)
// - contract.depositPaused(...)
// - contract.getAccumulatedAmount(...)
// - contract.getCurrentReward(...)
// - contract.getStakerTokens(...)
// - contract.getStakerYield(...)
// - contract.getTokenYield(...)
// - contract.isMultiplierSet(...)
// - contract.onERC721Received(...)
// - contract.owner(...)
// - contract.ownerOf(...)
// - contract.signerAddress(...)
// - contract.stakingLaunched(...)
