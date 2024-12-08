class BloomFilter {
    constructor(size = 1000, hashFunctions = 3) {
      this.size = size;
      this.hashFunctions = hashFunctions;
      this.bitArray = new Array(size).fill(0);
    }
  
    add(item) {
      const hashes = this.getHashes(item);
      hashes.forEach(hash => {
        this.bitArray[hash] = 1;
      });
    }
  
    contains(item) {
      const hashes = this.getHashes(item);
      return hashes.every(hash => this.bitArray[hash] === 1);
    }
  
    getHashes(item) {
      const hashes = [];
      for (let i = 0; i < this.hashFunctions; i++) {
        const hash = this.hash(item + i.toString()) % this.size;
        hashes.push(hash);
      }
      return hashes;
    }
  
    hash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash);
    }
  }
  
  export const createBloomFilter = (requests, bloodGroup) => {
    const filter = new BloomFilter();
    requests.forEach(request => {
      if (request.bloodGroup === bloodGroup && request.status === "Pending") {
        filter.add(request._id);
      }
    });
    return filter;
  };
  
  export const filterRequests = (requests, bloomFilter) => {
    return requests.filter(request => 
      request.status === "Pending" && bloomFilter.contains(request._id)
    );
  };