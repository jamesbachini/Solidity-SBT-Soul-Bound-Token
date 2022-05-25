const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('SBT', function () {

  before(async () => {
    [owner,user1] = await ethers.getSigners();
    const SBTContract = await ethers.getContractFactory('SBT');
    sbt = await SBTContract.deploy('Test SBT Token', 'SBT');
  });

  it('Should return the name and ticker', async function () {
    expect(await sbt.name()).to.equal('Test SBT Token');
    expect(await sbt.ticker()).to.equal('SBT');
  });
});
