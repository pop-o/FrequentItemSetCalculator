"use strict";
/*
S => dataset
L => frequent dataset
*/

//initial dataset
const input_table_array = {
  TID: [1, 2, 3, 4, 5],
  item: [
    ["b", "d", "c", "a"],
    ["e", "d", "c"],
    ["a", "b"],
    ["a", "c", "d"],
    ["f", "g", "d", "b"],
  ],
};

//function to assign zeros to count
function assignZero(ItemSet) {
  for (let i = 0; i < ItemSet.itemset.length; i++)
    ItemSet.count.push(Number(0));
}

//pushing unique elements to itemset
function insertUniqueElements(arr, Itemset) {
  for (const x of arr) {
    if (!Itemset.itemset.includes(x)) {
      Itemset.itemset.push(x);
    }
  }
}

//function to calculate the frequent itemsets
function filterUsingMinSupp(Itemset, Frequentset) {
  for (let i = 0; i < Itemset.itemset.length; i++) {
    if (Itemset.count[i] >= min_support) {
      Frequentset.count.push(Itemset.count[i]);
      Frequentset.itemset.push(Itemset.itemset[i]);
    }
  }
}
//take input from user

// const total_tid = prompt("Enter total no of TID");

// for (let i = 0; i < total_tid; i++) {
//   input_table_array.TID.push(Number(i + 1));
//   const element_of_tid = prompt(`Enter total no of elements in TID ${i + 1}`);
//   const item_element = [];
//   for (let j = 0; j < element_of_tid; j++) {
//     item_element[j] = prompt(`Enter ${j + 1} element of tid ${i + 1}`);
//   }
//   input_table_array.item.push(item_element);
// }

//creating a single array of all items for easier counting
function singleArray(arr) {
  let array = [];
  for (const x of arr) {
    array.push(...x);
  }
  return array;
}

const array = singleArray(input_table_array.item);
//itemset 1
const S1 = {
  itemset: [],
  count: [],
};
insertUniqueElements(array, S1);

assignZero(S1); //initialize the count array with zero

//actual counting process
for (let i = 0; i < S1.itemset.length; i++) {
  for (const x of array) {
    if (x === S1.itemset[i]) {
      S1.count[i]++;
    }
  }
}
//displays dataset S1
console.log("Data set S1", S1);

//min_support of the data set
// const min_support = Math.trunc(0.4 * S1.itemset.length);
const min_support = Number(prompt("Enter min_support"));
//computing first frequent item set L1
const L1 = {
  itemset: [],
  count: [],
};

filterUsingMinSupp(S1, L1);

console.log(L1);

//itemset S2
const S2 = {
  itemset: [],
  count: [],
};
//computing S2
for (let j = 0; j < L1.itemset.length; j++) {
  for (let i = j + 1; i < L1.itemset.length; i++) {
    const secondItem = [L1.itemset[j], L1.itemset[i]];
    S2.itemset.push(secondItem);
  }
}

assignZero(S2);

//count the pairs in each item set
for (const x of S2.itemset) {
  const [e1, e2] = x;
  const index = S2.itemset.indexOf(x);
  for (const y of input_table_array.item) {
    if (y.includes(e1) && y.includes(e2)) {
      S2.count[index]++;
    }
  }
}
console.log(S2);
const L2 = {
  itemset: [],
  count: [],
};
filterUsingMinSupp(S2, L2);

console.log(L2);

//third item set
const S3 = {
  itemset: [],
  count: [],
};

const array2 = singleArray(L2.itemset);
insertUniqueElements(array2, S3);
console.log(S3);
/*
i  j  k
0  1  2
0  1  3
0  1  4
0  2  3
0  2  4
0  3  4
1  2  3
1  2  4
1  3  4
2  3  4
*/
const dummyset = [];
for (let i = 0; i < S3.itemset.length - 2; i++) {
  for (let j = i + 1; j < S3.itemset.length - 1; j++) {
    for (let k = j + 1; k < S3.itemset.length; k++) {
      const item3 = [S3.itemset[i], S3.itemset[j], S3.itemset[k]];
      dummyset.push(item3);
    }
  }
}

S3.itemset = dummyset;
assignZero(S3);
for (const x of S3.itemset) {
  const [e1, e2, e3] = x;
  const index = S3.itemset.indexOf(x);
  for (const y of input_table_array.item) {
    if (y.includes(e1) && y.includes(e2) && y.includes(e3)) {
      S3.count[index]++;
    }
  }
}

console.log(S3);

const L3 = {
  itemset: [],
  count: [],
};

filterUsingMinSupp(S3, L3);

console.log(L3);

//generating association rules:
const genRules = {
  itemset: [...L2.itemset, ...L3.itemset],
  count: [...L2.count, ...L3.count],
};
// const arr = [x, y];
const arr = L2.itemset[0];
console.log(arr);

const confidence = Number(prompt("Enter confidence in percent.(eg: 70)")) / 100;
let rules = [];
for (let i = 0; i < genRules.itemset.length; i++) {
  const [x, y, z = ""] = genRules.itemset[i];

  const xindex = L1.itemset.indexOf(x);

  const yindex = L1.itemset.indexOf(y);
  const zindex = L1.itemset.indexOf(z);

  const xconfidence = genRules.count[i] / L1.count[xindex];
  const yconfidence = genRules.count[i] / L1.count[yindex];

  if (xconfidence >= confidence) {
    const rule = `${x}->${y}`;
    rules.push(rule);
  }
  if (yconfidence >= confidence) {
    const rule = `${y}->${x}`;
    rules.push(rule);
  }
}

for (const x of rules) console.log(x);

//display initial dataset

let i = 0;
while (i < input_table_array.TID.length) {
  const table_value = `<tr>
  <td>${input_table_array.TID[i]}</td>
  <td>${input_table_array.item[i]}</td>
  </tr>
  `;
  document
    .querySelector("#initial_dataset")
    .insertAdjacentHTML("beforeend", table_value);
  i++;
}

// //table s1
// const tableS1 = `<table  border="1" cellspacing="0" cellpadding="10" id="S1_table">
//   <tr>
//     <th>Itemset</th>
//     <th>Count</th>
//   </tr>

// </table>`;
// i = 0;
// document.querySelector("body").insertAdjacentHTML("beforeend", tableS1);
// while (i < S1.itemset.length) {
//   const table_value = `<tr>
//   <td>${S1.itemset[i]}</td>
//   <td>${S1.count[i]}</td>
//   </tr>
//   `;
//   console.log(table_value);
//   document
//     .querySelector("#S1_table")
//     .insertAdjacentHTML("beforeend", table_value);
//   i++;
// }

function createtable(tableName, Itemset) {
  const table = `
  <table  border="1" cellspacing="0" cellpadding="10" id="${tableName}">
  <caption>${tableName} table</caption>
  <tr>
    <th>Itemset</th>
    <th>Count</th>
  </tr>

</table>`;
  i = 0;
  document.querySelector("body").insertAdjacentHTML("beforeend", table);
  while (i < Itemset.itemset.length) {
    const table_value = `<tr>
  <td>${Itemset.itemset[i]}</td>
  <td>${Itemset.count[i]}</td>
  </tr>
  `;
    document
      .querySelector(`#${tableName}`)
      .insertAdjacentHTML("beforeend", table_value);
    i++;
  }
}
createtable("tableS1", S1);
createtable("tableL1", L1);
createtable("tableS2", S2);
createtable("tableL2", L2);
createtable("tableS3", S3);
createtable("tableL3", L3);
i = 0;
while (true) {
  const display = `
        <tr>
        <th>${i + 1}</th>
        <th>${rules[i]}</th>
        </tr>
    `;
  i++;
  if (i > rules.length) break;
  document.querySelector("#rules").insertAdjacentHTML("beforeend", display);
}
