<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <chart-card :chart-data="dailySalesChart.data" :chart-options="dailySalesChart.options" :chart-type="'Line'"
          data-background-color="blue">
          <template slot="content">
            <h4 class="title">Daily Sales</h4>
            <p class="category">
              <span class="text-success"><i class="fas fa-long-arrow-alt-up"></i> 55%
              </span>
              increase in today sales.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 4 minutes ago
            </div>
          </template>
        </chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <chart-card :chart-data="emailsSubscriptionChart.data" :chart-options="emailsSubscriptionChart.options"
          :chart-responsive-options="emailsSubscriptionChart.responsiveOptions" :chart-type="'Bar'"
          data-background-color="red">
          <template slot="content">
            <h4 class="title">Email Subscription</h4>
            <p class="category">Last Campaign Performance</p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 10 days ago
            </div>
          </template>
        </chart-card>
      </div>

      <br>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-40">
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>books</md-icon>
          </template>

          <template slot="content">
            <p class="category">Reports</p>
            <h2 class="title">{{ totalReportes }}</h2>
          </template>

        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-40">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>person</md-icon>
          </template>

          <template slot="content">
            <p class="category">Total Users</p>
            <h2 class="title">
              {{ totalUsuarios }}
            </h2>
          </template>
        </stats-card>
      </div>
    </div>
  </div>

</template>

<script>
import {
  StatsCard,
  ChartCard,
} from "@/components";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase'; // Asegúrate de que este path es correcto

export default {
  components: {
    StatsCard,
    ChartCard,
  },
  data() {
    return {
      totalUsuarios: 0,
      totalReportes: 0,
      dailySalesChart: {
        data: {
          labels: ["Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },

  async created() {
    await this.fetchUsuarios();
    await this.fetchReportes();
  },
  methods: {
    async fetchUsuarios() {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        this.totalUsuarios = usersSnapshot.size; // Total de usuarios
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    },
    async fetchReportes() {
      try {
        const reportsCollection = collection(db, 'reports');
        const reportsSnapshot = await getDocs(reportsCollection);

        this.totalReportes = reportsSnapshot.size; // Total de reportes

        const reportData = {};
        reportsSnapshot.forEach((doc) => {
          const data = doc.data();
          const date = new Date(data.date.seconds * 1000).toLocaleDateString(); // Convertir timestamp a string de fecha

          if (reportData[date]) {
            reportData[date] += 1;
          } else {
            reportData[date] = 1;
          }
        });

        // Preparar los datos para la gráfica
        const labels = Object.keys(reportData);
        const series = Object.values(reportData);

        this.dailySalesChart.data.labels = labels;
        this.dailySalesChart.data.series = [series];
      } catch (error) {
        console.error('Error fetching reports: ', error);
      }
    }
  }

};
</script>
