/**
 * @file config.js
 * @synopsis  地址配置文件
 * @author licuiting, 250602615@qq.com
 * @version 1.0.0
 * @date 2016-01-12
 */

define(function(require, exports, module) {
    module.exports = {
        url: 'http://www.yunhou.com/api/getRegion/jsonp/', //获取地址url
        defaultUrl: 'http://www.yunhou.com/api/getUserRegion', //获取默认地址url
        setCookieUrl: 'http://www.yunhou.com/api/setUserRegion', //设置cookie
        degree: 4,
        labelTxt: ['选择省', '选择市', '选择区', '选择街道'],
        selectedIndex: 4, //选中的索引
        isShowCtn: false,//界面初始化时，是否打开box面板
        isShowClose: true, //是否显示关闭按钮
        isGetDefaultAddr: true, //是否获取默认地址,指接口获取的值或者cookie的值
        isSetAddrCookie: true, //是否调用后端存储cookie的url
        ajaxData: {} //外部ajax参数
    }
});
