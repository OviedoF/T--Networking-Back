const Agenda = require('agenda');
const path = require('path');
const mongoConnectionString = 'mongodb://127.0.0.1:27017/networking_ecommerce';
const agendaController = require(path.join(__dirname, '..', 'controllers', 'agenda.controller'));

const InitAgenda = () => {

    const agenda = new Agenda({
        db: {
            address: mongoConnectionString,
            collection: 'agendaJobs'
        }
    });

    agenda.define('discountDays', async (job, done) => {
        console.log('[AGENDA] 📧📧 Counting users with memberships...');

        agendaController.discountDays();

        done();
    });

    agenda.on('ready', () => {
        agenda.every('10 seconds', 'discountDays');
        agenda.start();
        console.log('[AGENDA] ✨✨ Agenda is ready!');
    });

    agenda.on('error', (err) => {
        console.log('[AGENDA] ❌❌ Error: ', err);
    });

    agenda.on('start', (job) => {
        console.log('[AGENDA] 🚀🚀 Job started: ', job.attrs.name);
    });

    agenda.on('complete', (job) => {
        console.log('[AGENDA] ✅✅ Job completed: ', job.attrs.name);
    });

    agenda.on('fail', (err, job) => {
        console.log('[AGENDA] ❌❌ Job failed: ', job.attrs.name);
    });

}

module.exports = InitAgenda;