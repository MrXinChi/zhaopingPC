import Vue from 'vue'
import vIcon from '@/components/vIcon'

Vue.component('v-icon', vIcon)

const req = require.context('../assets/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)