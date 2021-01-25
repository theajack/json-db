const fs = require('fs');
const path = require('path');
function deleteFile (path, delPath = true) {
    var files = [];
    if ( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function (file) {
            var curPath = path + '/' + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFile(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        if (delPath)
            fs.rmdirSync(path);
    }
};

deleteFile(path.resolve('./', 'dist/dev'), false);