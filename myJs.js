function showWarning(msg){
	document.write('<p align="center" style="background:#ffa;padding:5px">' + msg + '</p>');
}

document.addEventListener('DOMContentLoaded', function() {
	const LASER_KEYWORD = 'laser';
	let buffer = '';

	function activateLaser() {
		document.body.classList.add('laser-active');
		buffer = '';
	}

	function deactivateLaser() {
		document.body.classList.remove('laser-active');
		buffer = '';
	}

	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			deactivateLaser();
		return;
		}

		// 只接受單一字元的按鍵
		if (e.key.length !== 1) return;

		buffer += e.key.toLowerCase();

		// buffer 只保留最後 N 個字元（N = keyword 長度）
		if (buffer.length > LASER_KEYWORD.length) {
			buffer = buffer.slice(-LASER_KEYWORD.length);
		}

		if (buffer === LASER_KEYWORD) {
			activateLaser();
		}
	});
});

function createStepAnimation({ imgId, prevBtnId, nextBtnId, resetBtnId, steps }) {
	const img = document.getElementById(imgId);
	const prevBtn = document.getElementById(prevBtnId);
	const nextBtn = document.getElementById(nextBtnId);
	const resetBtn = document.getElementById(resetBtnId);
	let idx = 0;

	function render() {
		img.src = steps[idx];
		prevBtn.disabled = idx === 0;
		nextBtn.disabled = idx === steps.length - 1;
		resetBtn.disabled = idx === 0; // 已經在開頭時，回到開頭也沒意義
	}

	prevBtn.addEventListener("click", () => {
		if (idx > 0) { idx -= 1; render(); }
	});

	nextBtn.addEventListener("click", () => {
		if (idx < steps.length - 1) { idx += 1; render(); }
	});

	resetBtn.addEventListener("click", () => {
		if (idx !== 0) { idx = 0; render(); }
	});

	render();
}
