import fs from 'fs';
import through from 'through2';

export default class FileCache{
    /**
     * create a new FileCache instance
     */
    constructor(name){
        this._filename = name || '.gulp-cache';
        // load cache
        try {
            this._cache = JSON.parse(fs.readFileSync(this._filename, 'utf8'));
        } catch (err) {
            this._cache = {};
        }
    }

    /**
     * create a through stream that add files to the cache
     *
     * @api public
     */
    cache(){
        let _this = this;

        // update cache
        function transform(file, enc, callback) {
            let path = file.path,
                stat = file.stat.mtime && file.stat.mtime.getTime();

            if (path && stat) _this._cache[path] = stat;
            this.push(file);
            return callback();
        }

        // flush cache to disk
        function flush(callback) {
            fs.writeFile(_this._filename, JSON.stringify(_this._cache), callback);
        }

        return through.obj(transform, flush);
    }

    /**
     * clear the cache
     *
     * @api public
     */
    clear(){
        this._cache = {};
    }

    /**
     * create a through stream that filters file that match our cache
     *
     * @api public
     */
    filter(){
        var _this = this;
        return through.obj(function (file, enc, callback) {
            var cache = _this._cache[file.path],
                stat = file.stat.mtime && file.stat.mtime.getTime();

            // filter matching files
            if (cache && stat && cache === stat) return callback();

            this.push(file);
            return callback();
        });
    }
}