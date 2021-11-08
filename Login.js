function fibonacci(n) {
  let arr = [0, 1, 1];
  if (n > 3) {
    arr[n] = fibonacci(n - 1) + fibonacci(n - 2);
  }
  return arr[n];
}
