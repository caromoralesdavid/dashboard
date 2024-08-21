<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Active Users</h4>
          </md-card-header>
          <md-card-content>
            <div>
              <md-button
                class="md-raised md-primary"
                @click="fetchUsers"
              >
                Refresh
              </md-button>
              <table class="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.fullName }}</td>
                    <td>{{ user.email }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export default defineComponent({
  name: 'UsersView',
  data() {
    return {
      users: [],
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        this.users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    },
  }
});
</script>
