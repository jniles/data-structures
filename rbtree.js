// Red-Black Tree implimentation in ECMAScript

// constants
var RED = 0,
    BLACK = 1;

function defaultCompare(a,b) {
  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

/**
* Represents a red-black tree
* @constructor
*/
function RBTree(compare) {

  // pointer to the root of the tree
  this.root = null;

  // default to comparison function
  this._compare = compare || defaultCompare;
}

/**
* Represents a tree node in the binary search tree
* @constructor
* @param {number} id - identifier used in comparing tree nodes
* @param {object} data - any data the node will store
*/
function Node(id, data, parent) {
  this.id = id;       // id : integer value for comparison
  this.data = data;   // data : can be anything
  this.parent = parent; // parent : pointer to the parent node
  this.left = null;   // left : pointer to left subtree root
  this.right = null;  // right : pointer to right subtree root
  this.color = RED;   // color: represents the color of the node (default: red)
}

/**
* Returns the root node of the tree
*/
RBTree.prototype.getRoot = function () {
  return this.root;
};

/**
* Allows you to insert data into the binary search tree data structure.
* @param {number} id - identifier used in comparing tree nodes
* @param {object} data - any data the node will store
*/
RBTree.prototype.insert = function (id, data) {
  var root = this.root,
      currentNode = this.root,
      cmp = this._compare,
      res, dir;

  // if the parent is null, then the tree is empty (no root node).  The first insert
  // creates the root node
  if (currentNode === null) {
    this.root = new Node(id, data, null);
    return;
  }

  // recurse down the tree so that the node ends up in the correct location
  // according to the comparison function
  currentNode = this.root;
  while (true) {

    // compare the ids
    res = cmp(id, currentNode.id);

    // should the node be inserted to the left or right?
    dir = (res <= 0) ? 'left' : 'right';

    // break if there are no more child nodes on the path so that we
    // can insert a leaf
    if (currentNode[dir] === null) { break; }
    currentNode = currentNode[dir];
  }

  // insert the node into the tree
  currentNode[dir] = new Node(id, data, currentNode);

  // now we need to make sure that the properties of red-black trees are preserved


};

/**
* Rotates the red-black tree in a direction (left || right)
* @param {string} direction - which way to rotate the tree
*/
RBTree.prototype.rotate = function rotate(direction) {
  var root = this.root,
      opposite = (direction === 'left') ? 'right' : 'left',
      newRoot = root[opposite];

  // the root slides down to the second level
  this.root = newRoot;
  root[opposite] = newRoot[direction];
  newRoot[direction] = root;
};

module.exports = RBTree;
