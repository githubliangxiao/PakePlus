<template>
	<!--<section class="cc-carousel" @mouseover="fnStopAutoSlide" @mouseout="fnAutoSlide">-->
	<section class="cc-carousel">
		<div class="cc-films" :style="`--w:${data.length * 100}%;--l:-${activeIndex * 100}%;`">
			<div v-for="item in data"
				 :key="item.id"
				 class="cc-film"
				 :style="`--w:${100 / data.length}%;--i:url(${item.src});`"></div>
		</div>
		<div class="cc-controller">
			<div v-for="(item, x) in data"
				 :key="item.id"
				 :class="['cc-point_btn', {'active': x === activeIndex}]"
				 @click="fnSlide(x)"></div>
		</div>
	</section>
</template>

<script>
module.exports = {
	name: "Carousel",
	props: {
		data: {
			type: Array,
			default: []
		}
	},
	data () {
		return {
			activeIndex: 0,
			autoSlideInterval: undefined,
			autoSlideDuration: 5000
		};
	},
	methods: {
		fnSlide (index) {
			this.activeIndex = index;
		},
		fnAutoSlide () {
			if(!this.autoSlideInterval) {
				this.autoSlideInterval = setInterval(() => {
					this.activeIndex ++;
				}, this.autoSlideDuration);
			}
		},
		fnStopAutoSlide () {
			if(this.autoSlideInterval)
				clearInterval(this.autoSlideInterval);
		}
	},
	mounted () {
		this.fnAutoSlide();
	},
	watch: {
		activeIndex (nv) {
			if(nv >= this.data.length)
				this.activeIndex = 0;
		}
	}
};
</script>


<style scoped>
.cc-carousel{
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
	z-index: 0;
}
.cc-carousel .cc-films{
	width: var(--w);
	height: 100%;
	display: flex;
	position: absolute;
	left: var(--l);
	top: 0;
	transition-timing-function: ease-in-out;
	transition-duration: .3s;
}
.cc-carousel .cc-films .cc-film{
	width: var(--w);
	height: 100%;
	background-image: var(--i);
	background-position: center;
	background-size: cover;
}
.cc-carousel .cc-controller{
	width: fit-content;
	display: flex;
	position: absolute;
	left: 50%;
	bottom: 56px;
	z-index: 9;
	transform: translateX(-50%);
}
.cc-carousel .cc-controller .cc-point_btn{
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: white;
	transition-duration: .3s;
	transition-timing-function: ease-in-out;
	cursor: pointer;
}
.cc-carousel .cc-controller .cc-point_btn + .cc-point_btn{
	margin-left: 10px;
}
.cc-carousel .cc-controller .cc-point_btn.active,
.cc-carousel .cc-controller .cc-point_btn:hover{
	background-color: #4778FB;
}
.cc-carousel .cc-controller .cc-point_btn.active{
	width: 24px;
}
.cc-carousel .cc-controller .cc-point_btn:hover{}

@media (max-width: 1000px) {
	.cc-carousel .cc-controller{
		display: none;
	}
}
</style>