/* eslint-disable */
// @ts-nocheck
if (new URLSearchParams(window.location.search).get('mobile') === 'true') {
	try {
		unsafeWindow.console.warn("DANGER: This userscript is  using unsafeWindow. Unsafe websites could potentially use this to gain access to data and other content that the browser normally wouldn't allow!"), Object.defineProperty(window, 'clientWindow', { value: unsafeWindow });
	} catch {
		Object.defineProperty(window, 'clientWindow', { value: window });
	}
	(function () {
		try {
			return document.createEvent('TouchEvent'), !0;
		} catch (A) {
			return !1;
		}
	})() || alert('WARNING: This script was created for mobile, and may break functionality in non-mobile browsers!'),
		(clientWindow.crouchLock = !1),
		(clientWindow.sprintLock = !1),
		(clientWindow.keyboardFix = !1),
		(clientWindow.inputFix = !1),
		(clientWindow.blockNextInput = !1),
		(clientWindow.hiddenInputFocused = !1);
	var A = null,
		I = null,
		g = null;
	String.prototype.toKeyCode = function () {
		return {
			0: 48,
			1: 49,
			2: 50,
			3: 51,
			4: 52,
			5: 53,
			6: 54,
			7: 55,
			8: 56,
			9: 57,
			backspace: 8,
			tab: 9,
			enter: 13,
			shift: 16,
			ctrl: 17,
			alt: 18,
			pause_break: 19,
			caps_lock: 20,
			escape: 27,
			' ': 32,
			page_up: 33,
			page_down: 34,
			end: 35,
			home: 36,
			left_arrow: 37,
			up_arrow: 38,
			right_arrow: 39,
			down_arrow: 40,
			insert: 45,
			delete: 46,
			a: 65,
			b: 66,
			c: 67,
			d: 68,
			e: 69,
			f: 70,
			g: 71,
			h: 72,
			i: 73,
			j: 74,
			k: 75,
			l: 76,
			m: 77,
			n: 78,
			o: 79,
			p: 80,
			q: 81,
			r: 82,
			s: 83,
			t: 84,
			u: 85,
			v: 86,
			w: 87,
			x: 88,
			y: 89,
			z: 90,
			left_window_key: 91,
			right_window_key: 92,
			select_key: 93,
			numpad_0: 96,
			numpad_1: 97,
			numpad_2: 98,
			numpad_3: 99,
			numpad_4: 100,
			numpad_5: 101,
			numpad_6: 102,
			numpad_7: 103,
			numpad_8: 104,
			numpad_9: 105,
			'*': 106,
			'+': 107,
			'-': 109,
			'.': 110,
			'/': 111,
			f1: 112,
			f2: 113,
			f3: 114,
			f4: 115,
			f5: 116,
			f6: 117,
			f7: 118,
			f8: 119,
			f9: 120,
			f10: 121,
			f11: 122,
			f12: 123,
			num_lock: 144,
			scroll_lock: 145,
			';': 186,
			'=': 187,
			',': 188,
			'-': 189,
			'.': 190,
			'/': 191,
			'`': 192,
			'[': 219,
			'\\': 220,
			']': 221,
			'"': 222,
		}[this];
	};
	const i = EventTarget.prototype.addEventListener;
	Object.defineProperty(EventTarget.prototype, 'addEventListener', {
		value: function (A, I, ...g) {
			'keydown' == A
				? i.call(
						this,
						A,
						function (...A) {
							if (A[0].isValid || !clientWindow.keyboardFix) return I.apply(this, A);
						},
						...g
				  )
				: i.call(this, A, I, ...g);
		},
	});
	const e = Event.prototype.preventDefault;
	function C(A, I) {
		const g = A.toKeyCode();
		let i = new KeyboardEvent(I, { key: A, keyCode: g, which: g });
		(i.isValid = !0), clientWindow.dispatchEvent(i);
	}
	function t(A, I, g) {
		g.dispatchEvent(new PointerEvent(I, { button: A }));
	}
	function G(A, I) {
		A.dispatchEvent(new WheelEvent('wheel', { wheelDeltaY: I }));
	}
	function d(A) {
		let I = document.getElementById('inGameStyle'),
			g = document.getElementById('inMenuStyle');
		(I.disabled = A), (g.disabled = !A);
	}
	(Event.prototype.preventDefault = function (A) {
		('hiddenInput' != document.activeElement.id || A) && ((this._preventDefault = e), this._preventDefault());
	}),
		(clientWindow.fakelock = null),
		Object.defineProperty(Element.prototype, 'requestPointerLock', {
			value: function () {
				return (clientWindow.fakelock = this), document.dispatchEvent(new Event('pointerlockchange')), d(!0), !0;
			},
		}),
		Object.defineProperty(Document.prototype, 'pointerLockElement', {
			get: function () {
				return clientWindow.fakelock;
			},
		}),
		Object.defineProperty(Document.prototype, 'exitPointerLock', {
			value: function () {
				return (clientWindow.fakelock = null), document.dispatchEvent(new Event('pointerlockchange')), d(!1), !0;
			},
		}),
		(clientWindow.fakefull = null),
		Object.defineProperty(Element.prototype, 'requestFullscreen', {
			value: function () {
				return (clientWindow.fakefull = this), document.dispatchEvent(new Event('fullscreenchange')), !0;
			},
		}),
		Object.defineProperty(document, 'fullscreenElement', {
			get: function () {
				return clientWindow.fakefull;
			},
		}),
		Object.defineProperty(Document.prototype, 'exitFullscreen', {
			value: function () {
				return (clientWindow.fakefull = null), document.dispatchEvent(new Event('fullscreenchange')), !0;
			},
		});
	const c = document.createElement;
	document.createElement = function (A, I) {
		this._createElement = c;
		var g = this._createElement(A);
		return (
			'input' != A ||
				I ||
				(document.querySelectorAll('#fileUpload').forEach((A) => A.parentNode.removeChild(A)),
				(g.id = 'fileUpload'),
				g.addEventListener(
					'change',
					function (A) {
						(g.hidden = !0), (g.style.display = 'none');
					},
					{ passive: !1, once: !0 }
				),
				clientWindow.addEventListener(
					'focus',
					function (A) {
						setTimeout(() => {
							(g.hidden = !0), (g.style.display = 'none');
						}, 300);
					},
					{ once: !0 }
				),
				document.body.appendChild(g)),
			g
		);
	};
	let n = document.createElement('style');
	(n.id = 'inGameStyle'), (n.textContent = '\n.inGame {\ndisplay: none;\n}'), document.documentElement.appendChild(n);
	let o = document.createElement('style');
	function Z(A, I, g) {
		var i = document.createElement(g ?? 'button', !0);
		return (
			i.classList.add(A),
			i.classList.add(I),
			i.classList.add('mobileControl'),
			i.addEventListener(
				'touchmove',
				function (A) {
					A.preventDefault();
				},
				!1
			),
			i.addEventListener('contextmenu', function (A) {
				A.preventDefault();
			}),
			i
		);
	}
	var l;
	(o.id = 'inMenuStyle'),
		(o.textContent = '\n.inMenu {\ndisplay: none;\n}'),
		document.documentElement.appendChild(o),
		((l = 'canvas'),
		new Promise((A) => {
			if (document.querySelector(l)) return A(document.querySelector(l));
			const I = new MutationObserver((g) => {
				document.querySelector(l) && (I.disconnect(), A(document.querySelector(l)));
			});
			I.observe(document.documentElement, { childList: !0, subtree: !0 });
		})).then(() => {
			!(function () {
				var i = document.querySelector('canvas');
				i.addEventListener(
					'touchmove',
					function (g) {
						g.preventDefault();
						const e = g.targetTouches[0];
						A || ((A = e.pageX), (I = e.pageY)), (g.movementX = e.pageX - A), (g.movementY = e.pageY - I);
						var C = clientWindow.fakelock ? new MouseEvent('mousemove', { movementX: g.movementX, movementY: g.movementY }) : new WheelEvent('wheel', { wheelDeltaY: g.movementY });
						i.dispatchEvent(C), (A = e.pageX), (I = e.pageY);
					},
					!1
				),
					i.addEventListener(
						'touchend',
						function (g) {
							(A = null), (I = null);
						},
						!1
					),
					d(null != clientWindow.fakelock);
				let e = Z('strafeRightButton', 'inGame', 'div');
				(e.style.cssText = 'left:20vh;bottom:20vh;'), document.body.appendChild(e);
				let c = Z('strafeLeftButton', 'inGame', 'div');
				(c.style.cssText = 'left:0vh;bottom:20vh;'), document.body.appendChild(c);
				let n = Z('forwardButton', 'inGame', 'div');
				(n.style.cssText = 'left:10vh;bottom:20vh;'),
					n.addEventListener(
						'touchstart',
						function (A) {
							C('w', 'keydown'), e.classList.remove('hide'), c.classList.remove('hide'), n.classList.add('active');
						},
						!1
					),
					n.addEventListener(
						'touchmove',
						function (A) {
							A.preventDefault();
							const I = A.targetTouches[0];
							g || (g = I.pageX);
							let i = I.pageX - g;
							10 * i > clientWindow.innerHeight ? (e.classList.add('active'), c.classList.remove('active'), C('d', 'keydown'), C('a', 'keyup')) : 10 * i < 0 - clientWindow.innerHeight ? (c.classList.add('active'), e.classList.remove('active'), C('a', 'keydown'), C('d', 'keyup')) : (e.classList.remove('active'), c.classList.remove('active'));
						},
						!1
					),
					n.addEventListener(
						'touchend',
						function (A) {
							C('w', 'keyup'), C('d', 'keyup'), C('a', 'keyup'), e.classList.remove('active'), c.classList.remove('active'), e.classList.add('hide'), c.classList.add('hide'), n.classList.remove('active'), (g = null);
						},
						!1
					),
					e.classList.add('hide'),
					c.classList.add('hide'),
					document.body.appendChild(n);
				let o = Z('rightButton', 'inGame');
				(o.style.cssText = 'left:20vh;bottom:10vh;'),
					o.addEventListener(
						'touchstart',
						function (A) {
							C('d', 'keydown');
						},
						!1
					),
					o.addEventListener(
						'touchend',
						function (A) {
							C('d', 'keyup');
						},
						!1
					),
					document.body.appendChild(o);
				let l = Z('leftButton', 'inGame');
				(l.style.cssText = 'left: 0vh; bottom:10vh;'),
					l.addEventListener(
						'touchstart',
						function (A) {
							C('a', 'keydown');
						},
						!1
					),
					l.addEventListener(
						'touchend',
						function (A) {
							C('a', 'keyup');
						},
						!1
					),
					document.body.appendChild(l);
				let b = Z('backButton', 'inGame');
				(b.style.cssText = 'left:10vh;bottom:0vh;'),
					b.addEventListener(
						'touchstart',
						function (A) {
							C('s', 'keydown');
						},
						!1
					),
					b.addEventListener(
						'touchend',
						function (A) {
							C('s', 'keyup');
						},
						!1
					),
					document.body.appendChild(b);
				let w = Z('jumpButton', 'inGame');
				(w.style.cssText = 'right:10vh;bottom:10vh;'),
					w.addEventListener(
						'touchstart',
						function (A) {
							C(' ', 'keydown');
						},
						!1
					),
					w.addEventListener(
						'touchend',
						function (A) {
							C(' ', 'keyup');
						},
						!1
					),
					document.body.appendChild(w);
				let M = Z('crouchButton', 'inGame');
				(M.style.cssText = 'left:10vh;bottom:10vh;'),
					M.addEventListener(
						'touchstart',
						function (A) {
							C('shift', 'keydown'),
								(clientWindow.crouchLock = !!clientWindow.crouchLock && null),
								(clientWindow.crouchTimer = setTimeout(function (A) {
									(clientWindow.crouchLock = null != clientWindow.crouchLock), M.classList.toggle('active');
								}, 1e3));
						},
						!1
					),
					M.addEventListener(
						'touchend',
						function (A) {
							clientWindow.crouchLock || (C('shift', 'keyup'), M.classList.remove('active'), (clientWindow.crouchLock = !1)), clearTimeout(clientWindow.crouchTimer);
						},
						!1
					),
					document.body.appendChild(M);
				let v = Z('inventoryButton', 'inGame');
				(v.style.cssText = 'right:0vh;bottom:30vh;'),
					v.addEventListener(
						'touchstart',
						function (A) {
							C('e', 'keydown');
						},
						!1
					),
					v.addEventListener(
						'touchend',
						function (A) {
							C('e', 'keyup');
						},
						!1
					),
					document.body.appendChild(v);
				let m = Z('exitButton', 'inMenu');
				(m.style.cssText = 'top: 0vh; margin: auto; left: 0vh; right:8vh; width: 8vh; height: 8vh;'),
					m.addEventListener(
						'touchstart',
						function (A) {
							C('`', 'keydown');
						},
						!1
					),
					m.addEventListener(
						'touchend',
						function (A) {
							C('`', 'keyup');
						},
						!1
					),
					document.body.appendChild(m);
				let h = document.createElement('input', !0);
				(h.id = 'hiddenInput'),
					h.classList.add('inMenu'),
					(h.style.cssText = 'position:absolute;top: 0vh; margin: auto; left: 8vh; right:0vh; width: 8vh; height: 8vh;font-size:20px;z-index: -10;color: transparent;text-shadow: 0 0 0 black;'),
					h.addEventListener(
						'beforeinput',
						function (A) {
							A.stopImmediatePropagation(), A.preventDefault(!0);
							let I = 'insertLineBreak' == A.inputType ? 'return' : null == A.data ? 'delete' : A.data.slice(-1);
							if ((clientWindow.lastKey || (clientWindow.console.warn('Enabling blocking duplicate key events. Some functionality may be lost.'), (clientWindow.inputFix = !0)), clientWindow.keyboardFix))
								if ('insertLineBreak' == A.inputType) C('enter', 'keydown'), C('enter', 'keyup');
								else {
									const g = A.inputType.slice(0, 1);
									if ('i' == g && A.data) {
										if (clientWindow.lastKey == I && clientWindow.blockNextInput && clientWindow.inputFix) clientWindow.blockNextInput = !1;
										else {
											I.toLowerCase() != I ? (C('shift', 'keydown'), C(I, 'keydown'), C(I, 'keyup'), C('shift', 'keyup')) : (C(I, 'keydown'), C(I, 'keyup')), (clientWindow.blockNextInput = !0);
										}
									} else ('d' != g && A.data) || (C('backspace', 'keydown'), C('backspace', 'keyup'), (clientWindow.blockNextInput = !1));
								}
							(clientWindow.lastKey = I), (h.value = ' ');
						},
						!1
					),
					h.addEventListener(
						'input',
						function (A) {
							' ' != h.value && (h.value = ' ');
						},
						!1
					),
					h.addEventListener(
						'keydown',
						function (A) {
							(229 != A.keyCode && 229 != A.which) || clientWindow.keyboardFix || (clientWindow.console.warn('Switching from keydown to input events due to invalid KeyboardEvent. Some functionality will be lost.'), (clientWindow.keyboardFix = !0), clientWindow.lastKey && (C(clientWindow.lastKey, 'keydown'), C(clientWindow.lastKey, 'keyup')));
						},
						!1
					),
					h.addEventListener('blur', function (A) {
						clientWindow.hiddenInputFocused = !1;
					}),
					document.body.appendChild(h);
				let a = Z('keyboardButton', 'inMenu');
				(a.style.cssText = 'top: 0vh; margin: auto; left: 8vh; right:0vh; width: 8vh; height: 8vh;'),
					a.addEventListener(
						'touchstart',
						function (A) {
							A.preventDefault();
						},
						!1
					),
					a.addEventListener(
						'touchend',
						function (A) {
							A.preventDefault(), clientWindow.hiddenInputFocused ? h.blur() : (h.select(), (clientWindow.hiddenInputFocused = !0));
						},
						!1
					),
					document.body.appendChild(a);
				let p = Z('placeButton', 'inGame');
				(p.style.cssText = 'right:0vh;bottom:20vh;'),
					p.addEventListener(
						'touchstart',
						function (A) {
							t(2, 'mousedown', i);
						},
						!1
					),
					p.addEventListener(
						'touchend',
						function (A) {
							t(2, 'mouseup', i);
						},
						!1
					),
					document.body.appendChild(p);
				let R = Z('breakButton', 'inGame');
				(R.style.cssText = 'right:10vh;bottom:20vh;'),
					R.addEventListener(
						'touchstart',
						function (A) {
							t(0, 'mousedown', i);
						},
						!1
					),
					R.addEventListener(
						'touchend',
						function (A) {
							t(0, 'mouseup', i);
						},
						!1
					),
					document.body.appendChild(R);
				let W = Z('selectButton', 'inGame');
				(W.style.cssText = 'right:20vh;bottom:20vh;'),
					W.addEventListener(
						'touchstart',
						function (A) {
							t(1, 'mousedown', i);
						},
						!1
					),
					W.addEventListener(
						'touchend',
						function (A) {
							t(1, 'mouseup', i);
						},
						!1
					),
					document.body.appendChild(W);
				let u = Z('scrollUpButton', 'inGame');
				(u.style.cssText = 'right:0vh;bottom:0vh;'),
					u.addEventListener(
						'touchstart',
						function (A) {
							G(i, -10);
						},
						!1
					),
					document.body.appendChild(u);
				let Y = Z('scrollDownButton', 'inGame');
				(Y.style.cssText = 'right:10vh;bottom:0vh;'),
					Y.addEventListener(
						'touchstart',
						function (A) {
							G(i, 10);
						},
						!1
					),
					document.body.appendChild(Y);
				let S = Z('throwButton', 'inGame');
				(S.style.cssText = 'right:10vh;bottom:30vh;'),
					S.addEventListener(
						'touchstart',
						function (A) {
							C('q', 'keydown');
						},
						!1
					),
					S.addEventListener(
						'touchend',
						function (A) {
							C('q', 'keyup');
						},
						!1
					),
					document.body.appendChild(S);
				let j = Z('sprintButton', 'inGame');
				(j.style.cssText = 'right:0vh;bottom:10vh;'),
					j.addEventListener(
						'touchstart',
						function (A) {
							C('r', 'keydown'),
								(clientWindow.sprintLock = !!clientWindow.sprintLock && null),
								(clientWindow.sprintTimer = setTimeout(function (A) {
									(clientWindow.sprintLock = null != clientWindow.sprintLock), j.classList.toggle('active');
								}, 1e3));
						},
						!1
					),
					j.addEventListener(
						'touchend',
						function (A) {
							clientWindow.sprintLock || (C('r', 'keyup'), j.classList.remove('active'), (clientWindow.sprintLock = !1)), clearTimeout(clientWindow.sprintTimer);
						},
						!1
					),
					document.body.appendChild(j);
				let y = Z('pauseButton', 'inGame');
				(y.style.cssText = 'top: 0vh; margin: auto; left: 0vh; right: 32vh; width: 8vh; height: 8vh;'),
					y.addEventListener(
						'touchstart',
						function (A) {
							C('`', 'keydown');
						},
						!1
					),
					y.addEventListener(
						'touchend',
						function (A) {
							C('`', 'keyup');
						},
						!1
					),
					document.body.appendChild(y);
				let L = Z('chatButton', 'inGame');
				(L.style.cssText = 'top: 0vh; margin: auto; left: 0vh; right: 16vh; width: 8vh; height: 8vh;'),
					L.addEventListener(
						'touchstart',
						function (A) {
							C('t', 'keydown');
						},
						!1
					),
					document.body.appendChild(L);
				let N = Z('perspectiveButton', 'inGame');
				(N.style.cssText = 'top: 0vh; margin: auto; left: 0vh; right: 0vh; width: 8vh; height: 8vh;'),
					N.addEventListener(
						'touchstart',
						function (A) {
							C('f', 'keydown'), C('5', 'keydown');
						},
						!1
					),
					N.addEventListener(
						'touchend',
						function (A) {
							C('f', 'keyup'), C('5', 'keyup');
						},
						!1
					),
					document.body.appendChild(N);
				let U = Z('screenshotButton', 'inGame');
				(U.style.cssText = 'top: 0vh; margin: auto; left: 16vh; right: 0vh; width: 8vh; height: 8vh;'),
					U.addEventListener(
						'touchstart',
						function (A) {
							C('f', 'keydown'), C('2', 'keydown');
						},
						!1
					),
					U.addEventListener(
						'touchend',
						function (A) {
							C('f', 'keyup'), C('2', 'keyup');
						},
						!1
					),
					document.body.appendChild(U);
				let z = Z('coordinatesButton', 'inGame');
				(z.style.cssText = 'top: 0vh; margin: auto; left: 32vh; right: 0vh; width: 8vh; height: 8vh;'),
					z.addEventListener(
						'touchstart',
						function (A) {
							C('f', 'keydown'), C('3', 'keydown');
						},
						!1
					),
					z.addEventListener(
						'touchend',
						function (A) {
							C('f', 'keyup'), C('3', 'keyup');
						},
						!1
					),
					document.body.appendChild(z);
			})();
		});
	let b = document.createElement('style');
	(b.textContent =
		'\n.mobileControl, .mobileControl:active, .mobileControl.active{\nposition: absolute; \nwidth: 10vh;\nheight: 10vh;\nfont-size:4vh;\n-webkit-user-select: none;\n-ms-user-select: none;\nuser-select: none;\nline-height: 0px;\npadding:0px;\nbackground-color: transparent;\nbox-sizing: content-box;\nimage-rendering: pixelated;\nbackground-size: cover;\noutline:none;\nbox-shadow: none;\nborder: none;\n}\n.mobileControl:active, .mobileControl.active {\nposition: absolute; \nwidth: 10vh;\nheight: 10vh;\nfont-size:4vh;\n-webkit-user-select: none;\n-ms-user-select: none;\nuser-select: none;\nline-height: 0px;\npadding:0px;\nbackground-color: transparent;\ncolor: #ffffff;\ntext-shadow: 0.35vh 0.35vh #000000;\nbox-sizing: content-box;\nimage-rendering: pixelated;\nbackground-size: contain, cover;\noutline:none;\nbox-shadow: none;\nborder: none;\n}\nhtml, body, canvas {\nheight: 100svh !important;\nheight: -webkit-fill-available !important;\ntouch-action: pan-x pan-y;\n-webkit-touch-callout: none;\n-webkit-user-select: none;\n-khtml-user-select: none;\n-moz-user-select: none;\n-ms-user-select: none;\nuser-select: none;\noutline: none;\n-webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n}\n.hide {\ndisplay: none;\n}\n#fileUpload {\nposition: absolute;\nleft: 0;\nright: 100vw;\ntop: 0; \nbottom: 100vh;\nwidth: 100vw;\nheight: 100vh;\nbackground-color:rgba(255,255,255,0.5);\n}\n.strafeRightButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAUGVYSWZNTQAqAAAACAACARIAAwAAAAEAAQAAh2kABAAAAAEAAAAmAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAWoAMABAAAAAEAAAAWAAAAAA78HUQAAAIwaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA2LjAuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMjwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yMjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KhDb0tQAAANRJREFUOBHVlMENwyAMRWnVHcqIjMEYzJAemlUidQh6aFZIApIt20FgUC/JxTb8/2wRgTFX+25i4E3UvSXyMDkIGeqc64VlfQgBfJnJwAC11oJIFWOMFJ6Zd+nshSZ/yXMCy0aj9aPH6L1HOc1xkSQqcAtCeJhWwSNAIA+dsaZhFawBwIQyVsFJLOGylkCom+ASHMy1WP151KidFDynieF6gkATSx42cYzf43o+TUnYajBNLyZh4LSzLB8mGC3YUczze5Rj1vXHvPTZTBt/e+hZl0sUO9qPMTJ6UlWFAAAAAElFTkSuQmCC");\n}\n.strafeRightButton.active, .strafeRightButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAEsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjIyIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMjIiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjIiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDg6NTQ6MzYtMDU6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDUtMzFUMDg6NTQ6MzYtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwODo1NDozNi0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+QDppmQAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAKlJREFUOI3t1E0OgyAQBeBn08NwHLtyTsBCT2PiihNwJC5Rr6AbMfzYOjO1iyZ9K0jgYzIBgH+2NMV8ucpL4QUAvPcqkYgyM4MjGkIQocaYFG8A4FYukqKv9lTwVblLFltr97Fz7nM4Bbl5C2vAGFWPz9pwCnMAFXyEcw9jtUJTOfu6SfGq4vg8JTnak/0VbfsAUSeGAaDvB8zzczerVozjpILLfO0//r2skH4sFj3RStwAAAAASUVORK5CYII=");\n}\n.strafeLeftButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAUGVYSWZNTQAqAAAACAACARIAAwAAAAEAAQAAh2kABAAAAAEAAAAmAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAWoAMABAAAAAEAAAAWAAAAAA78HUQAAAIwaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA2LjAuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMjwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yMjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KhDb0tQAAAVtJREFUOBHVVTtug0AQHT5CRklqOCAFB0CiAYkC7oA4glPGF7GUQ5AqVpyCAtjsW2tWGAjeOJVHGmYY3ns7DCwQPbI9y+a/HMcRcNu2lVuWJWTd1KGhzOJERuG6LkVRNCmZp3VdA/wt/QXJlXAcx6hREAQkO1X5/CAEmr8YY9q2VYWmaWgcR0W0GcRxSxQYiLEzJwxDlU4XXQgz+L/RvSVQlqWC7HY7SpLkFlxfN+646zoqioKqqtLkefKnUfR9T3AY3hqQsQB8yxYd85NmEguwOOpYwPd9hqzGhfAaSm6YRTlN00VtWjASzvOcPM9TPIwiyzKdT8WmuZEwCOga48AiJuYyaD5brnNcu/Utju6YQbw9WdAkrnF0xxBo2w8Kw0DGy943EWXMfv/KqYpamDs+Ht+vAPee6FEMw3A+HN7u1aHT6fNX7pO8YvpBF/IO9c8APwXJPUuHxoPaD5BueyY3ULuKAAAAAElFTkSuQmCC");\n}\n.strafeLeftButton.active, .strafeLeftButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAEsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjIyIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMjIiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjIiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDg6NTY6MDgtMDU6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDUtMzFUMDg6NTY6MDgtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwODo1NjowOC0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IdwDtgAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAKtJREFUOI3t1LENwyAQBdDvKMMwjlPlJrjCmcZSKiZgJJaIV7AbYxlIBB+RIlJ+ZSR4dyAD8M+eIRmvvbwzvAKAc65JFJHIjOCAeu8p1BhzxgcAuKSTWPTTmgzulWtpgqoe39baapjqWFWjQt1gpkARZrZPwa0Fq+AUqdkF3XHt0RR/NxYMyToO15PJuzXRWzGON4jcaRgApumBZXkdZnYU8/xsgtN87T3+vWwtZC52/2ikAQAAAABJRU5ErkJggg==");\n}\n.forwardButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACiSURBVHjazNXLCcMwDAbgX8JDeESPoTE8Q3JIVgl0CPXQrKBek1DwS4b6Zix9CCFkMjMQkcHxmBkRAAOAlJILmnMGALAnerXC8yHG2AWq6u3OHuivXMakUw2LCETEF76CtTi3oC04t6K1OPcmlmK4Fy3FThu3MFrx8Bz/J/xcJCNLKJQChipWfbu1YFnWe8XH8fLv8b5vbuB5fgAANOsz/Q4AuOQ/2az67j0AAAAASUVORK5CYII=");\n}\n.forwardButton.active, .forwardButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADASURBVHjazNXdCYMwEMDxf9IM44MLCB3ECfJgl+gcTpBBCi5gwQmygi+W60NLsSKo8Sw9COTj7kcejsSICEeEAzDGqOoiYgwgACEEFbQsSwCsJjq23PSg67okMMuyr7XVQOdqLQfFath7j/deFx6Da3G7Bd2C263oWtymFi7l2FR0KfewdnNzm3Vd/66P/xOePiR7HiG3lJAaJ+A6DA/a9k6e57vBqrrQ9z2fH6Qozio3bZrbaxJj5I2rjRgjzwEApPZQpLqg/4wAAAAASUVORK5CYII=");\n}\n.rightButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACpSURBVHjazJXLDQMhDETHFkVQImW4DGrYHLKtrJQivIdsC841y4VPbCm+IeBpZGYMmRmIyOBYZkYEwACglOICrbUCANgT+s1K7UbOeQmoqrc196AiAhHpgtu7PKpoBL4EnoXzbC9H4bzyUCNwXrVVD84Iqv9SHNLjEFeE+Hg2eakdJG3mR4HtEEq9Az/ZTfV08++2Pe6Kj+PlH5B9f7oBr+sNAKCoz/QzAEIyQCEEVZuQAAAAAElFTkSuQmCC");\n}\n.rightButton.active, .rightButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADCSURBVHjatNXBCcMwDAXQHzXD6JAFAh3EE+iQLtE5MkEGKWSBFDyBV8glRb0U2qYlthVH4IOx/RC2kSpVxSERQgAALTlUFdVrgmEYiiTqnAMAUEn006rXC957E8jMX3NKQUUEIrIJr89STlYx3Azn4GS5zxScrK8fw2nP19rCCQfFLrjv+/LwFmqGY6gJTkGz4VT0pwgx8996kQKui1Ad22CNE4DrsjwwTXc0TbMb7LoL5nl+d5C2PRfJdBxvx/a85wDd42waukdj3wAAAABJRU5ErkJggg==");\n}\n.leftButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAClSURBVHja1NWxDcMgEIXh/xBDMCJj3BjM4BTxKpYyBCniFS5tjGJhCBShQ6BPJ3gcYmaIiDFwmJkIYAAxxiFoSgkANxL9tHy5EELoAnPOh7lrRVUVVaVWkGup6ht4NtwM9DLcil6Ce9Aq3Is2X95/VDzljKemYmqOe3BfNpJavzjDyybkaxt+SkXOz2H5XZbbseJte4x/IOt6Hwbu+wsAmfWZvgcArjJAIdYPiecAAAAASUVORK5CYII=");\n}\n.leftButton.active, .leftButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADDSURBVHjatNXBDYMwDEDR7zTDcGABpA7CBDnQJToHEzBIJRagEhOwAhcq91a1UYEQEt+iJE+WLdmiquQICyAiSfVpmkQABei6Lgla1zUAJiX6bVn/YhzHKLAoip+zOYI653DO/b3z/5rQjNbAtTA50CA4Bt2FY9FN+Ax6qHnJ4LZt82V8Bt8tRSweVOMYPLh5R3HrD5KtebGF+0PI7j2IjQtwX5YXw/CkLMvTYNPcmOeZzwapqmuSTPv+AYCoapad9x4A2K1DUGTs/EYAAAAASUVORK5CYII=");\n}\n.backButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACnSURBVHjavJXLEcMgDERXGoqgRMqgDGqwD3ErnkkR8sFuQbnGHhLzEdYNkB7LMghSVRCRwjBUlQiAAkAIwQSaUgIAsCX0m+WuC977JqCInMZsAc3VMgbFMLDLTcYYqyC5/GetqFH8K5drC0pzuLXwbmNuUVVyGq71sdR/13tJjz8Q/tdIepqQu0voUiyymVkwTfNZ8bq+7T1elpcZ8Dh2AACN+kw/AwCfbD/bsCZGlgAAAABJRU5ErkJggg==");\n}\n.backButton.active, .backButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADESURBVHjavJXNDYMwDEaf3QzDgQWQOggTcGiX6BxMwCCVWIBKTJAVuFC5l0r9EYIQApZySGK/fHEUW8yMXcx7D2Aph/ceeU9omiaJ0LIsAdCU0G+W+9/o+z4KmGXZz1xTQKdilZ1sN7CbWqyqahWkruvjFGuogjVqZxWHwOd8NDZw6WCNURVyG12bx9D8u62PdPgH0blCsqUIuSWHWDsBt3F80nUP8jzfDLxcrgzD8OkgRXFOorRt7wCImSEiSTuqmclrANDkWlTK1XudAAAAAElFTkSuQmCC");\n}\n.jumpButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAUGVYSWZNTQAqAAAACAACARIAAwAAAAEAAQAAh2kABAAAAAEAAAAmAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAWoAMABAAAAAEAAAAWAAAAAA78HUQAAAIwaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA2LjAuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMjwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yMjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KhDb0tQAAASFJREFUOBHVlEGOgzAMRV1ggcQByuW4C8dgz66zKFdBmkNkFtMdUooEmZhiTxo8mWRVNRKyY38/DJIN8G7n5Dac57kpy9INRftaa1iWhXkFVSLUJqBpGgol2a7rYGdscH5DVVWGoHVdJ0GVUpu+73uYpmljZj4Boeu6+uE/76iVGjmAkZBlx3DbtoCPfyQtao4Ev9LeXaDrC1IO/QuWQFKMibsTBIcAoRyyg2C/i5R7EBzqKpSL6lgCSDH/a4Idk9gFuT7lJcsjLSXdWCyQag4d03iSIMZKNdyxMQaU+rLjebb2MfsxUNJcLh9Pq4DBtB/G8ZO0yVbrO9fwr5jnGYbhyolU53b7BmN+lxevTQTZhWKKgj8iiY2N2fPESwK8XPwDqnFjUQw2agIAAAAASUVORK5CYII=");\n}\n.jumpButton.active, .jumpButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAEsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjIyIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMjIiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjIiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDk6MzM6MTYtMDU6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDUtMzFUMDk6MzM6MTYtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwOTozMzoxNi0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+k8/VfAAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAK9JREFUOI3t1M0NwyAMBeCXqsMwTnqqJ/AhnSZST0zASCzRrJBeSsVPABu1h0p9N4T9gSwB8M8rU7beP+XF8A4AzrkhkYgSM4ED6r1XocaYGJ8A4JQXadFaTwHXwsxgZvFhIjgGpXgXPoIkeBNuAT1cPGNtmrC1dmivC9eAHiqCc0iCAsBZVKUAQ4obh+epyVFP8lfM8wVEVzUMAMtyw7Y93mYxinW9D8F5vvYf/16eolUyCllQ87sAAAAASUVORK5CYII=");\n}\n.crouchButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iOTYvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iOTYvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQwOTo0NjozMy0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDk6NDY6MzMtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNTo0MC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwOTo0NjozMy0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+MJmZ/gAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAANNJREFUOI3V1LENwyAQBdDvKDuEhuloGIMx3LCAU8SrWMoGNBekeAQ7lS1DwD5QUvhXcMATQgBwtjRRf/6Vt4VnANBaV4lt2wZmAC+oEKIIJaIt3gDAJZ6UQ40xMMYkx1JrvuAcmmrv5RBeIKUUlFJsfBfeolJKSCnZeBaO0SVcnHXGNTncsbUWzrm17pyDtTaYUwSncC56CMc4F2XBMcS9x9e4QETJl5QDp2mC934fJnpBiNv69kvSdfc8DADD8CxGUwnOuO8f1dA4voP+3z768+UDWxNf9NcgELQAAAAASUVORK5CYII=");\n}\n.crouchButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQwOTo1MTo0My0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDk6NTE6NDMtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTozMzoxNi0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwOTo1MTo0My0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+m4M75AAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAM9JREFUOI3t1M8NgyAUx/GfTYdhCmawpzIBBzuNSU9MwBxM8ZaoK9hDi4En6JO0hyb9nvyDnxBFgH/vOnY+f8pL4RkAvPdNojEmMzM4okR0CFVKpXgHACc+qIZaa2GtLd4rPbOCa2jpeKtdOEIhBIQQxPgmnKJEBCIS41WYozEpLnrHLVVh5xwAQGu9LCfgtbS01tmYQ3AJl6K7MMelqAjmkAQFgDO/oJQq/klbYPoNYtle0fcXGHMVzYg3DDdM02MxVzMex3sTzPvafvx7PQF551iSZuKOLwAAAABJRU5ErkJggg==");\n}\n.crouchButton.active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFy2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQwOTo1OToxNC0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDk6NTk6MTQtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNjoxMC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTo1Njo0My0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwOTo1OToxNC0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+dlsxWgAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAPFJREFUOI3V1NENgyAQBuC/hglsGlcgbmDSQRyiiSMQt/GtDtHEDZzGYF965IRDqG0f+j9hkM/zRIB/y8m7Xr/lcXgFgKa5HhKn6bExFZ8syzO67nYIrqoLxvHurjcVD8MAAJjnGUVRZKNaawBA27bODFbnotZaWGvdGj+BEEONMTDGJO+LwjFUGu/hSZigvu/dmOPZMPXNR6lCGqcqj1bsozwSng1/mmTFUlX+2/D2RWHeLwnnqARSVGyCHkC7geMpVKxYCv+AfIfs7eOgYq21+0X5Qr+fSiksywIAqOs6gINjkw6id/M6gJz5s4P+//IEHI9j+ArWcs0AAAAASUVORK5CYII=");\n}\n.inventoryButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQxMDozNjoyOC0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMTA6MzY6MjgtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNjoxMC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQxMDozNjoyOC0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IX6oygAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAM9JREFUOI3dlTEOgjAUhr82jk4mJAxcwHO4eAVHt17DW/QMOMhVSEx0NE44yMTGgAPWYJEo8Fz4t/7t+/Infa9V1KqQlVIOaowRIVprAdCS0CZr5m+EYTgImGXZ21pLQD/V6o5zozURcBlElEE0yOsEl0HEzmzZrFec8qKX9zXx+XId7DkpoHJN7VrGJVgu5q+Dv3iul6217QHxi/t6ThNpN3Gw/5D0kV/burwx8KZ0DbuJwADieA80EqfpUQwOz8RJchAD5vkdqCcP/vCZPgBXBlJB5rsPrwAAAABJRU5ErkJggg==");\n}\n.inventoryButton.active, .inventoryButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iOTYvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iOTYvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQxMDozNzoyNC0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMTA6Mzc6MjQtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNTo0MC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQxMDozNzoyNC0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+Ek/8IQAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMBJREFUOI1jYKARYITS/6ltLiPM0BUrVlDFxIiICAYGBgYGJmoaimwWC7rEjRs3yDJQQ0MDhc9EDUOx6WXCoY5iMEwM/i0qw/BbVIYsMZwG/xaVYWjMSGSI9HBmuP7uC0liBF1848EjssVggJGBgeE/LFHDkgzMBZpCPHCFxIjB0nJERARmBkHXTKoYDAyT5EZ1g9ELElIAul6MyKPEcGQALY9XUsUwBgZEQc/CwMDAsGHDeoaXL19TzXAGBhrWeQBnYU1GknvkpwAAAABJRU5ErkJggg==");\n}\n.chatButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAEsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjE4IgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMTgiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIxOCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMTgiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDg6NDQ6MTEtMDU6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDUtMzFUMDg6NDQ6MTEtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwODo0NDoxMS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+OsVW9wAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAN1JREFUOI2t1MERgyAQBdCvYw+hnKUD04Vd7NCFNZhDLMEWnEkRXKQFczAQQCSG5J8YYN4uKlbYsuK3VJVFuq4rEvq+3yQAq0WEEF8hWmuHNXbSIsx8ClFKQQjhsMZftIhSKoswM5g52FenKp3pJs4O8ivmxqegkiQhIgIRZcdxmngibl1KuRunjhdARIRpmoK3d/RMiCgoEkBSSte6D6aO4yM7KLUhrnwUB2mtgytiu8gh9qsGXnetba8Q4vKxairDcIMxy7ujeX4UQTY1AIzjvRgwZgGwHQ34w4/tCcPEV3iQ5pTDAAAAAElFTkSuQmCC");\n}\n.chatButton.active, .chatButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAFy2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTgiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxOCIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIxOCIKICAgdGlmZjpJbWFnZVdpZHRoPSIxOCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNi0wMVQxMDoyNzo0NS0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDYtMDFUMTA6Mjc6NDUtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTozMzoxNi0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTo1MTo0My0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNi0wMVQxMDoyNzo0NS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+/Oo+0wAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZvyK0SgWFhaThpWRHzWxUUZCSRqjDDYz1/xQM+P13pNkq2wVJTZ+LfgL2CprpYiUrGdNbJie8+ZNjWTO7Z77ud97zunec8EVyaisUd0L2Zyph8dDvvnogq8uTy1VuKnHH1OGNjIzM0VF+3yUWLH7gF2rcty/1ricMBRU1QsPK003hSeEp9ZNzeY94VaVji0LXwh363JB4Qdbjzuctznl8LfNeiQ8Cq5mYV/qF8d/sUrrWWF5Of5sZk2V7mO/xJPIzc3K2iGzHYMw44TwMckYowTpY0h8kAD99MiOCvm9xfxpViVXidfYQGeFFGlMukVdk+oJWZOiJ2Rk2LD7/7evRnKg36nuCUHNq2W9d0LdLhR2LOvrxLIKp+B+getcOX/1GAY/RN8pa/4j8G7B5U1Zi+/D1Ta0PWsxPVaU3DJdySS8nUNTFFruoGHR6VnpnLMniGzKV93CwSF0Sbx36QfytWex+zpwggAAAAlwSFlzAAALEwAACxMBAJqcGAAAANFJREFUOI2t1MsRgyAQBuA1QzGUsXRgTqEGU8QOJThjEZZBGTQRWzAXl/CSEOJeZJD59kdFgItqOK77v87AyLquXYLW2ifaGXHO/YRIKT0meJIRImpCjDHgnPOYCG8yYoypIkQERBStu5U6taRJK4PCjrVxE9RTRQgRARGr47REOpFGV0pl49L2IggRwVobvb2zZ4KIUZMIUkr56CFY2k6IZFBpQdr5rDwkpYyOCKeoIfxVAxxnbRzvoPXja9dSTdMTtu31STTPSxcUJgK44H/0BuaQUd766ZZEAAAAAElFTkSuQmCC");\n}\n.pauseButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAUGVYSWZNTQAqAAAACAACARIAAwAAAAEAAQAAh2kABAAAAAEAAAAmAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAAASoAMABAAAAAEAAAASAAAAAIh0nEsAAAIwaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA2LjAuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xODwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xODwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KINZMMgAAAPhJREFUOBGdUsENwjAMTBA70HX6Bok1+kRCTIGQeHaG8qCrVGKI8KArQGxj16lcSpOPHZ/vck7iHa33N+YG7yMTRaqqyhKp6xp5KMQiRVEsEgshYD+IrZi5VAR4mrNmIR1Px4Nsz5cr5lZNmmJiCjkHE4+XXOcYwP2EELzA+CFh74066codpceQiE+ckcu0NrBMR3T20AQZOLQG5q4JRwCnY5ATqNnrh1BKoDsDV7Yvc7Ttbi8qZVlibtWkKSamEJN1o1XTuIzG312Dc7nmoKMQnvG7b5wG5kQYb5obpjJa1z0Yy4o4Wtves8hA6vsXcvktp77Hvwf4DxqOPQw2kc6BAAAAAElFTkSuQmCC");\n}\n.pauseButton.active, .pauseButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAFy2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTgiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxOCIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIxOCIKICAgdGlmZjpJbWFnZVdpZHRoPSIxOCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNi0wMVQxMDoyNTozOC0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDYtMDFUMTA6MjU6MzgtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTozMzoxNi0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTo1MTo0My0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNi0wMVQxMDoyNTozOC0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+RuelNgAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZvyK0SgWFhaThpWRHzWxUUZCSRqjDDYz1/xQM+P13pNkq2wVJTZ+LfgL2CprpYiUrGdNbJie8+ZNjWTO7Z77ud97zunec8EVyaisUd0L2Zyph8dDvvnogq8uTy1VuKnHH1OGNjIzM0VF+3yUWLH7gF2rcty/1ricMBRU1QsPK003hSeEp9ZNzeY94VaVji0LXwh363JB4Qdbjzuctznl8LfNeiQ8Cq5mYV/qF8d/sUrrWWF5Of5sZk2V7mO/xJPIzc3K2iGzHYMw44TwMckYowTpY0h8kAD99MiOCvm9xfxpViVXidfYQGeFFGlMukVdk+oJWZOiJ2Rk2LD7/7evRnKg36nuCUHNq2W9d0LdLhR2LOvrxLIKp+B+getcOX/1GAY/RN8pa/4j8G7B5U1Zi+/D1Ta0PWsxPVaU3DJdySS8nUNTFFruoGHR6VnpnLMniGzKV93CwSF0Sbx36QfytWex+zpwggAAAAlwSFlzAAALEwAACxMBAJqcGAAAAJZJREFUOI1jYKASYITS/yk1hxFmyIoVK8gyISIiAu6i/zBDbty4QZIhGhoacMOYYIKkGoKuhwWbgtLiQji7u7cfpxgyYMIQIROMGkRHg7BGv5ePH5zt6OiIU4ygQdgUYhNDBnCvwZI7KQBZDyMDA8P/gIBAhoiIcJINYmBgYMjKymZ49+4twmsTJ04hyyBkFzEwUKE8AgBQeiatdxIg3QAAAABJRU5ErkJggg==");\n}\n.exitButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAEsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjE4IgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMTgiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIxOCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMTgiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzBUMTQ6MjA6NTktMDc6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDUtMzBUMTQ6MjA6NTktMDc6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMFQxNDoyMDo1OS0wNzowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nCkcagAAAYFpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/M2MiRhTKQpqELIYYNbFRZhJKmsYovzYzb36p+fF6byZNtsp2ihIbvxb8BWyVtVJEStbWxAY9581TI5lzO/d87vfec7r3XLCH00pGrxmETDavhSb97oXFJXftM046aaOGvoiiq+PB4AxV7f0Omxlv+s1a1c/9aw2xuK6ArU54TFG1vPCU8MxaXjV5W7hVSUViwqfCHk0uKHxr6lGLn01OWvxpshYOBcDeLOxO/uLoL1ZSWkZYXk53Jl1Qfu5jvsQVz87PSewS70AnxCR+3EwzQQAfQ4zK7KMfLwOyokr+YDl/lpzkKjKrFNFYJUmKPB5RC1I9LjEhelxGmqLZ/7991RPDXqu6yw/OJ8N47YHaLfgqGcbHoWF8HYHjES6ylfzcAYy8iV6qaN370LQBZ5cVLboD55vQ/qBGtEhZcojbEwl4OYHGRWi5hvplq2c/+xzfQ3hdvuoKdvegV843rXwDWHhn38f3IFcAAAAJcEhZcwAACxMAAAsTAQCanBgAAAC8SURBVDiNrdTBDcIgFAbgH9IdZB3OmrgGxybtMMxQD9ZEB2niEM+DXaEeGggUqID+xwd8eRCAYc2C38KYQZRSVYLWepUALAYRQhQhRGQxboqlyHYNT03quxZ912aPRaEUsJcAqkEAoPmG5MLJMyqN19HxdMbjfsO2loqUMg5JKQPMnbyXYGsGK00TK7pYbkcWIiLvpuYA5olYiOgFIQ7eQG6G4eJ3NE3PYsQNB4BxvFYD8/wGsH4jwB8+tg+lWzs5jAClVwAAAABJRU5ErkJggg==");\n}\n.exitButton.active, .exitButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAFy2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTgiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxOCIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIxOCIKICAgdGlmZjpJbWFnZVdpZHRoPSIxOCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNi0wMVQxMDoyOTozMC0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDYtMDFUMTA6Mjk6MzAtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTozMzoxNi0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTo1MTo0My0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNi0wMVQxMDoyOTozMC0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8++Tr22gAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZvyK0SgWFhaThpWRHzWxUUZCSRqjDDYz1/xQM+P13pNkq2wVJTZ+LfgL2CprpYiUrGdNbJie8+ZNjWTO7Z77ud97zunec8EVyaisUd0L2Zyph8dDvvnogq8uTy1VuKnHH1OGNjIzM0VF+3yUWLH7gF2rcty/1ricMBRU1QsPK003hSeEp9ZNzeY94VaVji0LXwh363JB4Qdbjzuctznl8LfNeiQ8Cq5mYV/qF8d/sUrrWWF5Of5sZk2V7mO/xJPIzc3K2iGzHYMw44TwMckYowTpY0h8kAD99MiOCvm9xfxpViVXidfYQGeFFGlMukVdk+oJWZOiJ2Rk2LD7/7evRnKg36nuCUHNq2W9d0LdLhR2LOvrxLIKp+B+getcOX/1GAY/RN8pa/4j8G7B5U1Zi+/D1Ta0PWsxPVaU3DJdySS8nUNTFFruoGHR6VnpnLMniGzKV93CwSF0Sbx36QfytWex+zpwggAAAAlwSFlzAAALEwAACxMBAJqcGAAAALhJREFUOI2t1L0NgzAQBeAHYphb4+pECqniGUiDBIsgZQi3kZJdvERYgTTYGP8Qm/AapMN8PBAGOCjFfJz+dQqNSCl3CUII02jSiFIqCyEig5V6mIu415SxRX3Xou/a5HNBKAZsxYP2IABQ/UJS4eg7ys2q0el8wfv1hDuLhZnDEDN7mL14K96jaSw3VWhoY6mNDEREqy81BdBbBJj3Wl1fIcQt6c5umuaOcfwsjYbhsQuyGwEH/I++B+Q3JPhRaVIAAAAASUVORK5CYII=");\n}\n.keyboardButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQxMDozMDoxMy0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMTA6MzA6MTMtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNjoxMC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQxMDozMDoxMy0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+ZKXV9AAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAONJREFUOI3FlT8KgzAUhz9DD+EhCh28QsFV8BJOdRc6FdztlDNYpK5CLyH0EHaoV7CDWOKfQm2i/S2JyXtffsT31KJVg1lZVgcNgsAIUUoJgDAJVVmb4YZt2z8Bq6rqPQsT0Klc8SFOW4uBe3dcFDct2G63fc9Hjn3fAyCOT1+PXY4qC2i6EinLuxHHUsppx3Ncq/GrOB41iHq64zgkyZkwPPRi1LUoOuL7HlmW/8Gx6+61wGpbr9N5ww/JHA1zRy9PB65KtLCHERhAml4AxbFuRQwlAPL8agxY10+grWNY4Gf6Aux0Xojq759HAAAAAElFTkSuQmCC")\n}\n.keyboardButton.active, .keyboardButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iOTYvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iOTYvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQxMDozMjozNy0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMTA6MzI6MzctMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNTo0MC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQxMDozMjozNy0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+CffUegAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAANBJREFUOI3Flc0NgzAMRh+IYZiCDbhHGYAFMgcLMACipyKxAVMgNkAdgl6gNT+VSmPod0kg9uMTiR04ScE0jtrcYIZWVaVCNMYAEGpCJStaL3Rd9xMwjuPFc6gB3csNP8R56zTw4h9nWeYFa9v2Nd84ds4BkKbp1+OcIxUA43xEkiRRcWyM2Xd8xLWMv8TxpkDk1/u+pyxLrLWLGPmuaRqcc+R5/gfHRVF4gWVZX1N560ZyROvczeb5wKWmfnxTgcG70UcAdX1nGB5qcDjxznsC/OhXI+h9hhMAAAAASUVORK5CYII=")\n}\n.placeButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAEsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjIiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iMjIiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIyMiIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjIyIgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMjI6MDg6NDgtMDU6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDUtMzFUMjI6MDg6NDgtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQyMjowODo0OC0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+gByU7gAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZvyK0SgWFhaThpWRHzWxUUZCSRqjDDYz1/xQM+P13pNkq2wVJTZ+LfgL2CprpYiUrGdNbJie8+ZNjWTO7Z77ud97zunec8EVyaisUd0L2Zyph8dDvvnogq8uTy1VuKnHH1OGNjIzM0VF+3yUWLH7gF2rcty/1ricMBRU1QsPK003hSeEp9ZNzeY94VaVji0LXwh363JB4Qdbjzuctznl8LfNeiQ8Cq5mYV/qF8d/sUrrWWF5Of5sZk2V7mO/xJPIzc3K2iGzHYMw44TwMckYowTpY0h8kAD99MiOCvm9xfxpViVXidfYQGeFFGlMukVdk+oJWZOiJ2Rk2LD7/7evRnKg36nuCUHNq2W9d0LdLhR2LOvrxLIKp+B+getcOX/1GAY/RN8pa/4j8G7B5U1Zi+/D1Ta0PWsxPVaU3DJdySS8nUNTFFruoGHR6VnpnLMniGzKV93CwSF0Sbx36QfytWex+zpwggAAAAlwSFlzAAALEwAACxMBAJqcGAAAAKxJREFUOI3VlcENwyAMRR+oQzAiY3gMZkgPzSqROoR7aFZoD0mlhIiGUKtS/s3CPJlvyzgmvbCVcx9ojNGEmFICwFtCl6xLfhBCaAKq6ir2tVARQUSK5/ldX8j7WecDb5pX0jd/q8E55GgM/7Zi79k1tlRXvDfHzeCjOh941TxVLe6LPX/zJbSZijyhVX6CPUxgAF13BRYVD8PdDA5zxX1/MwOO4xMAN8fmn+kbxKMyrUK2UxQAAAAASUVORK5CYII=");\n}\n.placeButton.active, .placeButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVEhL3ZXtCYAgEIYzGsYVggZxAodygmuPoBXcprjrLtLo+/zTA/ZK0YPUi1alMJwTpxYGxSQFAIzPOOcoa7xoSRFx0Yq34hgjz55hreXZsmpasXAm9d7TOCJ/NxFr8mNxCIHGXRrOhPwn5cKr50ixT5H0+G2HBenyrsdnXPU458d1e0qxTWgn1mBtBUBPNzSQjX49Qdq2w/jMOA6UKEaUz7zKzGMSPYSsKtaQAAAAAElFTkSuQmCC");\n}\n.breakButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADVSURBVEhLvZXRDYMgEIa5TsFYdgvHYAxmsA91m8YNIE1dgfa/SqOIFpD2e/Dw4n380QTJOSeIyImKvJxEqLhp2xblMFprridcakmBd3HiuVhKOa2+o5SaVstwSM2JPaVSEM4uxKmE0hjZ4pg01ssSp0pBVIyHw4EcKdhN7AdzpWAzsadECqp8vBib4tKknv+JMTwXhLJU+e479pJwsxQWYmPMtIqzt0E4uzrdavA53Yyx3KhB1124cuKmOQtr79w4yjDcxDg+3on7/srNGkAKfvQzdfQETtBmHYKdHW8AAAAASUVORK5CYIJFTkSuQmCCnd8aY0jyr65+cLRujrL+fJOPAaJMN46HP07L/I9c3n9ESitLhsbMMowoH/3cozJTep8My+2KiwA8gRAju39mJaqaAEeXWxfxIbJZCwbFGkMgYDWx692ANTNbFaEbegDqusY5t5Rc2yvHCLx/nlERinw1OT3GyxoDMRmWr+w0pjpOimoCGftl0CmX/eBQEYzowsBjm873/ZmqqubYiCxTv1kLyNz4Mbw+htmcKGzvMo6fcVI1mdK2LSFAvrJzL2Pgv1Pq7TgxaWEkpuHSkvyi4nw+471Py+E6UwnUYUTZrJOTY7CNKLkJ+BhQETbrq7WVZdR1fZvDfnBzHi9OXme0yIvbVXOZ5bZtbwHHOR5dve4ZQNd3vP+I028AJKKaoDKA7XbL4+Pj999t46qqcM5N6+54PHJ/f0/XdYQQZsCu6zgcDpNTY9CtTSY55xabelwmRVHw+vq6eKj87ZfU/8fHSrLxG7/VAAAAAElFTkSuQmCC");\n}\n.breakButton.active, .breakButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADZSURBVEhLtZXRDYMgEIa9TsMKJh3ECXywGzkBXYM0cQW3of2vYBEPC4rfg/9Jcp8XTICstc0VsJiIqto/TiIkXrTWiNN0Xcd5w6OWFHgXTxyK53l21X/6vndV0xhjXPWdmif2HJWCuHclziWWShSLJek4jq76USTOlQJRDEEsKZGC3Ym9rFQKRHHYdEQKin9ejhQkxZIgVwqSYmkLpLUUGzGaQ0E8Za58d4+9FFmyDWAlVkq5SmbvA3Hv5nSrwXK6af3khRoMw4NzuUHa9o44zTS9OC+68yy9Abg0YUFOFw2OAAAAAElFTkSuQmCCQmCCnd8aY0jyr65+cLRujrL+fJOPAaJMN46HP07L/I9c3n9ESitLhsbMMowoH/3cozJTep8My+2KiwA8gRAju39mJaqaAEeXWxfxIbJZCwbFGkMgYDWx692ANTNbFaEbegDqusY5t5Rc2yvHCLx/nlERinw1OT3GyxoDMRmWr+w0pjpOimoCGftl0CmX/eBQEYzowsBjm873/ZmqqubYiCxTv1kLyNz4Mbw+htmcKGzvMo6fcVI1mdK2LSFAvrJzL2Pgv1Pq7TgxaWEkpuHSkvyi4nw+471Py+E6UwnUYUTZrJOTY7CNKLkJ+BhQETbrq7WVZdR1fZvDfnBzHi9OXme0yIvbVXOZ5bZtbwHHOR5dve4ZQNd3vP+I028AJKKaoDKA7XbL4+Pj999t46qqcM5N6+54PHJ/f0/XdYQQZsCu6zgcDpNTY9CtTSY55xabelwmRVHw+vq6eKj87ZfU/8fHSrLxG7/VAAAAAElFTkSuQmCC");\n}\n.selectButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAEqGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjIyIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMjIiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjIiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzBUMTQ6MTQtMDc6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDUtMzBUMTQ6MTQtMDc6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMFQxNDoxNC0wNzowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+ndR9ZQAAAYFpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/M2MiRhTKQpqELIYYNbFRZhJKmsYovzYzb36p+fF6byZNtsp2ihIbvxb8BWyVtVJEStbWxAY9581TI5lzO/d87vfec7r3XLCH00pGrxmETDavhSb97oXFJXftM046aaOGvoiiq+PB4AxV7f0Omxlv+s1a1c/9aw2xuK6ArU54TFG1vPCU8MxaXjV5W7hVSUViwqfCHk0uKHxr6lGLn01OWvxpshYOBcDeLOxO/uLoL1ZSWkZYXk53Jl1Qfu5jvsQVz87PSewS70AnxCR+3EwzQQAfQ4zK7KMfLwOyokr+YDl/lpzkKjKrFNFYJUmKPB5RC1I9LjEhelxGmqLZ/7991RPDXqu6yw/OJ8N47YHaLfgqGcbHoWF8HYHjES6ylfzcAYy8iV6qaN370LQBZ5cVLboD55vQ/qBGtEhZcojbEwl4OYHGRWi5hvplq2c/+xzfQ3hdvuoKdvegV843rXwDWHhn38f3IFcAAAAJcEhZcwAACxMAAAsTAQCanBgAAADASURBVDiNrdXdDYMgEAfwP6RDMCJjOAYz2Ie6ikmHwIe6Qvugl+DxUTzuEhMR+XkBPAyO+EI3jCHUe68ihhAAAFYTTa0H73DOdQHTNF3uY4yXfitF6aI2H2sL45oYf1aLbphjLfQW3IJKfcNTUftgF1wDhuaYr/4/kCLbx72oePGkmTbhUbQI819VghZhgkbQDKZCIkF5Ecp2RVpC+ct3wh7AJgZ4zPMTQJLxur7VcODMeFleauC+fwAA5myrH6Y/P01lF42FgH8AAAAASUVORK5CYII=");\n}\n.selectButton.active, .selectButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAEsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjIiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iMjIiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249Ijk2LzEiCiAgIHRpZmY6WVJlc29sdXRpb249Ijk2LzEiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIyMiIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjIyIgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDk6MzU6MzktMDU6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDUtMzFUMDk6MzU6MzktMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwOTozNTozOS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+c0BT1gAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMtJREFUOI211dENgyAQBuBf0mFYwaSDOAEPdqObgK5BmriC29iHeoSegIB4L4rIl/MkB3BTDPt16+0OjFpru4jTNAEAVE80tB5yYl3XIsAY4++JCFrrv3nVihIRiMiP5VoVW5jCwixl1jKKYYnl0CqYP7t0rqoUEgjr3ATHUH6eilM4RBnKlYXjsI9L0TM8mXFrpln4KhqFwx/SikZhhq6gB5gbSQsqm9BhVzjnki/XxN6P382AjHl+AfgdTRsAjOOzC7wsHw8DN5x5X3p5YEMtOwViAAAAAElFTkSuQmCC");\n}\n.scrollUpButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQwOTo0MTozNS0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDk6NDE6MzUtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNjoxMC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwOTo0MTozNS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+qh8mWAAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAL1JREFUOI21lcsNwyAQRB8oRVCiL3Ex+EINziFuxVKKIIe4heRgW8IY/GMztxWzj2GRQDHqi6yUmqFVVYkQnXMAaEloyLrFC8aYS0Dv/aLWEtBUr874krK2wdrmkPcUONzgL+Aj8NXlHWkKfXV9T65dTrwXohicUzE4N4rkjHPm+Ng5HxQk3oJeBu9BITOKEuCsReL4ITmjuHeVuAQeSo+wtwgMoG0fQJC4719icJgSd91TDDgMHwDUVIt/pj9lYzcah66GagAAAABJRU5ErkJggg==");\n}\n.scrollUpButton.active, .scrollUpButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iOTYvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iOTYvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQwOTo0Mjo1MS0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDk6NDI6NTEtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNTo0MC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwOTo0Mjo1MS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nGTdYQAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAK9JREFUOI21ldERhCAMRFeGYiiJClIUFXBfZzm04FwR+qMjIjmRhP1xmGyea5wJwCBN+3PV5k4HNMaoQvTeAwCMJjRn2bKQUuoCOucuZ6MBrfUaxlcVEYGImryvwPkLhoBb4Lef19KU+0II1Vp34qcQYjAnMZgbRXXGnLn8bM4HCBL/g3aDn6AAMwoJ8NAlcblI3qjsvSWWwHPt+/ijAgPORW8BYJ6/WJafGhwYeOdt2u4xmobYNrAAAAAASUVORK5CYII=");\n}\n.scrollDownButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQwOTozOTo0Ny0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDk6Mzk6NDctMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNjoxMC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwOTozOTo0Ny0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+cF/fZAAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAALFJREFUOI21lcENwyAMRR+oQzAiYzAGM6SHZpVIHSI9NCu0h6QSUKAlmH8z4OcvY4Fi1wtZKfWBWmtFiN57ALQkNGRd0g1jzCnguq5RrCWguVxdOBfJOYdzrqnQT3Ar8C/wWShkLq8GLRXKrWcd9zitgiU0zHG1x2mBloLDpmLYHBdb0QuPHKcPSYvS3C/HPfBQeoc9RGAA03QFAsfLcheDw+F4nm9iwG17AqCOWPwzfQNXBzbjhlGh5wAAAABJRU5ErkJggg==");\n}\n.scrollDownButton.active, .scrollDownButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iOTYvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iOTYvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQwOTo0MDozNS0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMDk6NDA6MzUtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNTo0MC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQwOTo0MDozNS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8++KGu/QAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAALBJREFUOI21ldENwyAMRC8owzASE3goT0C/mnFYIeoQ7U+qBjCkBud+EAGeL4dkgJu0HOPbmrt8oTFGE2IIAQDgLKFn1loupJSGgN77bO4soNJZ19iXiYhARKpCl2At8C/wKBQQLq8HbRVi5uqb6HjGaRdsIREs/ZpWzYyZuYpEU7AbxYzzy4xH4c0oZuGZ47KRaFSerRzPwM86+vHDBAb8Gv0KANv2xL6/zODAjW/eB0CEMZpx89CdAAAAAElFTkSuQmCC");\n}\n.throwButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQxMDoxODowNi0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMTA6MTg6MDYtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNjoxMC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQxMDoxODowNi0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+WtcK9wAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQ1JREFUOI2tlcERwiAQRX8yFpEuQgXbhdaQixazXFKDHrQGKoAZi8CDtqAHJZNsANHh38Luvv1ZSGjw1hN11TQBOgxDFeI4jgCAtiZ0ztrIQNd10QJmjcNhv1iz1kGpHgDgvV/E2n+hzHqCxmoX4JRiULkmlQUzazDrbCNr3e9gACCiZAM5jrlWmzcvCs6U6mGtm+BhPTeOJFhKqX5yJxvEFB0FswYRJYtysSw4OEzJGPP7qfjmNnUKvoKDo5RK3AKRzQtFYYOIKDuWYnCsgTEGRFTsdgX23q++efkGKcmf0MqxTAja7bbZuFT7Tr4VJZfoeDwBmDl27loNDnwcXy7nasDH4w4AaD7P1S/TF7dhcsyyU4psAAAAAElFTkSuQmCC");\n}\n.throwButton.active, .throwButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjIiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIyMiIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMiIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iOTYvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iOTYvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMVQxMDoxOTo0OS0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMTA6MTk6NDktMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwODozNTo0MC0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQxMDoxOTo0OS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+7MGLFgAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAO9JREFUOI21lb0NhDAMhR+IYdJ7GSbwUEzAVccM9O5ZAd0Qdw1GwfnlFF6DlODPL3YwwEPqjue3NbdT6DzPTYjjOAIA+pZQnzXYjW3bogHMjGmaLmtEBBEBADjnLnv9v1BmPqGx2As4pRjUrlllwcwMZs4mIqL7YAAQkWQCWw5fQfP8IHUmIiCiE67ruXIkwTHn6s4miClaitwRNUlJyRrngono/q0ouU3dgiK4FFzjFog0T4O0QX7T7ih5K/wEOhNq3QZg51zwzdsTpGSHUODYvqBa1zW7b3XM41fVyzXSQT8AwLK8se+fZnDgwX/eDxNAdxmhDNuAAAAAAElFTkSuQmCC");\n}\n.sprintButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADOSURBVEhLvZXtDYMgEIa5pkMwlt3CMRyDGeyPuk3jBhBTV6C9E1r50KicfX54xyU8eYNBwVorAMAKRj5OAKy4qOsaSzFKKaoXfHBJEe+ixHOxlNJ1+9Bau25KTYk9R6VIvDcQc3J1NaFpGtf9+txsiU2Jc5LD4ngjrnOzJVYTl8hPe3n/T1wiRTYdRU6wJkWCK11y8xB/rZMrzUkgnn9I9hLvTb5uHHyPQmtDAw7a9k6VElfVTRgz0KCUvn+KcXxNibvuQUMOUIqc9DO18AZc1WQdjvTPDgAAAABJRU5ErkJggq5CYIIY9LrovOfskvxtnd8aY0jyr65+cLRujrL+fJOPAaJMN46HP07L/I9c3n9ESitLhsbMMowoH/3cozJTep8My+2KiwA8gRAju39mJaqaAEeXWxfxIbJZCwbFGkMgYDWx692ANTNbFaEbegDqusY5t5Rc2yvHCLx/nlERinw1OT3GyxoDMRmWr+w0pjpOimoCGftl0CmX/eBQEYzowsBjm873/ZmqqubYiCxTv1kLyNz4Mbw+htmcKGzvMo6fcVI1mdK2LSFAvrJzL2Pgv1Pq7TgxaWEkpuHSkvyi4nw+471Py+E6UwnUYUTZrJOTY7CNKLkJ+BhQETbrq7WVZdR1fZvDfnBzHi9OXme0yIvbVXOZ5bZtbwHHOR5dve4ZQNd3vP+I028AJKKaoDKA7XbL4+Pj999t46qqcM5N6+54PHJ/f0/XdYQQZsCu6zgcDpNTY9CtTSY55xabelwmRVHw+vq6eKj87ZfU/8fHSrLxG7/VAAAAAElFTkSuQmCC");\n}\n.sprintButton.active, .sprintButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADOSURBVEhLtZXbDcMgDEVx1WFYIVIHyQR8pBsxAd2jUlZgG1q7EPEwKClwPmJiKUdXRAZwzokZkBgAhtq/TgCs+GKMwdLNuq5Ub/gYJUWCixLHYmutX11DSulXv9SUOPCvFMm/TcQjuftaoJTyKyG01lS5Xo1TiWNhgOvFVMV5IhRxvRrNxD3yaT+vKc7TYFqux1EV90iRU1vBCVpSJBnpnslDwlgXIz2SRBwfJFfJvy1OtxEcW2HMixoj2LYn1eMGWZYHlm72/U110p3n4APUi1xBJ/2pfQAAAABJRU5ErkJggmCCAAAAAElFTkSuQmCCnd8aY0jyr65+cLRujrL+fJOPAaJMN46HP07L/I9c3n9ESitLhsbMMowoH/3cozJTep8My+2KiwA8gRAju39mJaqaAEeXWxfxIbJZCwbFGkMgYDWx692ANTNbFaEbegDqusY5t5Rc2yvHCLx/nlERinw1OT3GyxoDMRmWr+w0pjpOimoCGftl0CmX/eBQEYzowsBjm873/ZmqqubYiCxTv1kLyNz4Mbw+htmcKGzvMo6fcVI1mdK2LSFAvrJzL2Pgv1Pq7TgxaWEkpuHSkvyi4nw+471Py+E6UwnUYUTZrJOTY7CNKLkJ+BhQETbrq7WVZdR1fZvDfnBzHi9OXme0yIvbVXOZ5bZtbwHHOR5dve4ZQNd3vP+I028AJKKaoDKA7XbL4+Pj999t46qqcM5N6+54PHJ/f0/XdYQQZsCu6zgcDpNTY9CtTSY55xabelwmRVHw+vq6eKj87ZfU/8fHSrLxG7/VAAAAAElFTkSuQmCC");\n}\n.perspectiveButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAEsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjE4IgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMTgiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIxOCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMTgiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDUtMzFUMTU6NTg6NDUtMDU6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDUtMzFUMTU6NTg6NDUtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMVQxNTo1ODo0NS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+GlXzLwAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZogwjWJhoUzCamhQk9koIw0laYwy2Mw882bU/Hi99yTZKltFiY1fC/4CtspaKSIl61kTG6bnvHlqJHNu557P/d57TveeC65YVskZtQHI5U09Ggn75uMLvvoidXTioYtQQjG00ZmZKaraxwM1drzrs2tVP/evNS2nDAVqGoRHFE03hSeEp9ZMzeZd4TYlk1gWPhf263JB4XtbTzpctDnt8JfNeiw6Bq4WYV/6Fyd/sZLRc8Lycrpz2VXl5z72S5pT+blZiV3iHRhEiRDGxyTjjBFkgJDMQfoYpF9WVMkPlPOnKUiuIrPGOjorpMlg4hd1VaqnJKqip2RkWbf7/7evhjo06FRvDkPdi2W99UD9DpS2Levz2LJKJ+B+hqt8Jb9wBMPvom9XtO5D8G7CxXVFS+7B5Ra0P2kJPVGW3OIuVYXXM/DEofUWGhednv3sc/oIsQ35qhvYP4BeOe9d+gawQmgHbIPcOQAAAAlwSFlzAAALEwAACxMBAJqcGAAAASBJREFUOI2tlLFxhDAQRR/MpcQWFdCAcqkBCqADutDQBTWcA18JKCe5GSdUgBzctXAOGGkQAo/v7B9pV7tv/koaZSx68DdlmYe0bfsSoe/7hQQ8PEQI8RTEORdgJ5/cgxhjorjruigWQgTYiR15wLbxKA+Q70GGYQjFSimUUgEwDEPiNHHkIdZaAJqmoSgKyrIEwFob9owxkbP8CAJQFAUA8zxTVVXIW2sTZwEkpURrHcYAmKZpd62UQmuNlDIdra5rpJSM45iM4eMtpK7r/Vtbw7TWdF0XwfwoHrJWcv0eBgR36/F9zVa778gXrs/gCJCAnHPJ6/6p0fdEIOe+EOIt2vitzuf32NH1+vk0ZK0c4HL5eBlwv9+A5RuBf/jYvgH4yIZeQnyS2QAAAABJRU5ErkJggg==");\n}\n.perspectiveButton.active, .perspectiveButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAFy2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTgiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxOCIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIxOCIKICAgdGlmZjpJbWFnZVdpZHRoPSIxOCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNi0wMVQxMDozNDo0MC0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDYtMDFUMTA6MzQ6NDAtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTozMzoxNi0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTo1MTo0My0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNi0wMVQxMDozNDo0MC0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+JwuWpAAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZvyK0SgWFhaThpWRHzWxUUZCSRqjDDYz1/xQM+P13pNkq2wVJTZ+LfgL2CprpYiUrGdNbJie8+ZNjWTO7Z77ud97zunec8EVyaisUd0L2Zyph8dDvvnogq8uTy1VuKnHH1OGNjIzM0VF+3yUWLH7gF2rcty/1ricMBRU1QsPK003hSeEp9ZNzeY94VaVji0LXwh363JB4Qdbjzuctznl8LfNeiQ8Cq5mYV/qF8d/sUrrWWF5Of5sZk2V7mO/xJPIzc3K2iGzHYMw44TwMckYowTpY0h8kAD99MiOCvm9xfxpViVXidfYQGeFFGlMukVdk+oJWZOiJ2Rk2LD7/7evRnKg36nuCUHNq2W9d0LdLhR2LOvrxLIKp+B+getcOX/1GAY/RN8pa/4j8G7B5U1Zi+/D1Ta0PWsxPVaU3DJdySS8nUNTFFruoGHR6VnpnLMniGzKV93CwSF0Sbx36QfytWex+zpwggAAAAlwSFlzAAALEwAACxMBAJqcGAAAARdJREFUOI2tlMFthDAQRR+rvVIAFeACfLcbQNqcAi1sirBcwkopgjLsOwVABZyyLZBL7AA2K2Wz/wIzzDz9b1nAi1T8PJf/cooA6fv+KULbttHREiDjOP4JIoSIsHNo5iDGmE1trd3U4zhG2JmMAmC/eNQHOOUgzrk4rJRCKRUBzrnEaeIoQLz3AHRdR1mWVFUFgPc+fjPGbJydjiAAZVkCMM8zdV3Hvvc+cRZBUkq01jEGwDRN2XelFFprpJRptKZpkFIyDEMSI9R7SNM0+TNaw7TWWGs3sBBlD0lAaxgQ3a3jh5m9svcoDK7P4AiQgIQQye1+tBh2ggpguVzeaNv3h0tHul4/uN+/fh3dbp9PgdaO4AX/o28EZ31RG7EATQAAAABJRU5ErkJggg==");\n}\n.screenshotButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTgiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxOCIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIxOCIKICAgdGlmZjpJbWFnZVdpZHRoPSIxOCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNi0wMVQxOToxNDo0MS0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDYtMDFUMTk6MTQ6NDEtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQxNTo1ODo0NS0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNi0wMVQxOToxNDo0MS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+gsym2gAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZvyK0SgWFhaThpWRHzWxUUZCSRqjDDYz1/xQM+P13pNkq2wVJTZ+LfgL2CprpYiUrGdNbJie8+ZNjWTO7Z77ud97zunec8EVyaisUd0L2Zyph8dDvvnogq8uTy1VuKnHH1OGNjIzM0VF+3yUWLH7gF2rcty/1ricMBRU1QsPK003hSeEp9ZNzeY94VaVji0LXwh363JB4Qdbjzuctznl8LfNeiQ8Cq5mYV/qF8d/sUrrWWF5Of5sZk2V7mO/xJPIzc3K2iGzHYMw44TwMckYowTpY0h8kAD99MiOCvm9xfxpViVXidfYQGeFFGlMukVdk+oJWZOiJ2Rk2LD7/7evRnKg36nuCUHNq2W9d0LdLhR2LOvrxLIKp+B+getcOX/1GAY/RN8pa/4j8G7B5U1Zi+/D1Ta0PWsxPVaU3DJdySS8nUNTFFruoGHR6VnpnLMniGzKV93CwSF0Sbx36QfytWex+zpwggAAAAlwSFlzAAALEwAACxMBAJqcGAAAANlJREFUOI2t1EEKgzAQBdCveIfOdbIV8RxuRTyFiFvPYBeVUnoPoYeYLuoVdCGRJEab2P6dZuZlDJIASyb8liCQSJZlp4S2bRcJwCQRIvJCmHnFIvlSRcoiR1U3KItca6zqRnsmohWLYEQ2S8y2ZkMjs9As2JvIrA13u5QG8xNtOYTkrrbz8oJ8sjlsNeokR2f3FXIBrFCcpHg+7k6NcZJCCGGHhBCIk9QJUhENYmYQ0abgKPKvXiHmN4gu2oJruu6qTzQML29ETQgAfX87DYzjB8ByjQB/uNhm16JRDHvEtZMAAAAASUVORK5CYII=");\n}\n.screenshotButton.active, .screenshotButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAFy2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTgiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxOCIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIxOCIKICAgdGlmZjpJbWFnZVdpZHRoPSIxOCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNi0wMVQxOToxNTowNS0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDYtMDFUMTk6MTU6MDUtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTozMzoxNi0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTo1MTo0My0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNi0wMVQxOToxNTowNS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+ViGmhwAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZvyK0SgWFhaThpWRHzWxUUZCSRqjDDYz1/xQM+P13pNkq2wVJTZ+LfgL2CprpYiUrGdNbJie8+ZNjWTO7Z77ud97zunec8EVyaisUd0L2Zyph8dDvvnogq8uTy1VuKnHH1OGNjIzM0VF+3yUWLH7gF2rcty/1ricMBRU1QsPK003hSeEp9ZNzeY94VaVji0LXwh363JB4Qdbjzuctznl8LfNeiQ8Cq5mYV/qF8d/sUrrWWF5Of5sZk2V7mO/xJPIzc3K2iGzHYMw44TwMckYowTpY0h8kAD99MiOCvm9xfxpViVXidfYQGeFFGlMukVdk+oJWZOiJ2Rk2LD7/7evRnKg36nuCUHNq2W9d0LdLhR2LOvrxLIKp+B+getcOX/1GAY/RN8pa/4j8G7B5U1Zi+/D1Ta0PWsxPVaU3DJdySS8nUNTFFruoGHR6VnpnLMniGzKV93CwSF0Sbx36QfytWex+zpwggAAAAlwSFlzAAALEwAACxMBAJqcGAAAANNJREFUOI2t1EEOQ0AUBuBf4zBzjdmKiK46Z9CViFOIiKSHsG6anuVdoq6gG0+fMXRo/43gvW+eCYA/JRiPw69OwEjXdYcEY8w00cAIEe1ClFITFvJFiZRFjqpuUBb5rLGqm9k5EU1YCCvczJjrngsN7UK7YG0iu/a02iUa7Ed0ZRPiVV37tQvak8Vmy8hJtvbuK+QDOKEoTvB83L0aoziB1toNaa0RxYkXJJEZpJQCES0KtsJvNTB+a2l6hjEXb0Amy67o+9dnora9HYLkRMAf/kdvmR9KtwpEL4QAAAAASUVORK5CYII=");\n}\n.coordinatesButton {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAFPmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTgiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxOCIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIxOCIKICAgdGlmZjpJbWFnZVdpZHRoPSIxOCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNi0wMVQxOTo0NjoxMS0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDYtMDFUMTk6NDY6MTEtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQxNTo1ODo0NS0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNi0wMVQxOTo0NjoxMS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+7f9PrQAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZvyK0SgWFhaThpWRHzWxUUZCSRqjDDYz1/xQM+P13pNkq2wVJTZ+LfgL2CprpYiUrGdNbJie8+ZNjWTO7Z77ud97zunec8EVyaisUd0L2Zyph8dDvvnogq8uTy1VuKnHH1OGNjIzM0VF+3yUWLH7gF2rcty/1ricMBRU1QsPK003hSeEp9ZNzeY94VaVji0LXwh363JB4Qdbjzuctznl8LfNeiQ8Cq5mYV/qF8d/sUrrWWF5Of5sZk2V7mO/xJPIzc3K2iGzHYMw44TwMckYowTpY0h8kAD99MiOCvm9xfxpViVXidfYQGeFFGlMukVdk+oJWZOiJ2Rk2LD7/7evRnKg36nuCUHNq2W9d0LdLhR2LOvrxLIKp+B+getcOX/1GAY/RN8pa/4j8G7B5U1Zi+/D1Ta0PWsxPVaU3DJdySS8nUNTFFruoGHR6VnpnLMniGzKV93CwSF0Sbx36QfytWex+zpwggAAAAlwSFlzAAALEwAACxMBAJqcGAAAANVJREFUOI2t1MENgjAUxvE/hB3sOlyNcQFj4pGrMc4CIyAeJDHGIyu0iUPgQRgBD6QICoWq3/G1/eW9pqlDnYrf4jgaCYLgKyGKoloCKo0IIayQPM8bzNVFW+T9jGvY15v9bkuWZR91zwYAmC+W+L5vD2kA4Hy5Du4zjial6iBhGPZ2MwoBrNYbYyc6g6O1u4njA2VZDHZjhHTKsgAwIoOQlGoyYITGxuhLc9n6udt00T7j1YU7Qsw6C1OTJMcXBKDUzRppxwVI09PXQFE8gPobgT98bE9BU0xrk+bdqAAAAABJRU5ErkJggg==");\n}\n.coordinatesButton.active, .coordinatesButton:active {\nbackground-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAFy2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTgiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxOCIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB0aWZmOkltYWdlTGVuZ3RoPSIxOCIKICAgdGlmZjpJbWFnZVdpZHRoPSIxOCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNi0wMVQxOTo0Njo0NS0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDYtMDFUMTk6NDY6NDUtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTozMzoxNi0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgeG1wTU06YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgeG1wTU06c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgeG1wTU06d2hlbj0iMjAyNC0wNS0zMVQwOTo1MTo0My0wNTowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjUuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNi0wMVQxOTo0Njo0NS0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+3ivAWwAAAYBpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZvyK0SgWFhaThpWRHzWxUUZCSRqjDDYz1/xQM+P13pNkq2wVJTZ+LfgL2CprpYiUrGdNbJie8+ZNjWTO7Z77ud97zunec8EVyaisUd0L2Zyph8dDvvnogq8uTy1VuKnHH1OGNjIzM0VF+3yUWLH7gF2rcty/1ricMBRU1QsPK003hSeEp9ZNzeY94VaVji0LXwh363JB4Qdbjzuctznl8LfNeiQ8Cq5mYV/qF8d/sUrrWWF5Of5sZk2V7mO/xJPIzc3K2iGzHYMw44TwMckYowTpY0h8kAD99MiOCvm9xfxpViVXidfYQGeFFGlMukVdk+oJWZOiJ2Rk2LD7/7evRnKg36nuCUHNq2W9d0LdLhR2LOvrxLIKp+B+getcOX/1GAY/RN8pa/4j8G7B5U1Zi+/D1Ta0PWsxPVaU3DJdySS8nUNTFFruoGHR6VnpnLMniGzKV93CwSF0Sbx36QfytWex+zpwggAAAAlwSFlzAAALEwAACxMBAJqcGAAAAM9JREFUOI2t1DEKwjAYhuG34mF6ja4iUicDIjjXScSDFIReIc4ijr1Cu/USJkeoi6lVm9TUfksgJA/fX0pgpATPtf7XCQwipRwkCCGaRrVBqqryQsIwbLCJ2fRFPu9MHOc6czzsyfP8a3/qAwDM5guiKPKHDABwud6s55yjFUX5hmRZ1tmmFwJYb7bOJibW0dptpDyjtbK2cUImWisAJ2KFiqL8GXBCfWN0pfnY5nf3adG+EwB1HC8RYuXVwCRJdih1f42WpqdBULsRjPAePQBKokYW6r1DQwAAAABJRU5ErkJggg==");\n}\n'),
		document.documentElement.appendChild(b);
}
