// use node --allow-natives-syntax .\test-add-status.js to run this example
// https://github.com/v8/v8/blob/master/src/runtime/runtime.h#L868

console.log("    1 - It is a function");
console.log("   16 - Optimized");
console.log("   32 - TurboFanned");
console.log("   64 - Interpreted");
console.log("  128 - Marked for optimization");
console.log("16384 - Baseline optimized");
console.log("--------------------");

const add = (x, y) => x * y;

console.log("Defined, never executed", %GetOptimizationStatus(add));

add(1, 3);
console.log("Executed once", %GetOptimizationStatus(add));

for (let index = 0; index < 1000; index++) {
    add(index, index);
}
console.log("Executed thousand and once", %GetOptimizationStatus(add));

for (let index = 0; index < 99000; index++) {
    add(index, index);
}
console.log("Executed hundred thousand and once", %GetOptimizationStatus(add));

add("one", "two");
console.log("Executed with strings, just once", %GetOptimizationStatus(add));

%OptimizeFunctionOnNextCall(add)
console.log("Optimization scheduled", %GetOptimizationStatus(add));
add(1, 3);
console.log("Explicitly optimized", %GetOptimizationStatus(add));

add("one", "two");
console.log("Executed with strings", %GetOptimizationStatus(add));

add(1.1, 2.2);
console.log("Executed with reals", %GetOptimizationStatus(add));


%DeoptimizeFunction(add)
console.log("Explicitly deoptimized", %GetOptimizationStatus(add));