<template>
	<section class="cl-login">
		<x-carousel :data="carouselData"></x-carousel>
		<div class="cl-form_wrapper">
			<div class="cl-top_bar">
				<!-- 登录方式 -->
				<div class="cl-log_action">
					<div v-if="logAction === 1" class="cl-action_tag">
						<el-icon>
							<FullScreen/>
						</el-icon>
						<span>APP扫码登录</span>
					</div>
					<div v-if="logAction === 2" class="cl-action_tag">
					  <el-icon><Lock /></el-icon>
					  <span>密码登录</span>
					</div>
				</div>
				<!-- 登录方式 切换按钮（右上角） -->
				<div v-if="logAction === 1" class="cl-log_action-switch" @click="logAction = 2">
					<!--<img src="../../images/icon001.svg" alt="扫码登录">-->
				</div>
				<div v-if="logAction === 2" class="cl-log_action-switch" @click="logAction = 1">
					<!--<img src="../../images/icon002.svg" alt="密码登录">-->
				</div>
			</div>
			<!-- logo -->
			<div class="cl-logo">
				<!--<img src="../../images/logo001.png" alt="logo">-->
			</div>
			<!-- 系统名称 -->
			<div class="cl-app_name">统一身份认证平台</div>
			<transition name="slide-fade" mode="out-in">
				<!-- 登录方式 密码登录 -->
				<div v-if="logAction === 1" class="cl-log_action-form" key="log_action-form">
					<!-- 登录方式 标签 -->
					<div class="cl-log_action-tabs">
						<div :class="['cl-item', {'active': attestationWay === 1}]" @click="attestationWay = 1">短信认证</div>
						<div :class="['cl-item', {'active': attestationWay === 2}]" @click="attestationWay = 2">密码登录</div>
					</div>
					<!-- 表单 -->
					<div class="cl-form">
						<el-form :model="form" ref="ruleForm" :rules="ruleForm">
							<el-form-item v-if="attestationWay === 2" prop="username">
								<el-input v-model="form.username" placeholder="请输入帐号"></el-input>
							</el-form-item>
							<el-form-item v-if="attestationWay === 2" prop="password">
								<el-input v-model="form.password" show-password placeholder="请输入密码"></el-input>
							</el-form-item>
							<el-form-item v-if="attestationWay === 2">
								<div class="cl-remember_me">
									<el-checkbox v-model="remember">记住密码</el-checkbox>
									<div class="cl-retrieve_btn" @click="fnRetrievePwd">找回密码</div>
								</div>
							</el-form-item>
							<el-form-item v-if="attestationWay === 1" prop="mobile">
								<el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
							</el-form-item>
							<el-form-item v-if="attestationWay === 1" prop="code">
								<el-input v-model="form.code" placeholder="请输入验证码">
									<template #append>
										<el-button>获取验证码</el-button>
									</template>
								</el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" style="width:100%;" @click="fnSubmitForm('ruleForm')">登录</el-button>
							</el-form-item>
							<el-form-item>
								<el-button style="width:100%" @click="fnGotoTest">Test</el-button>
							</el-form-item>
						</el-form>
					</div>
					<!-- 第三方登录 -->
					<div class="cl-third_party">
						<div class="cl-divider">第三方登录方式</div>
						<div class="cl-list">
							<div class="cl-item"><i class="iconfont icon-dgcweixin" style="color:#28C445;"></i></div>
							<div class="cl-item"><i class="iconfont icon-dgcQQ" style="color:#30A5DD;"></i></div>
						</div>
					</div>
				</div>

				<!-- 登录方式 扫码登录 -->
				<div v-if="logAction === 2" class="cl-log_action-qr" key="log_action-qr">
					<div class="cl-log_action-tabs">
						<div class="cl-item active">扫码登录</div>
					</div>
					<div class="cl-tip">请用统一身份认证APP扫下方二维码登录，并在手机上点击“确认登录”即可</div>
					<div class="cl-qr_code"></div>
				</div>
			</transition>

			<!-- 授权 -->
			<div :class="['cl-copyright', {'cl-bottom': logAction === 1}]">Copyright&nbsp;&copy;&nbsp;2010-{{new Date().getFullYear()}}&nbsp;Nsoft&nbsp;Co,LTD</div>

			<div :class="['cl-long_btn', {'cl-hidden': logAction === 1}]">
				<el-icon><Iphone /></el-icon>
				<span>下载统一身份认证APP</span>
			</div>
		</div>

		<!-- dialog 找回密码 -->
		<el-dialog v-model="dialogFormVisible" title="找回密码" width="670" :close-on-click-modal="false">
			<el-steps style="max-width:600px;margin:0 auto;" :active="retrieveStep" align-center>
				<el-step title="验证用户名" />
				<el-step title="安全验证" />
				<el-step title="设置新密码" />
			</el-steps>
			<transition name="slide-fade" mode="out-in">
				<!-- 第一步 -->
				<el-form v-if="retrieveStep === 1" style="width:365px;margin:35px auto 0;" key="step1" v-loading="retrieveLoading">
					<el-form-item>
						<el-input size="large" autocomplete="off" placeholder="请输入您的用户名（帐号、教工号、学号、手机号）" prefix-icon="UserFilled" />
					</el-form-item>
					<el-form-item>
						<div class="cl-input_wrapper">
							<div class="cl-float_wrapper left"><i class="iconfont icon-dgcrenzhengguanli"></i></div>
							<el-input size="large" autocomplete="off" placeholder="请选择找回方式" readonly prefix-icon="icon"></el-input>
							<div class="cl-float_wrapper right">
								<el-radio-group v-model="retrieveWay">
									<el-radio value="1">邮箱</el-radio>
									<el-radio value="2">短信</el-radio>
								</el-radio-group>
							</div>
						</div>
					</el-form-item>
					<el-form-item>
						<div class="cl-input_wrapper">
							<el-input size="large" autocomplete="off" placeholder="请输入校验码" prefix-icon="Lock" />
							<div class="cl-float_wrapper right">
								<span>验证码</span>
							</div>
						</div>
					</el-form-item>
					<div class="el-form-item">
						<el-button size="large" type="primary" style="width:100%;" @click="fnTunRetrieveStep(1)">下一步</el-button>
					</div>
				</el-form>
				<!-- 第二步 -->
				<el-form v-if="retrieveStep === 2" style="width:365px;margin:35px auto 0;" key="step2" v-loading="retrieveLoading">
					<el-form-item>
						<div class="cl-input_wrapper">
							<el-input size="large" autocomplete="off" placeholder="zhao**tian@qq.com" readonly prefix-icon="Message" />
							<div class="cl-float_wrapper right">
								<el-button type="text">发送验证码</el-button>
							</div>
						</div>
					</el-form-item>
					<el-form-item>
						<el-input size="large" autocomplete="off" placeholder="请输入您收到的验证码" prefix-icon="Lock" />
					</el-form-item>
					<el-form-item>
						<el-button size="large" type="primary" style="width:100%;" @click="fnTunRetrieveStep(2)">下一步</el-button>
					</el-form-item>
				</el-form>
				<!-- 第三步 -->
				<el-form v-if="retrieveStep === 3" style="width:365px;margin:35px auto 0;" key="step3" v-loading="retrieveLoading">
					<el-form-item>
						<el-input size="large" autocomplete="off" placeholder="请输入新密码" prefix-icon="Lock" />
					</el-form-item>
					<div class="el-form-item">
						<el-input size="large" autocomplete="off" placeholder="请再次输入新密码" prefix-icon="Lock" />
					</div>
					<div class="el-form-item">
						<el-button size="large" type="primary" style="width:100%;" @click="fnTunRetrieveStep(3)">提交确认</el-button>
					</div>
				</el-form>
			</transition>
		</el-dialog>
	</section>
</template>

<script>
module.exports = {
	name: "Login",
	components: {
		XCarousel: defineAsyncComponent(() => loadModule("/components/login/Carousel.vue", loaderOptions)),
	},
	data () {
		return {
			dialogFormVisible: false,
			retrieveWay: "",
			retrieveStep: 1,
			retrieveLoading: false,

			carouselData: [
				{id: 1, key: 1, src: "../images/p03.png"},
				{id: 2, key: 2, src: "../images/p02.jpg"},
				{id: 3, key: 3, src: "../images/p01.jpg"}
			],
			logAction: 1,      // 登录方式（1：密码登录，2：扫码登录）
			attestationWay: 1, // 认证方式（1：短信认证，2：密码登录）
			remember: "",
			form: {},
			ruleForm: {
				username: [
					{required:true,message:'请输入帐号'},
					{min:2,max:15,message:'长度在 2 到 15 之间'}
				],
				password: [
					{required:true,message:'请输入密码'},
					{min:6,max:18,message:'长度在 6 到 18 之间'}
				],
				mobile: [
					{required:true,message:'请输入手机号'},
					{min:11,max:11,message:'请输入11位数手机号'}
				],
				code: [
					{required:true,message:'请输入验证码'},
					{min:4,max:4,message:'请输入4位数验证码'}
				]
			}
		};
	},
	methods: {
		fnRetrievePwd () {
			this.dialogFormVisible = true;
		},
		fnTunRetrieveStep (step) {
			if(step !== 1 && step !== 2 && step !== 3) return;
			if(step === 1) {
				this.retrieveStep = 2;
			}
			if(step === 2) {
				this.retrieveStep = 3;
			}
			if(step === 3) {
				this.retrieveLoading = true;
				setTimeout(() => {
					this.retrieveStep = 1;
					this.retrieveLoading = false;
					ElementPlus.ElMessage.success("成功重置了密码，请使用新密码登录");
				}, 1000);
			}
		},
		fnSubmitForm (formName) {
			console.log(formName);
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// 提交表单
					sessionStorage.setItem("token", "token");
					this.$router.push("/");
				} else {
					return false;
				}
			});
		},
		fnGotoTest () {
			this.$router.push("/test");
		}
	},
	mounted () {
		/*request.get("/portal/getUser2/12345678").then(res => {
		  console.log(res);
		}).catch(error => {
		  console.error(error);
		});*/
	}
};
</script>

<style src="/less/login.less"></style>