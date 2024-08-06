"use strict";
//initial dataset
const input_table_array = {
  TID: [1, 2, 3, 4, 5],
  item: [
    ["bread", "butter", "milk"],
    ["bread", "butter"],
    ["beer", "cookies", "diaper"],
    ["milk", "diaper", "bread", "butter"],
    ["beer", "diaper"],
  ],
};
//min_support of the data set
const min_support = Math.trunc(0.4 * S1.itemset.length);
//take input from user

// const total_tid = prompt("Enter total no of TID");

// for (let i = 0; i < total_tid; i++) {
//   input_table_array.TID.push(i + 1);
//   const element_of_tid = prompt(`Enter total no of elements in TID ${i + 1}`);
//   const item_element = [];
//   for (let j = 0; j < element_of_tid; j++) {
//     item_element[j] = prompt(`Enter ${j + 1} element of tid ${i + 1}`);
//   }
//   input_table_array.item.push(item_element);
// }

//creating a single array of all items for easier counting
let array = [];
for (const x of input_table_array.item) {
  array.push(...x);
}

let itemset = [];
let count = [];

//pushing unique elements to itemset
for (const x of array) {
  if (!itemset.includes(x)) {
    itemset.push(x);
  }
}

//itemset 1
const S1 = {
  itemset,
  count: [],
};

for (let i = 0; i < S1.itemset.length; i++) S1.count.push(Number(0)); //initialize the count array with zeros

//actual counting process
for (let i = 0; i < S1.itemset.length; i++) {
  for (const x of array) {
    if (x === S1.itemset[i]) {
      S1.count[i]++;
    }
  }
}
//displays dataset S1
console.log(S1);

//computing first frequent item set L1
const firstItemSet = [];
const firstItemSetCount = [];
for (let i = 0; i < S1.itemset.length; i++) {
  if (S1.count[i] >= min_support) {
    firstItemSet.push(S1.itemset[i]);
    firstItemSetCount.push(S1.count[i]);
  }
}

const firstFrequentItemSet = {
  firstItemSet,
  firstItemSetCount,
};

console.log(firstFrequentItemSet);
