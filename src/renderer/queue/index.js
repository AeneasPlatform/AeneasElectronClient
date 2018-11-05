function Queue (capacity) {
  'use strict'

  if ((typeof capacity === 'undefined') || capacity <= 0) {
    capacity = 10
  }

  this.capacity = capacity
  this.container = []
  this.nextWriteIndex = 0
  this.nextReadIndex = 0
  this.lastWriteIndex = -1
  this.lastReadIndex = -1

  this.plainArray = function () {
    return this.container
  }

  this.getCapacity = function () {
    return this.capacity
  }

  this.getCount = function () {
    if (this.noOneEverWrite()) { return 0 }

    if (this.noOneEverRead()) { return this.lastWriteIndex + 1 }

    if (this.writtenMoreOrAsMuchAsRead()) { return this.lastWriteIndex - this.lastReadIndex }

    return this.capacity + this.lastWriteIndex - this.lastReadIndex
  }

  this.noOneEverWrite = function () {
    return this.lastWriteIndex === -1
  }

  this.noOneEverRead = function () {
    return this.lastReadIndex === -1
  }

  this.writtenMoreOrAsMuchAsRead = function () {
    return this.lastWriteIndex >= this.lastReadIndex
  }

  this.enqueue = function (item) {
    if (this.getCount() === this.capacity) { this.dequeue }
    this.container[this.nextWriteIndex] = item
    this.updateWriteIndicies()
  }

  this.updateWriteIndicies = function () {
    this.lastWriteIndex = this.nextWriteIndex

    if (this.nextWriteIndex + 1 === this.capacity) { this.nextWriteIndex = 0 } else { this.nextWriteIndex++ }
  }

  this.dequeue = function () {
    if (this.getCount() === 0) { throw new Error('Queue is empty!') }
    var item = this.container[this.nextReadIndex]
    this.updateReadIndicies()
    return item
  }

  this.peek = function () {
    if (this.getCount() === 0) { throw new Error('Queue is empty!') }
    return this.container[this.nextReadIndex]
  }

  this.last = function () {
    if (this.getCount() === 0) { throw new Error('Queue is empty!') }
    return this.container[this.lastWriteIndex]
  }

  this.updateReadIndicies = function () {
    this.lastReadIndex = this.nextReadIndex
    if (this.nextReadIndex + 1 === this.capacity) { this.nextReadIndex = 0 } else { this.nextReadIndex++ }
  }
}

export default Queue
