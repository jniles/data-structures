// tests for lib/bstree.js

var expect = require('chai').expect,
    BST = require('../bstree.js');

describe('BST', function () {

  describe('#insert', function () {

    it('should insert elements into the tree', function () {
      var tree = new BST();
      tree.insert(5, { name: 'John Doe' });
      tree.insert(2, { name: 'Jane Doe' });
      expect(tree.find(5)).to.not.be.null;
      expect(tree.find(2).name).to.equal('Jane Doe');
    });
  });

  describe('#find', function () {
    var tree = new BST();

    it('should return null for empty tree', function () {
      expect(tree.find(0)).to.be.null;
      expect(tree.find(null)).to.be.null;
    });

    it('should find the correct data', function () {
      tree.insert(1, { name : 'jack' });
      expect(tree.find(1).name).to.equal('jack');
    });

    it('should find the correct data (many inserts)', function () {
      for (var i = 0; i < 10000; i++) {
        var id = Math.floor(Math.random() * 100000);
        tree.insert(id, { name : 'hash-'+id.toString() });
      }
      tree.insert(3.1, { name : 'jack' });
      expect(tree.find(3.1).name).to.equal('jack');
    });

    it('should return null when data does not exist', function () {
      expect(tree.find(.0001)).to.be.null;
    });
  });


  describe('#remove()' ,function () {
    var tree = new BST();

    it('silently fails when id not found', function () {
      tree.remove(1);
    });

    it('removes the desired data', function () {
      tree.insert(1, { id : 1 });
      expect(tree.find(1)).to.eql({ id : 1 });
      tree.remove(1);
      expect(tree.find(1)).to.be.null;
    });

  });


  describe('#getMin()', function () {
    var tree = new BST();

    it('should return null for empty tree', function () {
      expect(tree.getMin()).to.be.null;
    });

    it('should return the minimum element in the tree', function () {
      tree.insert(1, { name : 'jack' });
      tree.insert(2, { name : 'johnson' });
      tree.insert(0, { name : 'robert' });
      expect(tree.getMin().name).to.equal('robert');
    });
  });


  describe('#getMax()', function () {
    var tree = new BST();

    it('should return null for empty tree', function () {
      expect(tree.getMax()).to.be.null;
    });

    it('should return the maximum element in the tree', function () {
      tree.insert(1, { name : 'jack' });
      tree.insert(2, { name : 'johnson' });
      tree.insert(0, { name : 'robert' });
      expect(tree.getMax().name).to.equal('johnson');
    });
  });

  describe('#asArray()', function () {

    it('should maintain element ordering', function () {
      var tree = new BST();

      tree.insert(7, { name : 'hope' });
      tree.insert(3, { name : 'candice' });
      tree.insert(9, { name : 'june' });
      tree.insert(1, { name : 'sally' });
      tree.insert(8, { name : 'bob' });

      var array = tree.asArray().map(function (o) {
        return o.name;
      });

      expect(array).to.eql(['sally', 'candice', 'hope', 'bob', 'june']);
    });

    // a stochastic version of the ordering test, to make sure no bugs exist.
    it('should maintain ordering (randomized)', function () {

      var tree = new BST();

      for (var i = 0; i < 10000; i++) {
        var id = Math.floor(Math.random() * 100000);
        tree.insert(id, { id : id });
      }

      var array = tree.asArray().map(function (o) {
        return o.id;
      });

      // copy the array and sort it
      var cp = array.slice();
      cp.sort(function (a,b) { return a < b ? -1 : 1; });

      expect(array).to.eql(cp);
    });
  });


  // test the tree.getSize() method
  describe('#getSize()', function () {
    var tree = new BST();

    it('reports 0 when no nodes inserted', function () {
      expect(tree.getSize()).to.eql(0);
    });

    it('reports 1 when a single node is inserted', function () {
      tree.insert(1, { id : 1 });
      expect(tree.getSize()).to.equal(1);
    });

    it('decriments the size when nodes are removed', function () {
      tree.remove(1);
      expect(tree.getSize()).to.equal(0);
    });
  });


});
