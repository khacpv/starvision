import AWS from 'aws-sdk';
import moment from 'moment';

class UploadService {

    constructor(axios) {
        this.axios = axios;
    }

    uploadFile(file, customer) {
        const doctorData = JSON.parse(localStorage.getItem('user'));
        let fileParts = file.name.split('.');
        let fileType = fileParts[fileParts.length - 1];

        // solution: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html
        AWS.config.update({
            region: 'ap-southeast-1',
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'ap-southeast-1:65b3d253-6e4a-4f99-a542-310ee4cbac28',
            }),
        });

        // Multiparts upload
        return new AWS.S3.ManagedUpload({
            params: {
                Bucket: 'starvisionapp',
                Key: this.getFileS3Name(fileType, 'fitting', customer.ID_KHACHHANG, doctorData),
                // Key: fileParts[0],
                Body: file,
                ContentType: fileType,
                ACL: 'public-read', // required!
            },
        })
        .promise()
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getFileS3Name(typeContent, type, khid, doctorData) {
        let strDate = moment(new Date()).format('YYYY-MM-DD');
        let idBacsi = doctorData.Id_bacsi;
        let id_Dttc = doctorData.Id_Dttc;
        let randomNumber = this.getRandomInt(100) * 100;
        return strDate + "-" + idBacsi + "-" + id_Dttc.toString() + "_" + khid.toString() + "_" + type + randomNumber.toString() + "." + typeContent;
    }
}

export default UploadService;
