/* Problem #1
A binary tree is a data structure where each node in the tree has two, one, or no, children
nodes.
Implement a binary tree data structure with the following functions:
a) Insert a node to the binary tree 
b) Swap two nodes on the binary tree
c) An algorithm to Sort the binary tree (https://en.wikipedia.org/wiki/Tree_sort)
d) Remove a node from the binary tree without breaking the remaining tree structure

Problem #2

Using your tree from Problem #1,

a) Implement a brute force search algorithm
b) implement a depth-first search algorithm
c) implement a breadth first search algorithm
! d) insert a large number of nodes into your tree (10,000; 100,000; 1,000,000), measure the performance of each of your search algorithms (time to complete), comment on the BigO complexity of each (Best case, average case, worst case)

*/

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // a) Insert a node to the binary tree

  add(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (newNode.value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  // b) Swap two nodes on the binary tree

  swap(nodeOne, nodeTwo) {
    const node1 = this.findNode(this.root, nodeOne);
    const node2 = this.findNode(this.root, nodeTwo);

    if (node1 && node2) {
      const temp = node1.value;
      node1.value = node2.value;
      node2.value = temp;
    } else {
      console.log('Cannot find');
    }
  }

  findNode(currentNode, value) {
    if (currentNode === null) return null;
    if (currentNode.value === value) return currentNode;

    return value < currentNode.value
      ? this.findNode(currentNode.left, value)
      : this.findNode(currentNode.right, value);
  }

  // c) Algorithm to sort the binary tree (Tree Sort)
  sort() {
    const sortedArr = [];
    this.inOrderSort(this.root, sortedArr);
    return sortedArr;
  }

  inOrderSort(currentNode, array) {
    if (currentNode !== null) {
      this.inOrderSort(currentNode.left, array);
      array.push(currentNode.value);
      this.inOrderSort(currentNode.right, array);
    }
  }

  // d) Remove a node from the binary tree without breaking the remaining tree structure

  remove(value) {
    this.root = this.removeNode(this.root, value);
  }

  removeNode(currentNode, value) {
    if (currentNode === null) return null;

    if (value < currentNode.value) {
      currentNode.left = this.removeNode(currentNode.left, value);
    } else if (value > currentNode.value) {
      currentNode.right = this.removeNode(currentNode.right, value);
    } else {
      // Node with only one child or no child
      if (currentNode.left === null) return currentNode.right;
      if (currentNode.right === null) return currentNode.left;

      // Node with two children: Get the inorder successor (smallest in the right subtree)
      currentNode.value = this.minNode(currentNode.right).value;
      currentNode.right = this.removeNode(currentNode.right, currentNode.value);
    }
    return currentNode;
  }

  minNode(currentNode) {
    let current = currentNode;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // a) Implement a brute force search algorithm

  // Helper method to find the path from root to a given node
  findPath(node, path, value) {
    if (node === null) return false;

    // Add the current node to the path
    path.push(node.value);

    // Check if the current node is the target
    if (node.value === value) return true;

    // Recursively check in left and right subtrees
    if (
      (node.left && this.findPath(node.left, path, value)) ||
      (node.right && this.findPath(node.right, path, value))
    ) {
      return true;
    }

    // If the node is not in the current path, remove it
    path.pop();
    return false;
  }

  // Brute force method to find the distance between two nodes
  findBrute(value1, value2) {
    const path1 = [];
    const path2 = [];

    // Find paths from root to value1 and value2
    if (!this.findPath(this.root, path1, value1) || !this.findPath(this.root, path2, value2)) {
      return -1; // If either node is not found in the tree
    }

    // Find the first common node (Lowest Common Ancestor - LCA)
    let i = 0;
    while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
      i++;
    }

    // Distance = (distance from root to value1) + (distance from root to value2) - 2 * (distance from root to LCA)
    const distance = path1.length - i + (path2.length - i);
    return distance;
  }

  // b) implement a depth-first search algorithm

  preOrder(node, callback) {
    if (!node) {
      return;
    }

    if (callback) {
      callback(node);
    }

    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }

  inOrder(node, callback) {
    if (!node) {
      return;
    }

    this.inOrder(node.left, callback);

    if (callback) {
      callback(node);
    }

    this.inOrder(node.right, callback);
  }

  postOrder(node, callback) {
    if (!node) {
      return;
    }

    this.postOrder(node.left, callback);
    this.postOrder(node.right, callback);

    if (callback) {
      callback(node);
    }
  }

  traverseDFS(callback, method) {
    if (method === 'preOrder') {
      return this.preOrder(this.root, callback);
    }

    if (method === 'inOrder') {
      return this.inOrder(this.root, callback);
    }

    return this.postOrder(this.root, callback);
  }

  // c) implement a breadth first search algorithm

  traverseBFS(callback) {
    const queue = [this.root];

    while (queue.length) {
      const node = queue.shift();
      callback(node);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }
  }
}

const myTree = new BinaryTree();

myTree.add(8);
myTree.add(7);
myTree.add(9);
myTree.add(5);
myTree.add(10);
myTree.add(20);
myTree.add(6);
myTree.add(2);
myTree.add(11);

console.log('Binary Tree', myTree);
console.log('Binary Tree Sort', myTree.sort());

/* Binary Tree
      8
    7   9
  5       10
2   6       20
          11
*/

/* Uncomment for result of Swap */

// myTree.swap(5, 10);
// console.log('Tree sorted after swapping 5 and 10:', myTree.sort());

/* Uncomment for result of remove node */

// myTree.remove(7);
// console.log('Tree sorted after removing 7:', myTree);
// console.log('Tree sorted after removing 7:', myTree.sort());

/*     PROBLEM #2      */

/* Uncomment for result Implement a brute force search algorithm */

//console.log('Distance between 2 and 11:', myTree.findBrute(2, 11)); //7

/* Uncomment for result Depth-first search, pre-order */

// myTree.traverseDFS((node) => {
//   console.log('Depth-first search, pre-order', node.value);
// }, 'preOrder');

/* Depth-first search, pre-order: 
  8, 7, 5, 2, 6, 9, 10, 20, 11
*/

/* Uncomment for result Depth-first search, in-order */

// myTree.traverseDFS((node) => {
//   console.log('Depth-first search, in-order', node.value);
// }, 'inOrder');

/* Depth-first search, in-order: 
  2, 5, 6, 7, 8, 9, 10, 11, 20
*/

/* Uncomment for result Depth-first search, post-order */

// myTree.traverseDFS((node) => {
//   console.log('Depth-first search, post-order', node.value);
// }, 'postOrder');

/* Depth-first search, post-order: 
  2, 6, 5, 7, 11, 20, 10, 9, 8
*/

/* Uncomment for result Breadth-first search algorithm */

// myTree.traverseBFS((node) => {
//   console.log('Breadth-first search', node.value);
// });

/* Breadth-first search algorithm: 
  8, 7, 9, 5, 10, 2, 6, 20, 11
*/
