import {
  CBCStaking as StakingContract,
  Deposit as StakeDeposit,
  Withdraw as StakeWithdraw
} from "../generated/CBCStaking/CBCStaking"
import {
  Loomi as LoomiContract,
  Spend as LoomiSpend,
  Withdraw as LoomiWithdraw,
  Deposit as LoomiDeposit,
  DepositFor as LoomiDepositFor,
  ClaimTax as LoomiClaimTax
} from "../generated/Loomi/Loomi"
import { LoomiTransaction, StakeTransaction, TaxCollectionTransaction } from "../generated/schema"

export function handleStakeDeposit(event: StakeDeposit): void {
  let transaction = new StakeTransaction(event.transaction.hash.toHex());
  
  transaction.staker = event.params.staker.toHexString();
  // contractTypes is a private variable in the smart contract, falling back to contract address
  transaction.contractAddress = event.params.contractAddress.toHexString();
  transaction.amount = event.params.tokensAmount;
  transaction.transactionType = "deposit";
  transaction.timestamp = event.block.timestamp;
  transaction.save()
}

export function handleStakeWithdraw(event: StakeWithdraw): void {
  let transaction = new StakeTransaction(event.transaction.hash.toHex());
  
  transaction.staker = event.params.staker.toHexString();
  // contractTypes is a private variable in the smart contract, falling back to contract address
  transaction.contractAddress = event.params.contractAddress.toHexString();
  transaction.amount = event.params.tokensAmount;
  transaction.transactionType = "withdraw";
  transaction.timestamp = event.block.timestamp;
  transaction.save()
}

export function handleDeposit(event: LoomiDeposit): void {
  let transaction = new LoomiTransaction(event.transaction.hash.toHex());

  transaction.userAddress = event.params.userAddress.toHexString();
  transaction.amount = event.params.amount;
  transaction.transactionType = "deposit";
  transaction.timestamp = event.block.timestamp;
  transaction.save();
}

export function handleDepositFor(event: LoomiDepositFor): void {
  let transaction = new LoomiTransaction(event.transaction.hash.toHex());

  transaction.userAddress = event.params.userAddress.toHexString();
  transaction.amount = event.params.amount;
  transaction.transactionType = "depositFor";
  transaction.timestamp = event.block.timestamp;
  transaction.save();
}

export function handleLoomiSpend(event: LoomiSpend): void {
  let transaction = new LoomiTransaction(event.transaction.hash.toHex());

  transaction.userAddress = event.params.userAddress.toHexString();
  transaction.amount = event.params.amount;
  transaction.transactionType = "spend";
  transaction.timestamp = event.block.timestamp;
  transaction.save();
}

export function handleLoomiWithdraw(event: LoomiWithdraw): void {
  let transaction = new LoomiTransaction(event.transaction.hash.toHex());

  transaction.userAddress = event.params.userAddress.toHexString();
  transaction.amount = event.params.amount;
  transaction.transactionType = "withdraw";
  transaction.timestamp = event.block.timestamp;
  transaction.save();
}

export function handleClaimTax(event: LoomiClaimTax): void {
  let transaction = new TaxCollectionTransaction(event.transaction.hash.toHex());

  transaction.userAddress = event.params.userAddress.toHexString();
  transaction.amount = event.params.amount;
  transaction.timestamp = event.block.timestamp;
  transaction.save();
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
// let contract = StakingContract.bind(event.address)
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

// Loomi Contract
// - contract.LoomiSource(...)
// - contract.MAX_SUPPLY(...)
// - contract.MAX_TAX_VALUE(...)
// - contract.activeTaxCollectedAmount(...)
// - contract.allowance(...)
// - contract.approve(...)
// - contract.authorisedLog(...)
// - contract.balanceOf(...)
// - contract.bribesDistributed(...)
// - contract.decimals(...)
// - contract.decreaseAllowance(...)
// - contract.depositedAmount(...)
// - contract.getMaxSupply(...)
// - contract.getUserBalance(...)
// - contract.increaseAllowance(...)
// - contract.isDepositPaused(...)
// - contract.isPaused(...)
// - contract.isTransferPaused(...)
// - contract.isWithdrawPaused(...)
// - contract.name(...)
// - contract.owner(...)
// - contract.spendTaxAmount(...)
// - contract.spendTaxCollectionStopped(...)
// - contract.spentAmount(...)
// - contract.symbol(...)
// - contract.tokenCapSet(...)
// - contract.totalSupply(...)
// - contract.transfer(...)
// - contract.transferFrom(...)
// - contract.withdrawTaxAmount(...)
// - contract.withdrawTaxCollectionStopped(...)