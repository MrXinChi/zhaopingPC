<template>
<div class="el-calendar">
	<div class="el-calendar__header">
		<i class="el-calendar-prev" @click="selectDate('prev-month')"></i>
		<div class="el-calendar__title">
			<div class="el-calendar__title_year">{{customYear}}</div>
			<div class="el-calendar__title_month">{{customMonth}}</div>
		</div>
		<i class="el-calendar-next" @click="selectDate('next-month')"></i>
	</div>
	<div class="el-calendar_body" v-if="validatedRange.length === 0" key="no-range">
		<date-table :date="date" :selected-day="realSelectedDay" @pick="pick(date)" />
	</div>
	<div v-else class="el-calendar__body" key="has-range">
		<date-table v-for="(range, index) in validatedRange" :key="index" :date="range[0]" :selected-day="realSelectedDay" :range="range" :hide-header="index !== 0" :first-day-of-week="realFirstDayOfWeek" />
	</div>
	<div class="activity_list">
		<div class="activity_item">
			<i class="color_green"></i>
			<span>宣讲会</span>
		</div>
		<div class="activity_item">
			<i class="color_orange"></i>
			<span>双选会</span>
		</div>
		<div class="activity_item">
			<i class="color_blue"></i>
			<span>活动</span>
		</div>
	</div>
</div>
</template>

<script>
import Locale from 'element-ui/src/mixins/locale'
import fecha from 'element-ui/src/utils/date'
import ElButton from 'element-ui/packages/button'
import ElButtonGroup from 'element-ui/packages/button-group'
import DateTable from './vDateTable'
import { validateRangeInOneMonth } from 'element-ui/src/utils/date-util'

const validTypes = ['prev-month', 'today', 'next-month']
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const oneDay = 86400000

export default {
	name: 'ElCalendar',
	mixins: [Locale],
	components: {
		DateTable,
		ElButton,
		ElButtonGroup
	},
	props: {
		value: [Date, String, Number],
		range: {
			type: Array,
			validator(range) {
				if (Array.isArray(range)) {
					return (
						range.length === 2 &&
						range.every(item => typeof item === 'string' || typeof item === 'number' || item instanceof Date)
					)
				} else {
					return true
				}
			}
		},
		firstDayOfWeek: {
			type: Number,
			default: 1
		}
  	},
	provide() {
		return {
			elCalendar: this
		}
	},

	methods: {
		pick(e) {
			console.log(e)
		},
		pickDay(day) {
			this.realSelectedDay = day
		},
		selectDate(type) {
		if (validTypes.indexOf(type) === -1) {
			throw new Error(`invalid type ${type}`)
		}
		let day = ''
		if (type === 'prev-month') {
			day = `${this.prevMonthDatePrefix}-01`
		} else if (type === 'next-month') {
			day = `${this.nextMonthDatePrefix}-01`
		} else {
			day = this.formatedToday
		}

		if (day === this.formatedDate) return
		this.pickDay(day)
		},

		toDate(val) {
		if (!val) {
			throw new Error('invalid val')
		}
		return val instanceof Date ? val : new Date(val)
		},

		rangeValidator(date, isStart) {
		const firstDayOfWeek = this.realFirstDayOfWeek
		const expected = isStart ? firstDayOfWeek : firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
		const message = `${isStart ? 'start' : 'end'} of range should be ${weekDays[expected]}.`
		if (date.getDay() !== expected) {
			console.warn('[ElementCalendar]', message, 'Invalid range will be ignored.')
			return false
		}
		return true
		}
	},

	computed: {
		prevMonthDatePrefix() {
			const temp = new Date(this.date.getTime())
			temp.setDate(0)
			return fecha.format(temp, 'yyyy-MM')
		},

		curMonthDatePrefix() {
			return fecha.format(this.date, 'yyyy-MM')
		},

		nextMonthDatePrefix() {
			const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1)
			return fecha.format(temp, 'yyyy-MM')
		},

		formatedDate() {
			return fecha.format(this.date, 'yyyy-MM-dd')
		},
		customYear() {
			const year = this.date.getFullYear()
			return `${year}年`
		},
		customMonth() {
			const month = this.date.getMonth() + 1
			return month
		},
		i18nDate() {
			const year = this.date.getFullYear()
			const month = this.date.getMonth() + 1
			return `${year} ${this.t('el.datepicker.year')} ${this.t('el.datepicker.month' + month)}`
		},

		formatedToday() {
			return fecha.format(this.now, 'yyyy-MM-dd')
		},

		realSelectedDay: {
			get() {
				if (!this.value) return this.selectedDay
				return this.formatedDate
			},
			set(val) {
				this.selectedDay = val
				const date = new Date(val)
				this.$emit('input', date)
			}
		},

		date() {
			if (!this.value) {
				if (this.realSelectedDay) {
					const d = this.selectedDay.split('-')
					return new Date(d[0], d[1] - 1, d[2])
				} else if (this.validatedRange.length) {
					return this.validatedRange[0][0]
				}
				return this.now
			} else {
				return this.toDate(this.value)
			}
		},

		// if range is valid, we get a two-digit array
		validatedRange() {
			let range = this.range
			if (!range) return []
			range = range.reduce((prev, val, index) => {
				const date = this.toDate(val)
				if (this.rangeValidator(date, index === 0)) {
					prev = prev.concat(date)
				}
				return prev
			}, [])
			if (range.length === 2) {
				const [start, end] = range
				if (start > end) {
					console.warn('[ElementCalendar]end time should be greater than start time')
				return []
				}
				// start time and end time in one month
				if (validateRangeInOneMonth(start, end)) {
					return [[start, end]]
				}
				const data = []
				let startDay = new Date(start.getFullYear(), start.getMonth() + 1, 1)
				const lastDay = this.toDate(startDay.getTime() - oneDay)
				if (!validateRangeInOneMonth(startDay, end)) {
					console.warn('[ElementCalendar]start time and end time interval must not exceed two months')
					return []
				}
				// 第一个月的时间范围
				data.push([start, lastDay])
				// 下一月的时间范围，需要计算一下该月的第一个周起始日
				const firstDayOfWeek = this.realFirstDayOfWeek
				const nextMontFirstDay = startDay.getDay()
				let interval = 0
				if (nextMontFirstDay !== firstDayOfWeek) {
					if (firstDayOfWeek === 0) {
						interval = 7 - nextMontFirstDay
					} else {
						interval = firstDayOfWeek - nextMontFirstDay
						interval = interval > 0 ? interval : 7 + interval
					}
				}
				startDay = this.toDate(startDay.getTime() + interval * oneDay)
				if (startDay.getDate() < end.getDate()) {
					data.push([startDay, end])
				}
				return data
			}
			return []
		},

		realFirstDayOfWeek() {
			if (this.firstDayOfWeek < 1 || this.firstDayOfWeek > 6) {
				return 0
			}
			return Math.floor(this.firstDayOfWeek)
		}
	},

	data() {
		return {
			selectedDay: '',
			now: new Date()
		}
	}
}
</script>

<style lang="scss">
.el-calendar {
	height: 424px;
	background: #ffffff;
	border-radius: 4px;
	.el-calendar__header {
		@include flex(row, space-between, center);
		padding: 24px 20px 12px 20px;
		border-bottom: none;
		.el-calendar-prev {
			@include icon(32, '../assets/components/icon_arrow_left.png');
			cursor: pointer;
		}
		.el-calendar__title {
			text-align: center;
			letter-spacing: 2px;
			.el-calendar__title_year {
				@include word(16, #262626);
			}
			.el-calendar__title_month {
				margin-top: 8px;
				text-align: center;
				@include word(24, #262626);
			}
		}
		.el-calendar-next {
			@include icon(32, '../assets/components/icon_arrow_right.png');
			cursor: pointer;
		}
	}
	.el-calendar_body {
		padding: 0 5px;
		.el-calendar-table {
			thead {
				th {
					@include word(14, #cccccc);
					text-align: center;
				}
			}
			tbody {
				.el-calendar-table__row {
					td {
						border: none;
						text-align: center;
						.el-calendar-day {
							padding: 0;
							height: 40px;
							line-height: 40px;
							text-align: center;
							&:hover {
								cursor: default;
								background: none;
							}
						}
						&.prev {
							@include word(16, #cccccc);
						}
						&.current {
							@include word(16, #595959);
						}
						&.next {
							@include word(16, #cccccc);
						}
					}
				}
			}
		}
	}
	.activity_list {
		@include flex(row, flex-start, center);
		padding: 20px 0 20px 20px;
		.activity_item {
			@include flex(row, flex-start, center);
			margin-right: 24px;
			i {
				width: 8px;
				height: 8px;
				border-radius: 50%;
			}
			span {
				@include word(12, #8c8c8c);
				margin-left: 4px;
			}
		}
	}
	.color_green {
		background-color: #3bd5b3;
	}
	.color_orange {
		background-color: #ff9443;
	}
	.color_blue {
		background-color: #72baf7;
	}
}
.el-calendar__title_month {
	text-align: center !important ;
}
</style>