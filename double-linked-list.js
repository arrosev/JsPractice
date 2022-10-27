
const defaultEquals = (a, b) => {
    return a === b
}

class DoublyNode {

    element
    next
    prev
    constructor(element) {
        this.element = element
        this.next = null
        this.prev = null
    }

}

class DoublyLinkedList {

    #count
    #head
    #tail
    #equalsFn
    constructor(equalsFn = defaultEquals) {
        this.#count = 0
        this.#head = null
        this.#tail = null
        this.#equalsFn = equalsFn
    }

    push(element) {
        const node = new DoublyNode(element)
        if(this.#head === null) {
            this.#head = node
            this.#tail = node
        } else {
            const current = this.#tail
            current.next = node
            node.prev = current
            this.#tail = node
        }
        this.#count ++
    }

    getElementAt(index) {
        if(index >= 0 && index <= this.#count) {
            let node = this.#head
            for(let i = 0; i < index && node !== null; i ++) {
                node = node.next
            }
            return node
        } else {
            return null
        }
    }

    removeAt(index) {
        if(index >= 0 && index < this.#count) {
            let current = this.#head
            if(index === 0) {
                this.#head = current.next
                if(this.#count === 1) {
                    this.#tail = null
                } else {
                    this.#head.prev = null
                }
            } else if(index === this.#count - 1) {
                const current = this.#tail
                this.#tail = current.prev
                this.#tail.next = null
            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
                current.next.prev = previous
            }
            this.#count --
            return current
        } else {
            return null
        }
    }

    insert(element, index) {
        if(index >= 0 && index <= this.#count) {
           const node = new DoublyNode(element)
           if(index === 0) {
            if(this.#head === null) {
                this.#head = node
                this.#tail = node
            } else {
                const current = this.#head
                node.next = current
                current.prev = node
                this.#head = node
            }
           } else if(index === this.#count) {
            const current = this.#tail
            current.next = node
            node.prev = current
            this.#tail = node
           } else {
            const previous = this.getElementAt(index - 1)
            node.next = previous.next
            previous.next = node
            previous.next.prev = node
            node.prev = previous
           }
           this.#count ++
           return true
        } else {
            return false
        }
    }

    indexOf(element) {
        let current = this.#head
        for(let i = 0; i < this.#count && current !== null; i ++) {
            if(this.#equalsFn(element, current.element)) {
                return i
            }
            current = current.next
        }
        return -1
    }

    remove(element) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }

    size() {
        return this.#count
    }

    isEmpty() {
        return this.#count === 0
    }

    getHead() {
        return this.#head
    }

    getTail() {
        return this.#tail
    }

    toString() {
        if(this.#head === null) {
            return ''
        }
        let objString = `${this.#head.element}`
        let current = this.#head.next
        for(let i = 1; i < this.#count && current !== null; i ++) {
            objString = `${objString}, ${current.element}`
            current = current.next
        }
        return objString
    }

}

export default DoublyLinkedList