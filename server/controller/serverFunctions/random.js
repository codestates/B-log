module.exports = {
  uniqueRandomMaker: (n, max) => {
    const rand = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };
    const nums = [];
    while (nums.length < n) {
      let temp = rand(0, max);
      let isUnique = true;
      for (let i = 0; i < nums.length; i++) {
        if (temp === nums[i]) {
          isUnique = false;
          break;
        }
      }
      if (isUnique) {
        nums.push(temp);
      }
    }
    return nums;
  },
};
