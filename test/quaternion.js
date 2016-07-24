"use strict"

// quaternions implemented as [i, j, k, 1].
var Q = {
	1: [0, 0, 0, 1],
	// Quaternion multiplication
	times: function (p, q) {
		return [
			p[0] * q[3] + p[3] * q[0] + p[1] * q[2] - p[2] * q[1],
			p[1] * q[3] + p[3] * q[1] + p[2] * q[0] - p[0] * q[2],
			p[2] * q[3] + p[3] * q[2] + p[0] * q[1] - p[1] * q[0],
			p[3] * q[3] - p[0] * q[0] - p[1] * q[1] - p[2] * q[2],
		]
	},
	// Quaternion normalization
	norm: function (q) {
		var a = Math.sqrt(q.map(x => x * x).reduce((x, y) => x + y))
		return a ? q.map(x => x / a) : [0, 0, 0, 1]
	},
	fromaxis: function (u, theta) {
		var S = Math.sin(theta / 2), C = Math.cos(theta / 2)
		return [S * u[0], S * u[1], S * u[2], C]
	},
	// 3x3 rotation matrix corresponding to the given quaternion
	rot: function (q) {
		var x = q[0], y = q[1], z = q[2], w = q[3]
		return [
			1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w),
			2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w),
			2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)
		]
	},
}


// vector math
var V = {
	0: [0, 0, 0],
	i: [1, 0, 0],
	j: [0, 1, 0],
	k: [0, 0, 1],
	plus: function (v1, v2) {
		var [x1, y1, z1] = v1, [x2, y2, z2] = v2
		return [x1 + x2, y1 + y2, z1 + z2]
	},
	times: function (a, v) {
		var [x, y, z] = v
		return [a * x, a * y, a * z]
	},
	lin: function (a, v1, b, v2) {
		return V.plus(V.times(a, v1), V.times(b, v2))
	},
	cross: function (v1, v2) {
		var [x1, y1, z1] = v1, [x2, y2, z2] = v2
		return [y1 * z2 - y2 * z1, z1 * x2 - z2 * x1, x1 * y2 - x2 * y1]
	},
	norm: function (v) {
		var [x, y, z] = v
		if (x == 0 && y == 0 && z == 0) return [0, 0, 1]
		var d = Math.sqrt(x * x + y * y + z * z)
		return [x / d, y / d, z / d]
	},
	perps: function (v) {
		var [x, y, z] = v, vc
		if (x == 0 && y == 0) {
			if (z == 0) return [[1, 0, 0], [0, 1, 0]]
			vc = [1, 0, 0]
		} else {
			vc = [0, 0, 1]
		}
		var v1 = V.norm(V.cross(v, vc))
		var v2 = V.norm(V.cross(v1, v))
		return [v1, v2]
	},
}
