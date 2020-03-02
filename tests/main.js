import assert from "assert";
import { Meteor } from 'meteor/meteor';
import { Users } from '../lib/collections.js';
import StubCollections from 'meteor/hwillson:stub-collections';
import '../server/main.js';
import { Random } from 'meteor/random';


StubCollections.stub(Users);

describe("meteor-mongo", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "meteor-mongo");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    describe('Users', () => {
      describe('methods', () => {
        const userId = Random.id();
        let dbUserId;
        beforeEach(() => {
          Users.remove({});
          for (i = 0; i < 3; i++) {
            dbUserId = Users.insert({
              firstname: faker.name.firstName(),
              lastname: faker.name.lastName(),
              username: faker.internet.userName(),
              email: faker.internet.email(),
              title: faker.name.jobTitle(),
              product: faker.commerce.productName(),
              company: faker.company.companyName(),
              city: faker.address.city(),
              state: faker.address.state(),
              country: faker.address.country(),
              activeIndicator: 'Y',
              effectiveDate: new Date(),
              expiryDate: ''
            });
          }
        });

        afterEach(function () {
          Users.remove({});
          StubCollections.restore();
        });

        it('can generate users', () => {
          assert.equal(Users.find().count(), 3);
        });

        it('can expire users', () => {
          Meteor.server.method_handlers['expireAllUsers'];
          assert.equal(Users.find().count(), 3);
          assert.equal(Users.find({ activeIndicator: 'Y', expiryDate: '' }).count(), 3);
        });

        it('can reset users', () => {
          const resetUsers = Meteor.server.method_handlers['resetAllUsers'];
          const invocation = { dbUserId };
          resetUsers.apply(invocation, [userId]);
          assert.equal(Users.find().count(), 0);
        });

        it('can delete users', () => {
          Meteor.server.method_handlers['deleteAllUsers'];
          assert.equal(Users.find().count(), 3);
          assert.equal(Users.find({ activeIndicator: 'Y', expiryDate: '' }).count(), 3);
        });

      });
    });
  }
});
