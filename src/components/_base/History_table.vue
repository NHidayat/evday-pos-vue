<template>
  <div class="table-section">
    <div class="row">
      <div class="col-12">
        <h3>Recent Order</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-responsive-sm">
          <thead>
            <tr>
              <th scope="col">INVOICE</th>
              <th scope="col">CASHIER</th>
              <th scope="col">DATE</th>
              <th scope="col">ORDERS</th>
              <th scope="col">AMOUNT</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in historyList" :key="index">
              <td>#{{ item.history_invoice }}</td>
              <td>{{ item.cashier_name }}</td>
              <td>{{ item.history_created_at }}</td>
              <td>
                {{item.items.map(v => v.product_name).join(', ') }}
              </td>
              <td>Rp {{ formatN(item.history_total) }}</td>
              <td>
                <b-button variant="outline-primary" class="float-right" size="sm" @click="getDetail(item)" v-b-modal.items-modal>Detail</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <b-pagination v-model="page" :total-rows="totalData" :per-page="limit" aria-controls="my-table" align="center" @change="paginationSetup"></b-pagination>
    </div>
    <b-modal scrollable :title="invoice" id="items-modal" ref="items-modal" centered hide-footer>
      <div class="items-modal my-modal-body">
        <b-row class="checkout-item" v-for="(item, index) in itemsDetail" :key="index">
          <div class="col-6 item-name">{{ item.product_name }} {{ item.qty }}x</div>
          <div class="col-6 text-right">Rp. {{ formatN(item.subtotal) }}</div>
        </b-row>
        <b-row>
          <b-col>Tax</b-col>
          <b-col class="text-right">Rp {{ formatN(tax) }}</b-col>
        </b-row>
        <b-row>
          <b-col>Total</b-col>
          <b-col class="text-right">Rp {{ formatN(totalBuy) }}</b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'HistoryTable',
  data() {
    return {
      itemsDetail: '',
      itemList: '',
      tax: '',
      totalBuy: '',
      invoice: ''
    }
  },
  created() {
    this.getHistories()
  },
  computed: {
    ...mapGetters({ historyList: 'histories', page: 'getPage', limit: 'getLimit', totalData: 'getTotalData' })
  },
  methods: {
    ...mapActions(['getHistories', 'getHistoryDetail']),
    ...mapMutations(['setPage']),
    formatN(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    paginationSetup(data) {
      this.setPage(data)
      this.getHistories()
      this.$router.push(`?page=${this.page}`)
    },
    getDetail(data) {
      this.getHistoryDetail(data)
        .then(res => {
          this.tax = res.data.data[0].history_ppn
          this.totalBuy = res.data.data[0].history_total
          this.itemsDetail = res.data.data[0].items
          this.invoice = `#${res.data.data[0].history_invoice}`
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}

</script>
