import JsPDF from 'jspdf'

export default {
  methods: {
    download() {
      this.setLoading(true)
      const doc = new JsPDF()
      doc.text(20, 20, `Receipt no. #${this.invoice}`)
      doc.text(20, 30, `Cashier: ${this.cashier_name}`)
      doc.text(20, 40, 'Items:')
      const set = { line: 50 }
      this.resCartItems.forEach((v, i) => {
        doc.text(20, set.line,
          ` - ${v.product_name} x${v.qty} : Rp ${this.formatN(v.product_price)}`)
        set.line += 10
      })
      doc.text(20, set.line + 20, `Subtotal: Rp ${this.formatN(this.resCartSubtotal)}`)
      doc.text(20, set.line + 30, `PPn: Rp ${this.formatN(this.resTax)}`)
      doc.text(20, set.line + 40, `Total: Rp ${this.formatN(this.resTotal)}`)
      doc.text(20, set.line + 50, 'Payment: Cash')
      doc.save('Evday-receipt.pdf')
      setTimeout(() => {
        this.setLoading(false)
      }, 2500)
    }
  }
}
