<script>
// libs
import { Line, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    data: {
      required: true
    },
    options: {
      required: true
    }
  },
  async mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>
