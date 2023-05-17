const admin = require("firebase-admin");

const secretAccessKey = {
  type: "service_account",
  project_id: "masnikka-sneakers",
  private_key_id: "ceb78a3a9de0428633119409d11808e3c0f0361c",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4ZrAJ4piMUaYI\nXBzNb8SFMamoJ9XFo6uplfV3XPg2qvfffKLFpAbvv9hASuFvjJmJSm1vMmoMYpJa\nL77uP9xTYbeLVeoINDGiuUFksmO/lse1qCx4Dwav0y3uKaAnySI6FMCro2hZNkVK\n8vpti9rrYaXEKp0Tk4bMqoPdStjlGgYBYXtB/3sCKzFLuMpOZph6/5J5qh+njGrz\n+9+3C50UEL6GC6VJIb/9AgL/IUdVjc5/9XkBmluPNCBKEWkp11kZG32WILBv1SNS\n+QVqkw0VPLAbSQ0hJJ1iX0UdJOOjanimpkNxdjt0dzUGKnZSs4ZGzt4c37MDoV5V\ni4UneXEpAgMBAAECggEAKWaUu4NucIKcXmAf71farXTa/HAFJNx8XBTZCbWL3OpB\nwKGBAhKzo/xUlwq41oygpBxbuY1+Fc3Dwg/aNC+OTgIwbU4av0DIrBofvnX2wzsd\nF4HsigAFplApjcE2vfgAgT3LjD2h3fW7VPp8kz/FJPfFeed/YLfMmgLmnDaDv9vX\nRIep+ASplLNdhoHeblYa+eeO1Ivf0yW7UfMNFqygjMGguWmWe70jJozlKYwjo8rG\nHW/f2m2djJpfyJRipikD3TxL7K1ibHn6rBV6HbRuI4zD7+H/8RTsZOyEyNS7dujk\nvoerRUT4dB3afZtjr0DMQmSq9HjJFBYyImhoo6EDCQKBgQD7kpxDWD/aRzU5dBxH\n7DHDDCxBovDnr6q579gaJm8Ja+Ynq95EIHoC8m1vF3+0W/xj0AoAY+OPWtK+Z/HA\nC4ixiHOFJu+Cvw9gBqpcGLlzCy6W1UFY6dq76NSb67v/3Gtq9Q1c4UynlYVCnZiY\nn8gfk5ykKt+HV8wuQgLT24ihjwKBgQC7pXRpXWbwE/1FgsmOCXcZSVcLLHw/iUUz\nwNYWVUDUxb2Ud80iJ04ET4MUeKQ7mfByyoofQK06nGyUh+SE/WUz05o0nahobg9f\ndwj+p9uxNtuMRANSl5dQD8c/SGs3S71l4Pu6HH5h2VZlCdrhyzMFfef7OL8/YsWq\nIgjmiPr1xwKBgAlJIRFvSXQSGsnTGlQhSLjtUxjdHc0/c6rHSo+0iXasj+M4+cxD\n8pz3O8jU8jbDCm7Yt/XJuhWJgavbhFXVVydOZQ0uIbsOuE+QD2u00euIJyEUIARb\nJWK4NljG+7p29VQOVX7vJfgtkayiyoYfp7Bar3ZzyqphOD0g3J/bQ5DLAoGAVyxg\nTmqz3aiLqvU9iZzgFYE6zNgXyLSOz6IwUyO8AJz0m7qkM8+qsNn3fVUmhwHW8J0j\nWa2ETIxK7R3MjfPiRhdxtivgBtPKlIEKTrPQnh1sFVera309MFaEK+QK2x92l5PT\nnfyKwg5j0oCnjOoHg++gC9erEVljlsxE8kSEwhUCgYEAv6S0FygAyKdmlMy7HXGw\nVlIdb5qerEFm0Ham7ZeS8tj+29xwZq1wSr5I5wDDudXfyPMclAuq9PfQgMkTkmKY\ne6bNBi0SAbiXrVzmEn383KJFiwO2IajKxlXBvOmhq9HNwU3o/baCzdHIph2+if6y\n4/TFKw/Ab9uacTxB6jThJPM=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-vsax5@masnikka-sneakers.iam.gserviceaccount.com",
  client_id: "106370171807273307934",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vsax5%40masnikka-sneakers.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(secretAccessKey),
});

exports.verifyFirebaseToken = async (tokenKey) => {
  try {
    const decodeValue = await admin.auth().verifyIdToken(tokenKey);

    // console.log(await admin.auth().getUser(decodeValue.uid));
    if (decodeValue) {
      return decodeValue;
    }

    return "UnAuthorize";
  } catch (e) {
    // console.log(e);
    return e;
  }
};

exports.getUserData = async (uid) => {
  return await admin.auth().getUser(uid);
};

exports.sendNotification = (mgsTitle, mgsBody, token, data) => {
  console.log(mgsTitle, mgsBody, token, data);
  var payload = {
    notification: {
      title: mgsTitle,
      body: mgsBody,
    },
    data,
  };
  const registrationToken = token;
  var options = data;
  admin
    .messaging()
    .sendToDevice(registrationToken, payload, options)
    .then(function (response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
    });
};

exports.sendNotificationToAll = (mgsTitle, mgsBody) => {
  var payload = {
    notification: {
      title: mgsTitle,
      body: mgsBody,
    },
  };
  const topic = "nectar-dating-app";
  admin
    .messaging()
    .sendToTopic(topic, payload)
    .then(function (response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
    });
};

exports.sendNotificationToAllWithImage = (mgsTitle, mgsBody, image) => {
  // console.log(mgsTitle, mgsBody, image);
  var payload = {
    notification: {
      title: mgsTitle,
      body: mgsBody,
      image: image,
    },
  };
  const topic = "nectar-dating-app";

  admin
    .messaging()
    .sendToTopic(topic, payload)
    .then(function (response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
    });
};
