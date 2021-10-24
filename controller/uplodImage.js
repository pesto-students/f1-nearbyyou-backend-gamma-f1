const AWS = require('aws-sdk');



module.exports = {
    uploadImage: async (req, fileName) => {
        var params = {
            Bucket: "homesweb", 
            Key: "imagelibrary/1476247075168_Continental_Breakfast.jpg"
        };
        s3.getObject(params, function(err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
            } else {   
                console.log(data.Body); 

                var params2 = {
                    Body: data.Body, 
                    Bucket: "homesweb", 
                    Key: "imagelibrary/Test_Continental_Breakfast.jpg",
                    ACL: "public-read-write",
                    BucketKeyEnabled: true
                   };
                   s3.putObject(params2, function(err, data) {
                     if (err) console.log(err, err.stack); // an error occurred
                     else     console.log(data);           // successful response
                     
                   });
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
            }
        // successful response
        });
        console.log("Upload image function call ");
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