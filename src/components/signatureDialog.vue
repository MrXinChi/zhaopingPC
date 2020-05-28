
<template>
    <div class="container">
        <div class="body_text">
            <div class="header">
                <div class="title_left">
                    <label>确认签名</label>
                </div>
                <div class="title_right">
                    <i class="el-icon-close" @click="closeDialog"></i>
                </div>
            </div>
            <div class="content" ref="canvasHW">
                <canvas ref="canvasF" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></canvas>
                <div class="btnBox">
                    <button @click="backwrite">
                        <img src="@/assets/images/delete_draw.png">
                        撤销上一步
                    </button>
                    <button @click="overwrite">
                        <img src="@/assets/images/return_clean.png">
                        清除
                    </button>
                </div>
            </div>
        </div>

        <span class="bottom">
            <button class="button_close" @click="closeDialog">取消</button>
            <button class="button_submit" @click="submit">发送</button>
        </span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            points:[],
            canvasTxt:null,
            startX:0,
            startY:0,
            moveY:0,
            moveX:0,
            isDown:false,
            imgData:'',
            canvasHistory :[],
            step : -1,
        };
    },
    mounted(){
        let canvas=this.$refs.canvasF;
        canvas.width =428;
        canvas.height =128;//这个宽高和下面的要相同，否则错位
        this.canvasTxt=canvas.getContext("2d");
	},
    methods:{
        //鼠标按下事件
		mouseDown(ev){
			ev = ev || event;
			ev.preventDefault();
			console.log(ev);
			if(1){
			let obj={
				x:ev.offsetX,
				y:ev.offsetY
			};
			this.startX=obj.x;
			this.startY=obj.y;
			this.canvasTxt.beginPath();
			this.canvasTxt.moveTo(this.startX, this.startY);
			this.canvasTxt.lineTo(obj.x, obj.y);
			this.canvasTxt.stroke();
			this.canvasTxt.closePath();
			this.points.push(obj);
			this.isDown=true;
			}
		},
		//鼠标拖动事件
		mouseMove(ev){
			ev = ev || event;
			ev.preventDefault();
			if(this.isDown){
			let obj={
				x:ev.offsetX,
				y:ev.offsetY
			};
			this.moveY=obj.y;
			this.moveX=obj.x;
			this.canvasTxt.beginPath();
			this.canvasTxt.moveTo(this.startX, this.startY);
			this.canvasTxt.lineTo(obj.x, obj.y);
			this.canvasTxt.stroke();
			this.canvasTxt.closePath();
			this.startY=obj.y;
			this.startX=obj.x;
			this.points.push(obj);
			}
		},
		//鼠标抬起事件
		mouseUp(ev){
			ev = ev || event;
			ev.preventDefault();
			if(1){
			let obj={
				x:ev.offsetX,
				y:ev.offsetY
			};
			this.canvasTxt.beginPath();
			this.canvasTxt.moveTo(this.startX, this.startY);
			this.canvasTxt.lineTo(obj.x, obj.y);
			this.canvasTxt.stroke();
			this.canvasTxt.closePath();
			this.points.push(obj);
			this.points.push({x:-1,y:-1});
			this.isDown=false;

			//存储历史轨迹
			this.step++;
			if (this.step < this.canvasHistory.length) {
				this.canvasHistory.length = this.step; // 截断数组
			}
			this.canvasHistory.push(this.$refs.canvasF.toDataURL()); // 添加新的绘制到历史记录
			}
		},
		//撤销
		backwrite(){
			if (this.step >= 0) {
				this.step--;
				this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height);
				let canvasPic = new Image();//绘制新图
				canvasPic.src = this.canvasHistory[this.step];
				canvasPic.addEventListener('load', () => {
					this.canvasTxt.drawImage(canvasPic, 0, 0);
				});
			} else {
				alert('不能再继续撤销了');
			}
		},
		overwrite(){
			this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height);
			this.points=[];
		},
        submit(){
            console.log(this.$refs.canvasF.toDataURL("image/png"));
        },
        closeDialog(){
            this.$emit('close');
        },
    }
};
</script>
<style lang="scss" scoped>
.container{
    width:468px;
    height:348px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    opacity:1;
    box-shadow: 0 1px 3px rgba(172, 169, 169, 0.3);
    position: fixed;
	left: 38%;
	top: 15%;
    z-index: 99;
    .body_text{
        .header{
            border-bottom:1px solid #DEDEDE;
            padding:16px 20px;
            @include flex(row,space-between);
            .title_left{
                @include flex(row,flex-start,center);
                label{
                    font-size:18px;
                    color:rgba(38,38,38,1);
                }
            }
        }
        .content{
            margin:20px;
            padding-bottom: 12px;
            border-bottom:1px solid #DEDEDE;
            .btnBox{
                @include flex(row,flex-start,center);
                margin:12px 0;
                button{
                    @include flex(row,flex-start,center);
                    margin-right: 20px;
                    font-size:14px;
                    color:rgba(89,89,89,1);
                    cursor: pointer;
                    img{
                        width: 12px;
                        height: 12px;
                    }
                }
            }
            canvas{
                width: 428px;
                height: 128px;
                background-color: #F9F9F9;
                border:1px dashed  rgba(222,222,222,1);
                border-radius:4px;
            }
        }
    }
    .bottom{
        @include flex(row,center);
        .button_close{
            width:76px;
            height:34px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(222,222,222,1);
            opacity:1;
            border-radius:4px;

            color:rgba(89,89,89,1);
            font-size:14px;
            cursor: pointer;
        }
        .button_submit{
            margin-left: 20px;
            width:76px;
            height:34px;
            background:rgba(82,134,255,1);
            opacity:1;
            border-radius:4px;

            font-size:14px;
            color:rgba(255,255,255,1);
            cursor: pointer;
        }
        .button_visted{
            width:90px;
            height:34px;
            background:rgba(249,249,249,1);
            border-radius:4px;
 
            font-size:14px;  
            color:rgba(89,89,89,1);
            opacity:1;
        }
    }
}
</style>