var cron = require('node-cron');
const Ticket = require('../../Schema/Ticket');

const task = cron.schedule("0 */6 * * *", async function () {
    console.log("cron job started")
    // const tickets = await Ticket.aggregate([
    //     {
    //         $match: {
    //             $and: [{
    //                 ticket_status: "new"

    //             }, {
    //                 createdAt: {
    //                     $lt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    //                 }
    //             }]
    //         }
    //     }
    // ])
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
    // console.log(tickets)
    // console.log(tickets.length)
    await Ticket.updateMany(query, {$set: {ticket_status: "closed"}})
}, {
    scheduled: false
});
// task.start();

