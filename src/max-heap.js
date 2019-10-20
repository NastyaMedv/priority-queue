const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (!this.root) return null;
		let heapRoot =	this.detachRoot();
		if (this.parentNodes.length == 0) {this.clear(); return heapRoot.data;}
		//if (this.parentNodes.length == 1) {this.clear(); return heapRoot.data;}
		this.restoreRootFromLastInsertedNode(heapRoot);
		this.parentNodes.shift();
		this.shiftNodeDown(this.root);
		return heapRoot.data;
	}

	detachRoot() {
		let detached = this.root;
		this.root = null;
		if (this.parentNodes[0] == detached) this.parentNodes.shift();
		return detached;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastNode = this.parentNodes[this.parentNodes.length - 1];
		this.parentNodes.length--;

		if (lastNode.parent) {
			if (lastNode.parent.parent) {
				this.parentNodes.unshift(lastNode.parent);
				} else {
						this.parentNodes.unshift(lastNode);
					}
			lastNode.parent.removeChild(lastNode);
			}

		this.root = lastNode;
		lastNode.parent = null;
		if (detached.left) {
			let newLeft = detached.left;
			detached.removeChild(newLeft);
			lastNode.appendChild(newLeft);
		}
		if (detached.right) {
			let newRight = detached.right;
			detached.removeChild(newRight);
			lastNode.appendChild(newRight);
		}
	}

	size() {

	}

	isEmpty() {
		if (this.root)
			return false;
			else return true;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		this.parentNodes.push(node);
		if (!this.root) {
			this.root = node;
		} else {
				this.parentNodes[0].appendChild(node);
				if ((this.parentNodes[0].left)&&(this.parentNodes[0].right))
					this.parentNodes.shift();
			}
	}

	shiftNodeUp(node) {
		if (!node.parent) {
			this.root = node;
			} else {
					if (node.priority > node.parent.priority) {
						let parentIndex = this.parentNodes.indexOf(node.parent);
						let nodeIndex = this.parentNodes.indexOf(node);
						if (parentIndex != -1) this.parentNodes[parentIndex] = node;
						if (nodeIndex != -1) this.parentNodes[nodeIndex] = node.parent;
						node.swapWithParent();
						this.shiftNodeUp(node);
					}
				}
	}

	shiftNodeDown(node) {
		let nodeSwap;
		if (node.right) {
			if ((node.right.priority>node.left.priority)&&(node.priority<node.right.priority)) {
				nodeSwap = node.right;
			} else {
				if (node.left) {
					if (node.priority<node.left.priority) {
						nodeSwap = node.left;
					} else {
						return;
						}
				} else {
					return;
					}
				}
			}
			else {
				if (node.left) {
					if (node.priority<node.left.priority) {
						nodeSwap = node.left;
					} else {
						return;
						}
				} else {
					return;
					}
			}

		if (this.root == node) {
			this.root = nodeSwap;
		}

		let parentIndex = this.parentNodes.indexOf(node);
		let nodeIndex = this.parentNodes.indexOf(nodeSwap);
		if (parentIndex != -1) this.parentNodes[parentIndex] = nodeSwap;
		if (nodeIndex != -1) this.parentNodes[nodeIndex] = node;

		nodeSwap.swapWithParent();

		this.shiftNodeDown(node);

	}

}

module.exports = MaxHeap;
