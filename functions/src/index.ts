import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const sendNotifications = functions.firestore
.document("news/{newsId}").onCreate(async snap=>{
    const fcm = admin.messaging();
    const data = snap.data();
    const payload: admin.messaging.MessagingPayload =    {
        notification : {
            title : data?.title,
            body: data?.message,
            clickAction : 'FLUTTER_NOTIFICATION_CLICK'
        }
    }

    return fcm.sendToTopic("news", payload);
});
