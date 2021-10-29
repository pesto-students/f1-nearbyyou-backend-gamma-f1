var cron = require('node-cron');
const Ticket = require('../../Schema/Ticket');
const ShopBrnach = require('../../Schema/ShopBranch');

const new_ticket_cron = cron.schedule("0/10 * * * * *", async function () {
    const query = {
        $match: {
            $and: [{
                ticket_status: "new"

            }, {
                createdAt: {
                    $lt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                }
            }]
        }
    }
    await Ticket.updateMany(query, {$set: {ticket_status: "closed"}})
}, {
    scheduled: false
});
new_ticket_cron.start();


const holding_ticket_cron = cron.schedule("0/10 * * * * *", async function () {
    console.log("cron job started")
    const query = {
        $match: {
            $and: [{
                ticket_status: "holding"

            }, {
                updatedAt: {
                    $lt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                }
            }]
        }
    }
    await Ticket.updateMany(query, {$set: {ticket_status: "closed"}})
}, {
    scheduled: false
});
holding_ticket_cron.start();




const new_shop_cron = cron.schedule("0/10 * * * * *", async function () {
    console.log(" new_shop_cron started")
    const query = {
        $match: {
            $and: [{
                shop_status: "pending"

            }, {
                createdAt: {
                    $lt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
                }
            }]
        }
    }
    await ShopBrnach.updateMany(query, {$set: {shop_status: "reject"}})
}, {
    scheduled: false
});
 new_shop_cron.start();



//0 */6 * * *