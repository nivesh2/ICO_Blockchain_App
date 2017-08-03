const bank = artifacts.require('./bank.sol')
const User = artifacts.require('./User.sol')

module.exports = function (deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  deployer.deploy(User)
  deployer.deploy(bank)
}