<template>
  <div class="history">
    <Navbar :title="title" />
    <Sidebar />
    <div class="main-content hitory-contents col-md-11">
      <b-container>
        <CardIndex />
        <HistoryData />
      </b-container>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/_base/Navbar_full'
import Sidebar from '../components/_base/Sidebar'
import CardIndex from '../components/_base/Card_index'
import HistoryData from '../components/_base/History_table'
export default {
  name: 'History',
  components: {
    Navbar,
    Sidebar,
    CardIndex,
    HistoryData
  },
  data() {
    return {
      title: 'History'
    }
  }
}

</script>
