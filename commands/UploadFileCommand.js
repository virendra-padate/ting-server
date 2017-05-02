'use strict';

const fileStore = require('../persistance/storage/FileStore');

class UploadFileCommand
{
    constructor(filePayload)
    {
        this._filePayload = filePayload;
    }

    execute()
    {
        let filePayload = this._filePayload;

        return fileStore.create(filePayload)
        .then(function(uploadedFileDetails)
        {
            return uploadedFileDetails;
        });
    }
}

module.exports = UploadFileCommand;
