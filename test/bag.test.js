var randm = require("../randm");
var t = require("tap");

t.beforeEach(() => {
  randm.next.reset();
});

t.test(
  "randm.bag creates a bag of random elements that can be picked",
  function (t) {
    const bag = randm.bag(["foo"]);
    const picked = bag.pick();
    t.equal(picked, "foo");
    t.equal(bag.contents().length, 0);
    t.end();
  }
);

t.test(
  "calling isEmpty() on a randm.bag with items returns false",
  function (t) {
    const bag = randm.bag(["hi"]);
    t.notOk(bag.isEmpty());
    t.end();
  }
);

t.test(
  "calling reset on a randm.bag returns it to the state in which it was initialised",
  function (t) {
    const originalContents = ["original", "items"];
    const bag = randm.bag(originalContents);
    bag.pick();
    t.equal(bag.contents().length, 1);
    bag.put("foo");
    t.equal(bag.contents().length, 2);
    bag.reset();
    t.same(bag.contents(), originalContents);
    t.end();
  }
);

t.test(
  "calling reset on a randm.bag initialised with null returns it to an empty array",
  function (t) {
    const bag = randm.bag(null);
    bag.put("foo");
    t.equal(bag.contents().length, 1);
    bag.reset();
    t.equal(bag.contents().length, 0);
    t.same(bag.contents(), []);
    t.end();
  }
);

t.test(
  "adding items to the array returned by randm.bag contents() does not affect the bag",
  function (t) {
    const bag = randm.bag(["one"]);
    const contents = bag.contents();
    contents.push("two");
    t.equal(bag.contents().length, 1);
    t.same(bag.contents(), ["one"]);
    t.end();
  }
);

t.test(
  "calling reset on a randm.bag more than once returns it to the state in which it was initialised",
  function (t) {
    const originalContents = ["original", "items"];
    const bag = randm.bag(originalContents);
    bag.pick();
    t.equal(bag.contents().length, 1);
    bag.put("foo");
    t.equal(bag.contents().length, 2);
    bag.reset();
    t.same(bag.contents(), originalContents);
    bag.pick();
    bag.put("another thing");
    bag.reset();
    t.same(bag.contents(), originalContents);
    t.end();
  }
);

t.test("calling pick on an empty randm.bag throws an error", function (t) {
  const bag = randm.bag([]);
  t.throws(() => bag.pick(), new Error("Cannot pick from an empty bag"));
  t.end();
});

t.test("should be able to mock the next pick from a randm.bag", function (t) {
  const originalContents = ["original", "items"];
  const bag = randm.bag(originalContents);
  randm.next.bag.pick.returns("mocked");
  t.equal(bag.pick(), "mocked");
  t.end();
});

t.test(
  "should be able to mock the next multiple picks from a randm.bag",
  function (t) {
    const originalContents = ["original", "items"];
    const bag = randm.bag(originalContents);
    randm.next.bag.pick.returns("mocked", "mockedTwo", "mockedThree");
    t.equal(bag.pick(), "mocked");
    t.equal(bag.pick(), "mockedTwo");
    t.equal(bag.pick(), "mockedThree");
    t.end();
  }
);

t.test(
  "randm.next.reset() clears any mocked values from randm.bag pick() calls",
  function (t) {
    const originalContents = ["original"];
    const bag = randm.bag(originalContents);
    randm.next.bag.pick.returns("mocked", "mockedTwo", "mockedThree");
    t.equal(bag.pick(), "mocked");
    randm.next.reset();
    t.equal(bag.pick(), "original");
    t.end();
  }
);
