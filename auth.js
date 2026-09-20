/* Google sign-in + progress sync. Not generated - edit this file directly.
   Paste your web app config from Firebase console -> Project settings -> Your apps.
   Leave it as-is and the site stays exactly as it was: local-only progress. */
const CONFIG = {
  apiKey: "AIzaSyDT_w7z28Oz6OEHN0v04GARVVPGkYmo-l0",
  authDomain: "vibe-to-code-4206d.firebaseapp.com",
  projectId: "vibe-to-code-4206d",
  appId: "1:15142697538:web:35166d0e4b0867c4638bdb"
};

if (CONFIG.apiKey) {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js");
  const { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } =
    await import("https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js");
  const { getFirestore, doc, getDoc, setDoc } =
    await import("https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js");

  const app  = initializeApp(CONFIG);
  const auth = getAuth(app);
  const db   = getFirestore(app);
  const btn  = document.getElementById("auth");
  const who  = document.getElementById("who");
  let user = null, timer = null;

  btn.hidden = false;
  btn.onclick = () => user ? signOut(auth)
                           : signInWithPopup(auth, new GoogleAuthProvider()).catch(e => alert(e.message));

  onAuthStateChanged(auth, async u => {
    user = u;
    btn.textContent = u ? "Sign out" : "Sign in";
    who.textContent = u ? (u.displayName || u.email || "") : "";
    if (!u) { window.cloudSave = null; return; }

    // first sync wins nothing away: the union of what is here and what is in the cloud
    const ref = doc(db, "progress", u.uid);
    const snap = await getDoc(ref);
    const cloud = snap.exists() ? snap.data() : {};
    const local = window.vibeState.read();
    const merge = k => [...new Set([...(cloud[k] || []), ...local[k]])];
    const state = { done: merge("done"), ticked: merge("ticked") };
    window.vibeState.write(state);
    await setDoc(ref, { ...state, updated: Date.now() });

    // ponytail: one debounced whole-doc write, the state is two small arrays
    window.cloudSave = s => {
      clearTimeout(timer);
      timer = setTimeout(() => setDoc(ref, { ...s, updated: Date.now() }).catch(() => {}), 800);
    };
  });
}
