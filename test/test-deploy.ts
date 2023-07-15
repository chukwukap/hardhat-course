import { assert, expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleStorage", function () {
  let simpleStorageFactory;
  let simpleStorage;
  this.beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it.only("Should start with a favorit number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    // assert
    // expect
    assert.equal(currentValue.toString(), expectedValue);
  });
});
