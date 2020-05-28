<template>
	<div class="company_wrapper">
		<img class="logo" :src="companyInfo.logo_src +'!100x100'" />
		<div class="company_name" @click="tycBtn">
			<span>{{companyInfo.name}}</span>
			<img src="@/assets/images/tianyancha.png" />
		</div>
		<div class="detail">
			<div class="item" v-if="companyInfo.xingzhi_id_name!='暂无'">
				<v-icon icon-class="icon-company" class-name="icon"></v-icon>
				<h1>{{companyInfo.xingzhi_id_name}}</h1>
			</div>
			<div class="item" v-if="companyInfo.guimo_id_name!='暂无'">
				<v-icon icon-class="icon-people" class-name="icon"></v-icon>
				<h1>{{companyInfo.guimo_id_name}}</h1>
			</div>
			<div class="item" v-if="companyInfo.business_name!='暂无'">
				<v-icon icon-class="icon-sign" class-name="icon"></v-icon>
				<h1>{{companyInfo.business_name}}</h1>
			</div>
		</div>
		<div id="map_container" v-show="isShow"></div>
		<v-frame-company ref="frame"></v-frame-company>
	</div>
</template>

<script>
import axios from "axios";
export default {
	props: {
		companyInfo: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			isShow: false
		};
	},
	watch: {
		companyInfo(newValue, oldValue) {
			let latitude = newValue.latitude;
			let longitude = newValue.longitude;
			if (
				latitude === null ||
				latitude === undefined ||
				longitude === null ||
				longitude === undefined
			) {
				let companyName = newValue.province_name + newValue.name;
					this.$nextTick(function() {
					this.getAddress(companyName);
				});
			} else {
				this.$nextTick(function() {
					this.mapInit(latitude, longitude);
				});
			}
		}
	},
	methods: {
		tycBtn(){
			this.$nextTick(()=>{
				this.$refs.frame.frameShow = true;
				this.$refs.frame.init(this.companyInfo.name);//公司id
			})
			// guimo_id
			// xingzhi_id
			// business
			document.querySelector('html').style.overflow = "hidden"
		},
		mapInit(latitude, longitude) {
			var myLatlng = new qq.maps.LatLng(latitude, longitude);
			var myOptions = {
				zoom: 15,
				center: myLatlng,
				mapTypeId: qq.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
			};
			var map = new qq.maps.Map(
				document.getElementById("map_container"),
				myOptions
			);
			var marker = new qq.maps.Marker({
				position: myLatlng,
				map: map
			});
			this.isShow = true;
		},
		getAddress(companyName) {
			this.$jsonp("https://apis.map.qq.com/ws/geocoder/v1", {
				address: companyName,
				key: "N7KBZ-W3CRV-BGRPY-UH2JU-6XIZ6-A4BHI",
				output: "jsonp"
			}).then(res => {
				if (res.status === 0) {
					this.mapInit(res.result.location.lat, res.result.location.lng);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.company_wrapper {
  padding: 20px;
  .logo {
    margin: 0 auto;
    display: block;
    width: 56px;
    height: 56px;
    padding: 8px;
    border: 1px solid#DEDEDE;
    border-radius: 2px;
  }
  .company_name {
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #dedede;
    span {
      @include word(16, #333333);
      line-height: 22px;
    }
    img {
      margin-left: 8px;
      margin-bottom: 3px;
      width: 56px;
      height: 16px;
      cursor: pointer;
    }
  }
  .detail {
    .item {
      @include flex(row, flex-start, center);
      margin-top: 20px;
      .icon {
        width: 14px;
        height: 14px;
      }
      h1 {
        @include word(14, #595959);
        @include flex(row, flex-start, flex-start, 1);
        margin-left: 8px;
      }
    }
  }
  #map_container {
    margin-top: 20px;
    width: 240px;
    height: 160px;
  }
}
</style>