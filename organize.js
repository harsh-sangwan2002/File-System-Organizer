const fs = require('fs');
const path = require('path');

let types = {

    media: ['mp4', 'mkv'],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', 'deb'],
    images: ['png', 'jpg', 'jpeg', 'jpmg']
}

function organizeFn(dirPath) {

    if (dirPath === undefined) {

        organizeHelper(process.cwd());
        return;
    }

    else {

        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {

            let destPath = path.join(__dirname, "organized_files");
            if (fs.existsSync(destPath) === false) {

                fs.mkdirSync(destPath);
            }

            organizeHelper(dirPath, destPath);
        }

        else {

            console.log("Kindly enter a valid path.");
            return;
        }
    }

}

function organizeHelper(src, dest) {

    let children = fs.readdirSync(src);

    for (let child of children) {

        let childAddress = path.join(src, child);
        let isFile = fs.lstatSync(childAddress).isFile();

        if (isFile) {

            let category = getCategory(child);
            console.log(category);

            sendFiles(childAddress, dest, category);
        }
    }
}

function sendFiles(srcFilePath, dest, category) {

    let categoryPath = path.join(dest, category);

    if (fs.existsSync(categoryPath) === false) {

        fs.mkdirSync(categoryPath);
    }

    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);


}

function getCategory(name) {

    let ext = path.extname(name);
    ext = ext.slice(1);

    for (let type in types) {

        for (let fileType of types[type]) {

            if (fileType === ext)
                return ext;
        }
    }

    return "others";
}

module.exports = {

    organizeKey:organizeFn
}