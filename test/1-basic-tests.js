const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('SBT', function () {

  before(async () => {
    [owner,user1,user2,user3] = await ethers.getSigners();
    const SBTContract = await ethers.getContractFactory('SBT');
    sbt = await SBTContract.deploy('Test SBT Token', 'SBT');
  });

  it('Should return the name and ticker', async function () {
    expect(await sbt.name()).to.equal('Test SBT Token');
    expect(await sbt.ticker()).to.equal('SBT');
  });

  it('hasSoul should return false for new query', async function () {
    expect(await sbt.hasSoul(user1.address)).to.equal(false);
  });

  it('Should mint a new soul', async function () {
    const soul = ['James Bachini', 'https://jamesbachini.com', 99, new Date().getTime()];
    await sbt.mint(user1.address,soul);
  });

  it('hasSoul should return true', async function () {
    expect(await sbt.hasSoul(user1.address)).to.equal(true);
  });

  it('getSoul should return the correct identifier', async function () {
    const soul = await sbt.getSoul(user1.address);
    //console.log(soul);
    expect(soul[0]).to.equal('James Bachini');
  });

  it('Operator should be able to update soul', async function () {
    const soul = ['James Bachini', 'https://jamesbachini.com', 80, new Date().getTime()];
    await sbt.update(user1.address,soul);
  });

  it('getSoul should return the updated value', async function () {
    const soul = await sbt.getSoul(user1.address);
    //console.log(soul);
    expect(soul[2]).to.equal(80);
  });

  it('User should be able to delete their data', async function () {
    await sbt.connect(user1).burn(user1.address);
  });

  it('hasSoul should return false after delete', async function () {
    expect(await sbt.hasSoul(user1.address)).to.equal(false);
  });

  it('hasProfile should return false', async function () {
    expect(await sbt.hasProfile(user1.address,user2.address)).to.equal(false);
  });

  it('Should mint another soul for user2', async function () {
    const soul = ['Alice Smith', 'https://github.com', 42, new Date().getTime()];
    await sbt.mint(user2.address,soul);
  });

  it('3rd party should be able to create a profile', async function () {
    const soul = ['Alice', 'https://google.com', 92, new Date().getTime()];
    await sbt.connect(user1).setProfile(user2.address,soul);
  });

  it('getProfile should return profile', async function () {
    const soul = await sbt.getProfile(user1.address,user2.address);
    expect(soul[2]).to.equal(92);
  });

  it('hasProfile should return true', async function () {
    expect(await sbt.hasProfile(user1.address,user2.address)).to.equal(true);
  });

  it('listProfiles should return profile addresses', async function () {
    const profiles = await sbt.listProfiles(user2.address);
    expect(profiles[0]).to.equal(user1.address);
  });

  it('User should be able to delete their profiles data', async function () {
    await sbt.connect(user2).removeProfile(user1.address,user2.address);
  });

  it('hasProfile should return false after removal', async function () {
    expect(await sbt.hasProfile(user1.address,user2.address)).to.equal(false);
  });

  it('burn should remove all profiles too', async function () {
    const soul = ['Bob Smith', 'https://ethereum.org', 37, new Date().getTime()];
    await sbt.mint(user3.address,soul);
    await sbt.connect(user1).setProfile(user3.address,soul);
    expect(await sbt.hasProfile(user1.address,user3.address)).to.equal(true);
    await sbt.connect(user3).burn(user3.address);
    expect(await sbt.hasProfile(user1.address,user3.address)).to.equal(false);
  });

});
