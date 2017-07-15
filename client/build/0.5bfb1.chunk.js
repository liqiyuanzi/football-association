webpackJsonp([0],{185:function(module,exports,__webpack_require__){"use strict";eval("/* WEBPACK VAR INJECTION */(function($) {\n\nvar _getPrototypeOf = __webpack_require__(109);\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(105);\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(110);\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(107);\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(106);\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(7);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _action = __webpack_require__(111);\n\nvar actions = _interopRequireWildcard(_action);\n\nvar _reactRouter = __webpack_require__(112);\n\nvar _reactRedux = __webpack_require__(113);\n\nvar _login = __webpack_require__(581);\n\nvar _login2 = _interopRequireDefault(_login);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Login = function (_Component) {\n\t(0, _inherits3.default)(Login, _Component);\n\n\tfunction Login() {\n\t\tvar _ref;\n\n\t\tvar _temp, _this, _ret;\n\n\t\t(0, _classCallCheck3.default)(this, Login);\n\n\t\tfor (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n\t\t\targs[_key] = arguments[_key];\n\t\t}\n\n\t\treturn _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).call.apply(_ref, [this].concat(args))), _this), _this.submitLoginForm = function () {\n\t\t\tvar loginPlace = \"\";\n\t\t\tif (remote_ip_info[\"province\"] == remote_ip_info[\"city\"]) {\n\t\t\t\tloginPlace = remote_ip_info[\"country\"] + \" \" + remote_ip_info[\"province\"];\n\t\t\t} else {\n\t\t\t\tloginPlace = remote_ip_info[\"country\"] + \" \" + remote_ip_info[\"province\"] + \" \" + remote_ip_info[\"city\"];\n\t\t\t}\n\t\t\tactions.getLoginData({ \"phoneNumber\": $(\"#userName\").val(), \"password\": $(\"#userPwd\").val(),\n\t\t\t\t'autoLogin': $(\"#autoLogin\").is(':checked'), 'loginPlace': loginPlace }, function (resData) {\n\t\t\t\tif (resData.state == \"success\") {\n\t\t\t\t\t/*登陆成功则获取字典表数据*/\n\t\t\t\t\t_this.context.router.replace('/nav/home');\n\t\t\t\t\tactions.getUserType(resData.userType);\n\t\t\t\t} else {\n\t\t\t\t\tactions.setErrorMsg(resData);\n\t\t\t\t}\n\t\t\t});\n\t\t}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);\n\t}\n\n\t(0, _createClass3.default)(Login, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar errClass = this.props.errMsg ? \"error-msg\" : \"\";\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'login-bg' },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'login-title' },\n\t\t\t\t\t'\\u4E2D\\u56FD\\u8DB3\\u7403\\u534F\\u4F1A\\u6559\\u7EC3\\u5458\\u57F9\\u8BAD\\u7CFB\\u7EDF'\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'login-wraper' },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'login-head' },\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_reactRouter.Link,\n\t\t\t\t\t\t\t{ to: '/login', activeClassName: 'active', className: 'login-head-detail' },\n\t\t\t\t\t\t\t'\\u767B\\u5F55'\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t_reactRouter.Link,\n\t\t\t\t\t\t\t{ to: '/register', activeClassName: 'active', className: 'login-head-detail' },\n\t\t\t\t\t\t\t'\\u6CE8\\u518C'\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t{ className: 'login-head-quit' },\n\t\t\t\t\t\t\t'\\xD7'\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'form',\n\t\t\t\t\t\t{ method: 'post' },\n\t\t\t\t\t\t_react2.default.createElement('input', { id: 'userName', placeholder: '\\u8BF7\\u8F93\\u5165\\u624B\\u673A\\u53F7' }),\n\t\t\t\t\t\t_react2.default.createElement('input', { id: 'userPwd', placeholder: '6-16\\u4F4D\\u5BC6\\u7801,\\u533A\\u5206\\u5927\\u5C0F\\u5199,\\u4E0D\\u80FD\\u7528\\u7A7A\\u683C', type: 'password' })\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'login-save-state' },\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'label',\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t_react2.default.createElement('input', { type: 'checkbox', defaultChecked: 'checked', id: 'autoLogin' }),\n\t\t\t\t\t\t\t'\\xA0\\u4E0B\\u6B21\\u81EA\\u52A8\\u767B\\u5F55'\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'\\u5FD8\\u8BB0\\u5BC6\\u7801'\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: errClass },\n\t\t\t\t\t\tthis.props.errMsg\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'login-button', onClick: this.submitLoginForm },\n\t\t\t\t\t\t'\\u767B\\u5F55'\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\treturn Login;\n}(_react.Component);\n\nLogin.contextTypes = {\n\trouter: _react2.default.PropTypes.object\n};\nvar mapStateToProps = function mapStateToProps(state) {\n\treturn {\n\t\tloginState: state.loginModule.userState,\n\t\terrMsg: state.loginModule.errMsg\n\t};\n};\n\nmodule.exports = (0, _reactRedux.connect)(mapStateToProps, null)(Login);\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(179)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/containers/login.jsx\n// module id = 185\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/containers/login.jsx?")},581:function(module,exports){eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/styles/login.less\n// module id = 581\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/styles/login.less?")}});