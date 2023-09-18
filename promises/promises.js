const handleResolvedPromise = () => {
  const resolved = Promise.resolve();

  console.log("Before then() call");
  resolved.then(() => console.log("Resolved!"));
  console.log("After then() call");
};

const handleResolvedPromise2 = () => {
  const resolved = Promise.resolve();

  console.log("#1. Before then() calls (this is a synchronous task)");

  setTimeout(() => { 
    console.log("#6. Timeout before then() calls (this is a macrotask)"); 
  }, 0);

  resolved
    .then(() => console.log("#3. Resolved three! (this is a microtask)"))
    .then(() => {
      console.log("#4. Resolved four! (this is a microtask)")
      setTimeout(() => console.log("#7. Resolved 2 with timeout! (this is a macrotask generated in a microtask)"), 0)
    })
    .then(() => console.log("#5. Resolved five! (and this is a microtask too))"));

  console.log("#2. After then() calls (this is a synchronous task)");
};


document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("promiseResolving");
  btn.addEventListener("click", handleResolvedPromise2);
});

// Main script used before any other

// Example with promises resolving

// 1. first annon gets in the microtask and to the stack
// 2. one function and second annon gets on the microtask queue
// 3. one is added to the stack and executed
// 4. annon is added to the stack and executed
// 5. two gets in the microtask queue
// 6. two is added in the stack and executed


/**
 * function () {
    Promise.resolve()
      .then(function () {
        Promise.resolve().then(function one() {
          console.log("Done with first");
        });
      })
      .then(function () {
        Promise.resolve().then(function two() {
          console.log("Done with second");
        });
      });
  });
 */