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
		if (this.parentNodes.length == 0) return null;
		this.restoreRootFromLastInsertedNode(heapRoot);
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
		this.parentNodes.pop();

		if (lastNode.parent) {
			if (lastNode.parent.parent) {
				this.parentNodes.unshift(lastNode.parent);
				} else {
						this.parentNodes.unshift(lastNode);
					}
			lastNode.parent.removeChild(lastNode);
			}

		this.root = lastNode;
		if (detached.left) lastNode.appendChild(detached.left);
		if (detached.right) lastNode.appendChild(detached.right);
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
		if (node.right) {
			if (node.right.priority > node.left.priority) {
				if (this.root == node) {this.root = node.right;}

				let parentIndex = this.parentNodes.indexOf(node);
				let nodeIndex = this.parentNodes.indexOf(node.right);
				if (parentIndex != -1) this.parentNodes[parentIndex] = node.right;
				if (nodeIndex != -1) this.parentNodes[nodeIndex] = node;

				if (node.priority < node.right.priority) {
					node.right.swapWithParent();
					this.shiftNodeDown(node);
				}
			} else {
					if (this.root == node) {this.root = node.left;}

					let parentIndex = this.parentNodes.indexOf(node);
					let nodeIndex = this.parentNodes.indexOf(node.left);
					if (parentIndex != -1) this.parentNodes[parentIndex] = node.left;
					if (nodeIndex != -1) this.parentNodes[nodeIndex] = node;

					if (node.priority < node.left.priority) {
						node.left.swapWithParent();
						this.shiftNodeDown(node);
					}
				}
		}	else if (node.left) {
				if (this.root == node) {this.root = node.left;}

				let parentIndex = this.parentNodes.indexOf(node);
				let nodeIndex = this.parentNodes.indexOf(node.left);
				if (parentIndex != -1) this.parentNodes[parentIndex] = node.left;
				if (nodeIndex != -1) this.parentNodes[nodeIndex] = node;

				if (node.priority < node.left.priority) {
					node.left.swapWithParent();
					this.shiftNodeDown(node);
				}
			}
	}
}

module.exports = MaxHeap;
