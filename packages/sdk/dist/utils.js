"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAccount = exports.signReceiverAddress = exports.createLink = exports.computeProxyAddress = exports.computeBytecode = exports.buildCreate2Address = exports.LinkParams = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _ethers = require("ethers");

var _constants = require("ethers/constants");

var _ethereumjsWallet = _interopRequireDefault(require("ethereumjs-wallet"));

// Turn off annoying warnings
_ethers.ethers.errors.setLogLevel('error');

var LinkParams = function LinkParams(_ref) {
  var token = _ref.token,
      nft = _ref.nft,
      feeToken = _ref.feeToken,
      feeReceiver = _ref.feeReceiver,
      linkId = _ref.linkId,
      nativeTokensAmount = _ref.nativeTokensAmount,
      tokensAmount = _ref.tokensAmount,
      tokenId = _ref.tokenId,
      feeAmount = _ref.feeAmount,
      expiration = _ref.expiration,
      data = _ref.data,
      signerSignature = _ref.signerSignature;
  (0, _classCallCheck2["default"])(this, LinkParams);
  this.token = token;
  this.nft = nft;
  this.feeToken = feeToken;
  this.feeReceiver = feeReceiver;
  this.linkId = linkId;
  this.nativeTokensAmount = nativeTokensAmount;
  this.tokensAmount = tokensAmount;
  this.tokenId = tokenId;
  this.feeAmount = feeAmount;
  this.expiration = expiration;
  this.data = data;
  this.signerSignature = signerSignature;
};

exports.LinkParams = LinkParams;

var buildCreate2Address = function buildCreate2Address(creatorAddress, saltHex, byteCode) {
  var byteCodeHash = _ethers.ethers.utils.keccak256(byteCode);

  return "0x".concat(_ethers.ethers.utils.keccak256("0x".concat(['ff', creatorAddress, saltHex, byteCodeHash].map(function (x) {
    return x.replace(/0x/, '');
  }).join(''))).slice(-40)).toLowerCase();
};

exports.buildCreate2Address = buildCreate2Address;

var computeBytecode = function computeBytecode(masterCopyAddress) {
  var bytecode = "0x363d3d373d3d3d363d73".concat(masterCopyAddress.slice(2), "5af43d82803e903d91602b57fd5bf3");
  return bytecode;
};
/**
 *
 * @param {String} factoryAddress Factory address
 * @param {String} senderAddress Sender address
 * @param {String} campaignId Campaign id
 */


exports.computeBytecode = computeBytecode;

var computeProxyAddress = function computeProxyAddress(factoryAddress, senderAddress, campaignId) {
  if (factoryAddress == null || factoryAddress === '') {
    throw new Error('Please provide factory address');
  }

  if (senderAddress == null || senderAddress === '') {
    throw new Error('Please provide linkdrop master address');
  }

  if (campaignId == null || campaignId === '') {
    throw new Error('Please provide campaign id');
  }

  var salt = _ethers.ethers.utils.solidityKeccak256(['address', 'uint256'], [senderAddress, campaignId]);

  var initcode = String(campaignId) === '0' ? '0x6319ed26266000526103ff60206004601c335afa6040516060f3' : '0x6352c7420d6000526103ff60206004601c335afa6040516060f3';
  var proxyAddress = buildCreate2Address(factoryAddress, salt, initcode);
  return proxyAddress;
};

exports.computeProxyAddress = computeProxyAddress;

var signLink =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref2) {
    var token, nft, feeToken, feeReceiver, linkId, nativeTokensAmount, tokensAmount, tokenId, feeAmount, expiration, version, chainId, linkdropContract, signingKeyOrWallet, abiCoder, messageHash, messageHashToSign, signature;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = _ref2.token, nft = _ref2.nft, feeToken = _ref2.feeToken, feeReceiver = _ref2.feeReceiver, linkId = _ref2.linkId, nativeTokensAmount = _ref2.nativeTokensAmount, tokensAmount = _ref2.tokensAmount, tokenId = _ref2.tokenId, feeAmount = _ref2.feeAmount, expiration = _ref2.expiration, version = _ref2.version, chainId = _ref2.chainId, linkdropContract = _ref2.linkdropContract, signingKeyOrWallet = _ref2.signingKeyOrWallet;

            if (typeof signingKeyOrWallet === 'string') {
              signingKeyOrWallet = new _ethers.ethers.Wallet(signingKeyOrWallet);
            }

            abiCoder = _ethers.ethers.utils.defaultAbiCoder();
            console.log('abiCoder: ', abiCoder);
            messageHash = _ethers.ethers.utils.solidityKeccak256(['address', // token
            'address', // nft
            'address', // feeToken
            'address', // feeReceiver
            'address', // linkId
            'uint', // nativeTokensAmount
            'uint', // tokensAmount
            'uint', // tokenId
            'uint', // feeAmount
            'uint', // expiration
            'uint', // version
            'uint', // chainId
            'address' // linkdropContract
            ], [token, nft, feeToken, feeReceiver, linkId, nativeTokensAmount, tokensAmount, tokenId, feeAmount, expiration, version, chainId, linkdropContract]);
            messageHashToSign = _ethers.ethers.utils.arrayify(messageHash);
            _context.next = 8;
            return signingKeyOrWallet.signMessage(messageHashToSign);

          case 8:
            signature = _context.sent;
            return _context.abrupt("return", signature);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signLink(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var createLink =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(_ref4) {
    var _ref4$token, token, _ref4$nft, nft, _ref4$feeToken, feeToken, _ref4$feeReceiver, feeReceiver, _ref4$nativeTokensAmo, nativeTokensAmount, _ref4$tokensAmount, tokensAmount, _ref4$tokenId, tokenId, _ref4$feeAmount, feeAmount, expiration, version, chainId, linkdropContract, signingKeyOrWallet, linkWallet, linkKey, linkId, signerSignature, linkParams;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref4$token = _ref4.token, token = _ref4$token === void 0 ? _constants.AddressZero : _ref4$token, _ref4$nft = _ref4.nft, nft = _ref4$nft === void 0 ? _constants.AddressZero : _ref4$nft, _ref4$feeToken = _ref4.feeToken, feeToken = _ref4$feeToken === void 0 ? _constants.AddressZero : _ref4$feeToken, _ref4$feeReceiver = _ref4.feeReceiver, feeReceiver = _ref4$feeReceiver === void 0 ? _constants.AddressZero : _ref4$feeReceiver, _ref4$nativeTokensAmo = _ref4.nativeTokensAmount, nativeTokensAmount = _ref4$nativeTokensAmo === void 0 ? 0 : _ref4$nativeTokensAmo, _ref4$tokensAmount = _ref4.tokensAmount, tokensAmount = _ref4$tokensAmount === void 0 ? 0 : _ref4$tokensAmount, _ref4$tokenId = _ref4.tokenId, tokenId = _ref4$tokenId === void 0 ? 0 : _ref4$tokenId, _ref4$feeAmount = _ref4.feeAmount, feeAmount = _ref4$feeAmount === void 0 ? 0 : _ref4$feeAmount, expiration = _ref4.expiration, version = _ref4.version, chainId = _ref4.chainId, linkdropContract = _ref4.linkdropContract, signingKeyOrWallet = _ref4.signingKeyOrWallet;

            if (!(token === _constants.AddressZero && nft === _constants.AddressZero && nativeTokensAmount === 0)) {
              _context2.next = 3;
              break;
            }

            throw new Error('Invalid params. No token chosen.');

          case 3:
            if (!(expiration == null || expiration === '')) {
              _context2.next = 5;
              break;
            }

            throw new Error('Please provide link expiration timestamp');

          case 5:
            if (!(version == null || version === '')) {
              _context2.next = 7;
              break;
            }

            throw new Error('Please provide contract version');

          case 7:
            if (!(chainId == null || chainId === '')) {
              _context2.next = 9;
              break;
            }

            throw new Error('Please provide chain id');

          case 9:
            if (!(linkdropContract == null || linkdropContract === '')) {
              _context2.next = 11;
              break;
            }

            throw new Error('Please provide linkdrop contract address');

          case 11:
            if (!(signingKeyOrWallet == null || signingKeyOrWallet === '')) {
              _context2.next = 13;
              break;
            }

            throw new Error('Please provide signing key or wallet');

          case 13:
            linkWallet = _ethers.ethers.Wallet.createRandom();
            linkKey = linkWallet.privateKey;
            linkId = linkWallet.address;
            _context2.next = 18;
            return signLink({
              token: token,
              nft: nft,
              feeToken: feeToken,
              feeReceiver: feeReceiver,
              linkId: linkId,
              nativeTokensAmount: nativeTokensAmount,
              tokensAmount: tokensAmount,
              tokenId: tokenId,
              feeAmount: feeAmount,
              expiration: expiration,
              version: version,
              chainId: chainId,
              linkdropContract: linkdropContract,
              signingKeyOrWallet: signingKeyOrWallet
            });

          case 18:
            signerSignature = _context2.sent;
            linkParams = new LinkParams({
              token: token,
              nft: nft,
              feeToken: feeToken,
              feeReceiver: feeReceiver,
              linkId: linkId,
              nativeTokensAmount: nativeTokensAmount,
              tokensAmount: tokensAmount,
              tokenId: tokenId,
              feeAmount: feeAmount,
              expiration: expiration,
              signerSignature: signerSignature
            });
            return _context2.abrupt("return", {
              linkKey: linkKey,
              linkId: linkId,
              signerSignature: signerSignature,
              linkParams: linkParams
            });

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createLink(_x2) {
    return _ref5.apply(this, arguments);
  };
}();

exports.createLink = createLink;

var signReceiverAddress =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(linkKey, receiverAddress) {
    var wallet, messageHash, messageHashToSign, signature;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(linkKey == null || linkKey === '')) {
              _context3.next = 2;
              break;
            }

            throw new Error('Please provide link key');

          case 2:
            if (!(receiverAddress == null || receiverAddress === '')) {
              _context3.next = 4;
              break;
            }

            throw new Error('Please provide receiver address');

          case 4:
            wallet = new _ethers.ethers.Wallet(linkKey);
            messageHash = _ethers.ethers.utils.solidityKeccak256(['address'], [receiverAddress]);
            messageHashToSign = _ethers.ethers.utils.arrayify(messageHash);
            _context3.next = 9;
            return wallet.signMessage(messageHashToSign);

          case 9:
            signature = _context3.sent;
            return _context3.abrupt("return", signature);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function signReceiverAddress(_x3, _x4) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Function to generate new account
 * @return {Object} `{address, privateKey}`
 */


exports.signReceiverAddress = signReceiverAddress;

var generateAccount = function generateAccount() {
  var wallet = _ethereumjsWallet["default"].generate();

  var address = wallet.getChecksumAddressString();
  var privateKey = wallet.getPrivateKeyString();
  return {
    address: address,
    privateKey: privateKey
  };
};

exports.generateAccount = generateAccount;