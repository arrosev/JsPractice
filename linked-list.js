
const defaultEquals = (a, b) => {
    return a === b
}

class Node {

    element
    next
    constructor(element) {
        this.element = element
        this.next = null
    }

}

class LinkedList {

    #count
    #head
    #equalsFn
    constructor(equalsFn = defaultEquals) {
        this.#count = 0
        this.#head = null
        this.#equalsFn = equalsFn
    }

    push(element) {
        const node = new Node(element)
        if(this.#head === null) {
            this.#head = node
        } else {
            let current = this.#head
            while (current.next !== null) {
                current = current.next
            }
            current.next = node
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
            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            this.#count --
            return current
        } else {
            return null
        }
    }

    insert(element, index) {
        if(index >= 0 && index <= this.#count) {
           const node = new Node(element)
           if(index === 0) {
            const current = this.#head
            node.next = current
            this.#head = node
           } else {
            const previous = this.getElementAt(index - 1)
            node.next = previous.next
            previous.next = node
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

export default LinkedList