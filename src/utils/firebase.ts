import * as firebase from 'firebase'
import 'firebase/database'
const config = {
  apiKey: 'AIzaSyDnd6_cM8bruxBU-EDsgfRmd5DmxnZpBME',
  authDomain: 'blockchain-lynkey-test.firebaseapp.com',
  databaseURL: 'https://blockchain-lynkey-test-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'blockchain-lynkey-test',
  storageBucket: 'blockchain-lynkey-test.appspot.com',
  messagingSenderId: '180404467467',
  appId: '1:180404467467:web:d356247e25fcba10fdd40e',
  measurementId: 'G-KW2XEDD980'
}
firebase.default.initializeApp(config)

export default firebase.default
