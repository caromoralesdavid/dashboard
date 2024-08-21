<template>
  <div class="notifications">
    <h2>Notificaciones de Reportes</h2>
    <ul>
      <li v-for="(report, index) in newReports" :key="index">
        <div class="notification-item">
          <div class="notification-content">
            <span>Nuevo reporte: <strong>{{ report.title }}</strong> - {{ formatDate(report.date) }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { collection, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAel2O0IaWOXOVc0j1XVJzZl-Ked6qd2bo",
  authDomain: "reportrashv2.firebaseapp.com",
  projectId: "reportrashv2",
  storageBucket: "reportrashv2.appspot.com",
  messagingSenderId: "186044340160",
  appId: "1:186044340160:web:fd819fa994bcaefbc3da25"
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default {
  setup() {
    const newReports = ref([]);

    const listenForNewReports = () => {
      const reportsCollection = collection(db, 'reports');
      onSnapshot(reportsCollection, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const newReport = change.doc.data();
            newReports.value.push(newReport);
          }
        });
      });
    };

    const formatDate = (timestamp) => {
      const date = timestamp.toDate();
      return date.toLocaleString();
    };

    onMounted(() => {
      listenForNewReports();
    });

    return {
      newReports,
      formatDate
    };
  }
};
</script>

<style scoped>
.notifications {
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notifications h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.notifications ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notifications li {
  margin-bottom: 0.5rem;
}

.notification-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: #fff;
  border-left: 4px solid #4caf50;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.notification-content {
  flex-grow: 1;
  font-size: 1rem;
  color: #333;
}

.notification-content strong {
  font-weight: bold;
}
</style>
