/* Problem #1
A binary tree is a data structure where each node in the tree has two, one, or no, children
nodes.
Implement a binary tree data structure with the following functions:
a) Insert a node to the binary tree 
! b) Swap two nodes on the binary tree
c) An algorithm to Sort the binary tree (https://en.wikipedia.org/wiki/Tree_sort)
! d) Remove a node from the binary tree without breaking the remaining tree structure

Problem #2

Using your tree from Problem #1,

! a) Implement a brute force search algorithm
b) implement a depth-first search algorithm
c) implement a breadth first search algorithm
! d) insert a large number of nodes into your tree (10,000; 100,000; 1,000,000), measure the performance of each of your search algorithms (time to complete), comment on the BigO complexity of each (Best case, average case, worst case)

*/

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = undefined;
    this.right = undefined;
  }
}

class BinaryTree {
  constructor() {
    this.root = undefined;
  }

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

/* Binary Tree
      8
    7   9
  5       10
2   6       20
          11
*/

/* Uncommit for result Depth-first search, pre-order */

// myTree.traverseDFS((node) => {
//   console.log('Depth-first search, pre-order', node.value);
// }, 'preOrder');

/* Depth-first search, pre-order: 
  8, 7, 5, 2, 6, 9, 10, 20, 11
*/

/* Uncommit for result Depth-first search, in-order */

// myTree.traverseDFS((node) => {
//   console.log('Depth-first search, in-order', node.value);
// }, 'inOrder');

/* Depth-first search, in-order: 
  2, 5, 6, 7, 8, 9, 10, 11, 20
*/

/* Uncommit for result Depth-first search, post-order */

// myTree.traverseDFS((node) => {
//   console.log('Depth-first search, post-order', node.value);
// }, 'postOrder');

/* Depth-first search, in-order: 
  2, 6, 5, 7, 11, 20, 10, 9, 8
*/

/* Uncommit for result Breadth-first search algorithm */

myTree.traverseBFS((node) => {
  console.log('Breadth-first search', node.value);
});

/* Depth-first search, in-order: 
  8, 7, 9, 5, 10, 2, 6, 20, 11
*/
