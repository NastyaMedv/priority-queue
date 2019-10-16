class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
			}
			else if (!this.right) {
				this.right = node;
				node.parent = this;
				}
	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null;
			node.parent = null;
			}
			else if (this.right == node) {
				this.right = null;
				node.parent = null;
				}
				else throw new SyntaxError('No such child');
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {

			let child = this;
			let dad = this.parent;
			let granDad = this.parent.parent;

			let anotherChild;
			if (dad.left == child)
				anotherChild = dad.right;
				else anotherChild = dad.left;

			let grandSonLeft = child.left;
			let grandSonRight = child.right;

			if (grandSonLeft) {
				child.removeChild(grandSonLeft);
			}
			if (grandSonRight) {
				child.removeChild(grandSonRight);
			}

			dad.removeChild(child);
			if (anotherChild) {
				dad.removeChild(anotherChild);
			}

			if (granDad) {
				granDad.removeChild(dad);
				granDad.appendChild(child);
			}

			child.appendChild(dad);
			if (anotherChild) {
				child.appendChild(anotherChild);
			}

			if (grandSonLeft) {
				dad.appendChild(grandSonLeft);
			}
			if (grandSonRight) {
				dad.appendChild(grandSonRight);
			}

		}
	}
}

module.exports = Node;
