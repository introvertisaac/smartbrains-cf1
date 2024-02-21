import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';

export default function useFirebaseStorage(key, initialValue) {
  const projectId = window.location.search.replace('?id=', '');
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, `projects/${projectId}/${key}`);
    onValue(dbRef, (snapshot) => {
      setValue(snapshot.val() || initialValue);
    });

    return () => {
      dbRef.off();
    };
  }, [projectId, key, initialValue]);

  useEffect(() => {
    const db = getDatabase();
    set(ref(db, `projects/${projectId}/${key}`), value);
  }, [projectId, key, value]);

  return [value, setValue];
}
