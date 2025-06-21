var randm = require("../randm");
var t = require("tap");

t.beforeEach(() => {
  randm.next.reset();
});

t.test("randm.shuffle randomly re-orders an array of numbers", function (t) {
  const orig = [1, 2, 3, 4];
  const shuffled = randm.shuffle(orig);
  console.log("randm.shuffle([1, 2, 3, 4])", shuffled);
  t.notSame(orig, shuffled);
  t.end();
});

t.test("randm.shuffle randomly re-orders an array of strings", function (t) {
  const orig = ["a", "b", "c", "d"];
  const shuffled = randm.shuffle(orig);
  console.log('randm.shuffle(["a", "b", "c", "d"])', shuffled);
  t.notSame(orig, shuffled);
  t.end();
});

t.test("randm.shuffle randomly re-orders an array of objects", function (t) {
  const orig = [
    { a: 1, b: "so" },
    { a: 2, b: "huh" },
    { a: 3, b: "wo" },
  ];
  const shuffled = randm.shuffle(orig);
  console.log(
    'randm.shuffle([{ a: 1, b: "so" }, { a: 2, b: "huh" }, { a: 3, b: "wo" }])',
    shuffled
  );
  t.notSame(orig, shuffled);
  t.end();
});

t.test("randm.shuffle randomly re-orders a string", function (t) {
  const orig = "Hello";
  const shuffled = randm.shuffle(orig);
  console.log("randm.shuffle('Hello')", shuffled);
  t.notSame(orig, shuffled);
  t.end();
});

t.test(
  "randm.shuffle returns the original number argument when not passed an iterable",
  function (t) {
    const orig = 1234;
    const shuffled = randm.shuffle(orig);
    console.log("randm.shuffle(1234)", shuffled);
    t.same(orig, shuffled);
    t.equal(shuffled, 1234);
    t.end();
  }
);

t.test("randm.shuffle does not mutate the passed array", function (t) {
  const orig = [1, 2, 3, 4];
  const shuffled = randm.shuffle(orig);
  t.notSame(orig, shuffled);
  t.same(orig, [1, 2, 3, 4]);
  t.end();
});

t.test(
  "should be able to mock the array returned from randm.shuffle",
  function (t) {
    const originalArray = ["original", "items"];
    randm.next.shuffle.returns(["mocked", "items"]);
    const shuffled = randm.shuffle(originalArray);
    t.same(shuffled, ["mocked", "items"]);
    t.end();
  }
);

t.test(
  "should be able to mock the subsequent calls to randm.shuffle",
  function (t) {
    const originalArray = ["original", "items"];
    randm.next.shuffle.returns(["mocked", "items1"], ["mocked", "items2"]);
    const shuffled1 = randm.shuffle(originalArray);
    const shuffled2 = randm.shuffle(originalArray);
    t.same(shuffled1, ["mocked", "items1"]);
    t.same(shuffled2, ["mocked", "items2"]);
    t.end();
  }
);
