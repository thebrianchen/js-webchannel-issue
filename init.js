const config = { /* insert config here  */};
firebase.initializeApp(config).firestore();

async function main() {
  const email = 'insert@unique.email';
  const password = 'passwordwoohoo';
  const name = 'Some name';
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          name,
          email,
        });
      console.log('result', result);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Error', 'That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('Error', 'That email address is invalid!');
      }
    });
}

main();
