import { mkStore } from '../stores/mkStore'
import { registerComponents } from '../components/+core'
import { Alarms } from '../components/alarm'
import { Theme } from '../components/theme'

document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Components
	 */
	registerComponents([
		Alarms,
		Theme
	])

	/**
	 * Store example
	 */
})
