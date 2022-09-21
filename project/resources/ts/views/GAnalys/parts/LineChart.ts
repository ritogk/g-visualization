import { defineComponent, h, PropType } from 'vue'

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

export default defineComponent({
  name: 'LineChart',
  components: {
    Line,
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {},
    },
    plugins: {
      type: Array as PropType<Plugin<'line'>[]>,
      default: () => [],
    },
  },
  setup(props) {
    // チャートの内容は親コンポーネント側で「:chart-data="chartData"」データを渡すと何故か書き換わる。
    const chartData = {
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          borderColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40],
          fill: false,
          tension: 0.2,
        },
      ],
    }

    const chartOptions = {
      responsive: false,
      maintainAspectRatio: false,
    }

    return () =>
      h(Line, {
        chartData: chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      })
  },
})
