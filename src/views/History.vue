<template>
  <div class="history">
    <Navbar :title="title" />
    <section class="contents">
      <b-row>
        <Sidebar />
        <div class="main-content hitory-contents col-md-11">
          <b-container>
            <CardIndex />
            <Chart />
            <HistoryData />
          </b-container>
        </div>
      </b-row>
    </section>
  </div>
</template>
<script>
import Navbar from '../components/_base/Navbar_full'
import Sidebar from '../components/_base/Sidebar'
import CardIndex from '../components/_base/Card_index'
import Chart from '../components/_base/Chart'
import HistoryData from '../components/_base/History_table'
export default {
  name: 'History',
  components: {
    Navbar,
    Sidebar,
    CardIndex,
    Chart,
    HistoryData
  },
  data() {
    return {
      title: 'History'
    }
  }
}

</script>
