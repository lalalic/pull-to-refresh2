"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PullToRefresh = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactHammerjs = require("react-hammerjs");

var _reactHammerjs2 = _interopRequireDefault(_reactHammerjs);

var _RefreshIndicator = require("material-ui/RefreshIndicator");

var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

var _arrowDownward = require("material-ui/svg-icons/navigation/arrow-downward");

var _arrowDownward2 = _interopRequireDefault(_arrowDownward);

var _arrowUpward = require("material-ui/svg-icons/navigation/arrow-upward");

var _arrowUpward2 = _interopRequireDefault(_arrowUpward);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = function Loading(_ref) {
	var show = _ref.show,
	    label = _ref.label;
	return _react2.default.createElement(
		"center",
		{ style: { display: show ? "block" : "none" } },
		_react2.default.createElement(_RefreshIndicator2.default, {
			size: 20,
			top: 0,
			left: 0,
			status: "loading",
			style: { display: "inline-block", position: "relative" }
		}),
		_react2.default.createElement(
			"span",
			null,
			label
		)
	);
};

var Refreshing = function Refreshing(_ref2) {
	var phase = _ref2.phase,
	    offset = _ref2.offset;
	return _react2.default.createElement(
		"center",
		{ style: {
				display: phase ? "block" : "none",
				background: "transparent",
				height: phase == "refreshing" ? 0 : "auto"
			} },
		function () {
			switch (phase) {
				case "pulling":
					return _react2.default.createElement(_arrowDownward2.default, { color: "lightgray", style: { height: offset } });
				case "rebounding":
					return _react2.default.createElement(_arrowUpward2.default, { color: "lightgray" });
				case "refreshing":
					return _react2.default.createElement(_RefreshIndicator2.default, {
						size: 30,
						top: 15,
						left: 0,
						status: "loading",
						style: { display: "inline-block", position: "relative" }
					});
			}
		}()
	);
};

var PullToRefresh = exports.PullToRefresh = function (_Component) {
	_inherits(PullToRefresh, _Component);

	function PullToRefresh() {
		var _ref3;

		var _temp, _this, _ret;

		_classCallCheck(this, PullToRefresh);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = PullToRefresh.__proto__ || Object.getPrototypeOf(PullToRefresh)).call.apply(_ref3, [this].concat(args))), _this), _this.state = {
			status: null
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(PullToRefresh, [{
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			if (this.state.status == "loading") {
				var host = this.content.parentElement;
				host.scrollTop = host.scrollHeight - host.clientHeight;
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.unmounted = true;
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    onRefresh = _props.onRefresh,
			    children = _props.children,
			    onMore = _props.onMore,
			    resistance = _props.resistance,
			    distanceToRefresh = _props.distanceToRefresh,
			    label = _props.label;
			var _state = this.state,
			    status = _state.status,
			    offset = _state.offset;

			var loading = null;
			if (onMore) {
				loading = _react2.default.createElement(Loading, { label: label, show: "pushing,loading".split(",").includes(this.state.status) });
			}
			return _react2.default.createElement(
				"div",
				{ ref: function ref(node) {
						return _this2.content = node;
					} },
				_react2.default.createElement(Refreshing, { phase: status, offset: offset }),
				_react2.default.createElement(
					_reactHammerjs2.default,
					{
						onPanStart: function onPanStart(e) {
							var host = _this2.content.parentElement;
							_this2.y0 = parseInt(host.scrollTop);
							_this2.scrollHeight = parseInt(host.scrollHeight - host.clientHeight);
						},
						onPan: function onPan(e) {
							var deltaY = e.deltaY;

							var top = _this2.y0 - deltaY;
							if (top < 0) {
								var _offset = -top / resistance;
								_this2.content.style.transform = _this2.content.style.webkitTransform = "translate3d( 0, " + _offset + "px, 0 )";
								_this2.setState({ status: _offset < distanceToRefresh ? "pulling" : "rebounding", offset: _offset });
							} else {
								var _offset2 = (_this2.scrollHeight - top) / resistance;
								if (top > _this2.scrollHeight) {
									_this2.content.style.transform = _this2.content.style.webkitTransform = "translate3d( 0, " + _offset2 + "px, 0 )";
									_this2.setState({ status: "pushing", offset: _offset2 });
								} else {
									_this2.content.parentElement.scrollTop = top;
									_this2.setState({ status: "scrolling", offset: _offset2 });
								}
							}
						},
						onPanEnd: function onPanEnd(e) {
							var reset = function reset(e) {
								return !_this2.unmounted && _this2.setState({ status: null, offset: undefined });
							};
							_this2.content.style.transform = _this2.content.style.webkitTransform = "";
							switch (status) {
								case "pulling":
								case "rebounding":
									_this2.setState({ status: "refreshing" });
									onRefresh(reset);
									break;
								case "pushing":
									if (onMore) {
										_this2.setState({ status: "loading" });
										onMore(reset);
									} else {
										_this2.setState({ status: null, offset: undefined });
									}
									break;
								default:
									_this2.setState({ status: null });
							}
						},
						onPanCancel: function onPanCancel(e) {
							return _this2.setState({ status: null, offset: undefined });
						},
						direction: "DIRECTION_VERTICAL" },
					_react2.default.createElement(
						"div",
						null,
						children
					)
				),
				loading
			);
		}
	}]);

	return PullToRefresh;
}(_react.Component);

PullToRefresh.defaultProps = {
	resistance: 2.5,
	distanceToRefresh: 30,
	label: "",
	onRefresh: function onRefresh(ok) {
		return ok();
	}
};
exports.default = PullToRefresh;