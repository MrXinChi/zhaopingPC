<template>
	<div class="container">
		<div class="select_wrapper">
			<el-form ref="form" :model="form" label-width="auto">
				<el-form-item label="举办时间">
					<el-date-picker v-model="form.time" type="date" placeholder="请选择"></el-date-picker>
				</el-form-item>
				<div class="button_list">
					<button class="search" @click="handleSearch">搜索</button>
					<button class="reset" @click="handleReset">重置</button>
				</div>
			</el-form>
		</div>

		<div class="wrapper">
			<v-activity-listKZ @click="onDetail" :mygetList="mygetList" ></v-activity-listKZ>
		</div>


		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="currentSize" 
				layout="prev, pager, next, sizes, jumper"
				:total="currentTotal">
			</el-pagination>
		</div>
		<!-- 底部分隔线 -->
		<div class="partition"></div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				time: '' // 举办时间
			},
			mygetList:[],
			currentPage:1,
			currentSize:10,
			currentTotal:0
		}
	},
	methods: {
		handleSizeChange(val) {
			this.currentSize=val;
			this.getmylist();
		},
		handleCurrentChange(val) {
			this.currentPage=val;
			this.getmylist();
		},
		onDetail(id){
			console.log("回调id:"+id);
		},
		async getmylist(time){
			let dataList=await this.service.liveBroadcast.getList(
				{
					school_del:0,
					page:this.currentPage,
					size:this.currentSize,
					date_time:time==undefined?'':time
				}
			);
			this.mygetList=dataList.data.list;
			this.currentTotal=dataList.data.count;
		},
		// 搜索
		handleSearch() {
			this.getmylist(this.form.time);
		},
		// 重置
		handleReset() {
			this.form.time='';
		}
	},
	created() {
		this.getmylist();
	}
}
</script>

<style lang="scss" scoped>
.container {
  .select_wrapper {
    // height:74px;
    padding: 20px 0 20px 20px;
    background-color: #ffffff;
    .el-form {
      @include flex(row);
      .el-form-item {
        margin:0;
        // /deep/ .el-form-item__label {
        //   @include word(14, #262626, 400, right);
        // }
        /deep/ .el-form-item__label {
          font-size:14px;
          font-family:MicrosoftYaHeiUI;
          color:rgba(38,38,38,1);
          opacity:1;
        }
        /deep/ .el-input__inner{
          width:192px;
          height:34px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(235,235,235,1);
          opacity:1;
          font-size:14px;
          font-family:MicrosoftYaHeiUI;
        }
        &:nth-child(2) {
          margin-left: 25px;
        }
      }
      .button_list {
        @include flex(row, flex-start, center);
        height: 40px;
        button {
          width: 70px;
          height: 34px;
          border-radius: 4px;
          cursor: pointer;
          &.search {
              @include word(14, #ffffff, 400, center);
              background-color: #5286ff;
              border: 1px solid #5286ff;
              font-size:14px;
              font-family:MicrosoftYaHeiUI;
              line-height:18px;
              color:rgba(255,255,255,1);
              opacity:1;
            }
            &.reset { 
              margin-left: 16px;
              @include word(14, #595959, 400, center);
              background-color: #ffffff;
              border: 1px solid #dedede;
 
              font-size:14px;
              font-family:MicrosoftYaHeiUI;
              line-height:18px;
              color:rgba(89,89,89,1);
              opacity:1;
            }
        }
      }
    }
  }
  .wrapper {
    background: #F9F9F9;
  }
  .block{
    background: #F9F9F9;
    padding-top:20px;
    /deep/ .el-pagination{
      @include flex(row,flex-end);
      button{
        background: #F9F9F9;
        padding: 0 !important;
        min-width:24px;
        height:24px;
        border:1px solid rgba(222,222,222,1);
        opacity:1;
        border-radius:4px;
      }
      button:hover{
        border:1px solid rgba(42,113,255,1);
      }
      .el-icon {
          display: block;
          font-size: 11px;
          font-weight: 400;
      }
      .el-pager {
        width: 284px;
        @include flex(row, space-evenly,nowrap);
        li{
          background: #F9F9F9;
          min-width:24px;
          height:24px;
          font-family:MicrosoftYaHeiUI;
          font-size:14px;
          line-height:23px;
          font-weight: 500;
          color:rgba(140,140,140,1);
          border:1px solid rgba(222,222,222,1);
          opacity:1;
          border-radius:4px;
        }
        li.el-icon{
          border:1px solid#f9f9f9;
        }
        /deep/ .el-icon-d-arrow-right{
          position: relative;
          top:-3px;
          border:1px solid#f9f9f9 !important;
        }
        li:hover{
          border:1px solid rgba(42,113,255,1);
          color: rgba(42,113,255,1);
        }
        li.active{
          border:1px solid rgba(42,113,255,1);
          color: rgba(42,113,255,1);
        }
      }
      .el-pagination__sizes{
        margin-left: 5px;
        line-height: 0;
        .el-select .el-input .el-input__inner{
          background: #F9F9F9;
          height:24px;
          border:1px solid rgba(222,222,222,1);
          opacity:1;
          border-radius:4px;
          font-size:14px;
          font-family:MicrosoftYaHeiUI;
          line-height:18px;
          color:rgba(140,140,140,1);
          opacity:1;
        }
        .el-select .el-input .el-input__inner:hover{
          border:1px solid rgba(42,113,255,1);
          color: rgba(42,113,255,1);
        }
      }
      .el-pagination__jump{
        margin:0;
        margin-right: 20px;
        font-size:14px;
        font-family:MicrosoftYaHeiUI;
        line-height:18px;
        color:rgba(140,140,140,1);
        opacity:1;
        cursor: pointer;
        .el-input__inner{
          background: #F9F9F9;
          width:28px;
          height:24px;
          border:1px solid rgba(222,222,222,1);
          opacity:1;
          border-radius:4px;
          font-size:14px;
          font-family:MicrosoftYaHeiUI;
          line-height:18px;
          color:rgba(140,140,140,1);
        }
        .el-input__inner:hover{
          border:1px solid rgba(42,113,255,1);
          color: rgba(42,113,255,1);
        }
      }
    }
  }
  .partition{
		height: 16px;;
		background-color:#F9F9F9;
	}
}
</style>