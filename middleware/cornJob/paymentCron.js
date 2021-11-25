const ShopBrnach = require('../../Schema/ShopBranch');
const Payment = require('../../Schema/Payment');
const Plan = require('../../Schema/Plan');
const Vendor = require('../../Schema/vendor');
var cron = require('node-cron');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const dotenv = require('dotenv');
dotenv.config();

const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);


let plan_details = [];
findAllPlans = async () => {
    plans = await Plan.find({});
    plans.forEach(element => {
        plan_details.push([element._id.toString(), parseInt(element.plan_type.split(" ")[0])]);
    });
}
findAllPlans();


const shop_status_validate = cron.schedule("0 */6 * * *", async () => {
    console.log("shop_status_validate")
    plan_details.forEach(async (element) => {

        const payments = await Payment.aggregate([{
            $match: {
                $and: [
                    {
                        payment_plan: ObjectId(element[0])
                    },
                    {
                        payment_date: {
                            $lt: new Date(Date.now() - element[1] * 30 * 24 * 60 * 60 * 1000)
                        }
                    }
                ]
            }
        }]);
        payments.forEach(async (elem) => {
            const shop = await ShopBrnach.findById(elem.shop_id)
            if (shop.shop_status == "active") {
                await ShopBrnach.findByIdAndUpdate(shop._id, { $set: { shop_status: "inactive" } }, { new: true })
            }
        });
    });
}, {
    scheduled: false
});

// shop_status_validate.start();



const msg = {
    to: '',
    from: process.env.from_mail,
    subject: 'Near By You Payment Reminder',
    text: 'Hi, This is a payment remainder mail. make your shop active by paying and Earn more money by getting more services',
    html: '<h3>Hi, <br> This is a payment remainder mail.<br> make your shop active by paying and Earn more money by getting more services <br> Thanks</h3>',
}

const payment_reminder_mail = cron.schedule("0 */6 * * *", async () => {
    console.log("payment reminder cron started",new Date(Date.now() - 24 * 60 * 60 * 1000))
    const query = {
        $match: {
            $and: [{
                shop_status: "payment pending"
            }, {
                updatedAt: {
                    $lt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                }
            }]
        }
    }
    shops = await ShopBrnach.aggregate([query]);
    shops.forEach(async (element) => {
        shop_owner = await Vendor.aggregate([
            {
                '$match': {
                    '_id': ObjectId(element.shop_owner)
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user_id',
                    'foreignField': '_id',
                    'as': 'users'
                }
            }
        ])
        const mails = [shop_owner[0].users[0].email, element.shop_email]
        msg.to = mails;
        sendGridMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
    });
})

// payment_reminder_mail.start();







