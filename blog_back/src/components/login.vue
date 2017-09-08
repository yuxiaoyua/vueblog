<template>
  <div class='wrap'>
<h1>后台登录</h1>
<div class="container w3layouts agileits">
		<div class="login w3layouts agileits">
        <h2>登 录</h2>
        <form action="#" method="post">
          <p v-focus:test="loginname">
          <input type="text" Name="Userame" placeholder="用户名"  v-model.lazy="loginname.val" @blur="fn(loginname)">
          <span style='display:none'>{{loginname.msgread}}</span>
          </p>
          <p v-focus:test="loginpw">
          <input type="password" Name="Password" placeholder="密码" v-model.lazy="loginpw.val" @blur="fn(loginpw)">
          <span style='display:none'>{{loginpw.msgread}}</span>
          </p>
        </form>
        <ul class="tick w3layouts agileits">
          <li>
            <input type="checkbox" id="brand1" value="">
            <label for="brand1"><span></span>记住我</label>
          </li>
        </ul>
        <div class="send-button w3layouts agileits">
          <form>
            <input type="button" value="登 录" @click='login'>
          </form>
        </div>
        <a href="#">记住密码?</a>
      <div class="social-icons w3layouts agileits">
          <p>- 其他方式登录 -</p>
          <ul>
            <li class="qq"><a href="#">
            <span class="icons w3layouts agileits"></span>
            <span class="text w3layouts agileits">QQ</span></a></li>
            <li class="weixin w3ls"><a href="#">
            <span class="icons w3layouts"></span>
            <span class="text w3layouts agileits">微信</span></a></li>
            <li class="weibo aits"><a href="#">
            <span class="icons agileits"></span>
            <span class="text w3layouts agileits">微博</span></a></li>
            <div class="clear"> </div>
          </ul>
			</div>
			<div class="clear"></div>
		</div>
		<div class="copyrights"></div>
		<div class="clear"></div>
</div>
</div>
</template>

<script>
import  '../../static/css/style.css'
    export default {
        // name: 'login',
        data() {
            return {
                loginname: {
                    val: "",
                    msgread: "您输入的姓名不符合中文格式",
                    msg: "您输入的姓名不符合中文格式",
                    test: /^[a-zA-z]+$/,
                    state: false
                },
                loginpw: {
                    val: "",
                    msgread: "您输入的密码格式不对",
                    blur: false,
                    msg: "您输入的密码格式不对",
                    test: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
                    state: false
                }
            }
        },
        methods: {
            login() {
                // 判断是否值是否正确
                var _this = this
                if (!this.loginpw.state && !this.loginname.state && this.loginpw.val != "" && this.loginname.val != "") {
                    this.axios.post("/api/back_class", {
                        loginname: this.loginname.val,
                        loginpw: this.loginpw.val
                    }).then(function(data) {
                        console.log(data)
                        _this.$message(data.data.msg);
                        if (data.data.code == "1001") {
                            sessionStorage.setItem("userId", data.data.userid);
                            sessionStorage.setItem("username", _this.loginname.val);
                            _this.$router.push("/main")
                        }
                    })
                } else {
                    alert("请正确填写用户名密码")
                }

            },
            // 必填项的验证
            fn(val) {
                val.blur = true
            }
        },
        directives: {
            focus: {
                componentUpdated(el, option, vnode, oldVnode) {
                    var $testState = option.value.test.test(option.value.val)
                    if (option.value.val != "") {
                        if ($testState) {
                            option.value.state = false
                        } else {
                            option.value.state = true
                        }
                        option.value.msg = option.oldValue.msgread
                    } else {
                        if (option.arg == "required" && option.value.blur) {
                            option.value.state = true
                            option.value.msg = "不能为空"
                        } else {
                            option.value.state = false
                        }

                    }
                }

            }

        }
    }
</script>

<style scoped>
    .wrap{
        width:100%;
        height:100%;
        background: url("../../static/images/background.jpg");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
    }
      form {
        margin-bottom: 20px;
    }
    
    form span {
        display: block;
        color: #ff2244;
        text-indent: 1em;
    }
</style>