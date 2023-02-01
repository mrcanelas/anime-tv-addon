const Meta = require('./meta')
module.exports = {
    async getAll(skip=0, limit=100) {
        return Meta.find().skip(skip).limit(limit).exec()
    },
    async getByAp( apId, skip=0, limit=100) {
        return Meta.find({ apId: apId }).skip(skip).limit(limit).exec()
    },
    async getByKitsu( kitsuId, skip=0, limit=100) {
        return Meta.find({ kitsuId: kitsuId }).skip(skip).limit(limit).exec()
    },
    async getByImdb(imdbId, skip=0, limit=100) {
        return Meta.find({ imdbId: imdbId }).skip(skip).limit(limit).exec()
    },
    async add(meta) {
        return (new Meta(meta)).save()
    },
    async addIfAbsent(meta) {
        let exists = await this.getByAp(meta.apId)
        if (exists.length > 0) {
            return exists
        }
        else {
            console.log(`Add: ${meta.title}`)
            return this.add(meta)
        }
    },
    async update(meta) {
        return Meta.updateOne({ apId: meta.apId }, meta).exec()
    },
    async upsert(meta) {
        let exists = await this.getByAp(meta.apId)
        if (exists.length > 0) {
            console.log(`Update: ${meta.title}`)
            return this.update(meta)
        }
        else {
            console.log(`Add: ${meta.title}`)
            return this.add(meta)
        }
    }
}