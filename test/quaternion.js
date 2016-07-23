"use strict"

// quaternions implemented as [i, j, k, 1].
// Quaternion multiplication
function qmult(p, q) {
	return [
		p[0] * q[3] + p[3] * q[0] + p[1] * q[2] - p[2] * q[1],
		p[1] * q[3] + p[3] * q[1] + p[2] * q[0] - p[0] * q[2],
		p[2] * q[3] + p[3] * q[2] + p[0] * q[1] - p[1] * q[0],
		p[3] * q[3] - p[0] * q[0] - p[1] * q[1] - p[2] * q[2],
	]
}
// Quaternion normalization
function qnorm(q) {
	var a = Math.sqrt(q.map(x => x * x).reduce((x, y) => x + y))
	return a ? q.map(x => x / a) : [0, 0, 0, 1]
}
// 3x3 rotation matrix corresponding to the given quaternion
function qrot(q) {
	var x = q[0], y = q[1], z = q[2], w = q[3]
	return [
		1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w),
		2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w),
		2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)
	]
}

