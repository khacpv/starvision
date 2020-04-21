import aws from 'aws-sdk';

class UploadService {

    constructor(axios) {
        this.axios = axios;
    }

    uploadFile(req) {
        aws.config.update({
            region: 'ap-southeast-1',
            accessKeyId: 'AKIAJD2KS6K627R5G55Q',
            secretAccessKey: '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'
        });

        const S3_BUCKET = 'starvisionapp';
        const s3 = new aws.S3();  // Create a new instance of S3
        const fileName = req.fileName;
        const fileType = req.fileType;
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 500,
            ContentType: fileType,
            ACL: 'public-read'
        };
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if(err){
                console.log(err);
                return err;
            }
            return {
                signedRequest: data,
                url: `https://starvisionapp.s3.ap-southeast-1.amazonaws.com/${fileName}`
            };
        });
    }
}

export default UploadService;
