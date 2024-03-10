export const FIRST_PART_CONTRACT = `
// File: @openzeppelin/contracts/utils/Context.sol


// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}

// File: @openzeppelin/contracts/access/Ownable.sol


// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)


pragma solidity ^0.8.20;


/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * The initial owner is set to the address provided by the deployer. This can
 * later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * "onlyOwner", which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. "address(0)")
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * "onlyOwner" functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account ("newOwner").
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account ("newOwner").
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: cryptoSaves.sol


pragma solidity ^0.8.13;



/// @title Crypto Saving Contract
/// @author Oleanji
/// @notice A contracts that locks funds for a a particular period of time

contract CryptoSaves is Ownable(msg.sender) {
    /// -----------------------------------------------------------------------
    /// Errors
    /// -----------------------------------------------------------------------
    error CannotLockZeroEther();
    error LockupIsntLocked();
    error UnlockTimeHasNotReached();
    error AdditionalMonthsShouldBeMoreThanZero();
    error NoLockupHasBeenDone();

    /// -----------------------------------------------------------------------
    /// Events
    /// -----------------------------------------------------------------------

    event EtherLocked(
        uint256 indexed id,
        string name,
        address owner,
        uint256 amount,
        uint256 releaseTime,
        string lockType
    );

    event EtherUnlocked(
        uint256 indexed id,
        string name,
        address owner,
        uint256 amount
    );

    event LockupTimeExtended(
        uint256 indexed id,
        string name,
        address owner,
        uint256 releaseTime
    );

    /// -----------------------------------------------------------------------
    /// Structs
    /// -----------------------------------------------------------------------

    struct Lockup {
        uint256 lockId;
        string name;
        string lockType;
        uint256 amount;
        uint256 releaseTime;
        bool locked;
    }

    /// -----------------------------------------------------------------------
    /// Mappings
    /// -----------------------------------------------------------------------

    mapping(uint256 => Lockup) public lockups;

    /// -----------------------------------------------------------------------
    /// Variables
    /// -----------------------------------------------------------------------
    uint256 public emergencyUnlockTimestamp;
    uint private lockIdTracker = 0;

    /// -----------------------------------------------------------------------
    /// Constructor
    /// -----------------------------------------------------------------------

    constructor(uint256 _months) {
        lockIdTracker += 1;
        emergencyUnlockTimestamp = block.timestamp + (_months * 30 days);
    }

    /// -----------------------------------------------------------------------
    /// External functions
    /// -----------------------------------------------------------------------

    /// @notice locks your ether for a specific amount of month
    /// @param _months the number of months to lock the ether for
    function lockEther(
        uint256 _months,
        string memory _name,
        string memory _lockType
    ) external payable onlyOwner {
        if (msg.value <= 0) revert CannotLockZeroEther();
        uint256 releaseTime = block.timestamp + (_months * 30 days);
        uint256 lockId = lockIdTracker;
        lockups[lockId] = Lockup(
            lockId,
            _name,
            _lockType,
            msg.value,
            releaseTime,
            true
        );
        lockIdTracker += 1;
        emit EtherLocked(
            lockId,
            _name,
            msg.sender,
            msg.value,
            releaseTime,
            _lockType
        );
    }

    /// @notice unlocks ether when the unlock date has reached
    /// @param _lockId the Id of the lockUp you want to unlock
    function unlockEther(uint256 _lockId) external onlyOwner {
        if (!lockups[_lockId].locked) revert LockupIsntLocked();
        if (block.timestamp < lockups[_lockId].releaseTime)
            revert UnlockTimeHasNotReached();
        uint256 amountToTransfer = lockups[_lockId].amount;
        lockups[_lockId].amount = 0;
        lockups[_lockId].locked = false;
        payable(msg.sender).transfer(amountToTransfer);
        emit EtherUnlocked(
            _lockId,
            lockups[_lockId].name,
            msg.sender,
            amountToTransfer
        );
    }

    /// @notice extends lock time ether when the unlock date has reached
    /// @param _lockId the Id of the lockUp you want to edit its date
    /// @param _additionalMonths the number of months to increase the lock up for
    function extendLockTime(
        uint256 _additionalMonths,
        uint256 _lockId
    ) external onlyOwner {
        if (_additionalMonths <= 0)
            revert AdditionalMonthsShouldBeMoreThanZero();
        if (!lockups[_lockId].locked) revert LockupIsntLocked();
        uint256 newReleaseTime = lockups[_lockId].releaseTime +
            (_additionalMonths * 30 days);
        lockups[_lockId].releaseTime = newReleaseTime;
        emit LockupTimeExtended(
            _lockId,
            lockups[_lockId].name,
            msg.sender,
            newReleaseTime
        );
    }

    /// @notice Withdraws all amount in the contract as long as you have locked once
    function withdrawAllEther() external onlyOwner {
        uint256 currentId = lockIdTracker;
        if (currentId == 0 || address(this).balance <= 0)
            revert NoLockupHasBeenDone();
        if (block.timestamp < lockups[1].releaseTime)
            revert UnlockTimeHasNotReached();
        uint256 amountToTransfer = address(this).balance;
        payable(msg.sender).transfer(amountToTransfer);
    }

    /// @notice Withdraws all amount in the contract as long as the emergency lock period has passed
    function emergencyWithdraw() external onlyOwner {
        uint256 currentId = lockIdTracker;
        if (currentId == 0 || address(this).balance <= 0)
            revert NoLockupHasBeenDone();
        if (
            emergencyUnlockTimestamp > lockups[currentId].releaseTime &&
            emergencyUnlockTimestamp > block.timestamp
        ) revert UnlockTimeHasNotReached();
        uint256 amountToTransfer = address(this).balance;
        payable(msg.sender).transfer(amountToTransfer);
    }

     /// @notice Gets all the Lockups created
    function getAllLockUps() external view returns (Lockup[] memory) {
        uint256 total = lockIdTracker;
        Lockup[] memory lockup = new Lockup[](total);
        for (uint256 i = 1; i < total; i++) {
            lockup[i] = lockups[i];
        }
        return lockup;
    }

    /// @notice Gets specific lock up details
    /// @param _lockId the Id of the lockUp you want details for
    function getLockupDetailsById(
        uint256 _lockId
    ) external view returns (Lockup memory) {
        Lockup memory lockDetails = lockups[_lockId];
        return (lockDetails);
    }

    /// @notice Used to receive ether
    receive() external payable {}
}
`;

export const customizeCryptoSaves = ({
  author,
  contractName,
  includeExtendedEvent,
  includeEmergencyWithdraw,
}: {
  author: string;
  contractName: string;
  includeExtendedEvent: boolean;
  includeEmergencyWithdraw: boolean;
}) => {
  let contractCode = '';

  // Add the first part of the contract
  contractCode += FIRST_PART_CONTRACT;

  // Replace the author dynamically
  contractCode = contractCode.replace(/author Oleanji/g, `author ${author}`);

  // Replace the contract name dynamically
  contractCode = contractCode.replace(
    /contract CryptoSaves/g,
    `contract ${contractName}`
  );

  // Remove LockupTimeExtended event and extendLockTime function if includeExtendedEvent is false
  if (!includeExtendedEvent) {
    contractCode = contractCode.replace(
      /event\s+LockupTimeExtended\s*\(([\s\S]*?)\);/,
      ''
    );
  }

  // Remove extendLockTime function
  if (!includeExtendedEvent) {
    contractCode = contractCode.replace(
      /\/\/\/ @notice extends lock time ether when the unlock date has reached([\s\S]*?)function extendLockTime([\s\S]*?)}/,
      ''
    );
  }

  // Remove emergencyWithdraw function if includeEmergencyWithdraw is false
  if (!includeEmergencyWithdraw) {
    contractCode = contractCode.replace(
      /\/\/\/ @notice Withdraws all amount in the contract as long as the emergency lock period has passed([\s\S]*?)function emergencyWithdraw([\s\S]*?)}/,
      ''
    );
  }

  if (!includeEmergencyWithdraw) {
    contractCode = contractCode.replace(
      /constructor(uint256 _months) {/,
      `constructor() {`
    );
  }

  // Return the customized contract code
  return contractCode;
};

// const customizedCode = customizeCryptoSaves('NewAuthor', 'CustomCryptoSaves', true, false);
