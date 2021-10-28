const AWS = require('aws-sdk');

console.log("process.env.accessKeyId ", process.env.AccessKeyId);
console.log("process.env.secretAccessKey :- ", process.env.SecretAccessKey);
const s3 = new AWS.S3({
    accessKeyId: "AKIA3G5F4IDZZE35AX7G",
    secretAccessKey: "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",
    region: 'us-east-2',
    s3BucketEndpoint: true,
    endpoint: "https://nearbyyou.s3.us-east-2.amazonaws.com"
});

module.exports = {
    uploadImage: async (imageData, fileName) => {

        console.log("DATA inupload");
        var params2 = {
            Body: imageData,
            Bucket: "nearbyyou",
            Key: fileName,
            ACL: "public-read-write",
            BucketKeyEnabled: true
        };

        // , function (err, data) {
        //     if (err) {
        //         console.log(err, err.stack);
        //         return { status: false }
        //     } else {
        //         console.log("https://nearbyyou.s3.us-east-2.amazonaws.com/" + fileName);
        //         return { status: true, URL: `https://nearbyyou.s3.us-east-2.amazonaws.com/ + ${fileName}` }
        //     }           // successful response
        // }
        const return_data = {}
        const response = await s3.putObject(params2, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                return_data = { status: false }
            } else {
                console.log("https://nearbyyou.s3.us-east-2.amazonaws.com/" + fileName);
                return_data = { status: true, URL: `https://nearbyyou.s3.us-east-2.amazonaws.com/ + ${fileName}` }
                // { status: true, URL: `https://nearbyyou.s3.us-east-2.amazonaws.com/ + ${fileName}` }
            }           // successful response
        })
        return_data = { ...return_data, response }

        return return_data;
        // .then(response=>{
        //     const return_data = {
        //         response: response,
        //         status: true,
        //         URL: `https://nearbyyou.s3.us-east-2.amazonaws.com/ + ${fileName}` 
        //     }
        //     return return_data
        // })
        // .catch(err=>{
        //     return { status: false }
        // })



        // var params = {
        //     Bucket: "nearbyyou",
        //     Key: "Desert.jpg"
        // };
        // s3.getObject(params, function (err, data) {
        //     if (err) {
        //         console.log(err, err.stack); // an error occurred
        //     } else {
        //         console.log(data.Body);

        //         console.log("Date.now :- ", Date.now());
        //         var key = Date.now() + "_Test_Continental_Breakfast.jpg";
        //         var params2 = {
        //             Body: data.Body,
        //             Bucket: "nearbyyou",
        //             Key: key,
        //             ACL: "public-read-write",
        //             BucketKeyEnabled: true
        //         };
        //         s3.putObject(params2, function (err, data) {
        //             if (err) console.log(err, err.stack); // an error occurred
        //             else {
        //                 console.log("https://nearbyyou.s3.us-east-2.amazonaws.com/" + key);
        //             }           // successful response

        //         });
        // let response = s3.upload({
        //     Bucket: 'homesweb',
        //     Key: "imagelibrary/Test_Continental_Breakfast.jpg",
        //     Body: data.Body,
        //     ContentType: data.ContentType,
        //     ACL: 'public-read'
        // }).promise()
        // return response.then(data => {
        //     console.log("success : " + data);
        //     return { status: true, data }
        // }).catch(err => {
        //     console.log("error : " + err);
        //     return { status: false, err }
        // })
        // }
        // successful response
        // });
        // console.log("Upload image function call ");
        // let response = s3.upload({
        //     Bucket: 'homesweb',
        //     Key: fileName+"",
        //     Body: req,
        //     ContentType: req.mimetype,
        //     ACL: 'public-read'
        // }).promise()

        // return response.then(data => {
        //     return { status: true, data }
        // }).catch(err => {
        //     return { status: false, err }
        // })
    }
}