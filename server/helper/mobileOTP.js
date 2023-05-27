import {Vonage} from '@vonage/server-sdk'

const vonage = new Vonage({
  apiKey: "29769969",
  apiSecret: "8iot4OEYEdjGxlb1"
})

const from = "Vonage APIs"
const to = "919446244318"
const text = 'A text message sent using the Vonage SMS API'

async function sendSMS() {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

sendSMS();